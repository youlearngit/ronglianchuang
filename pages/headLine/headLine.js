// pages/headLine/headLine.js
import utils from '../utils';
import {queryHeadlineNewsList} from '../../api/url'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        preffixUrl: utils.preffixUrl(),
        headLine:[],
        pageNo:1,
        pageSize:10,
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
     
      let data = {
        NEXT_KEY:String(this.data.pageNo),
        PAGE_SIZE:String(this.data.pageSize)
      }
      queryHeadlineNewsList(data).then(res => {
        console.log(res);
        var list = res.LIST;
        console.log(list);
        for (var i=0;i<list.length;i++) {
          list[i].CREATE_TIME = list[i].CREATE_TIME.substring(0,10);
        }
        that.setData({
          headLine:[...this.data.headLine, ...list],
          loadtext: this.data.loadtext =list.length < 10 ? "没有更多了" : "上拉加载更多"
        })
      })
    },
    // 公告详情
  headlineDetail(e) {
    console.log(e)
    let data = e.currentTarget.dataset.value
    console.log(data);
    wx.navigateTo({
      url: '/pages/headlineDetail/headlineDetail?id=' + data.HN_ID
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