import jwt, { JwtPayload } from 'jsonwebtoken';

import { createToken, findTokenByUserId } from '../models';
import { Token } from '../models';

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

    async saveToken(userId: string, refreshToken: string): Promise<Token> {
        const tokenData = await findTokenByUserId(userId);

        if (!tokenData) {
            await createToken({
                userId,
                token: refreshToken,
            });

            return findTokenByUserId(userId);
        }

        tokenData.set('token', refreshToken);

        return await tokenData.save();
    }

    async removeToken(refreshToken: string) {
        await TokenModel.destroy({
            where: {
                refreshToken,
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

    async findRefreshToken(refreshToken: string): Promise<TokenModel | null> {
        return await TokenModel.findOne({
            where: {
                refreshToken,
            },
        });
    }
    /*
    async findAccessToken(accessToken: string): Promise<TokenModel | null> {
        return await TokenModel.findOne({
            where: {
                accessToken
            }
        });
    }
 */
}

export default new TokenService();
