import express from "express";
import {AppRequest} from "../types/request";
import {abortControllers} from "./abort-middleware";
import ApiError from "../exception/api-error";

const registeredRequests = new Set<string>();

const idempotencyMiddleware = function(req: AppRequest, res: express.Response, next: express.NextFunction) {
    try {
        const idempotencyKey = req.headers['idempotency-key'] as string;

        if (!idempotencyKey) {
            return next();
        }

        if (registeredRequests.has(idempotencyKey)) {
            abortControllers.delete(idempotencyKey);
            throw ApiError.clientClosedRequest();
        }

        registeredRequests.add(idempotencyKey);

        res.once('finish', function () {
            registeredRequests.delete(idempotencyKey);
        });

        return next();
    } catch (err) {
        next(err)
    }
};

export default idempotencyMiddleware;