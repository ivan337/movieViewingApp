import ApiError from "../exception/api-error";
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = function(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(Number(err.status)).json({message: err.message});
    }

    return res.status(500).json({message: 'Непредвиненная ошибка'})
};
export default errorMiddleware