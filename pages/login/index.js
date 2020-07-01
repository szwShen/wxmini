// pages/login/login.js
var app = getApp();
var url = app.globalData.url;
var wait = 60;
var token = false;

var status = 0;
// 计时器
function time(o) {
  if (wait == 0) {
    o.setData({
      clicked: true,
      ytimes: wait,
    });
    wait = 60;
  } else {
    o.setData({
      clicked: false,
      ytimes: wait,
    });
    wait--;
    setTimeout(function () {
      time(o);
    }, 1000);
  }
}
var yzm = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clicked: true, //点击发送验证码，按钮显示隐藏
    phone: "", //电话号码
    ytimes: 60, //验证码60s
    yanz: "", //验证码
    showStatus: true,
    flag: false,
    names: "大嘴回收",
  },
  //手机输入框
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  yanzInput: function (e) {
    this.setData({
      yanz: e.detail.value,
    });
  },
  onLoad: function (options) {
    token = wx.getStorageSync("token");
    if (token) {
      wx.navigateTo({
        url: "../index/index",
      });
    }

  },

  onShow() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var heights = res.windowHeight;
        var height1 = 750 / (width / heights) - 128;
        that.setData({
          height: height1,
        });
      },
    });
  },
  auth() {
    const that = this;
    console.log("授权认证");
    that.setData({
      showStatus: false,
    });
  },
  getLocation: function (e) {
    console.log(e);
    var that = this;
    wx.getLocation({
      type: "wgs84", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于                            //wx.openLocation 的坐标
      success: function (res) {
        console.log(res);
        //判断用户位置是否超出服务范围
        wx.request({
          url: url + "/users/getUsersDistance",
          method: "POST",
          data: {
            longitude: res.longitude,
            latitude: res.latitude,
          },
          header: {
            "content-type": "application/x-www-form-urlencoded",
          },
          success: function (res) {
            if (res.data === 101) {
              wx.showToast({
                title: "不在服务范围内",
                mask: true,
                icon: "loading",
                duration: 2000,
              });
            }
          },
        });

        (app.globalData.longitude = res.longitude),
          (app.globalData.latitude = res.latitude),
          that.setData({
            longitude: res.longitude,
            latitude: res.latitude,
          });
      },
    });
  },
  eyoux: function () {
    var that = this;
    console.log("发送手机验证码");
    var phone = this.data.phone;
    console.log("phone为" + phone);
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (phone == null || phone == "") {
      wx.showToast({
        title: "请输入手机号！",
        icon: "loading",
        duration: 1500,
        mask: true,
      });
      return false;
    } else if (!reg.test(phone)) {
      wx.showToast({
        title: "手机号格式不正确！",
        icon: "loading",
        duration: 1500,
        mask: true,
      });
      return false;
    }
    that.setData({
      clicked: false,
    });

    time(that);

    console.log("验证码发送成功");
    wx.request({
      url: url + "/ten_xun/yzm",
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      data: {
        phone: phone,
      },
      success: function (res) {
        console.log("验证码");
        console.log(res.data.data);

        yzm = res.data.data;
        wx.showToast({
          title: "验证码已发送",
          icon: "success",
          duration: 1500,
          mask: true,
        });
      },
    });
  },
  //手机验证码登录
  formSubmit: function (e) {
    console.log("form发生了submit事件，携带数据为：", e.detail.value);
    var phone = e.detail.value.phone;
    var yanzm = e.detail.value.yanzm;

    if (phone.length != 0 && yanzm.length != 0) {
      if (yanzm == yzm) {
        wx.login({
          success: function (res) {
            wx.request({
              url: url + "/wx_users/openid_session_key",
              data: {
                code: res.code,
              },
              method: "GET",
              header: {
                "content-type": "application/json", // 默认值
              },
              success: function (o) {
                console.log("ttt:" + o.data.openid);
                wx.setStorageSync("openid", o.data.openid);
                var avatarUrl = "";
                wx.getUserInfo({
                  success: function (res1) {
                    var userInfo = res1.userInfo;

                    console.log(res1.userInfo);
                    avatarUrl = userInfo.avatarUrl;
                    wx.request({
                      url: url + "/wx_users/tel_login",
                      data: {
                        avatarUrl: avatarUrl,
                        phone: phone,
                        unionId: o.data.unionid,
                      },
                      success: function (data) {
                        console.log("登录手机号--");
                        console.log(data.data);
                        if (data.data.code === 1) {
                          wx.setStorageSync("user", data.data.data.wxUsers);
                          wx.setStorageSync("token", true);
                          wx.setStorageSync("tk", true);
                          wx.navigateBack(2);

                          if (status == 1) {
                            wx.navigateTo({
                              url: "../coupon/coupon",
                            });
                          } else if (status == 2) {
                            wx.navigateTo({
                              url: "../order/order?status=&&pstatus=",
                            });
                          } else {
                            wx.navigateTo({
                              url: "../index/index",
                            });
                          }
                        } else {
                          wx.showToast({
                            title: "服务器忙",
                            icon: "loading",
                            duration: 3000,
                          });
                        }
                      },
                    });
                  },
                });
              },
            });
          },
        });
      } else {
        wx.showToast({
          title: "验证码输入错误",
          icon: "loading",
          duration: 1500,
          mask: true,
        });
      }
    } else if (phone.length == 0) {
      wx.showToast({
        title: "请输入手机号码",
        icon: "loading",
        duration: 1500,
        mask: true,
      });
    } else if (yanzm.length == 0) {
      wx.showToast({
        title: "请输入验证码",
        icon: "loading",
        duration: 1500,
        mask: true,
      });
    }
  },
  bindGetUserInfo(e) {
    console.log(e);
    var that = this;
    that.setData({
      showStatus: false,
    });
  },
  // 微信登录
  bindgetPhone: function (e) {
    console.log(e);
    wx.showLoading({
      title: "正在登陆",
    });
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      //获取手机号码
      // 登录
      wx.login({
        success: (res) => {
          //发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: url + "/wx_users/openid_session_key",
            data: {
              code: res.code,
            },
            method: "GET",
            header: {
              "content-type": "application/json", // 默认值
            },
            success: function (res) {
              console.log("ttt:" + res.data.openid);
              console.log(res.data.openid + "--openid");
              wx.setStorageSync("openid", res.data.openid);
              var avatarUrl = "";
              wx.getUserInfo({
                success: function (res1) {
                  var userInfo = res1.userInfo;

                  console.log(res1);
                  avatarUrl = userInfo.avatarUrl;

                  //把参数传后台解析手机号
                  console.log(avatarUrl + "-----awatar");
                  wx.request({
                    url: url + "/wx_users/wx_login",
                    data: {
                      unionId: res.data.unionid,
                      avatarUrl: avatarUrl,
                      encryptData: e.detail.encryptedData,
                      ivData: e.detail.iv,
                      sessionKey: res.data.session_key,
                      name: res1.userInfo.nickName,
                    },
                    method: "GET",
                    header: {
                      "content-type": "application/json", // 默认值
                    },
                    success: function (res) {
                      console.log("登录返回的 ");
                      console.log(res);
                      if (res.data.code == 0) {
                        wx.hideLoading();
                        wx.showToast({
                          title: "网络超时，请重新登录",
                          icon: "loading",
                          duration: 3000,
                        });
                      } else {
                        wx.hideLoading();
                        wx.setStorageSync("user", res.data.data.wxUsers);
                        wx.setStorageSync("token", true);
                        console.log(status + "---login  status-----");
                        if (status == 1) {
                          wx.navigateTo({
                            url: "../coupon/coupon",
                          });
                        } else if (status == 2) {
                          wx.navigateTo({
                            url: "../order/order?status=&&pstatus=",
                          });
                        } else {
                          wx.navigateTo({
                            url: "../index/index",
                          });
                        }
                      }
                    },
                  });
                },
              });
            },
          });
        },
      });
    } else {
      wx.hideLoading();
      wx.showModal({
        title: "提示",
        showCancel: false,
        content: "未授权",
        success: function (res) {},
      });
    }
  },
});
