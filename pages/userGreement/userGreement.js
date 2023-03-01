// pages/headlineDetail/headlineDetail.js
import utils from '../utils';
import {queryAgreeMent} from '../../api/url'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        preffixUrl: utils.preffixUrl(),
        info:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.getqueryAgreeMent()
    },
    getqueryAgreeMent(){
      queryAgreeMent({}).then(res => {
        console.log(res);
        if(res.STATUS==1){
          this.setData({
            info:res.LIST
          })
        }else{
          wx.showToast({
            title: res.MSG,
            icon:'none'
          })
        }
       
      }).catch(e=>{
        console.log(e)
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