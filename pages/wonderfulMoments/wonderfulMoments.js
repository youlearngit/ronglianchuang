// pages/headLine/headLine.js
import utils from '../utils';
import {queryWonderfulMoments} from '../../api/salary'

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:app.globalData.CDNURL,
        preffixUrl: utils.preffixUrl(),
        headLine:[],
        pageNo:1,
        pageSize:20,
        loadtext: "没有更多了", //1,上拉加载更多，2，加载中...3,没有更多了
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getNewsList()
    },
    getNewsList() {
      var that= this;
     // data:JSON.stringify({
    //   BT_SORT: "1",
    //   PAGE_SIZE: "20",
    //   NEXT_KEY: "1"
    // }),
      let data = {
        NEXT_KEY:String(this.data.pageNo),
        PAGE_SIZE:String(this.data.pageSize)
      }
      queryWonderfulMoments(data).then(res => {
        console.log(res);
        var list = res.LIST;
        console.log(list);
        for (var i=0;i<list.length;i++) {
          list[i].CREATE_TIME = list[i].CREATE_TIME.substring(0,10);
        }
        that.setData({
          headLine:[...this.data.headLine, ...list],
          loadtext: this.data.loadtext =list.length < 20 ? "没有更多了" : "上拉加载更多"
        })
      })
    },
    // 公告详情
  headlineDetail(e) {
    console.log(e)
    var id = e.currentTarget.dataset.value;
    var state =  e.currentTarget.dataset.state;
    var value =  e.currentTarget.dataset.mywww;

    // wx.navigateTo({
    //   url: '/pages/bannerDetail/bannerDetail?id='+id,
    // })

    if(state == 1){
      wx.navigateTo({
        url: '/pages/bannerDetail/bannerDetail?id='+id,
      })
    }else if(state == 2){
     
      wx.navigateTo({
        url: '/subpack/webhtml/web?web='+value,
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
      if (this.data.loadtext !== "没有更多了") {
				this.data.pageNo++;
				this.getNewsList();
			}
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})