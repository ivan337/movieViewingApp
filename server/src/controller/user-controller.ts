import type express from 'express';

class UserController {
    async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            res.json([1,2,3]);
        } catch (e) {
            
        }
    }
}

module.exports = new UserController();