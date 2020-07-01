Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    flag2: false,
    isSubmitValidate: false,
    itemsArray: [
      { id: 1, text: "家电回收" },
      { id: 2, text: "家电维修" },
      { id: 3, text: "家电保养" },
      { id: 4, text: "家电报价" },
    ],

    service: {
      name: "",
      username: "",
      phone: Number,
      address: "",
      imgs: [],
      date: "",
    },
    nameRules: [
      {
        required: true,
        message: "号码不能为空哦",
      },
    ],
    phoneRules: [
      {
        required: true,
        message: "号码不能为空哦",
      },
    ],
    userAddress: [
      {
        required: true,
        message: "号码不能为空哦",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let serviceStr = "service.name";
    const itemsArray = this.data.itemsArray;
    let id = this.data.itemsArray.findIndex((item) => {
      return item.id == options.id;
    });
    this.setData({
      [serviceStr]: itemsArray[id].text,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.lin.initValidateForm(this);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  showImage: function () {
    this.setData({
      flag2: !this.data.flag2,
    });
  },
  showDate: function () {
    this.setData({
      flag: !this.data.flag,
    });
  },
  onDate: function (event) {
    if (!event.detail.date) {
      return;
    }
    let str = event.detail.date.split("%"),
      newDate = `${str[0]}年${str[1]}月${str[2]}日`;
    let serviceStr = "service.date";
    this.setData({
      [serviceStr]: newDate,
    });
  },
  submit: function (event) {
    console.log(event);
    // const { detail } = event;
    // console.log(detail);
  },
  onChangeTap: function (e) {
    const { detail } = e;
    console.log(detail);
  },

  onCloseDate: function () {
    this.setData({
      flag: false,
    });
  },
});
