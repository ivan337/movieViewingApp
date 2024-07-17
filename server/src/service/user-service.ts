
import bcrypt from 'bcrypt';
import tokenService from "./token-service";
import UserDto from "../dtos/user-dto";
import UserModel from "../models/user-model";
import ApiError from "../exception/api-error";
import apiError from "../exception/api-error";

class UserService {
    async login(email: string, password: string) {
        const user: UserModel | null = await UserModel.findOne({
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

        return {};
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
            const activationLink = "uuid.v4()";
            const user = await UserModel.create({
                email,
                password: hashPassword,
                activationLink,
                isActivated: false
            });

            const userDto = new UserDto(user);

            const tokens = tokenService.generateToken(JSON.parse(JSON.stringify(userDto)));

            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto
            }
        }
    }
}

export default new UserService();