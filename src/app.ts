import type { IncomingMessage, RequestListener, ServerResponse } from "http";

import type { RadixTree } from "rrat";
import { createRadixTree, mergeRadixTree } from "rrat";

import type { Route, Router, Response, Request } from "./router";
import { parseRequest } from "./parse/request";
import { buildResponse, buildReturnMsg } from "./utils";
import { STATUS_CODES } from "./constant";

type Event = "onError" | "onRequest";

interface App {
    on: (event: Event, cbk: () => void) => App;
    use: (router: Router) => App;
    routes: RadixTree<Route>;
    eventListeners: {
        onError: ((e: unknown, req: Request, res: Response) => void)[];
        onRequest: (() => void)[];
    };
    options: unknown;
}

const createApp = (): App => {
    const app: App = {
        on: (event: Event, cbk: () => void) => on(app, event, cbk),
        use: (router: Router) => use(app, router),
        routes: createRadixTree(),
        eventListeners: {
            onError: [],
            onRequest: [],
        },
        options: {},
    };
    return app;
};

const defaultResponse: Response = {
    statusCode: 200,
    message: "",
};

const toNodeListener = (app: App): RequestListener => {
    console.log(app);
    return (rawReq: IncomingMessage, rawRes: ServerResponse) => {
        if (!rawReq.url || !rawReq.method) {
            rawRes.statusCode = 400;
            rawRes.end();
            return;
        }
        const req = parseRequest(rawReq);
        const endpoint = app.routes.search(req.url);
        if (!endpoint?.content?.[req.method]) {
            rawRes.statusCode = 404;
            rawRes.end();
            return;
        }
        const res: Response = {
            ...defaultResponse,
        };
        try {
            endpoint.content[req.method]?.(req, res);
        } catch (e) {
            // Internal server error
            res.statusCode = STATUS_CODES.InternalServerError;
            res.message = buildReturnMsg(STATUS_CODES.InternalServerError, "Internal server error");
            app.eventListeners.onError.forEach((cbk) => {
                try {
                    cbk(e, req, res);
                } catch {
                    return;
                }
            });
        }
        buildResponse(res, rawRes);
        rawRes.end();
    };
};

const on = (app: App, event: Event, cbk: () => void): App => {
    app.eventListeners[event].push(cbk);
    return app;
};

const use = (app: App, router: Router): App => {
    mergeRadixTree(app.routes, router.routes, router.base);
    return app;
};

export { createApp, toNodeListener };
