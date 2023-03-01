// pages/headLine/headLine.js
import utils from '../../../pages/utils';
import {queryBillBusiness} from '../../../api/url'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        preffixUrl: utils.preffixUrl(),
        billclass:[
          {"name":"交易方向",
            "id":1},
          {"name":"票据类型",
          "id":2},
          {"name":"信用主体",
          "id":3},
          {"name":"首期利率",
          "id":4},
          {"name":"金额",
          "id":5}
        ],
        bondclass:[
          {"name":"发行人性质",
            "id":1},
          {"name":"债券名称",
          "id":2},
          {"name":"发行规模",
          "id":3},
          {"name":"预测利率区间",
          "id":4},
          {"name":"主体评级",
          "id":5},
          {"name":"债项评级",
          "id":6}
        ],
        Isshow:false,
        billBusiness:[],
        pageNo:1,
        pageSize:10,
        loadtext: "", //1,上拉加载更多，2，加载中...3,没有更多了,
        startTime:'',
        endTime:'',
        keywords:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      if(options.info){
        let info=JSON.parse(options.info)
        console.log(info)
        this.setData({
          startTime:info.startTime,
          endTime:info.endTime,
          keywords:info.keywords
        })
      }
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
      this.data.pageNo=1
      this.data.billBusiness=[]
      this.loadMoreData()

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    billinfo:function(e){
    let info = e.currentTarget.dataset.value
      wx.navigateTo({
        url: '../reldetail/releasedetail?info='+JSON.stringify(info)
      })
    },
    screen:function(){

      wx.navigateTo({
        url: '/pages/screenwed/screenwed'
      })
    },
    isShowMore(){
      this.setData({
        Isshow:!this.data.Isshow
      })
    },
    goSearch(e){
      console.log(e)
     if(this.data.keywords==''){
       wx.showToast({
         title: '请先输入关键字',
         icon:'none'
       })
       return
     }
      this.data.pageNo=1
      this.data.billBusiness=[]
      this.loadMoreData()
    
    },
    inputChange: function(t) {
      console.log(t)
      this.setData({
          keywords: t.detail.value
      });
  },
    loadMoreData:function(){
      let data = {
        pageNo:String(this.data.pageNo),
        pageSize:String(this.data.pageSize),
        startTime:this.data.startTime,
        endTime:this.data.endTime,
        keywords:this.data.keywords
      }
      queryBillBusiness(data).then(res => {
        console.log(res);
        if(res.STATUS==1){
          var list = res.LIST;
          console.log(list);
          this.setData({
            billBusiness:[...this.data.billBusiness, ...list],
            loadtext: this.data.loadtext =list.length < 10 ? "没有更多了" : "上拉加载更多"
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
      if (this.data.loadtext !== "没有更多了") {
				this.data.pageNo++;
				this.loadMoreData();
			}
    },
    share(e){
    console.log(e)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }

})