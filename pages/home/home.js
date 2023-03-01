// pages/home/home.js
import utils from '../utils';
import {queryWonderfulMoments} from '../../api/salary'
import {queryHeadlineNewsList,lastestquotation,queryRegisterInfo,queryAuditFlag,myPostscreen} from '../../api/url'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    preffixUrl: utils.preffixUrl(),
    url:app.globalData.CDNURL,
    left: 0.625,
    // 头条
    banner:[],
    headLine: [{
      id: 0,
      name: '标题文字标题文字标题文字标题文字标题文字标题文字'
    }, {
      id: 1,
      name: '111111'
    }, {
      id: 2,
      name: '222222'
    }, {
      id: 3,
      name: '666666'
    }],
    // 金融交易大厅1
    transactionOne: [{
        id: 0,
        title: '票据',
        img: 'bill.png'
      },
      {
        id: 5,
        title: '同业借款',
        img: 'borrow.png'
      },
      {
        id: 1,
        title: '债券',
        img: 'bond.png'
      },
      {
        id: 6,
        title: '同业存款',
        img: 'deposit.png'
      },
      {
        id: 2,
        title: '理财',
        img: 'manageMoney.png'
      },
      {
        id: 7,
        title: 'ABS',
        img: 'ABS.png'
      },
      {
        id: 3,
        title: '基金',
        img: 'capitalFund.png'
      },
      {
        id: 8,
        title: '银团贷款',
        img: 'bankConsortium.png'
      },
      {
        id: 4,
        title: '存单',
        img: 'depositReceipt.png'
      },
      {
        id: 9,
        title: '资产托管',
        img: 'assetCollocation.png'
      },
      {
        id: 11,
        title: '信托标债',
        img: 'auction.png'
      },
      {
        id: 10,
        title: '信托非标',
        img: 'nonstandard.png'
      }
    ],
    // 市场研究
    marketStudy: [{
      name: "宏观",
      color: '#005CD8',
      bgcolor: '#EDF4FF'
    }, {
      name: "固收",
      color: '#C38000',
      bgcolor: '#FFF9E5'
    }, {
      name: "股市",
      color: '#CB2C02',
      bgcolor: '#FFF2F2'
    }, {
      name: "商品",
      color: '#181ABC',
      bgcolor: '#F6F2FF'
    }, {
      name: "外汇",
      color: '#005CD8',
      bgcolor: '#EAF2FF'
    }],
    lastestList:[],
    searchTop:''
  },
  // 搜索框
  toSearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //金刚区滑动事件
  scroll(event) {
    let scrollLeft = event.detail.scrollLeft + 375;
    let scrllWidth = event.detail.scrollWidth;
    let left;
    if (scrollLeft < 395) {
      left = `65.625%`
    } else {
      left = `${(scrollLeft) / scrllWidth * 100}%`
    }
    this.setData({
      left, //模拟滑块滑动 根据css设置 距离左边的百分比
    })
  },

  totrading:function(){
    wx.navigateTo({
      url: '/pages/registration/registration',
    })
    // wx.navigateTo({
    //   url: '/pages/tradinghall/tradinghall',
    // })
  },
  /**
   * 跳转banner图详情页面
   */
  bannerDetail:function(e){
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
  // 机构风采
  toinstItutional() {
    wx.navigateTo({
      url: '/pages/instItutional/instItutional',
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
  // 全部公告
  toheadLine() {
    wx.navigateTo({
      url: '/pages/headLine/headLine',
    })
  },
  // 交易大厅债券跳转
  transa: function (e) {
    console.log(e.currentTarget.dataset.id);

    if(wx.getStorageSync('wxlogininfo').REGISTER_STATUS==='0'){
      wx.navigateTo({
        url: '/pages/registration/registration',
      })
      return
    }
    if(wx.getStorageSync('wxlogininfo').AUDIT_FLAG==='0'){
      wx.showToast({
        title: '您注册的信息正在审核中,请耐心等待',
        icon:'none'
      })
      return
    }

    if (e.currentTarget.dataset.id === 0) {
      wx.navigateTo({
        url: '/pages/tradinghall/tradinghall',
      })
      // wx.navigateTo({
      //   url: '/pages/note/note',
      // })
    }
    if (e.currentTarget.dataset.id === 1) {
      wx.navigateTo({
        url: '/pages/debenture/debenture',
      })
      // wx.navigateTo({
      //   url: '/pages/bond/bond',
      // })
    }

    if (e.currentTarget.dataset.id === 7) {
      wx.navigateTo({
        url: '/pages/securitizehall/securitizehall',
      })
      // wx.navigateTo({
      //   url: '/pages/bond/bond',
      // })
    }

    if (e.currentTarget.dataset.id === 2) {
      wx.navigateTo({
        url: '/pages/tradeFinancehall/tradeFinancehall',
      })
      // wx.navigateTo({
      //   url: '/pages/bond/bond',
      // })
    }
    if (e.currentTarget.dataset.id === 3) {
      wx.navigateTo({
        url: '/pages/publicFundhall/publicFundhall',
      })
    }

    if (e.currentTarget.dataset.id === 4) {
      wx.navigateTo({
        url: '/pages/tradeReceipthall/tradeReceipthall',
      })
    }

    if (e.currentTarget.dataset.id === 5) {
      wx.navigateTo({
        url: '/pages/tradeBorrowhall/tradeBorrowhall',
      })
    }

    if (e.currentTarget.dataset.id === 6) {
      wx.navigateTo({
        url: '/pages/tradeDeposithall/tradeDeposithall'
      })
    }

    if (e.currentTarget.dataset.id === 8) {
      wx.navigateTo({
        url: '/pages/syndicatedLoanhall/syndicatedLoanhall',
      })
    }

    if (e.currentTarget.dataset.id === 9) {
      wx.navigateTo({
        url: '/pages/custodyhall/custodyhall',
      })
    }
    if ( e.currentTarget.dataset.id == 10 || e.currentTarget.dataset.id == 11) {
      wx.showToast({
        title: '敬请期待',
        icon: 'none'
      })
    }
  
    // if (e.currentTarget.dataset.id !== 0 && e.currentTarget.dataset.id !== 1&& e.currentTarget.dataset.id !== 7&& e.currentTarget.dataset.id !== 2&& e.currentTarget.dataset.id !== 3) {
    //   wx.showToast({
    //     title: '敬请期待',
    //     icon: 'none'
    //   })
    // }
    if (e.currentTarget.dataset.id === 1) {
      // wx.navigateTo({
      //   url: '/pages/releasedeal/releasedeal',
      // })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getMenuButtonBoundingClientRect())
    // var data = 1
    var that = this;
    this.getList()
    this.getNewsList()
    if(wx.getStorageSync('wxlogininfo').OPEN_ID){
      this.getqueryAuditFlag()  
      this.getqueryRegisterInfo()
      this.getLastestList()
    }
    this.setData({
      searchTop:wx.getMenuButtonBoundingClientRect().top
    })
  },
  getqueryAuditFlag(){
    queryAuditFlag({OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID}).then(res => {
      console.log(res);
      if(res.STATUS==1){
        let wxlogininfo = wx.getStorageSync('wxlogininfo')
        wxlogininfo.AUDIT_FLAG=res.AUDIT_FLAG
        wx.setStorageSync('wxlogininfo', wxlogininfo);
        this.setData({
          userInfo:res
        })
      }
     
    }).catch(e=>{
      console.log(e)
    })
  },
  getqueryRegisterInfo(){

    console.log(wx.getStorageSync('wxlogininfo'))
    queryRegisterInfo({OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID}).then(res => {
      console.log(res);
      if(res.STATUS==1){
       wx.setStorageSync('userInfo', res);

        this.setData({
          userInfo:res
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
  mechanism(){
    var that= this;
    console.log(11222);
    // console.log(salary);
    let data = {}
    queryResearchCategoryList(data).then(res => {
      console.log(res);
      if(res.STATUS == 1){
        if(res.LIST.length > 0){
          this.data.marketStudy[0].RC_TYPE=res.res.LIST[0].res.LIST.RC_TYPE
          this.data.marketStudy[1].RC_TYPE=res.res.LIST[1].res.LIST.RC_TYPE

        }
        that.setData({
          marketStudy:res.LIST
        })
      }

    }).catch(e=>{
      console.log(e)
    })
  },

  // 精彩瞬间接口方法
  getLastestList() {
    var that= this;
    console.log(11222);
    // console.log(salary);
    let data = {
      pageNo:String(1),
      pageSize:String(5),
      OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,
      LatestQuotation:"true"
    }
    myPostscreen(data).then(res => {
      console.log(res);
      var list = res.LIST;
      console.log(list);
      for (var i=0;i<list.length;i++) {
        list[i].CREATE_TIME = list[i].CREATE_TIME.substring(0,10);
      }
      that.setData({
        lastestList:list
      })
      console.log(res, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      // console.log(JSON.parse(res.loopListString));
    })
  },

  navToDetail(e){
    console.log(e)
    if(!wx.getStorageSync('wxlogininfo')){
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    if(wx.getStorageSync('wxlogininfo').REGISTER_STATUS==='0'){
      wx.navigateTo({
        url: '/pages/registration/registration',
      })
      return
    }
    if(wx.getStorageSync('wxlogininfo').AUDIT_FLAG==='0'){
      wx.showToast({
        title: '您注册的信息正在审核中,请耐心等待',
        icon:'none'
      })
      return
    }
    let info=e.currentTarget.dataset.item

    if(info.keywords=='票据'){
      wx.navigateTo({
        url: '/subpack/myrelease/reldetailN/releasedetail?id='+info.BB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }


    if(info.keywords=='债券-信用债'){
      wx.navigateTo({
        url: '/subpack/myrelease/scbdetailN/scbdetail?id='+info.CB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.keywords=='债券-金融债'){
      wx.navigateTo({
        url: '/subpack/myrelease/qfbdetailN/qfbdetail?id='+info.FB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.keywords=='债券-利率债'){
      wx.navigateTo({
        url: '/subpack/myrelease/srbdetailN/srbdetail?id='+info.IRB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.keywords=='基金'){
      wx.navigateTo({
        url: '/subpack/myrelease/publicFunddetailN/publicFunddetail?id='+info.PF_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

   

    if(info.keywords=='理财'){
      wx.navigateTo({
        url: '/subpack/myrelease/tradeFinancedetailN/tradeFinancedetail?id='+info.TF_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.keywords=='abs'){
      wx.navigateTo({
        url: '/subpack/myrelease/securitizedetailN/securitizedetail?id='+info.ABS_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.keywords=='银团贷款'){
      wx.navigateTo({
        url: '/subpack/myrelease/syndicatedLoandetailN/syndicatedLoandetailN?id='+info.SL_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.keywords=='同业借款'){
      wx.navigateTo({
        url: '/subpack/myrelease/tradeBorrowdetailN/tradeBorrowdetailN?id='+info.TB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.keywords=='同业存款'){
      wx.navigateTo({
        url: '/subpack/myrelease/tradeDepositdetailN/tradeDepositdetailN?id='+info.TD_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.keywords=='存单'){
      wx.navigateTo({
        url: '/subpack/myrelease/tradeReceiptdetailN/tradeReceiptdetailN?id='+info.TDR_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }
   
  },

  getNewsList() {
    var that= this;
   
    let data = {}
    queryHeadlineNewsList(data).then(res => {
      console.log(res);
      var list = res.LIST;
      console.log(list);
      that.setData({
        headLine:list
      })
    })
  },
  moreWonderfull(){
   wx.navigateTo({
     url: '/pages/wonderfulMoments/wonderfulMoments',
   })
  },
  // 精彩瞬间接口方法
  getList() {
    var that= this;
    console.log(11222);
    // console.log(salary);
    let data = {
      NEXT_KEY:String(1),
      PAGE_SIZE:String(20)
    }
    queryWonderfulMoments(data).then(res => {
      console.log(res);
      var list = res.LIST;
      console.log(list);
      that.setData({
        banner:list
      })
      console.log(res, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      // console.log(JSON.parse(res.loopListString));
    })
  },
  // 机构风采
  to(e) {
    let to = e.currentTarget.dataset.to; //点击的
    console.log(e.currentTarget.dataset.to);
    wx.navigateTo({
      url: '/pages/instItutional/instItutional?to=' + to,
    })
  },
  toThecolumnMore(){
wx.navigateTo({
      url: '/pages/thecolumn/thecolumn',
    })
  },
  // 市场研究
  toThecolumn(e) {
    console.log(e)
    // wx.navigateTo({
    //   url: '/pages/registration/registration',
    // })
    wx.navigateTo({
      url: '/pages/thecolumn/thecolumn?index='+e.target.dataset.index
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
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
    if(wx.getStorageSync('wxlogininfo').OPEN_ID){
      this.getLastestList()
      this.getqueryRegisterInfo()
    }
    this.getList()
    this.getNewsList()
   
    wx.stopPullDownRefresh(); //这句也很重要
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
