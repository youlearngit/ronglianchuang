// subpack/myrelease/reldetail/releasedetail.js

import utils from '../../../pages/utils';
import {deleteTradeFinance,selectTradeFinanceList,delFile} from '../../../api/url'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl(),
    url:app.globalData.CDNURL,
    dialog:false,
    deldialog:false,
    info:{},
    id:'',
    userInfo:{},
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      id:options.id,
      userInfo:wx.getStorageSync('userInfo')
    })
    this.getDetail()
  },

  callphone(){
    wx.makePhoneCall({
      phoneNumber: this.data.userInfo.MOBILE,
    })
  },

  handleImagePreview(e) {
    console.log(e)

    const idx = e.target.dataset.idx
    const images = []
    this.data.info.PICTURE.forEach(item=> {
      images.push(this.data.url+item.URL)
    });

    console.log(images[idx])

    wx.previewImage({
        current: images[idx], //当前预览的图片
        urls: images, //所有要预览的图片
        complete:res=>{
          console.log(res)
        }
    })
},

  getBB_ENCLOSUR(){
    let that=this
    console.log(this.data.url+this.data.info.FILE[0].URL)

    console.log(this.data.info.FILE[0].URL.split('.')[1])

    wx.downloadFile({//下载
      url: this.data.url+this.data.info.FILE[0].URL,//服务器上的pdf地址
     // filePath: wx.env.USER_DATA_PATH + '/test.pdf',//自定义文件地址
      success: function (res) {
        console.log(res)
        wx.openDocument({
          filePath: res.tempFilePath,
          fileType:that.data.info.FILE[0].URL.split('.')[1],
          success: function (res) {
            console.log('打开PDF成功');
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
  getDetail(){
    console.log(this.data.id)
    selectTradeFinanceList({TF_ID:this.data.id,OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID}).then(res => {
      console.log(res);
      if(res.STATUS==1){
       this.setData({
         info:res.LIST[0]
       })
      }
    }).catch(e=>{
      wx.showToast({
        title: e,
        icon:'none'
      })
    })
  },
  delete(){
    return  delFile({TF_ID:this.data.info.TF_ID}).then(res => {
      console.log(res); 
    }).catch(e=>{
      console.log(e)
      wx.showToast({
        title: e,
        icon:'none'
      })
      return
    }).then(
    deleteTradeFinance({TF_ID:this.data.info.TF_ID}).then(res => {
      console.log(res);
      if(res.STATUS==1){
        wx.showToast({
          title: '删除成功',
          icon:'none'
        })
        setTimeout(()=>{
          wx.navigateBack()
        },1000)
      }else{
        wx.showToast({
          title: res.MSG,
          icon:'none'
        })
      }
     
    }).catch(e=>{
      console.log(e)
    })
    )
  },
  openenclosure:function(){
    console.log(12323)
    this.setData({
      dialog:true
      
    })
  },
  close:function(){
    this.setData({
      dialog:false,
      deldialog:false
    })
  },
  delbillfuc:function(){
    this.setData({
      deldialog:true
    })
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
   * 编辑页面
   */
  editfuc:function(){
wx.navigateTo({
  url: '/pages/tradeFinance/tradeFinance?info='+JSON.stringify(this.data.info)
})
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
