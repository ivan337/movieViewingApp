import type express from 'express';
import ApiError from "../exception/api-error";

class UserController {
    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            return res.json([1,2,3]);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();