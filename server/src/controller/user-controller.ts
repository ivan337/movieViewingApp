import type express from 'express';
import ApiError from "../exception/api-error";
import userService from "../service/user-service";

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
}

export default new UserController();