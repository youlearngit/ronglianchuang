// pages/search/search.js
import utils from '../utils';
import {comprehensivesearch} from '../../api/url'

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:app.globalData.CDNURL,
        selected: 0,
        preffixUrl: utils.preffixUrl(),
        list: ['综合', '机构', '用户', '交易', '资讯'],
        // 搜索历史
        searchHistoryList: [],
        // 热门
        hotList: [],
        pageNo:1,
        pageSize:10,
        loadtext: "", //1,上拉加载更多，2，加载中...3,没有更多了,
        startTime:'',
        endTime:'',
        keywords:'',
        searchList:[],
        LIST_USER:[],//用户信息
        LIST_ORG:[],//机构名称
        LIST_TRANSACTION:[],//相关交易
        LIST_NEWS:[],//用户信息
        SEARCH_TYPE:0,
    },
    getkeywords(e){
      this.setData({
        keywords:e.detail.value
      })
      },
    search:function(){
      this.setData({
        pageNo:1,
        searchList:[],
        LIST_USER:[],
        LIST_NEWS:[],
        LIST_ORG:[],
        LIST_TRANSACTION:[],
      })
  
      this.loadMoreData()
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
        this.search()
    },
    // 删除
    onClearEvent: function (event) {

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
      this.setData({
        keywords:options.keywords
      })
      
      that.loadMoreData()
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
    goUserDetail(e){
      console.log(e)
      wx.navigateTo({
        url: '/pages/card/card?USER_ID='+e.currentTarget.dataset.item.USER_ID
      })
    },
    getdetail(e){
      var id = e.currentTarget.dataset.id;
      var thtml=e.currentTarget.dataset.url;
      console.log(id);
      wx.navigateTo({
        url: '/pages/instldetail/instdetail?id='+id,
      })
      // wx.navigateTo({
      //   url: '/pages/instldetail/instdetail?web='+thtml,
      // })
    },

    billinfo:function(e){
      console.log(e)
      let info=e.currentTarget.dataset.value
  
      if(info.fdCategory==1){
        wx.navigateTo({
          url: '/subpack/myrelease/reldetailN/releasedetail?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }
  
      if(info.fdCategory==2){
        wx.navigateTo({
          url: '/subpack/myrelease/scbdetailN/scbdetail?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }
  
      if(info.fdCategory==3){
        wx.navigateTo({
          url: '/subpack/myrelease/qfbdetailN/qfbdetail?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }
  
      if(info.fdCategory==4){
        wx.navigateTo({
          url: '/subpack/myrelease/srbdetailN/srbdetail?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }
    
      if(info.fdCategory==5){
        wx.navigateTo({
          url: '/subpack/myrelease/tradeFinancedetailN/tradeFinancedetail?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }

      if(info.fdCategory==6){
        wx.navigateTo({
          url: '/subpack/myrelease/publicFunddetailN/publicFunddetail?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }
      
      if(info.fdCategory==7){
        wx.navigateTo({
          url: '/subpack/myrelease/tradeReceiptdetailN/tradeReceiptdetailN?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }

      if(info.fdCategory==8){
        wx.navigateTo({
          url: '/subpack/myrelease/tradeBorrowdetailN/tradeBorrowdetailN?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }

      if(info.fdCategory==9){
        wx.navigateTo({
          url: '/subpack/myrelease/tradeDepositdetailN/tradeDepositdetailN?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }
  
      if(info.fdCategory==10){
        wx.navigateTo({
          url: '/subpack/myrelease/securitizedetailN/securitizedetail?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }
  
      if(info.fdCategory==11){
        wx.navigateTo({
          url: '/subpack/myrelease/syndicatedLoandetailN/syndicatedLoandetailN?id='+info.fdId+'&OPEN_ID='+info.OPEN_ID
        })
      }

      // let info = e.currentTarget.dataset.value
      //   wx.navigateTo({
      //     url: '../reldetail/releasedetail?info='+JSON.stringify(info)
      //   })
      },

    // 公告详情
  headlineDetail(e) {
    console.log(e)
    let data = e.currentTarget.dataset.value
    console.log(data);
    if(data.fdCategory=='研究专栏'){
      if(data.ENCLOSURE!==''){
        data.ENCLOSURE =  data.ENCLOSURE.split(';')
      }
      if(data.ENCLOSURE.length==1){
        wx.showLoading({
          title: '加载中,请稍后',
          mask:true
        })
        let url= this.data.url+data.ENCLOSURE[0]
        let that=this
        wx.downloadFile({
          url:url,
          success: function (res) {
            console.log(res)
            wx.openDocument({
              filePath: res.tempFilePath,
              fileType:'pdf',
    
              success: function (res) {
                console.log('打开PDF成功');
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
        // wx.navigateTo({
        //   url: '/subpack/webhtml/web?web='+url
        //  })
      }else{
        wx.navigateTo({
          url: '/pages/thedetail/thedetail?id=' + data.HN_ID
        })
      }
      
    }

    if(data.fdCategory=='头条资讯'){
      wx.navigateTo({
        url: '/pages/headlineDetail/headlineDetail?id=' + data.HN_ID
      })
    }

    if(data.fdCategory=='精彩瞬间'){
      wx.navigateTo({
        url: '/pages/bannerDetail/bannerDetail?id=' + data.HN_ID
      })
    }

    if(data.fdCategory=='机构风采'){
      wx.navigateTo({
        url: '/pages/instldetail/instdetail?id=' + data.HN_ID
      })
    }

   
   
  },
    addHistory(value) {
      if (!value) return;
      let _history = wx.getStorageSync('SEARCHHISTORY');
      if (!_history) {
        _history = [];
      }
      _history.unshift(value);
      let history = [...new Set(_history)];
      wx.setStorageSync('SEARCHHISTORY', history);
      console.log(history)
    },
    loadMoreData:function(){
       
     if(this.data.keywords.trim()){
      this.addHistory(this.data.keywords.trim());
     }
      let data = {
        OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,
        pageNo:String(this.data.pageNo),
        pageSize:String(this.data.pageSize),
        SEARCH_KEYWORDS:this.data.keywords,
        SEARCH_TYPE:String(this.data.selected)
      }

      console.log(data)
      comprehensivesearch(data).then(res => {
        console.log(res);
        if(res.STATUS==1){
          if(res.LIST_USER){
            this.setData({
              LIST_USER:[...this.data.LIST_USER,...res.LIST_USER]
            })
          }

          if(res.LIST_ORG){
            this.setData({
              LIST_ORG:[...this.data.LIST_ORG,...res.LIST_ORG]
            })
          }
          if(res.LIST_TRANSACTION){
            this.setData({
              LIST_TRANSACTION:[...this.data.LIST_TRANSACTION,...res.LIST_TRANSACTION]
            })
          }
          if(res.LIST_NEWS){
            this.setData({
              LIST_NEWS:[...this.data.LIST_NEWS,...res.LIST_NEWS]
            })
          }
          // var list = res.LIST;
          // console.log(list);
          // this.setData({
          //   searchList:[...this.data.searchList, ...list],
          //   loadtext: this.data.loadtext =list.length < 10 ? "没有更多了" : "上拉加载更多"
          // })
        }
       
      }).catch(e=>{
        wx.showToast({
          title: e,
          icon:'none'
        })
      
      })
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
      this.data.pageNo++;
      this.loadMoreData();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})