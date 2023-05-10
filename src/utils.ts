import type { ServerResponse } from "node:http";
import type { Response } from "./router";

const buildResponse = (res: Response, rawRes: ServerResponse): void => {
    rawRes.statusCode = res.statusCode;
    rawRes.end(res.message);
};

export { buildResponse };
