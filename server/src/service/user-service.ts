import bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';

import sqliteConnection from '../dbService/sqlite-connection';
import UserDto from '../dtos/user-dto';
import ApiError from '../exception/api-error';
import apiError from '../exception/api-error';
import { AuthData, Role, User } from '../models/user';

import tokenService, { CustomJwtPayload } from './token-service';
import userService from './user-service';

export type UserWithAuthData = User & {
    AuthData: AuthData;
};

class UserService {
    async login(email: string, password: string) {
        const user = await userService.findUserByEmail(email);

        if (!user) {
            throw ApiError.unauthorizedError();
        }

        const passwordEq = await bcrypt.compare(
            password,
            user.AuthData.passwordHash,
        );

        if (!passwordEq) {
            throw ApiError.badRequest('Неверный пароль');
        }

        const userDto = new UserDto({
            email: user.AuthData.email,
            id: user.id,
            isActivated: user.isActivated,
        });

        const tokens = tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            userDto,
        };
    }
    async registration(email: string, password: string) {
        if (await userService.findUserByEmail(email)) {
            throw apiError.badRequest(
                `Пользователь с почтовым адресом ${email} уже существует`,
            );
        } else {
            const hashPassword = await bcrypt.hash(password, 3);
            //const activationLink = 'https://activationlink.com';

            await userService.createUser({
                email: email,
                password: hashPassword,
                userName: email + ' pepe',
                roleName: 'user',
            });

            const user = await userService.findUserByEmail(email);

            if (!user) {
                throw ApiError.internalError();
            }

            const userDto = new UserDto({
                email: user.AuthData.email,
                id: user.id,
                isActivated: user.isActivated,
            });

            const tokens = tokenService.generateToken({ ...userDto });

            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto,
            };
        }
    }

    async logout(accessToken: string) {
        await tokenService.removeToken(accessToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(
            refreshToken,
        ) as CustomJwtPayload;

        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError();
        }

        const user = await userService.findUserByEmail(userData.email);

        if (!user) {
            throw ApiError.unauthorizedError();
        }

        const userDto = new UserDto({
            email: user.AuthData.email,
            id: user.id,
            isActivated: user.isActivated,
        });

        const tokens = tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async findUserByEmail(email: string): Promise<UserWithAuthData | null> {
        const user = await User.findOne({
            include: [
                {
                    model: AuthData,
                    as: 'AuthData',
                    where: { email },
                    required: true,
                },
            ],
        });

        if (!user) {
            return null;
        }

        return user as UserWithAuthData;
    }

    async createUser({
        userName,
        email,
        password,
        roleName,
    }: {
        userName: string;
        email: string;
        password: string;
        roleName: string;
    }) {
        const transaction = await sqliteConnection.transaction();

        try {
            const user = await User.create(
                {
                    userName,
                },
                { transaction },
            );

            await AuthData.create(
                {
                    userId: user.id,
                    email: email,
                    passwordHash: password,
                },
                { transaction },
            );

            const [, created] = await Role.findOrCreate({
                where: { name: roleName },
                defaults: { name: roleName },
                transaction,
            });

            await transaction.commit();

            if (created) {
                console.log(`Роль "user" успешно добавлена.`);
            } else {
                console.log(`Роль "user" уже существует.`);
            }
        } catch (e) {
            await transaction.rollback();

            console.error('Ошибка создания пользователя:', e);

            throw e;
        }
    }
}

export default new UserService();
