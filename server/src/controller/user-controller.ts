import type express from 'express';
import ApiError from "../exception/api-error";
import userService from "../service/user-service";
import UserDto from "../dtos/user-dto";

class UserController {
    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {email, password} = req.body;

            const userData = await userService.login(email, password);

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async registartion(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const {email, password} = req.body;

            const userData = await userService.registration(email, password);

            res.cookie(
                'refreshToken',
                userData.refreshToken,
                { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }
            )

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { accessToken } = req.cookies;

            await userService.logout(accessToken);

            res.clearCookie('accessToken');
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    async loadProfile(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const testUser = new UserDto({email: 'test', id: 1, isActivated: true});

            return res.json(testUser);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { refreshToken } = req.cookies;

            const userData = await userService.refresh(refreshToken);

            res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();