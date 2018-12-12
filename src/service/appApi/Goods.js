const koa = require("koa");
const app = new koa();

const fs = require("fs");
const mongoose = require("mongoose");
const Router = require("koa-router");
let router = new Router();
router.get("/insertAllGoodsInfo", async ctx => {
  // 注意这里地址，是要到index.js执行的，所以地址是相对于index.js的地址
  fs.readFile("./data_json/newGood.json", "utf8", (err, data) => {
    console.log(err);
    const Goods = mongoose.model("Goods");
    let saveCount = 0;
    data = JSON.parse(data);
    data.map((value, index) => {
      let newGoods = new Goods(value);
      newGoods
        .save()
        //这里是返回了当前保存的项
        .then(saveItem => {
          // console.log(saveItem);
          saveCount++;
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  ctx.body = "导入商品数据:" + saveCount;
});

router.get("/insertAllCategoryInfo", async ctx => {
  const Category = mongoose.model("Category");
  fs.readFile("./data_json/category.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    data = JSON.parse(data);
    let saveCount = 0;
    data.RECORDS.map((value, index) => {
      let newCategory = new Category(value);
      newCategory
        .save()
        .then(_ => {
          saveCount++;
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  ctx.body = "导入数据中";
});

router.get("/insertAllCategorySubInfo", async ctx => {
  ctx.body = "导入数据中";
  let saveCount = 0;

  fs.readFile("./data_json/category_sub.json", (err, data) => {
    data = JSON.parse(data);
    const categorySub = mongoose.model("CategorySub");
    data.RECORDS.map((value, index) => {
      let newCategorySub = new categorySub(value);
      newCategorySub
        .save()
        .then(() => {
          saveCount++;
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  ctx.body += "\n" + saveCount;
});

// 获取商品详细信息
router.post("/getDetailGoodsInfo", async ctx => {
  let { goodsId } = ctx.request.body;
  const Goods = mongoose.model("Goods");
  await Goods.findOne({ ID: goodsId })
    .then(res => {
      console.log(res);
      ctx.body = {
        code: 200,
        message: res
      };
    })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      };
    });
});

// 读取大类数据的接口
router.get("/getCategoryList", async ctx => {
  const Category = mongoose.model("Category");
  await Category.find()
    .then(res => {
      ctx.body = {
        code: 200,
        message: res
      };
    })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      };
    });
});

// 读取小类的数据
router.post("/getCategorySubList", async ctx => {
  let categoryId = ctx.request.body.categoryId;
  console.log(categoryId);

  // let categoryId = 1;
  const CategorySub = mongoose.model("CategorySub");
  await CategorySub.find({ MALL_CATEGORY_ID: categoryId })
    .then(res => {
      ctx.body = {
        code: 200,
        message: res
      };
    })
    .catch(err => {
      ctx.body = {
        code: 200,
        message: err
      };
    });
});

// 根据类别，获取商品列表
router.post("/getGoodsListByCategorySubID", async ctx => {
  // let categorySubID = "2c9f6c946016ea9b016016f79c8e0000";
  let { categorySubID, page, sizePage } = ctx.request.body; //子类别ID,当前页数,每页显示多少
  let start = (page - 1) * sizePage; //启标

  let Goods = mongoose.model("Goods");
  await Goods.find({ SUB_ID: categorySubID })
    .skip(start) //跳过
    .limit(sizePage) // 每页显示的数据
    .then(res => {
      ctx.body = {
        code: 200,
        message: res
      };
    })
    .catch(err => {
      ctx.body = {
        code: 200,
        message: err
      };
    });
});

module.exports = router;
