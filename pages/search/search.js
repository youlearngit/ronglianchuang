// pages/search/search.js
import utils from '../utils';
import {hotSearch} from '../../api/url'

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        history_list: [], // 历史记录表
        selected: 0,
        preffixUrl: utils.preffixUrl(),
        list: ['综合', '机构', '用户', '交易', '资讯'],
        // 搜索历史
        searchHistoryList: [{
            name: '江苏银行'
        }, {
            name: '债券信息'
        }, {
            name: '苏银金租'
        }, {
            name: '公众号'
        }],
        // 热门
        hotList: [{
            name: '体育场馆预666'
        }, {
            name: '停车泊位'
        }, {
            name: '厉害了我的国'
        }, {
            name: '蚂蚁借呗'
        }, {
            name: '最多五个字666'
        }],
        keywords:'',
    },
    getkeywords(e){
    this.setData({
      keywords:e.detail.value
    })
    },
    goToSearch(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/searchResult/searchResult?keywords='+e.currentTarget.dataset.id
    })
    },
    goSearch(){
    wx.navigateTo({
      url: '/pages/searchResult/searchResult',
    })
    },
    search:function(){
      wx.navigateTo({
        url: '/pages/searchResult/searchResult?keywords='+this.data.keywords
      })
    },
    selected: function (e) {
        console.log(e)
        let that = this
        let index = e.currentTarget.dataset.index
        console.log(index)
        if (index == 0) {
            that.setData({
                selected: 0
            })
        } else if (index == 1) {
            that.setData({
                selected: 1
            })
        } else if (index == 2) {
            that.setData({
                selected: 2
            })
        } else if (index == 3) {
            that.setData({
                selected: 3
            })
        } else {
            that.setData({
                selected: 4
            })
        }
    },
    // 删除
    onClearEvent: function (event) {
      let that=this
      wx.showModal({
        title: '提示',
        content: '确定删除历史记录？',
        success: res => {
          if (res.confirm) {
            that.clearAllHistory();
          }
        }
      });
    },
    // 清除历史记录
    clearAllHistory() {
      this.setData({
        history_list:[]
      })
      wx.clearStorageSync('SEARCHHISTORY');
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        /** 
         * 获取系统信息,系统宽高
         */
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
        this.getHotList()
    },

    getHotList() {
      var that= this;
      console.log(11222);
      // console.log(salary);
      let data = {}
      hotSearch(data).then(res => {
        console.log(res);
        var list = res.LIST;
        console.log(list);
        that.setData({
          hotList:list
        })
        console.log(res, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        // console.log(JSON.parse(res.loopListString));
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
    this.initHistory()
    },
    // 初始化历史记录列表
    initHistory() {
      let _data = wx.getStorageSync('SEARCHHISTORY');
      if (_data) {
        this.setData({
          history_list:_data
        })
        
      }
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