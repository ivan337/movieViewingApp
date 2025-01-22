import bcrypt from 'bcrypt';

import UserDto from '../dtos/user-dto';
import ApiError from '../exception/api-error';
import apiError from '../exception/api-error';
import { createUser, findUserByEmail } from '../models';
import TokenModel from '../models/token-model';

import tokenService, { CustomJwtPayload } from './token-service';

class UserService {
    async login(email: string, password: string) {
        const user = await findUserByEmail(email);

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
        if (await findUserByEmail(email)) {
            throw apiError.badRequest(
                `Пользователь с почтовым адресом ${email} уже существует`,
            );
        } else {
            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = 'https://activationlink.com';

            await createUser({
                email: email,
                password: hashPassword,
                userName: email + ' pepe',
                roleName: 'user',
            });

            const user = await findUserByEmail(email);

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

        const userData = (await tokenService.validateRefreshToken(
            refreshToken,
        )) as CustomJwtPayload;
        const tokenFromDb = (await tokenService.findRefreshToken(
            refreshToken,
        )) as TokenModel;

        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError();
        }

        const user = await UserModel.findByPk(userData.id);

        if (!user) {
            throw ApiError.unauthorizedError();
        }

        const userDto = new UserDto(user);

        const tokens = tokenService.generateToken({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }
}

export default new UserService();
