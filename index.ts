import { createServer } from "http";
import { createApp, createRouter, createRoute, toNodeListener } from "./src/index";

const app = createApp();

const router = createRouter();

const route = createRoute();

route.GET = (req, res): void => {
    console.log(req);
    res.statusCode = 200;
    res.message = "Hello world";
};

router.use("/", route);
app.use(router);

createServer(toNodeListener(app)).listen(3000);
