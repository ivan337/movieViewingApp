import express from 'express';

import ApiError from '../exception/api-error';
import tokenService, { CustomJwtPayload } from '../service/token-service';
import { AppRequest } from '../types/request';

declare module 'express' {
    interface Request {
        user?: CustomJwtPayload | null;
    }
}

export default function (
    req: AppRequest,
    res: express.Response,
    next: express.NextFunction,
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw ApiError.unauthorizedError();
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            throw ApiError.unauthorizedError();
        }

        req.user = tokenService.validateAccessToken(token);

        if (!req.user) {
            throw ApiError.unauthorizedError();
        }

        return next();
    } catch (err) {
        next(err);
    }
}
