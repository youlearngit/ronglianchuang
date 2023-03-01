// pages/tradinghall/tradinghall.js
import utils from '../utils';
import {selectCreditBond,queryFinanceBond,selectRateBond} from '../../api/url'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl(),
    title:'债券业务',
    tabs: ["信用债", "金融债", "利率债"],
    currentIndex: 0,

    btype:'',//业务类型
    traded:'',//交易方向
    ptype:'',//票据类型
    syqx:'',//剩余期限
    sqlv:'',//首期利率
    sortamount:'',//金额
    fbrq:'desc',//发布日期
    list:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    detail:'文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字',
    show:false,
    theme: 'light',
    start_date:'开始时间',
    end_date:'结束时间',
    isSelect:1,
    disSelect:1,
    daySelect:1,
    keyvalue:'',
    Isshow:true,
    busitype:[
      {name:'转帖现',id:0},
      {name:'质押式回购',id:1},
      {name:'买断式回购',id:2}
    ],
    BB_BUSINESS_TYPE:'',
    datelist:[
      {name:'7天内',id:0},
      {name:'14天内',id:1},
      {name:'30天内',id:2}
    ],
    BB_RESIDUAL_MATURITY:"",
    BB_TRANSACTION:'',
    direction:[
      {name:'买入',id:0},
      {name:'卖出',id:1}
    ],
    billBusiness:[],
    pageNo:1,
    pageSize:20,
    loadtext: "没有更多了", //1,上拉加载更多，2，加载中...3,没有更多了,
    startTime:'开始时间',
    endTime:'结束时间',
    keywords:'',
    mini_rate:'',//利率区间
    high_rate:'',
    mini_amount:'',//金额区间
    high_amount:'',
    chooseIndex:0,
    org_name_sort:'',//来源
    
    BOND_PROJECT_GRADE_SORT:'',//债项评级
    
    BOND_NAME_SORT:'',//债券名称

    INTEREST_RATE_RANGE_SORT:'',//利率区间

    BOND_NAME_SORT:'',//债劵名称

    ISSUE_MODE_SORT:'',//发行方式

    INSUE_SCALE_SORT:'',//发行规模


    LISTED_MARKET_SORT:'',//上市市场

    FORECAST_RANGE_SORT:'',//预测区间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
    this.loadMoreData()


  },
  switchTab(e) {
    const index = e.target.dataset.index;

    console.log(index)
    this.setData({
      currentIndex: index,
      chooseIndex:index
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  //上市市场
  getLISTED_MARKET_SORT(){
    if(this.data.LISTED_MARKET_SORT
      =='' || this.data.LISTED_MARKET_SORT
      =='asc'){
      this.data.LISTED_MARKET_SORT
      ='desc'
    }else{
      this.data.LISTED_MARKET_SORT
      ='asc'
    }
    this.setData({

      LISTED_MARKET_SORT:this.data.LISTED_MARKET_SORT,

      FORECAST_RANGE_SORT:'',
      INSUE_SCALE_SORT:'',
      
      ISSUE_MODE_SORT:'',

      BOND_NAME_SORT:'',


      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      org_name_sort:'',


      btype:'',

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  //预测区间
  getFORECAST_RANGE_SORT(){
    if(this.data.FORECAST_RANGE_SORT
      =='' || this.data.FORECAST_RANGE_SORT
      =='asc'){
      this.data.FORECAST_RANGE_SORT
      ='desc'
    }else{
      this.data.FORECAST_RANGE_SORT
      ='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:this.data.FORECAST_RANGE_SORT,

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',
      
      ISSUE_MODE_SORT:'',

      BOND_NAME_SORT:'',


      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      org_name_sort:'',


      btype:'',

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  //发行规模
  getINSUE_SCALE_SORT(){
    if(this.data.INSUE_SCALE_SORT
      =='' || this.data.INSUE_SCALE_SORT
      =='asc'){
      this.data.INSUE_SCALE_SORT
      ='desc'
    }else{
      this.data.INSUE_SCALE_SORT
      ='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:this.data.INSUE_SCALE_SORT,
      
      ISSUE_MODE_SORT:'',

      BOND_NAME_SORT:'',


      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      org_name_sort:'',


      btype:'',

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  //发行方式
  getISSUE_MODE_SORT(){
    if(this.data.ISSUE_MODE_SORT
      =='' || this.data.ISSUE_MODE_SORT
      =='asc'){
      this.data.ISSUE_MODE_SORT
      ='desc'
    }else{
      this.data.ISSUE_MODE_SORT
      ='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:this.data.ISSUE_MODE_SORT,

      BOND_NAME_SORT:'',


      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      org_name_sort:'',


      btype:'',

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  //债劵名称
  getBOND_NAME_SORT(){
    if(this.data.BOND_NAME_SORT
      =='' || this.data.BOND_NAME_SORT
      =='asc'){
      this.data.BOND_NAME_SORT
      ='desc'
    }else{
      this.data.BOND_NAME_SORT
      ='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:this.data.BOND_NAME_SORT,


      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      org_name_sort:'',


      btype:'',

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  //利率区间
  getINTEREST_RATE_RANGE_SORT(){
    if(this.data.INTEREST_RATE_RANGE_SORT
      =='' || this.data.INTEREST_RATE_RANGE_SORT
      =='asc'){
      this.data.INTEREST_RATE_RANGE_SORT
      ='desc'
    }else{
      this.data.INTEREST_RATE_RANGE_SORT
      ='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:this.data.INTEREST_RATE_RANGE_SORT,


      BOND_PROJECT_GRADE_SORT:'',


      org_name_sort:'',


      btype:'',

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  //债项评级
  getBOND_PROJECT_GRADE_SORT(){
    if(this.data.BOND_PROJECT_GRADE_SORT
      =='' || this.data.BOND_PROJECT_GRADE_SORT
      =='asc'){
      this.data.BOND_PROJECT_GRADE_SORT
      ='desc'
    }else{
      this.data.BOND_PROJECT_GRADE_SORT
      ='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:this.data.BOND_PROJECT_GRADE_SORT,


      org_name_sort:'',


      btype:'',

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  get_org_name_sort(){
    if(this.data.org_name_sort=='' || this.data.org_name_sort=='asc'){
      this.data.org_name_sort='desc'
    }else{
      this.data.org_name_sort='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',

      org_name_sort:this.data.org_name_sort,


      btype:'',

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
  },
  sortbtype(){
    if(this.data.btype=='' || this.data.btype=='asc'){
      this.data.btype='desc'
    }else{
      this.data.btype='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',

      btype:this.data.btype,

      //btype:false,
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:'',
      org_name_sort:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()

  },
  sorttraded(){

    if(this.data.traded=='' || this.data.traded=='asc'){
      this.data.traded='desc'
    }else{
      this.data.traded='asc'
    }

    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',
      

      traded:this.data.traded,

      btype:'',
      //traded:false,
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:'',
      org_name_sort:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()

  },
  sortptype(){

    if(this.data.ptype=='' || this.data.ptype=='asc'){
      this.data.ptype='desc'
    }else{
      this.data.ptype='asc'
    }

    this.setData({
      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      ptype:this.data.ptype,

      btype:'',
      traded:'',
     // ptype:false,
      syqx:'',
      sqlv:'',
      sortamount:'',
      fbrq:'',
      org_name_sort:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()

  },
  sortsyqx(){

    if(this.data.syqx=='' || this.data.syqx=='asc'){
      this.data.syqx='desc'
    }else{
      this.data.syqx='asc'
    }

    this.setData({
      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      syqx:this.data.syqx,

      btype:'',
      traded:'',
      ptype:'',
      sqlv:'',
      sortamount:'',
      fbrq:'',
      org_name_sort:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()

  },
  sortsqlv(){

    if(this.data.sqlv=='' || this.data.sqlv=='asc'){
      this.data.sqlv='desc'
    }else{
      this.data.sqlv='asc'
    }

    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      sqlv:this.data.sqlv,

      btype:'',
      traded:'',
      ptype:'',
      syqx:'',
      //sqlv:false,
      sortamount:'',
      fbrq:'',
      org_name_sort:''
    })
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()

  },
  sortAamount(){

    if(this.data.sortamount=='' || this.data.sortamount=='asc'){
      this.data.sortamount='desc'
    }else{
      this.data.sortamount='asc'
    }

    this.setData({
      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      sortamount:this.data.sortamount,

      btype:'',
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
     // sortamount:false,
      fbrq:'',
      org_name_sort:''
    })


    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()

  },
  sortfbrq(){
    if(this.data.fbrq=='' || this.data.fbrq=='asc'){
      this.data.fbrq='desc'
    }else{
      this.data.fbrq='asc'
    }
    this.setData({

      FORECAST_RANGE_SORT:'',

      LISTED_MARKET_SORT:'',

      INSUE_SCALE_SORT:'',

      ISSUE_MODE_SORT:'',


      BOND_NAME_SORT:'',

      INTEREST_RATE_RANGE_SORT:'',


      BOND_PROJECT_GRADE_SORT:'',


      fbrq:this.data.fbrq,

      btype:'',
      traded:'',
      ptype:'',
      syqx:'',
      sqlv:'',
      sortamount:'',
      org_name_sort:''
    })
   

    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  

  /**
   * 生命周期函数--监听页面显示
   */
  billinfo:function(e){
    console.log(e)
    let info=e.currentTarget.dataset.value

   

    if(info.BB_ID){
      wx.navigateTo({
        url: '/subpack/myrelease/reldetailN/releasedetail?id='+info.BB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.CB_ID){
      wx.navigateTo({
        url: '/subpack/myrelease/scbdetailN/scbdetail?id='+info.CB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.FB_ID){
      wx.navigateTo({
        url: '/subpack/myrelease/qfbdetailN/qfbdetail?id='+info.FB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }

    if(info.IRB_ID){
      wx.navigateTo({
        url: '/subpack/myrelease/srbdetailN/srbdetail?id='+info.IRB_ID+'&OPEN_ID='+info.OPEN_ID
      })
    }
    // let info = e.currentTarget.dataset.value
    //   wx.navigateTo({
    //     url: '../reldetail/releasedetail?info='+JSON.stringify(info)
    //   })
    },
  
  goSearch(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/search/search',
    })
  //  if(this.data.keywords==''){
  //    wx.showToast({
  //      title: '请先输入关键字',
  //      icon:'none'
  //    })
  //    return
  //  }
  //   this.data.pageNo=1
  //   this.data.billBusiness=[]
  //   this.loadMoreData()
  
  },
  reset(){
   this.setData({
    startTime:'开始时间',
    endTime:'结束时间',
    keywords:'',//来源，关键字
    BB_BUSINESS_TYPE:'',//业务类型
    BB_RESIDUAL_MATURITY:'',//剩余期限"
    BB_TRANSACTION:'',//交易方向
    mini_rate:'',//最低利率
    high_rate:'',//最高利率
    mini_amount:'',//最低金额
    high_amount:'',//最高金额
    isSelect:1,
    disSelect:1,
    daySelect:1,
   })
  },
  confirm(){
    this.data.pageNo=1
    this.data.billBusiness=[]
    this.loadMoreData()
    this.setData({
      show:false
    })
  },
  inputChange: function(t) {
    console.log(t)
    this.setData({
        keywords: t.detail.value
    });
},
  loadMoreData:function(){
      let api=''
      let data={}
      if(this.data.chooseIndex==0){
        api=selectCreditBond

        data = {
          OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,
          pageNo:String(this.data.pageNo),
          pageSize:String(this.data.pageSize),
          startTime:this.data.startTime,
          endTime:this.data.endTime,
          keywords:this.data.keywords,
          BB_BUSINESS_TYPE:this.data.BB_BUSINESS_TYPE,
          BB_RESIDUAL_MATURITY:this.data.BB_RESIDUAL_MATURITY,
          BB_TRANSACTION:this.data.BB_TRANSACTION,
          mini_rate:this.data.mini_rate,
          high_rate:this.data.high_rate,
          mini_amount:this.data.mini_amount,
          high_amount:this.data.high_amount,
          PUBLISHER_NATURE_SOTR:this.data.btype,//发行人性质
          BOND_NAME_SORT:this.data.traded,//债券名称
          PUBLISH_SCALE_SORT:this.data.ptype,//发行规模
          PUBLISH_DEADLINE_SORT:this.data.syqx,//发行期限
          FORECAST_RATE_RANGE_SORT:this.data.sqlv,//预测利率区间
          MAIN_GRADE_SORT:this.data.sortamount,//主体评级
          fbrq:this.data.fbrq,
          org_name_sort:this.data.org_name_sort,

          BOND_PROJECT_GRADE_SORT:this.data.BOND_PROJECT_GRADE_SORT,//债项评级

        }
      }

      if(this.data.chooseIndex==1){
        api=queryFinanceBond

        data = {
          OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,

          pageNo:String(this.data.pageNo),
          pageSize:String(this.data.pageSize),
          startTime:this.data.startTime,
          endTime:this.data.endTime,
          keywords:this.data.keywords,
          BB_BUSINESS_TYPE:this.data.BB_BUSINESS_TYPE,
          BB_RESIDUAL_MATURITY:this.data.BB_RESIDUAL_MATURITY,
          BB_TRANSACTION:this.data.BB_TRANSACTION,
          mini_rate:this.data.mini_rate,
          high_rate:this.data.high_rate,
          mini_amount:this.data.mini_amount,
          high_amount:this.data.high_amount,
          BOND_TYPE_SORT:this.data.btype,//券种
          PUBLISHER_SORT:this.data.traded,//发行人
          MAIN_GRADE_SORT:this.data.ptype,//主体评级
          BOND_PROJECT_GRADE_SORT:this.data.syqx,//债项评级
          BOND_TERM_SORT:this.data.sqlv,//债券期限
          INTEREST_RATE_RANGE_SORT:this.data.sortamount,//利率区间
          fbrq:this.data.fbrq,
          org_name_sort:this.data.org_name_sort,

          BOND_PROJECT_GRADE_SORT:this.data.BOND_PROJECT_GRADE_SORT,//债项评级

          INTEREST_RATE_RANGE_SORT:this.data.INTEREST_RATE_RANGE_SORT,//利率区间

          BOND_NAME_SORT:this.data.BOND_NAME_SORT,//债劵名称

          ISSUE_MODE_SORT:this.data.ISSUE_MODE_SORT,//发行方式
          
          INSUE_SCALE_SORT:this.data.INSUE_SCALE_SORT,//发行规模
        }
      }

      if(this.data.chooseIndex==2){
        api=selectRateBond

        data = {
          OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,

          pageNo:String(this.data.pageNo),
          pageSize:String(this.data.pageSize),
          startTime:this.data.startTime,
          endTime:this.data.endTime,
          keywords:this.data.keywords,
          BB_BUSINESS_TYPE:this.data.BB_BUSINESS_TYPE,
          BB_RESIDUAL_MATURITY:this.data.BB_RESIDUAL_MATURITY,
          BB_TRANSACTION:this.data.BB_TRANSACTION,
          mini_rate:this.data.mini_rate,
          high_rate:this.data.high_rate,
          mini_amount:this.data.mini_amount,
          high_amount:this.data.high_amount,
          BOND_TYPE_SORT:this.data.btype,//券种
          BOND_NAME_SORT:this.data.traded,//债券名称
          BOND_CODE_SORT:this.data.ptype,//债券代码
          PUBLISH_DEADLINE_SORT:this.data.syqx,//发行期限
          PUBLISH_SCALE_SORT:this.data.sqlv,//发行规模
          LISTED_MARKET_SORT:this.data.LISTED_MARKET_SORT,//上市市场
          fbrq:this.data.fbrq,
          org_name_sort:this.data.org_name_sort,

          FORECAST_RANGE_SORT:this.data.FORECAST_RANGE_SORT,//预测区间

        }
      }
    
    console.log(data)
    //selectCreditBond,queryFinanceBond,selectRateBond
  
    api(data).then(res => {
      console.log(res);
      if(res.LIST){
        var list = res.LIST;
        console.log(list);
        this.setData({
          billBusiness:[...this.data.billBusiness, ...list],
          loadtext: this.data.loadtext =list.length < 10 ? "没有更多了" : "上拉加载更多"
        })
      }else{
        wx.showToast({
          title: '查询结果为空',
          icon:'none'
        })
        // this.setData({
        //   billBusiness:[]
        // })
      }
    }).catch(e=>{
      console.log(e)
      wx.showToast({
        title: e,
        icon:'none'
      })
    })
  },
  get_high_amount(e){
    this.setData({
      high_amount:e.detail.value
    })
  },
  get_min_amount(e){
    this.setData({
      mini_amount:e.detail.value
    })
  },
  get_min_rate(e){
    this.setData({
      mini_rate:e.detail.value
    })
  },
  get_high_rate(e){
    this.setData({
    high_rate:e.detail.value
    })
  },
  bindStartDate(e){
  console.log(e)
  this.setData({
    startTime:e.detail.value
  })
  },
  bindEndDate(e){
    console.log(e)
    this.setData({
      endTime:e.detail.value
    })
    },
  /**
   * 交易方向筛选
   */
  directionselect(e){
    var that = this;
    var value =e.currentTarget.dataset.id;
    var id =e.currentTarget.id;
      that.setData({
        disSelect: value,
        BB_TRANSACTION:this.data.direction[value].name
      })
  },
// 剩余期限选择
  dateselect(e){
    var that = this;
    var value =e.currentTarget.dataset.id;
    var id =e.currentTarget.id;
      that.setData({
        daySelect: value,
        BB_RESIDUAL_MATURITY:this.data.datelist[value].name
      })
  },
  /**
   * 业务类型筛选
   */
  Fbundselect(e) {
    console.log(e)
    var that = this;
        var value =e.currentTarget.dataset.id;
        var id =e.currentTarget.id;
          that.setData({
            isSelect: value,
            BB_BUSINESS_TYPE:this.data.busitype[value].name
          })
  },
  // 打开筛选条件
  screen:function(){

    this.setData({
      show:true
    })
  },
  searchhide:function(){
    this.setData({
      show:false
    })
  },

  searchvalue:function(e){
    console.log(e)
    var that = this;
    var value = e.detail.value;
    if( value == '融资'){
      that.setData({
        Isshow:true
      })
    }else{
      that.setData({
        Isshow:false,
        keywords:value
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  

  /**
   * 生命周期函数--监听页面卸载
   */
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh(); //这句也很重要
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.loadtext !== "没有更多了") {
      this.data.pageNo++;
      this.loadMoreData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
