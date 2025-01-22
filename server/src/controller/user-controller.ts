import type express from 'express';

import ApiError from '../exception/api-error';
import userService from '../service/user-service';
import { AppRequest } from '../types/request';

class UserController {
    async login(
        req: AppRequest,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            await new Promise<void>((res) => {
                setTimeout(() => res(), 1000);
            });

            if (req.abortSignal?.aborted) {
                console.log('test super test');
            }

            const { email, password } = req.body;

            const userData = await userService.login(email, password);

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async registration(
        req: AppRequest,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            const { email, password } = req.body;

            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(
        req: AppRequest,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            const { accessToken } = req.cookies;

            await userService.logout(accessToken);

            res.clearCookie('accessToken');
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async loadProfile(
        req: AppRequest,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            return res.json({});
        } catch (e) {
            next(e);
        }
    }

    async refresh(
        req: AppRequest,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw ApiError.unauthorizedError();
            }

            const userData = await userService.refresh(refreshToken);

            if (!userData) {
                throw ApiError.unauthorizedError();
            }

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            res.json({
                accessToken: userData.accessToken,
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
