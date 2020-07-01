// pages/componnets/home/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    user: {
      name: "",
      phone: Number,
      address: "",
    },
    phoneRule: [
      {
        required: true,
        message: "号码不能为空哦",
      },
      {
        type: "number",
        message: "号码不是有效数字",
      },
    ],
    nameRule: [
      {
        required: true,
        message: "用户名不能为空哦",
      },
    ],
    addressRule: [
      {
        required: true,
        message: "地址不能为空哦",
      },
    ],
  },
  ready: function () {
    wx.lin.initValidateForm(this);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onGotoQiYeDetail(event) {
      wx.navigateTo({
        url: "/pages/qiye-detail/index",
      });
    },
    submit(event) {
      const { detail } = event;
      console.log(detail);
    },
  },
});
