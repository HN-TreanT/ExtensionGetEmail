const userRouter = require("./user.route");
const emailRouter = require("./email.route");
function initRoute(app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/email", emailRouter);
}

module.exports = initRoute;
