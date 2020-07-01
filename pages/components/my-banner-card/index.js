// components/my-banner/index.js

import { promisic } from "../../../utils/util";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
  },

  /**
   * 组件的初始数据
   */


  methods: {
    // async onAuthUserInfo(event) {
    //   console.log(event.detail);
    //   if (event.detail.userInfo) {
    //     const success = await User.updateUserInfo(event.detail.userInfo);
    //     this.setData({
    //       showLoginBtn: false,
    //     });
    //   }
    // },

    // async hasAuthUserInfo() {
    //   const setting = await promisic(wx.getSetting)();
    //   const userInfo = setting.authSetting["scope.userInfo"];
    //   return !!userInfo;
    // },
    aboutUs(event) {
      wx.navigateTo({
        url: `/pages/about/about`,
      });
    },
  },
});
