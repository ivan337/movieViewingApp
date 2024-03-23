import jwt from 'jsonwebtoken';

export default class TokenService {
    generateToken(payload: string) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET || 'access_secret',
            {
                expiresIn: '30m'
            }
        )

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_REFRESH || 'access_refresh',
            {
                expiresIn: '30d'
            }
        )

        return { accessToken, refreshToken }
    }

    async saveToken(userId: number, token: string) {
        return token;
    }

    async refreshToken(userId: number, token: string) {
        return token;
    }

    async deleteToken(userId: number, token: string) {
        return token;
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'access_secret')
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_REFRESH || 'access_refresh')
        } catch (e) {
            return null;
        }
    }
}