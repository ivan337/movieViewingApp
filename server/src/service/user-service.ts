
import bcrypt from 'bcrypt';
import tokenService, {CustomJwtPayload} from "./token-service";
import UserDto from "../dtos/user-dto";
import UserModel from "../models/user-model";
import ApiError from "../exception/api-error";
import apiError from "../exception/api-error";
import TokenModel from "../models/token-model";
import {Attributes} from "sequelize/types/model";

class UserService {
    async login(email: string, password: string) {
        const user = await UserModel.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            throw ApiError.unauthorizedError();
        }

        const passwordEq = await bcrypt.compare(password, user.password)

        if (!passwordEq) {
            throw ApiError.badRequest('Неверный пароль')
        }

        const userDto = new UserDto(user);

        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            userDto
        };
    }
    async registration(email: string, password: string) {
        const user = await UserModel.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            throw apiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        } else {
            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = "https://activationlink.com";
            const user = await UserModel.create({
                activationLink,
                email,
                isActivated: false,
                password: hashPassword
            });

            const userDto = new UserDto(user);

            const tokens = tokenService.generateToken({...userDto});

            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto
            }
        }
    }

    async logout(accessToken: string) {
        await tokenService.removeToken(accessToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError();
        }

        const userData = await tokenService.validateRefreshToken(refreshToken) as CustomJwtPayload;
        const tokenFromDb = await tokenService.findToken(refreshToken) as TokenModel;

        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError();
        }

        const user = await UserModel.findByPk(userData.id);
        const userDto = new UserDto(user);

        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

export default new UserService();