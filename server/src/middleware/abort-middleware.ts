import {AppRequest} from "../types/request";
import express from "express";
import ApiError from "../exception/api-error";

export const abortControllers = new Map<string, AbortController>();

const abortMiddleware = (req: AppRequest, res: express.Response, next: express.NextFunction) => {
    try {
        const controller = new AbortController();
        req.abortController = controller;
        req.abortSignal = controller.signal;

        const idempotencyKey = req.headers['idempotency-key'] as string;

        if (idempotencyKey) {
            abortControllers.set(idempotencyKey, controller);
        }

        req.on('close', () => {
            console.log('Client closed the connection');
            controller.abort(ApiError.clientClosedRequest());
        });

        req.on('aborted', () => {
            console.log('Client aborted the request');
            controller.abort(ApiError.clientClosedRequest());
        });

        res.on('finish', () => {
            controller.abort();
            abortControllers.delete(idempotencyKey);
        });

        next();
    } catch (err) {
        next(err)
    }
};

export default abortMiddleware;