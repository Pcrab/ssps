import type { ServerResponse } from "node:http";
import type { Response } from "../router";
import { stringifyCookies } from "./cookie";

const buildResponse = (res: Response, rawRes: ServerResponse): void => {
    rawRes.statusCode = res.statusCode;
    if (res.cookies) {
        rawRes.setHeader("Set-Cookie", stringifyCookies(res.cookies));
    }
    rawRes.end(res.message);
};

const buildReturnMsg = (message: unknown): string => {
    return JSON.stringify({
        msg: JSON.stringify(message),
    });
};

const buildReturnErr = (errMsg: unknown): string => {
    return JSON.stringify({
        err: JSON.stringify(errMsg),
    });
};

export { buildResponse, buildReturnMsg, buildReturnErr };
