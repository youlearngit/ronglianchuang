// pages/screenwed/screenwed.js
import utils from '../utils';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl(),
    date:"2022-10-13",
    mibel:[
      {
        id:0,
        text:'票据'
      }, {
        id:1,
        text:'债券'
      }, {
        id:2,
        text:'理财'
      }, {
        id:3,
        text:'基金'
      }, {
        id:4,
        text:'存单'
      }, {
        id:5,
        text:'同业借款'
      }, {
        id:6,
        text:'同业存款'
      }, {
        id:7,
        text:'资产证券化'
      }, {
        id:8,
        text:'银团贷款'
      }, 
      // {
      //   id:9,
      //   text:'资产托管'
      // }, 
      {
        id:10,
        text:'信托标债'
      }, {
        id:11,
        text:'信托非标'
      },
    ],
    currentCampus: -1,
    fontentub: false,
    fbundentub: false,
    isSelect:0,
    startTime:'请选择开始时间',
    endTime:'请选择结束时间',
    keywords:''
  },
  bindDateFund: function (e) {
    this.setData({
        funudDate: e.detail.value
    })
  },
  bindselect(e) {
    this.setData({
      fontentub: true
    })
  },
  FbundDateFund: function (e) {
     
    this.setData({
      fbundDate: e.detail.value
    })
  },
  Fbundselect(e) {
    console.log(e)
    var that = this;
        var value =e.currentTarget.dataset.id;
        var id =e.currentTarget.id;
          that.setData({
            isSelect: value,
            index:id,
          })

    this.setData({
      fbundentub: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.setData({
    startTime:this.data.startTime,
    endTime:this.data.endTime
   })
  },
  reset(){
    this.setData({
      startTime:'请选择开始时间',
      endTime:'请选择结束时间',
      isSelect:0
    })
  },

  confirm(){
    let backData={
      startTime:this.data.startTime,
      endTime:this.data.endTime,
      keywords:this.data.mibel[this.data.isSelect].text==='资产证券化'?'abs':this.data.mibel[this.data.isSelect].text
    }
    wx.setStorageSync("select_screen",backData)
   // wx.$emit("select_screen",backData);
    wx.navigateBack()

  //  wx.redirectTo({
  //    url: '/subpack/myrelease/releaselist/releaselist?info='+JSON.stringify({
  //     startTime:this.data.startTime,
  //     endTime:this.data.endTime,
  //     keywords:this.data.mibel[this.data.isSelect].text  
  //    })
  //  })
  },

  bindStartChange(e){
    console.log(e)
    this.setData({
      startTime:e.detail.value
    })
  },
  bindEndChange(e){
    this.setData({
      endTime:e.detail.value
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
