const mongoose = require("mongoose");

const db = "mongodb://localhost/smile-db";

mongoose.Promise = global.Promise;

const glob = require("glob");
const { resolve } = require("path");

// 引入所有Schema
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, "./schema/", "**/*.js")).forEach(require);
};

return new Promise((resolve, reject) => {
  let maxConnectTimes = 0;

  exports.connect = () => {
    mongoose.connect(
      db,
      { useNewUrlParser: true }
    );

    mongoose.connection.on("disconnected", () => {
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error("数据库连接异常,程序无法解决...");
      }
    });

    mongoose.connection.on("error", err => {
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error("数据库连接异常,程序无法解决...");
      }
    });

    mongoose.connection.once("open", () => {
      console.log("mongoDB connected successfully");
      resolve();
    });
  };
});
