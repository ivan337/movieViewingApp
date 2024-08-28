import type express from 'express';

class MovieController {
    async loadList(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {

            return res.json({});
        } catch (e) {
            next(e);
        }
    }
}

export default new MovieController();