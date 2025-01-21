import express from 'express';

import ApiError from '../exception/api-error';
import { AppRequest } from '../types/request';

const registeredRequests = new Set<string>();

const idempotencyMiddleware = function (
    req: AppRequest,
    res: express.Response,
    next: express.NextFunction,
) {
    try {
        const idempotencyKey = req.headers['idempotency-key'] as string;

        if (!idempotencyKey) {
            return next();
        }

        if (registeredRequests.has(idempotencyKey)) {
            if (req.abortController) {
                req.abortController.abort(ApiError.clientClosedRequest());
            }

            throw ApiError.clientClosedRequest();
        }

        registeredRequests.add(idempotencyKey);

        const cleanup = () => {
            registeredRequests.delete(idempotencyKey);
        };

        res.once('finish', cleanup);
        res.once('close', cleanup);

        return next();
    } catch (err) {
        next(err);
    }
};

export default idempotencyMiddleware;
