import { createServer } from "http";
import type { Route } from "./src/index";
import { createApp, createRouter, toNodeListener } from "./src/index";

const app = createApp();

const router = createRouter();

const route: Route = {};

route.GET = (req, res): void => {
    console.log(req);
    res.statusCode = 200;
    res.message = "Hello world";
    throw new Error("");
};

router.use("/", route);
app.use(router);

createServer(toNodeListener(app)).listen(3000);
