import type express from 'express';

import { AppRequest } from '../types/request';

class MovieController {
    async loadList(
        req: AppRequest,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            await new Promise<void>((res) => {
                setTimeout(() => res(), 2000);
            });
            return res.json({});
        } catch (e) {
            next(e);
        }
    }
}

export default new MovieController();
