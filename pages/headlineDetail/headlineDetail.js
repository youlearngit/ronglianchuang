// pages/headlineDetail/headlineDetail.js
import utils from '../utils';
import {queryHeadlineNewsInfo} from '../../api/url'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        preffixUrl: utils.preffixUrl(),
        id:'',
        info:{},
        url:app.globalData.CDNURL
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(options)
       this.data.id=options.id
       this.getDetail()
        // console.log(options.data);
        // console.log(JSON.parse(options.data))
        // var list = JSON.parse(options.data)
        // this.setData({
        //   list: list
        // })
    },

    getDetail(){
      let that=this
      let data = {HN_ID:this.data.id}

      console.log(data)
      queryHeadlineNewsInfo(data).then(res => {
        console.log(res);
        var list = res;
        console.log(list);
        list.CREATE_TIME=list.CREATE_TIME.substring(0,10);
        that.setData({
          info:list
        })
      })
      
    },
    copy(){
      wx.setClipboardData({
        data: this.data.info.HN_SOURCE_URL,
        success: () => {
          wx.showToast({
            title: '复制成功',
            icon:'none'
          })
        }
      });
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