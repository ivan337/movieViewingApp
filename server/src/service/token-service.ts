import jwt, { JwtPayload } from 'jsonwebtoken';

import { Token } from '../models/user';
import User from '../models/user/user-model';

import userService from './user-service';

interface UserData {
    email: string;
    id: number;
    isActivated: boolean;
}

export interface CustomJwtPayload extends JwtPayload, UserData {
    email: string;
    id: number;
    isActivated: boolean;
}

class TokenService {
    generateToken(payload: object) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET || 'access_secret',
            {
                expiresIn: '30m',
            },
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_REFRESH || 'access_refresh',
            {
                expiresIn: '30d',
            },
        );

        return { accessToken, refreshToken };
    }

    async saveToken(userId: string, refreshToken: string): Promise<void> {
        let tokenData = await this.findTokenByUserId(userId);

        if (!tokenData) {
            await this.createToken({
                userId,
                token: refreshToken,
            });

            tokenData = await this.findTokenByUserId(userId);
        }

        if (tokenData) {
            tokenData.set('token', refreshToken);

            await tokenData.save();
        }
    }

    async removeToken(token: string) {
        await Token.destroy({
            where: {
                token,
            },
        });
    }

    validateAccessToken(token: string): CustomJwtPayload | null {
        try {
            return jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET || 'access_secret',
            ) as CustomJwtPayload;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): CustomJwtPayload | null {
        try {
            return jwt.verify(
                token,
                process.env.JWT_ACCESS_REFRESH || 'access_refresh',
            ) as CustomJwtPayload;
        } catch (e) {
            return null;
        }
    }

    findToken(token: string): Promise<Token | null> {
        return Token.findOne({
            where: { token },
        });
    }

    findTokenByUserId(userId: string): Promise<Token | null> {
        return Token.findOne({
            where: { userId },
        });
    }

    async createToken({
        userId,
        token,
    }: {
        userId: string;
        token: string;
    }): Promise<void> {
        try {
            const user = await userService.findUserById(userId);

            if (!user) {
                throw new Error('Пользователь не найден');
            }

            await Token.create({
                token,
                userId,
                expiresAt: new Date(
                    new Date().getTime() + 365 * 24 * 60 * 60 * 1000,
                ),
            });

            console.log('Токен успешно создан и связан с пользователем.');
        } catch (error) {
            console.error('Ошибка при создании токена:', error);
            throw error;
        }
    }
}

export default new TokenService();
