// pages/componnets/service/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    refundReason: "",
    student: {
      name: "",
      age: "",
      address: "",
    },
    selectArray: [
      { id: 0, text: "全部服务" },
      { id: 1, text: "家电回收" },
      { id: 2, text: "家电维修" },
      { id: 3, text: "家电保养" },
      { id: 4, text: "家电报价" },
    ],
    itemsArray: [
      { id: 1, text: "家电回收" },
      { id: 2, text: "家电维修" },
      { id: 3, text: "家电保养" },
      { id: 4, text: "家电报价" },
    ],

    typeIndex: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData: function (event) {
      const { detail } = event;
      let newArray = this.data.selectArray.slice(1);
      if (detail.id === 0) {
        this.setData({
          itemsArray: newArray,
        });
        return;
      }
      const childArr = newArray.filter((item) => {
        return item.id === detail.id;
      });
      this.setData({
        itemsArray: childArr,
      });
    },
    changeTabs: function () {
      console.log(1);
    },
    bindPickerChange: function (e) {
      console.log(e.detail.value);
      this.setData({
        typeIndex: e.detail.value,
      });
    },
    search() {},
    goToDetail(event) {
      const pid = event.currentTarget.dataset.pid;
      console.log(pid);
      wx.navigateTo({
        url: `/pages/service-detail/index?id=${pid}`,
      });
    },
  },
});
