import type { RadixTree } from "rrat";
import { createRadixTree } from "rrat";
import type { METHODS, STATUS_CODES } from "./constant";

// eslint-disable-next-line @typescript-eslint/no-type-alias
type MethodNames = (typeof METHODS)[keyof typeof METHODS];
// eslint-disable-next-line @typescript-eslint/no-type-alias
type StatusCodes = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];

type ReqHeaders =
    | "accept-charset"
    | "accept-encoding"
    | "accept-language"
    | "accept"
    | "access-control-allow-credentials"
    | "access-control-allow-headers"
    | "access-control-allow-methods"
    | "access-control-allow-origin"
    | "access-control-expose-headers"
    | "access-control-max-age"
    | "access-control-request-headers"
    | "access-control-request-method"
    | "age"
    | "allow"
    | "authorization"
    | "cache-control"
    | "connection"
    | "content-disposition"
    | "content-encoding"
    | "content-language"
    | "content-length"
    | "content-location"
    | "content-md5"
    | "content-range"
    | "content-type"
    | "cookie"
    | "date"
    | "dnt"
    | "etag"
    | "expect"
    | "expires"
    | "forwarded"
    | "from"
    | "host"
    | "if-match"
    | "if-modified-since"
    | "if-none-match"
    | "if-range"
    | "if-unmodified-since"
    | "last-modified"
    | "link"
    | "location"
    | "max-forwards"
    | "origin"
    | "pragma"
    | "proxy-authenticate"
    | "proxy-authorization"
    | "public-key-pins"
    | "range"
    | "referer"
    | "referrer-policy"
    | "retry-after"
    | "server"
    | "www-authenticate"
    | "x-content-type-options";

interface Request {
    url: string;
    method: MethodNames;
    headers: Partial<Record<ReqHeaders, string | undefined>>;
    cookies: Record<string, string>;
}

interface Response {
    statusCode: StatusCodes;
    message: unknown;
    cookies?: Record<string, string>;
}

type Route = Partial<Record<MethodNames, (req: Request, res: Response) => void>>;
interface Router {
    base: string;
    routes: RadixTree<Route>;
    use: (path: string, route: Route) => Router;
}

const createRouter = (base = ""): Router => {
    const router: Router = {
        base,
        routes: createRadixTree(),
        use: (path: string, route: Route) => use(router, path, route),
    };
    return router;
};

const use = (router: Router, path: string, route: Route): Router => {
    router.routes.insert(path, route);
    return router;
};

export { createRouter };
export type { Route, Router, Request, Response };
