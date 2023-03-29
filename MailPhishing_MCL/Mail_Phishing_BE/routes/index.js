const userRouter = require("./user.route");
const emailRouter = require("./email.route");
const modelRouter = require("./model.route");
function initRoute(app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/email", emailRouter);
  app.use("/api/v1/model", modelRouter);
}

module.exports = initRoute;
