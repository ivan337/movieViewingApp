import ApiError from "../exception/api-error";
import {NextFunction} from "express";

export default function(err: Error, req: Request, resp: Response, next: NextFunction) {
    next();
}