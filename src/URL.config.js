const mockUrl =
  "https://www.easy-mock.com/mock/5b2cf2b51ba12b799fdaaeca/smileVue/";
const localUrl = "http://localhost:3000/";
export const URL = {
  index: mockUrl + "index", //首页模拟数据接口
  register: localUrl + "user/register", //注册接口
  login: localUrl + "user/login", //登录接口
  getDetailGoodsInfo: localUrl + "goods/getDetailGoodsInfo"
};
