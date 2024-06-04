import ApiError from "../exception/api-error";
import { Request, Response, NextFunction } from 'express';

export default function(req: Request, res: Response, next: NextFunction) {
    try {
        return next();
    } catch (e) {
        return next(ApiError.unauthorizedError());
    }
}