import ApiError from "../exception/api-error";
import express, { Request, Response, NextFunction } from 'express';
import {AppRequest} from "../types/request";

const errorMiddleware = function(err: Error, req: AppRequest, res: express.Response, next: express.NextFunction) {
    console.log(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }

    return res.status(500).json({message: 'Непредвиненная ошибка'})
};
export default errorMiddleware