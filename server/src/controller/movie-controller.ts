import type express from 'express';
import {AppRequest} from "../types/request";

class MovieController {
    async loadList(req: AppRequest, res: express.Response, next: express.NextFunction) {
        try {

            return res.json({});
        } catch (e) {
            next(e);
        }
    }
}

export default new MovieController();