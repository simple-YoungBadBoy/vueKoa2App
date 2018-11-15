const Koa = require("koa");
const app = new Koa();
const { connect, initSchemas } = require("./database/init");
const mongoose = require("mongoose");
const cors = require("koa2-cors");
const bodyparser = require("koa-bodyparser");

app.use(cors());
app.use(bodyparser());
const Router = require("koa-router");
let user = require("./appApi/User");
let router = new Router();

router.use("/user", user.routes());
app.use(router.routes());
app.use(router.allowedMethods());
(async ctx => {
  await connect();
  initSchemas();
})();

// app.use(async ctx => {
//   ctx.body = "<h1>hello koa2</h1>";
// });

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
