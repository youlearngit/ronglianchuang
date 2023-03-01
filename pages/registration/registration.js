// pages/registration/registration.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  entueb(e){
    wx.switchTab({
      url: "/pages/home/home", //进入首页
    });
    // wx.navigateBack()
    // wx.navigateTo({
    //   url: '/pages/login/login',
    // })
  },
  tapljzc(e){
    console.log('111');
    wx.navigateTo({
      url: '/pages/perfect/perfect',
    })

    // wx.navigateTo({
    //   url: '/pages/enroll/enroll',
    // })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})