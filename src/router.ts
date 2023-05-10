import type { RadixTree } from "rrat";
import { createRadixTree } from "rrat";
import type { METHODS, STATUS_CODE } from "./constant";

// eslint-disable-next-line @typescript-eslint/no-type-alias
type MethodNames = (typeof METHODS)[keyof typeof METHODS];
// eslint-disable-next-line @typescript-eslint/no-type-alias
type StatusCodes = (typeof STATUS_CODE)[keyof typeof STATUS_CODE];

interface Request {
    url: string;
    method: MethodNames;
}

interface Response {
    statusCode: StatusCodes;
    message: unknown;
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

const createRoute = (): Route => {
    return {};
};

const use = (router: Router, path: string, route: Route): Router => {
    router.routes.insert(path, route);
    return router;
};

export { createRouter, createRoute };
export type { Route, Router, Request, Response };
