// pages/bannerDetail/bannerDetail.js
import utils from '../utils';
import {queryOrganizationalMemberInfo} from '../../api/izational'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        preffixUrl: utils.preffixUrl(),
        url:app.globalData.CDNURL,
        info:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
      this.getdetail(options.id);
    },

    // 精彩瞬间接口方法
    getdetail:function(id) {
    var that= this;
    // console.log(salary);
    let data = {
      OM_ID:id
    }
    console.log(data)
    wx.showLoading({
      title: '加载中',
    })
    queryOrganizationalMemberInfo(data).then(res => {
      wx.hideLoading({
        success: (res) => {},
      })
      console.log(res)
      res.CREATE_TIME=res.CREATE_TIME.substring(0,10);
      that.setData({
        info:res
      })
      // console.log(JSON.parse(res.loopListString));
    }).catch(e=>{
      wx.hideLoading({
        success: (res) => {},
      })
      wx.showToast({
        title: '加载失败',
      })
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
