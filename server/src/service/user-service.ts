import bcrypt from 'bcrypt';

import sqliteConnection from '../dbService/sqlite-connection';
import UserDto from '../dtos/user-dto';
import ApiError from '../exception/api-error';
import apiError from '../exception/api-error';
import { Role, User, UserDetail } from '../models/user';

import tokenService, { CustomJwtPayload } from './token-service';
import userService from './user-service';

export type UserWithUserDetail = User & {
    UserDetail: UserDetail;
};

class UserService {
    async login(email: string, password: string) {
        const user = await userService.findUserByEmail(email);

        if (!user) {
            throw ApiError.unauthorizedError();
        }

        const passwordEq = await bcrypt.compare(password, user.passwordHash);

        if (!passwordEq) {
            throw ApiError.badRequest('Неверный пароль');
        }

        const userDto = new UserDto({
            email: user.email,
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
    async registration(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
    ) {
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
                firstName: firstName,
                lastName: lastName,
                roleName: 'user',
            });

            const user = await userService.findUserByEmail(email);

            if (!user) {
                throw ApiError.internalError();
            }

            const userDto = new UserDto({
                email: user.email,
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
            email: user.email,
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

    async findUserByEmail(email: string): Promise<UserWithUserDetail | null> {
        const user = await User.findOne({
            where: {
                email,
            },
            include: [
                {
                    model: UserDetail,
                    as: 'UserDetail',
                    required: true,
                },
            ],
        });

        if (!user) {
            return null;
        }

        return user as UserWithUserDetail;
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await User.findOne({
            where: {
                id,
            },
        });

        if (!user) {
            return null;
        }

        return user;
    }

    async createUser({
        email,
        firstName,
        lastName,
        password,
        roleName,
    }: {
        email: string;
        password: string;
        roleName: string;
        firstName: string;
        lastName: string;
    }) {
        const transaction = await sqliteConnection.transaction();

        try {
            const user = await User.create(
                {
                    email,
                    passwordHash: password,
                },
                { transaction },
            );

            await UserDetail.create(
                {
                    userId: user.id,
                    firstName: firstName,
                    lastName: lastName,
                    bio: '',
                    avatarUrl: '',
                },
                { transaction },
            );

            const [role, created] = await Role.findOrCreate({
                where: { name: roleName },
                defaults: { name: roleName },
                transaction,
            });

            if (created) {
                await user.addRole(role, { transaction });
                console.log(`Роль "user" успешно добавлена.`);
            } else {
                console.log(`Роль "user" уже существует.`);
            }

            await transaction.commit();
        } catch (e) {
            await transaction.rollback();

            console.error('Ошибка создания пользователя:', e);

            throw e;
        }
    }
}

export default new UserService();
