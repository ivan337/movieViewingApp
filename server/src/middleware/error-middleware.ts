import express from 'express';

import ApiError from '../exception/api-error';
import { AppRequest } from '../types/request';

const errorMiddleware = function (
    err: Error,
    req: AppRequest,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction,
) {
    console.log(err);

    if (err instanceof ApiError) {
        // Если ошибка является экземпляром ApiError, отправляем соответствующий ответ
        return res.status(err.status).json({ message: err.message });
    }

    // Для всех остальных ошибок отправляем ответ с кодом 500
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
};

export default errorMiddleware;
