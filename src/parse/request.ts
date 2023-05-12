import type { IncomingMessage } from "http";
import type { Request } from "../router";
import type { METHODS } from "../constant";
import { parseCookie } from "./cookie";

const parseRequest = (rawReq: IncomingMessage): Request => {
    // rawReq.headers;
    const req: Request = {
        url: rawReq.url ?? "",
        method: (rawReq.method as (typeof METHODS)[keyof typeof METHODS] | undefined) ?? "GET",
        headers: rawReq.headers,
        cookies: parseCookie(rawReq.headers.cookie ?? ""),
    };
    return req;
};

export { parseRequest };
