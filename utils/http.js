import { promisic } from "./util";
class Http {
  static async request({ url, data, method = "GET" }) {
    return await promisic(wx.request)({
      url,
      data,
      method,
    });
  }
}
export { Http };
