import express from 'express';

import ApiError from '../exception/api-error';
import { AppRequest } from '../types/request';

export const abortControllers = new Map<string, AbortController>();

const abortMiddleware = (
    req: AppRequest,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const controller = new AbortController();
        req.abortController = controller;
        req.abortSignal = controller.signal;

        const idempotencyKey = req.headers['idempotency-key'] as string;

        if (idempotencyKey) {
            abortControllers.set(idempotencyKey, controller);
        }

        const cleanup = () => {
            if (abortControllers.has(idempotencyKey)) {
                abortControllers.delete(idempotencyKey);
            }
        };

        res.on('close', () => {
            console.log('Response connection closed');
            controller.abort(ApiError.clientClosedRequest());
            cleanup();
        });

        res.on('finish', () => {
            console.log('Response finished');
        });

        setTimeout(
            () => {
                if (abortControllers.has(idempotencyKey)) {
                    controller.abort(ApiError.timedOut());
                }

                cleanup();
            },
            5 * 60 * 1000,
        );

        return next();
    } catch (err) {
        next(err);
    }
};

export default abortMiddleware;
