const authRouter = require("./Auth");
const userRouter = require("./Users");
const categoryRouter = require("./Categories");
const articleRouter = require("./Articles");
const commentRouter = require("./Comments");
const notifRouter = require("./Notifications");

const routes = (route, prefix) => {
    route.use(`${prefix}/auth`, authRouter);
    route.use(`${prefix}/users`, userRouter);
    route.use(`${prefix}/category`, categoryRouter);
    route.use(`${prefix}/article`, articleRouter);
    route.use(`${prefix}/comment`, commentRouter);
    route.use(`${prefix}/notification`, notifRouter);
}

module.exports = routes;