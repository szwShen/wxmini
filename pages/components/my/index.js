import { promisic } from "../../../utils/util";
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    couponCount: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGotoMyOrder(event) {
      wx.navigateTo({
        url: "/pages/my-order/my-order?key=0",
      });
    },
    async onMgrAddress(event) {
      // const authStatus = await this.hasAuthorizedAddress();
      this.setData({
        showDialog: true,
      });

      await this.openAddress();
    },

    async hasAuthorizedAddress() {
      const setting = await promisic(wx.getSetting)();
      console.log(setting);
      // const addressSetting = setting.authSetting["scope.address"];
      // if (addressSetting === undefined) {
      //   return AuthAddress.NOT_AUTH;
      // }
      // if (addressSetting === false) {
      //   return AuthAddress.DENY;
      // }
      // if (addressSetting === true) {
      //   return AuthAddress.AUTHORIZED;
      // }
    },

    async openAddress() {
      let res;
      res = await promisic(wx.chooseAddress)();
      console.log(res);
    },
    onFreeTell:function(){
      wx.makePhoneCall({

        phoneNumber: '15692115495',
  
      })
    }
  },
});
