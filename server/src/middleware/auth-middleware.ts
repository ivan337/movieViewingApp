import ApiError from '../exception/api-error';
import { NextFunction, Request, Response } from 'express';
import tokenService, {CustomJwtPayload} from '../service/token-service';
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: CustomJwtPayload;
        }
    }
}

export default function(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(ApiError.unauthorizedError());
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return next(ApiError.unauthorizedError());
        }

        //TODO: req.user ???
        req.user = tokenService.validateAccessToken(token) as CustomJwtPayload;

        return next();
    } catch (e) {
        return next(ApiError.unauthorizedError());
    }
}