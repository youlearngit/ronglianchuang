// pages/bannerDetail/bannerDetail.js
import utils from '../utils';
import {queryResearchSpecialColumnInfo} from '../../api/url'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        preffixUrl: utils.preffixUrl(),
        url:app.globalData.CDNURL,
        info:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getdetail(options.id);
    },

    getBB_ENCLOSUR(e){
      console.log(this.data.url+e.target.dataset.url)
      wx.showLoading({
        title: '加载中,请稍后',
        mask:true
      })
      let that=this
      wx.downloadFile({
        url: this.data.url+e.target.dataset.url,
        success: function (res) {
          console.log(res)
          wx.openDocument({
            filePath: res.tempFilePath,
            fileType:e.target.dataset.url.split('.')[1],
  
            success: function (res) {
              wx.hideLoading({
                success: (res) => {},
              })
            },
            fail:function(res){
              console.log(res)
              wx.showToast({
                title: res.errMsg,
                icon:'none'
              })
            }
          })
        }
       })
    
    },

    // 精彩瞬间接口方法
    getdetail:function(id) {
    var that= this;
    // console.log(salary);
    let data = {
      RSC_ID:id
    }
    console.log(data)
    wx.showLoading({
      title: '加载中',
    })
    queryResearchSpecialColumnInfo(data).then(res => {
      wx.hideLoading({
        success: (res) => {},
      })

      console.log(res)
      this.data.info=res
      if(res.ENCLOSURE!==''){
        this.data.info.ENCLOSURE =  res.ENCLOSURE.split(';')
      }
      if(this.data.info.ENCLOSURE.length==1){
       
        let url= this.data.url+this.data.info.ENCLOSURE[0]
        wx.navigateTo({
          url: '/subpack/webhtml/web?web='+url
         })
      }
      console.log(this.data.info)
      that.setData({
        info:this.data.info
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