import type { IncomingMessage } from "http";
import type { Request } from "../router";
import type { METHODS } from "../constant";

const parseRequest = (rawReq: IncomingMessage): Request => {
    const req: Request = {
        url: rawReq.url ?? "",
        method: (rawReq.method as (typeof METHODS)[keyof typeof METHODS] | undefined) ?? "GET",
    };
    return req;
};

export { parseRequest };
