const fs = require("fs");

fs.readFile("./data_json/goods.json", "utf8", (err, data) => {
  if (err) return err;

  let newData = JSON.parse(data);
  let i = 0;
  let pushData = [];
  newData.RECORDS.map((value, index) => {
    if (value.IMAGE1 != null) {
      i++;
      pushData.push(value);
    }
  });
  console.log(`${i}条可用数据`);

  fs.writeFile("./newGood.json", JSON.stringify(pushData), err => {
    if (err) console.log("写入数据操作失败");
    else console.log("写入数据成功");
  });
});
