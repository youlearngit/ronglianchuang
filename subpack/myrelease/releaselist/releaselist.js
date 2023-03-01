// pages/headLine/headLine.js
import utils from '../../../pages/utils';
//import {queryBillBusiness} from '../../../api/url'
import {myPostscreen} from '../../../api/url'

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
        bondclassXY:[
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
          // {"name":"债项评级",
          // "id":6}
        ],bondclassJR:[
          {"name":"发行人类型",
            "id":1},
          {"name":"债券名称",
          "id":2},
          {"name":"发行规模",
          "id":3},
          {"name":"利率区间",
          "id":4},
          {"name":"主体评级",
          "id":5},
          // {"name":"债项评级",
          // "id":6}
        ],bondclassLV:[
          {"name":"债券名称",
          "id":1},
          {"name":"发行规模",
          "id":2},
          {"name":"预测区间",
          "id":3},
          {"name":"票面利率",
          "id":4},
          {"name":"上市市场",
          "id":5},
          // {"name":"债项评级",
          // "id":6}
        ],wealth:[
          {"name":"方向",
          "id":1},
          {"name":"产品性质",
          "id":2},
          {"name":"是否含非标",
          "id":3},
          {"name":"利率",
          "id":4},
          {"name":"金额",
          "id":5},
          // {"name":"债项评级",
          // "id":6}
        ],foundation:[
          {"name":"产品名称",
          "id":1},
          {"name":"管理人",
          "id":2},
          {"name":"托管人",
          "id":3},
          {"name":"预期规模",
          "id":4},
          {"name":"运作方式",
          "id":5},
          // {"name":"债项评级",
          // "id":6}
        ],ABS:[
          {"name":"产品类型",
          "id":1},
          {"name":"发行规模",
          "id":2},
          {"name":"收益区间",
          "id":3},
          {"name":"挂牌机构",
          "id":4},
          {"name":"基础资产类型",
          "id":5},
        ],
        tradeBorrow:[
          {"name":"方向",
          "id":1},
          {"name":"期限",
          "id":2},
          {"name":"利率",
          "id":3},
          {"name":"金额",
          "id":4},
          {"name":"币种",
          "id":5},
        ],
        syndicatedLoan:[
          {"name":"信息机构发布",
          "id":1},
          {"name":"项目名称",
          "id":2},
          {"name":"牵头行名称",
          "id":3},
          {"name":"借款人名称",
          "id":4},
          {"name":"银团总额",
          "id":5},
        ],

        tradeReceipt:[
          {"name":"市场",
          "id":1},
          {"name":"方向",
          "id":2},
          {"name":"发行方式",
          "id":3},
          {"name":"利率",
          "id":4},
          {"name":"主体评级",
          "id":5},
        ],
        Isshow:false,
        billBusiness:[],
        pageNo:1,
        pageSize:10,
        loadtext: "没有更多了", //1,上拉加载更多，2，加载中...3,没有更多了,
        startTime:'',
        endTime:'',
        keywords:'',
        chooseIndex:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.removeStorageSync('select_screen');
      if(options.info){
        let info=JSON.parse(options.info)
        console.log(info)
        this.setData({
          startTime:info.startTime,
          endTime:info.endTime,
          keywords:info.keywords
        })
      }

      

      // wx.$on('select_screen', info => {
      //   console.log('select_screen', info);
      //   this.setData({
      //     startTime:info.startTime,
      //     endTime:info.endTime,
      //     keywords:info.keywords
      //   })
      //   this.data.pageNo=1
      //   this.data.billBusiness=[]
      //   this.loadMoreData()
      // });
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
      if(wx.getStorageSync('select_screen')){
        console.log(wx.getStorageSync('select_screen'))
        this.setData({
          startTime:wx.getStorageSync('select_screen').startTime,
          endTime:wx.getStorageSync('select_screen').endTime,
          keywords:wx.getStorageSync('select_screen').keywords
        })
      }
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
    console.log(e)
    let info=e.currentTarget.dataset.value

    if(info.keywords=='票据'){
      wx.navigateTo({
        url: '/subpack/myrelease/reldetail/releasedetail?id='+info.BB_ID
      })
    }

    if(info.keywords=='债券-信用债'){
      wx.navigateTo({
        url: '/subpack/myrelease/scbdetail/scbdetail?id='+info.CB_ID
      })
    }

    if(info.keywords=='债券-金融债'){
      wx.navigateTo({
        url: '/subpack/myrelease/qfbdetail/qfbdetail?id='+info.FB_ID
      })
    }

    if(info.keywords=='债券-利率债'){
      wx.navigateTo({
        url: '/subpack/myrelease/srbdetail/srbdetail?id='+info.IRB_ID
      })
    }

    if(info.keywords=='基金'){
      wx.navigateTo({
        url: '/subpack/myrelease/publicFunddetail/publicFunddetail?id='+info.PF_ID
      })
    }

   

    if(info.keywords=='理财'){
      wx.navigateTo({
        url: '/subpack/myrelease/tradeFinancedetail/tradeFinancedetail?id='+info.TF_ID
      })
    }

    if(info.keywords=='abs'){
      wx.navigateTo({
        url: '/subpack/myrelease/securitizedetail/securitizedetail?id='+info.ABS_ID
      })
    }

    if(info.keywords=='银团贷款'){
      wx.navigateTo({
        url: '/subpack/myrelease/syndicatedLoandetail/syndicatedLoandetail?id='+info.SL_ID
      })
    }

    if(info.keywords=='同业借款'){
      wx.navigateTo({
        url: '/subpack/myrelease/tradeBorrowdetail/tradeBorrowdetail?id='+info.TB_ID
      })
    }

    if(info.keywords=='同业存款'){
      wx.navigateTo({
        url: '/subpack/myrelease/tradeDepositdetail/tradeDepositdetail?id='+info.TD_ID
      })
    }

    if(info.keywords=='存单'){
      wx.navigateTo({
        url: '/subpack/myrelease/tradeReceiptdetail/tradeReceiptdetail?id='+info.TDR_ID
      })
    }
    // let info = e.currentTarget.dataset.value
    //   wx.navigateTo({
    //     url: '../reldetail/releasedetail?info='+JSON.stringify(info)
    //   })
    },
    screen:function(){

      wx.navigateTo({
        url: '/pages/screenwed/screenwed'
      })
    },
    isShowMore(e){
      console.log(e)
      this.setData({
        Isshow:!this.data.Isshow,
        chooseIndex:e.currentTarget.dataset.index
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
        keywords:this.data.keywords,
        OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID
      }
      console.log(data)

      myPostscreen(data).then(res => {
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
      this.data.pageNo=1;
      this.data.billBusiness=[]
      this.loadMoreData();
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
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
