const mockUrl =
  "https://www.easy-mock.com/mock/5b2cf2b51ba12b799fdaaeca/smileVue/";
const localUrl = "http://localhost:3000/";
export const URL = {
  index: mockUrl + "index", //首页模拟数据接口
  register: localUrl + "user/register", //注册接口
  login: localUrl + "user/login", //登录接口
  getDetailGoodsInfo: localUrl + "goods/getDetailGoodsInfo", //获取商品详情
  getCategoryList: localUrl + "goods/getCategoryList", //获取大类数组
  getCategorySubList: localUrl + "goods/getCategorySubList", //根据大类ID，读取小类类别列表
  getGoodsListByCategorySubID: localUrl + "goods/getGoodsListByCategorySubID" //小类商品信息
};
