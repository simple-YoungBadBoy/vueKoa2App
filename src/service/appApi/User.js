const Router = require("koa-router");
const mongoose = require("mongoose");

let router = new Router();
router.get("/", async ctx => {
  ctx.body = "用户操作界面";
});

router.post("/register", async ctx => {
  const User = mongoose.model("User");
  let newUser = new User(ctx.request.body);
  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: "注册成功"
      };
    })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      };
    });
});

router.post("/login", async ctx => {
  let { userName, password } = ctx.request.body;
  console.log(userName, password);

  const User = mongoose.model("User");
  // 查询数据库中是否有相对应的用户名
  await User.findOne({ userName: userName })
    .then(async result => {
      // 如果有，验证密码
      if (result) {
        let newUser = new User();
        // 对比密码，返回对比结果
        await newUser
          .comparePassword(password, result.password)
          .then(isMatch => {
            ctx.body = { code: 200, message: isMatch };
          })
          .catch(err => {
            ctx.body = { code: 500, message: err };
          });
      } else {
        // 如果没有，返回前端报错
        ctx.body = {
          code: 200,
          message: "用户名不存在"
        };
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
