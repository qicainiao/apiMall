// pages/sheji/index.js
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //1个详情
    wx.request({
      url: app.globalData.urls + '/cms/page/info',
      data: {
        key: '001'
      },
      success: function (res) {
        if (res.data.code == 0) {
          WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
        }
      }
    })

  },


  bindsubmit(e){
    console.log("e=====>",e);
    var loginToken = app.globalData.token // 用户登录 token
    var phone = "",name=""; // 备注信息
    if (e) {
      name = e.detail.value.name; // 备注信息
      phone = e.detail.value.phone; // 备注信息
    }
    if(!phone){
      wx.showModal({
        title: '温馨提示',
        content: '请输入联系方式',
        showCancel: false
      })
       return
    }
    wx.request({
      url: app.globalData.urls + '/comment/add',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        content:`预约量房姓名：${name},电话：${phone}`,
      }, // 设置请求的 参数
      success: (res) => {
        // console.log(postData)
        wx.hideLoading();
        if (res.data.code == 0) {
          wx.showModal({
            title: '恭喜您预约成功',
            content: '稍候客服会与您联系，请注意接听电话',
            showCancel: false
          })
          return;
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})