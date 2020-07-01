let app = getApp();

Page({
  data: {
    currentTab: 0,
    //这里只做tab名和显示图标
    items: [
      {
        iconPath: "../../imgs/home.png",
        selectedIconPath: "../../imgs/home-sel.png",
        text: "主页",
      },
      {
        text: "服务",
        iconPath: "/imgs/service.png",
        selectedIconPath: "/imgs/service-sel.png",
      },
      {
        text: "我的",
        iconPath: "/imgs/person.png",
        selectedIconPath: "/imgs/person-sel.png",
      },
    ],
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      });
    }
  },
  onLoad: function (option) {},
});
