// json中引入了时间控件
//票据业务详情详情修改
import utils from '../utils';
import {addOrUpdateCreditBond,addOrUpdateRateBond,addOrUpdateFinanceBond,rlcuploadFile,sensitiveWord,selectRlcUserInfoList,queryWhiteOrgList} from '../../api/url'

// var app = getApp();
//var util = require('../../utils/util.js');
//const app = getApp();
const app = getApp()

const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = 2020; i <= date.getFullYear() + 20; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
Page({

  /**
   * 页面的初始数据
   */

  data: {
    url:app.globalData.CDNURL,
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [1, 0, 0, 0, 0],
    choose_year: '',
    preffixUrl: utils.preffixUrl(),
    currentDate: utils.getNowDate(new Date()), // 日期筛选
    fundDate: utils.getNowDate(new Date()), // 日期筛选
    fbundDate: utils.getNowDate(new Date()), // 日期筛选
    funudDate: utils.getNowDate(new Date()), // 日期筛选
    futitDate: utils.getNowDate(new Date()), // 日期筛选
    entube: utils.getNowDate(new Date()), // 日期筛选
    // fundend:'',
    entub: false,
    fontentub: false,
    fbundentub: false,
    enbutub: false,
    entittub:false,
    wentube:false,
    myminibolk:false,
    current: 0, // 字数限制
    max: 20, // 字数限制
    // 以下是请选择单选
    tabs: ["信用债", "金融债", "利率债"],
    currentIndex: 0,
    arr: ["超短期融资券", "短期融资券", "资产支持票据", "项目收益票据", "中期票据", "定向工具", "其他"],
    arr2: ["银行间", "交易所"],
    arr3: ["金融机构", "国企", "民企", "央企", "自定义"],
    arr4: ["是", "否"],
    arr5: ["AAA", "AA+", "AA", "AA-", "A+", "A", "A-", "BBB+", "BBB及以下", "无评级"],
    arr6: ["AAA", "AA+", "AA", "AA-", "A+", "A", "A-1", "A-2", "A-3"],
    arr7: ["大公国际", "中诚信", "上海新世纪", "联合资信", "东方金城", "其他"],
    arr8: ["公开", "定向机构", "定向个人"],
    arr9: ["银行", "非银"],
    arr10: ["一级市场", "二级市场"],
    arr11: ["普通金融债", "小微金融债", "三农金融债", "绿色金融债", "二级资本债", "自定义"],
    arr12: ["AAA", "AA+", "AA", "AA-", "A+", "A", "A-", "BBB+", "BBB及以下"],
    arr13: ["AAA", "AA+", "AA", "AA-", "A+", "A", "A-", "BBB+", "BBB及以下"],
    arr14: ["簿记建档", "公开招标"],
    arr15: ["固定", "浮动"],
    arr16: ["按年付息", "按季付息", "按月付息"],
    arr17: ["银行间", "交易所"],
    arr18: ["国债", "国开债", "农发债", "口行债", "央票", "地方政府债"],
    arr19:["一级市场","二级市场"],
    arr20:["前5分钟","前10分钟","前15分钟","前20分钟"],
    arr21:["荷兰式","混合式","美式"],
    arr22: ["D", "M", "Y"],

    selectedItems: {
      item1: -1,
      item2: -1,
      item3: -1,
      item4: -1,
      item5: -1,
      item6: -1,
      item7: -1,
      item8: -1,
      item9: -1,
      item10: -1,
      item11: -1,
      item12: -1,
      item13: -1,
      item14: -1,
      item15: -1,
      item16: -1,
      item17: -1,
      item18: -1,
      item19: -1,
      item20:-1,
      item21:-1,
      item22:0,
    },
    images: [], //存放信用债图片
    imaged:[],//存放金融债页面图片
    imgeubd:[],//存放利率债图片
    files:[],//附件
    firstvalue:'',//输入的数字
    tabled:'',//输入的数字
    creditBond:{
      PUBLISHER:'',
      BOND_NAME:'',
      BOND_CODE:'',
      PUBLISH_SCALE:'',
      REMARKS:'',
      rate_start:'',
      rate_end:'',
      PUBLISH_DEADLINE:'',
      PUBLISHER_DATE:'',
      PAY_DATE:'',
      LISTED_DATE:'',


      //利率债
      BID_TIME:'',//招标时间
      START_RATE_DATE:'',//起息日,
      PAR_RATE:'',
      POUNDAGE:'',
      PURCHASE_ADVICE:'',


      //金融债
      PUBLISHER:'',//发行人
      INTEREST_RATE_RANGE:'',//利率区间
    },
    mini_rate:'',//最低利率
    high_rate:'',//最高利率

    fxqxday:'',//发行期限
    zjqxday:'',

    CB_ID:'',//信用债编辑
    FB_ID:'',//金融债
    IRB_ID:'',//利率债
    fileName:'',
    BB_ENCLOSURE:[],
    BB_ENCLOSURE_file:'',
    PUBLISHER_NATURE:'',//发行人性质-自定义
    ticketCustom:'',//券种-自定义
    sensitiveRemark:false,

    sensitivePUBLISHER:false,

    sensitive_PUBLISHER_NATURE:false,
    
    sensitive_BOND_NAME:false,

    sensitive_BOND_CODE:false,

    sensitive_ticketCustom:false,

    sensitive_PURCHASE_ADVICE:false,

    orgNameList:[],

    personaldialog:false,
    infoList:[],
    dialog:false,
    pageNo:1,
    pageSize:10,
    choose_obj_name:'',
    PUBLISH_OBJ_CONTENT:[],
    pageWhiteNo:1,
    all_choose_rlc_status:false,
    all_choose_org_status:false
},

all_choose_org(){
  this.data.all_choose_org_status=!this.data.all_choose_org_status
  if(this.data.all_choose_org_status){
    this.data.orgNameList.forEach(item=>{
      item.ischecked=true
    })
  }else{
    this.data.orgNameList.forEach(item=>{
      item.ischecked=false
    })
  }
  this.setData({
    orgNameList:this.data.orgNameList,
    all_choose_org_status:this.data.all_choose_org_status
  })
},

all_choose_rlc(){
  this.data.all_choose_rlc_status=!this.data.all_choose_rlc_status
  if(this.data.all_choose_rlc_status){
    this.data.infoList.forEach(item=>{
      item.ischecked=true
    })
  }else{
    this.data.infoList.forEach(item=>{
      item.ischecked=false
    })
  }
  this.setData({
    infoList:this.data.infoList,
    all_choose_rlc_status:this.data.all_choose_rlc_status
  })
},
go_search_org(e){
  this.data.keywords=e.detail.value,
  this.data.pageWhiteNo=1;
  this.data.orgNameList=[]
  this.getQueryWhiteOrgList()
},

go_search_rlc(e){
  console.log(e)
  this.data.keywords=e.detail.value,
  this.data.pageNo=1;
  this.data.infoList=[]
  this.getSelectRlcUserInfoList()
 },


  moreQueryWhiteOrgList(){
    this.data.pageWhiteNo++;
    this.getQueryWhiteOrgList();
  },

  getQueryWhiteOrgList(){
    queryWhiteOrgList({NEXT_KEY:String(this.data.pageWhiteNo),
      PAGE_SIZE:String(this.data.pageSize),ORG_NAME:this.data.keywords}).then(res => {
      console.log(res);
      if(this.data.orgNameList.length<res.TOTAL_NUM){
        res.LIST.forEach(item=>{
          item.ischecked=false
        })
        this.setData({
          orgNameList:[...this.data.orgNameList,...res.LIST]
        })
      }else{
        wx.showToast({
          title:'没有更多了',
          icon:'none'
        })
      }
     
    }).catch(e=>{
      console.log(e)
    })
  },

  moreRlcUser(){
    this.data.pageNo++;
    this.getSelectRlcUserInfoList();
  },
  getSelectRlcUserInfoList(){
    selectRlcUserInfoList({NEXT_KEY:String(this.data.pageNo),
      PAGE_SIZE:String(this.data.pageSize),RLC_USER_NAME:this.data.keywords}).then(res => {
      console.log(res);
      if(this.data.infoList.length<res.TOTAL_NUM){
        res.LIST.forEach(item=>{
          item.ischecked=false
        })
        this.setData({
          infoList:[...this.data.infoList,...res.LIST]
        })
      }else{
        wx.showToast({
          title:'没有更多了',
          icon:'none'
        })
      }
     
    }).catch(e=>{
      console.log(e)
    })
  },
  check_rlc_name(){
    let PUBLISH_OBJ_CONTENT=[]
    let choose_obj_name=[]
    this.data.infoList.forEach((item,index)=>{
      if(item.ischecked){
       PUBLISH_OBJ_CONTENT.push(item.OPEN_ID),
       choose_obj_name.push(item.RLC_USER_NAME)
      }
    })
    this.setData({
     PUBLISH_OBJ_CONTENT:PUBLISH_OBJ_CONTENT,
     choose_obj_name:choose_obj_name,
     personaldialog:false
    })
  },
  check_org_name(){
   let PUBLISH_OBJ_CONTENT=[]
   let choose_obj_name=[]
   this.data.orgNameList.forEach((item,index)=>{
     if(item.ischecked){
      PUBLISH_OBJ_CONTENT.push(item.ORG_NAME)
      choose_obj_name.push(item.ORG_NAME)
     }
   })
   this.setData({
    PUBLISH_OBJ_CONTENT:PUBLISH_OBJ_CONTENT,
    choose_obj_name:choose_obj_name,
    dialog:false
   })
  },
  choose_rlc(e){
    this.data.infoList[e.currentTarget.dataset.index].ischecked=!this.data.infoList[e.currentTarget.dataset.index].ischecked
    this.setData({
      infoList:this.data.infoList
    })
  },
  check_org(e){
   console.log(e)
   this.data.orgNameList[e.currentTarget.dataset.index].ischecked=!this.data.orgNameList[e.currentTarget.dataset.index].ischecked
   this.setData({
    orgNameList:this.data.orgNameList
   })
  },
  personaldialogclose(){
    this.setData({
      personaldialog:false
    })
  },
  openPersonalDialog(){
    this.setData({
      personaldialog:true
    })
  },
  openDialog(){
    this.setData({
      dialog:true
    })
  },
  
  close:function(){
    this.setData({
      dialog:false
    })
  },

  uploadFile(){
    console.log(rlcuploadFile)
    this.wxChooseFile({
      url: rlcuploadFile,
        // 服务端接收附件的key
        name: 'myfile',
        //根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
        header: {
          'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsIn',
          'uid': '27682',
          'client': 'app',
        },
    })
  },

  wxChooseFile({maxSize = 10,...param}) {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: ({tempFiles}) => {
     
        let file = tempFiles[0];
        
        console.log(file)
        this.setData({
          fileName:file.name
        })

        if(file.size > (1024*1024 * Math.abs(maxSize))) {
          wx.showToast({
            title:`单个文件请勿超过${maxSize}M,请重新上传`,
            icon: 'none'
          });
          return this.errorHandler('文件选择失败',this.upErr);
        }
        console.log(11111111)

        console.log(file)

        let base64 = wx.getFileSystemManager().readFileSync(file.path, "base64")
       
        console.log(base64)

        console.log(file.name.split('.')[1])
        wx.showLoading({
          title: '上传中',
          icon:'none'
        })
        rlcuploadFile({myfile:base64,fileType:file.name.split('.')[1]}).then(res => {
         
          console.log(res);

        if(res.STATUS==1){
          this.data.BB_ENCLOSURE_file=res.LIST[0].relPath
          wx.hideLoading()
        }
        }).catch(e=>{
          console.log(e)
          wx.showToast({
            title: e,
            icon:'none'
          })
        })
       
        // var reader = new FileReader();
        // // 将文件加载进入
        // reader.readAsDataURL(file.path);
        // reader.onload = function (e) { 
        //     // 转换完成输出该文件base64编码
        //     console.log(e);

        //     this.data.postUploadFile=e
        // }

        
        // wx.uploadFile({

        //   url: rlcuploadFile,
    
        //   filePath: file.path,
    
        //   name: 'file',
         
    
        //   formData: {
    
        //     'user': 'test'
    
        //   },
    
        //   success (res){
        //     console.log(res)
    
        //     const data = res.data
    
        //     //do something
    
        //   },
        //   fail(res){
        //    console.log(res)
        //   }
    
        // })
      //	this.handleWXUpload(param,file);
      },
      fail: () => this.errorHandler('文件选择失败',this.upErr)
    })
  },

  getzjqxday(e){
    this.setData({
      zjqxday:e.detail.value
    })
   },

  getfxqxday(e){
   this.setData({
     fxqxday:e.detail.value
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
  getPUBLISHER(e){
    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitivePUBLISHER:true
        })
      }else{
        this.setData({
          sensitivePUBLISHER:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })
    this.setData({
      'creditBond.PUBLISHER':e.detail.value
    })
  },
  getAdvice(e){

    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitive_PURCHASE_ADVICE:true
        })
      }else{
        this.setData({
          sensitive_PURCHASE_ADVICE:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })

    this.setData({
      'creditBond.PURCHASE_ADVICE':e.detail.value
    })
  },
  getPoundage(e){
    this.setData({
      'creditBond.POUNDAGE':e.detail.value
    })
  },
  getRarRate(e){
    this.setData({
      'creditBond.PAR_RATE':e.detail.value
    })
  },
  bindStartRateDate(e){
    this.setData({
      'creditBond.START_RATE_DATE':e.detail.value
    })
  },
  getListedDate(e){
    this.setData({
      'creditBond.LISTED_DATE':e.detail.value
    })
  },
  getPayDate(e){
    this.setData({
      'creditBond.PAY_DATE':e.detail.value
    })
  },
  bindPublisher(e){
    console.log(e)
    this.setData({
      'creditBond.PUBLISHER_DATE':e.detail.value
    })
    console.log(this.data.creditBond.PUBLISHER_DATE)
  },
  bindDeadLine(e){
  console.log(e)
  this.setData({
    'creditBond.PUBLISH_DEADLINE':e.detail.value
  })
  },
  getrateend(e){
    this.setData({
      'creditBond.rate_end':e.detail.value
    })
  },
  getratestart(e){
    this.setData({
      'creditBond.rate_start':e.detail.value
    })
  },
  getremarks(e){

    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitiveRemark:true
        })
      }else{
        this.setData({
          sensitiveRemark:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })

    this.setData({
      'creditBond.REMARKS':e.detail.value,
      current:e.detail.value.length
    })
  },
  getpublishscale(e){
    this.setData({
      'creditBond.PUBLISH_SCALE':e.detail.value
    })
  },
  getpublisher(e){
     this.setData({
       'creditBond.PUBLISHER':e.detail.value
     })
  },
  getitem3Custom(e){
    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitive_PUBLISHER_NATURE:true
        })
      }else{
        this.setData({
          sensitive_PUBLISHER_NATURE:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })

    this.setData({
      PUBLISHER_NATURE:e.detail.value
    })
  },
  getitem11Custom(e){

    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitive_ticketCustom:true
        })
      }else{
        this.setData({
          sensitive_ticketCustom:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })

    this.setData({
      ticketCustom:e.detail.value
    })
  },
  getbondname(e){
    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitive_BOND_NAME:true
        })
      }else{
        this.setData({
          sensitive_BOND_NAME:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })
    this.setData({
      'creditBond.BOND_NAME':e.detail.value
    })
  },
  getbondcode(e){

    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitive_BOND_CODE:true
        })
      }else{
        this.setData({
          sensitive_BOND_CODE:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })

    this.setData({
      'creditBond.BOND_CODE':e.detail.value
    })
  },
  // 日期筛选
  bindDateChange: function (e) {
    this.setData({
      currentDate: e.detail.value
    })
  },
  optionselect(e) {
    this.setData({
      entub: true
    })
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
    this.setData({
      fbundentub: true
    })
  },
  DateFund: function (e) {
    this.setData({
      entube: e.detail.value
    })
  },
  dateselect(e) {
    this.setData({
      enbutub: true
    })
  },
  DenubFund: function (e) {
    this.setData({
      futitDate: e.detail.value
    })
  },
  denubelect(e) {
    this.setData({
      entittub: true
    })
  },

  // 以上是日期筛选
  //  tab切换逻辑
  switchTab(e) {
    const index = e.target.dataset.index;
    this.setData({
      currentIndex: index
    })
  },
  // 文本框字数限制
  limit: function (e) {
    var value = e.detail.value;
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current: length
    });
  },
  choose(e) { //单选
    let item = "selectedItems.item" + e.currentTarget.dataset.item;
    this.setData({
      [item]: parseInt(e.detail.value, 10),
     
    });
    if(e.currentTarget.dataset.item==8){
      this.setData({
        choose_obj_name:'',
        PUBLISH_OBJ_CONTENT:[],
      })
    }
    
    if(e.currentTarget.dataset.item==8&&this.data.selectedItems.item8==1){
      this.setData({
        dialog:true,
        choose_obj_name:'',
        PUBLISH_OBJ_CONTENT:[],
      })
    }

    if(e.currentTarget.dataset.item==8&&this.data.selectedItems.item8==2){
      this.setData({
        personaldialog:true,
        choose_obj_name:'',
        PUBLISH_OBJ_CONTENT:[],
      })
    }
    console.log(this.data.selectedItems);
  },
  // 输入数字
  hendllInput(e) {
    let tabled = this.validateNumber(e.detail.value)
    this.setData({
      tabled:tabled
    })
  },
  validateNumber(val) {
    return val.replace(/\D/g, '')
  },
  // 信用债上传图片
  //点击添加按钮选择图片

  chooseImage: function (e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        let tempFilePaths = res.tempFilePaths

        
        for (var i = 0; i < tempFilePaths.length; i++) {
          let base64 = wx.getFileSystemManager().readFileSync(tempFilePaths[i], "base64") 
          console.log(base64)

          rlcuploadFile({myfile:base64,fileType:tempFilePaths[i].split('.')[1]}).then(res => {
           
            console.log(res);
            if(res.STATUS==1){
              this.data.BB_ENCLOSURE.push(res.LIST[0].relPath)
              this.setData({
                BB_ENCLOSURE:this.data.BB_ENCLOSURE
              })
            }
          
          }).catch(e=>{
            console.log(e)
            wx.showToast({
              title: e,
              icon:'none'
            })
          })
        }
          const images = this.data.images.concat(res.tempFilePaths)
          this.setData({
              images: images
          })
      }
    })
  },
  // 删除图片
  removeImage(e) {
    console.log(e);
    const idx = e.target.dataset.idx;
    this.data.BB_ENCLOSURE.splice(idx, 1);
    var del_image = this.data.BB_ENCLOSURE;
    this.setData({
      BB_ENCLOSURE: del_image
    })
  },
  // 查看大图
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = []
    this.data.BB_ENCLOSURE.forEach(item=> {
      images.push(this.data.url+item)
    });
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
//   金融债上传图片
// 上传图片
  //点击添加按钮选择图片
  mydeep: function (e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const imaged = this.data.imaged.concat(res.tempFilePaths)
        this.setData({
            imaged: imaged
        })
      }
    })
  },
  // 删除图片
  myremore(e) {
    console.log(e);
    const idx = e.target.dataset.idx;
    this.data.imaged.splice(idx, 1);
    var del_image = this.data.imaged;
    this.setData({
        imaged: del_image
    })
  },
  // 查看大图
  handleImagepage(e) {
    const idx = e.target.dataset.idx
    const imaged = this.data.imaged
    wx.previewImage({
      current: imaged[idx], //当前预览的图片
      urls: imaged, //所有要预览的图片
    })
  },
//   利率债上传图片
// 上传图片
  //点击添加按钮选择图片
  myledup: function (e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const imgeubd = this.data.imgeubd.concat(res.tempFilePaths)
        this.setData({
            imgeubd: imgeubd
        })
      }
    })
  },
  // 删除图片
  mymore(e) {
    console.log(e);
    const idx = e.target.dataset.idx;
    this.data.imgeubd.splice(idx, 1);
    var del_image = this.data.imgeubd;
    this.setData({
        imgeubd: del_image
    })
  },
  // 查看大图
  handlemor(e) {
    const idx = e.target.dataset.idx
    const imgeubd = this.data.imgeubd
    wx.previewImage({
      current: imgeubd[idx], //当前预览的图片
      urls: imgeubd, //所有要预览的图片
    })
  },

  //提交金融债
  confirmFinance(){

    if(this.data.sensitivePUBLISHER){
      wx.showToast({
          title: '您输入的发行人含有敏感词',
          icon: 'none'
        })
      return
   }

   if(this.data.sensitive_ticketCustom){
    wx.showToast({
        title: '您输入的债种含有敏感词',
        icon: 'none'
      })
    return
  }

   if(this.data.sensitive_BOND_NAME){
    wx.showToast({
        title: '您输入的债劵名称性质含有敏感词',
        icon: 'none'
      })
    return
  }

  if(this.data.sensitive_BOND_CODE){
    wx.showToast({
        title: '您输入的债劵代码含有敏感词',
        icon: 'none'
      })
    return
  }

   

   
    if(this.data.sensitiveRemark){
      wx.showToast({
          title: '您输入的备注含有敏感词',
          icon: 'none'
        })
      return
   }

    if (this.data.selectedItems.item9 === -1) {
      wx.showToast({
        title: "请选择发行人类型",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (this.data.selectedItems.item10 === -1) {
      wx.showToast({
        title: "请选择市场",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    
    if (this.data.selectedItems.item11 === -1) {
      wx.showToast({
        title: "请选择券种",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if(this.data.selectedItems.item11 === 5 && this.data.ticketCustom===''){
      wx.showToast({
        title: '券种自定义，对应字段不能为空',
        icon: "none",
        duration: 1500,
      })
      return
    }
    if (!this.data.creditBond.PUBLISHER) {
      wx.showToast({
        title: "请输入发行人",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (!this.data.zjqxday) {
      wx.showToast({
        title: "请输入债劵期限",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (this.data.selectedItems.item12 === -1) {
      wx.showToast({
        title: "请选择主体评级",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (this.data.selectedItems.item14 === 1 && !this.data.time) {
      wx.showToast({
        title: "当选择为公开招标时请选择接收投标时间",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (this.data.selectedItems.item8==1 && this.data.PUBLISH_OBJ_CONTENT.length==0) {
      wx.showToast({
          title: "请选择定向机构",
          icon: "none",
          duration: 1500,
      });
      return;
  }

  if (this.data.selectedItems.item8==2 && this.data.PUBLISH_OBJ_CONTENT.length==0) {
    wx.showToast({
        title: "请选择定向个人",
        icon: "none",
        duration: 1500,
    });
    return;
}

    if(this.data.BB_ENCLOSURE_file){
      this.data.BB_ENCLOSURE.push(this.data.BB_ENCLOSURE_file)
    }


    var ticketCustom = this.data.selectedItems.item11 === 5 ? this.data.ticketCustom:this.data.arr11[this.data.selectedItems.item11];
    let data={
      PUBLISHER_TYPE:this.data.arr9[this.data.selectedItems.item9],//发行人类型
      MARKET:this.data.arr10[this.data.selectedItems.item10],//市场
      BOND_TYPE:ticketCustom,//卷种
      PUBLISHER:this.data.creditBond.PUBLISHER,
      MAIN_GRADE:this.data.arr12[this.data.selectedItems.item12],//主体评级
      BOND_PROJECT_GRADE:this.data.arr13[this.data.selectedItems.item13],//债项评级
      BOND_TERM:this.data.zjqxday  + '-' +this.data.arr22[this.data.selectedItems.item22],//债券期限this.data.fxqxday +'-' + this.data.arr22[this.data.selectedItems.item22],
      INTEREST_RATE_RANGE:this.data.mini_rate+'-'+this.data.high_rate,//利率区间
      BOND_NAME:this.data.creditBond.BOND_NAME,//债券名称
      BOND_CODE:this.data.creditBond.BOND_CODE,//债券代码
      ISSUE_MODE:this.data.arr14[this.data.selectedItems.item14],//发行方式
      RECEIVCE_BIDS_TIME:this.data.time,//接收投标时间
      PAY_DATE:this.data.creditBond.PAY_DATE,//缴款日
      VALUE_DATE:this.data.creditBond.START_RATE_DATE,//起息日
      INTEREST_TYPE:this.data.arr15[this.data.selectedItems.item15],//利率类型
      PAY_MODE:this.data.arr16[this.data.selectedItems.item16],//付息方式
      INSUE_TRANSACTION_PLACE:this.data.arr17[this.data.selectedItems.item17],//发行交易场所
      GUARANTEE:this.data.arr4[this.data.selectedItems.item4],//担保
      INSUE_SCALE:this.data.creditBond.PUBLISH_SCALE,//发行规模
      INSUE_DATE:this.data.funudDate,//发行日fontentub
      ON_SALE_DATE:this.data.creditBond.LISTED_DATE,//上市日
      REMARKS:this.data.creditBond.REMARKS,
      PUBLISH_OBJ:this.data.arr8[this.data.selectedItems.item8],

      ENCLOSURE:this.data.BB_ENCLOSURE.join(','),

      OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,
      PUBLISH_OBJ_CONTENT:this.data.PUBLISH_OBJ_CONTENT.join(',')

    }
    if(this.data.FB_ID){
      data.FB_ID=this.data.FB_ID
    }

    console.log(data)

    

    addOrUpdateFinanceBond(data).then(res => {
      console.log(res);
      if(res.STATUS == 1){
        wx.showToast({
                title: '发布成功',
                duration:1500,
                success:function(){
                  setTimeout(function(){
                    wx.navigateTo({
                    url: '/subpack/success/success',
                    })
                  },1500)
                }
              })

      }

    }).catch(e=>{
      console.log(e)
      wx.showToast({
        title: e,
        icon: "none",
        duration: 1500,
      });
    })
  },

  //提交利率债
  confirmRateBond(){

    if(this.data.sensitive_BOND_NAME){
      wx.showToast({
          title: '您输入的债劵名称性质含有敏感词',
          icon: 'none'
        })
      return
    }

    if(this.data.sensitive_BOND_CODE){
      wx.showToast({
          title: '您输入的债劵代码含有敏感词',
          icon: 'none'
        })
      return
    }
    if(this.data.sensitive_PURCHASE_ADVICE){
      wx.showToast({
          title: '您输入的申购建议中含有敏感词',
          icon: 'none'
        })
      return
   }
  

    if(this.data.sensitiveRemark){
      wx.showToast({
          title: '您输入的备注中含有敏感词',
          icon: 'none'
        })
      return
   }

  console.log(this.data.selectedItems.item18)
    if (this.data.selectedItems.item18 === -1) {
      wx.showToast({
        title: "请选择券种",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    // if (this.data.selectedItems.item19 === -1) {
    //   wx.showToast({
    //     title: "请选择市场",
    //     icon: "none",
    //     duration: 1500,
    //   });
    //   return;
    // }
    if (this.data.selectedItems.item19 === 0) {
      if(this.data.time == ''){
        wx.showToast({
          title: "请选择招标时间",
          icon: "none",
          duration: 1500,
        });
        return;
      }
    }
    if (!this.data.creditBond.BOND_NAME) {
      wx.showToast({
        title: "请输入债劵名称",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (!this.data.creditBond.PUBLISH_SCALE) {
      wx.showToast({
        title: "请输入发行规模",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (!this.data.fxqxday) {
      wx.showToast({
        title: "请输入发行期限",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    

    if (this.data.selectedItems.item22 === -1) {
      wx.showToast({
        title: "请选择发行期限",
        icon: "none",
        duration: 1500,
      });
      return;
    }



    if (!this.data.time && this.data.selectedItems.item19 === 0) {
      wx.showToast({
        title: "请选择招标时间",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (!this.data.creditBond.START_RATE_DATE) {
      wx.showToast({
        title: "请选择起息日",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (!this.data.creditBond.PAR_RATE) {
      wx.showToast({
        title: "请输入票面利率",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (this.data.selectedItems.item17 === -1) {
      wx.showToast({
        title: "请选择上市市场",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    // if (this.data.selectedItems.item8 === -1) {
    //   wx.showToast({
    //     title: "请选择发布对象",
    //     icon: "none",
    //     duration: 1500,
    //   });
    //   return;
    // }
    if(!this.data.creditBond.rate_start || !this.data.creditBond.rate_end){
      wx.showToast({
        title: '请输入正确的利率区间',
        icon: "none",
        duration: 1500,
      })
      return
      // if(this.data.creditBond.rate_start>100 || this.data.creditBond.rate_end>100){
      //   wx.showToast({
      //     title: '请输入正确的利率区间',
      //     icon: "none",
      //     duration: 1500,
      //   })
      //   return
      // }
      // if(this.data.creditBond.rate_start>this.data.creditBond.rate_end){
      //   wx.showToast({
      //     title: '请输入正确的利率区间',
      //     icon: "none",
      //     duration: 1500,
      //   })
      //   return
      // }
    }
    if (this.data.selectedItems.item8==1 && this.data.PUBLISH_OBJ_CONTENT.length==0) {
      wx.showToast({
          title: "请选择定向机构",
          icon: "none",
          duration: 1500,
      });
      return;
  }

  if (this.data.selectedItems.item8==2 && this.data.PUBLISH_OBJ_CONTENT.length==0) {
    wx.showToast({
        title: "请选择定向个人",
        icon: "none",
        duration: 1500,
    });
    return;
}

    if(this.data.BB_ENCLOSURE_file){
      this.data.BB_ENCLOSURE.push(this.data.BB_ENCLOSURE_file)
    }

    let data={
      BOND_TYPE:this.data.arr18[this.data.selectedItems.item18],
      MARKET:this.data.arr19[this.data.selectedItems.item19],
      BOND_NAME:this.data.creditBond.BOND_NAME,
      BOND_CODE:this.data.creditBond.BOND_CODE,
      PUBLISH_SCALE:this.data.creditBond.PUBLISH_SCALE,
      PUBLISH_DEADLINE:this.data.fxqxday +'-' + this.data.arr22[this.data.selectedItems.item22],
      BID_TIME:this.data.time,
      PAY_DATE:this.data.creditBond.PAY_DATE,
      START_RATE_DATE:this.data.creditBond.START_RATE_DATE,
      LISTED_DATE:this.data.creditBond.LISTED_DATE,
      PAR_RATE:this.data.creditBond.PAR_RATE,
      POUNDAGE:this.data.creditBond.POUNDAGE,
      STOP_BID_TIME:this.data.arr20[this.data.selectedItems.item20],
      LISTED_MARKET:this.data.arr17[this.data.selectedItems.item17],
      BID_TYPE:this.data.arr21[this.data.selectedItems.item21],
      FORECAST_RANGE:this.data.creditBond.rate_start+'-'+this.data.creditBond.rate_end,
      PURCHASE_ADVICE:this.data.creditBond.PURCHASE_ADVICE,
      REMARKS:this.data.creditBond.REMARKS,
      PUBLISH_OBJ:this.data.arr8[this.data.selectedItems.item8],
      ENCLOSURE:this.data.BB_ENCLOSURE.join(','),

      OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,
      PUBLISH_OBJ_CONTENT:this.data.PUBLISH_OBJ_CONTENT.join(',')

    }
    console.log(data)
    if(this.data.IRB_ID){
      data.IRB_ID=this.data.IRB_ID
    }
    addOrUpdateRateBond(data).then(res => {
      console.log(res);
      if(res.STATUS == 1){
        wx.showToast({
                title: '发布成功',
                duration:1500,
                success:function(){
                  setTimeout(function(){
                    wx.navigateTo({
                    url: '/subpack/success/success',
                    })
                  },1500)
                }
              })

      }

    }).catch(e=>{
      console.log(e)
      wx.showToast({
        title: e,
        icon: "none",
        duration: 1500,
      });
    })

  },
  confirmCreditBond(e) { //提交信用债最后点击提交时
    // console.log(this.data.fbundDate);

    if(this.data.sensitivePUBLISHER){
      wx.showToast({
          title: '您输入的发行人含有敏感词',
          icon: 'none'
        })
      return
   }

   if(this.data.sensitive_PUBLISHER_NATURE){
    wx.showToast({
        title: '您输入的发行人性质含有敏感词',
        icon: 'none'
      })
    return
 }

 if(this.data.sensitive_BOND_NAME){
  wx.showToast({
      title: '您输入的债劵名称性质含有敏感词',
      icon: 'none'
    })
  return
}

if(this.data.sensitive_BOND_CODE){
  wx.showToast({
      title: '您输入的债劵代码含有敏感词',
      icon: 'none'
    })
  return
}


    if(this.data.sensitiveRemark){
      wx.showToast({
          title: '您输入的备注中含有敏感词',
          icon: 'none'
        })
      return
   }
   
    if (this.data.selectedItems.item1 === -1) {
      wx.showToast({
        title: "请选择券种",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (this.data.selectedItems.item2 === -1) {
      wx.showToast({
        title: "请选择市场",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (!this.data.creditBond.PUBLISHER) {
      wx.showToast({
        title: "请输入发行人",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (this.data.selectedItems.item3 === -1) {
      wx.showToast({
        title: "请选择发行人性质",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (!this.data.creditBond.BOND_NAME) {
      wx.showToast({
        title: "请输入债劵名称",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (!this.data.creditBond.PUBLISH_SCALE) {
      wx.showToast({
        title: "请输入发行规模",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (!this.data.fxqxday) {
      wx.showToast({
        title: "请输入发行期限",
        icon: "none",
        duration: 1500,
      });
      return;
    }

    if (this.data.selectedItems.item22 === -1) {
      wx.showToast({
        title: "请选择发行期限",
        icon: "none",
        duration: 1500,
      });
      return;
    }



    if (this.data.selectedItems.item5 === -1) {
      wx.showToast({
        title: "请选择主体评级",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    if (this.data.selectedItems.item6 === -1) {
      wx.showToast({
        title: "请选择债项评级",
        icon: "none",
        duration: 1500,
      });
      return;
    }
    // if (this.data.selectedItems.item8 === -1) {
    //   wx.showToast({
    //     title: "请选择发布对象",
    //     icon: "none",
    //     duration: 1500,
    //   });
    //   return;
    // }
    if(this.data.creditBond.rate_start && this.data.creditBond.rate_end){
      if(this.data.creditBond.rate_start>100 || this.data.creditBond.rate_end>100){
        wx.showToast({
          title: '请输入正确的利率区间',
          icon: "none",
          duration: 1500,
        })
        return
      }
      if(this.data.creditBond.rate_start>this.data.creditBond.rate_end){
        wx.showToast({
          title: '请输入正确的利率区间',
          icon: "none",
          duration: 1500,
        })
        return
      }
    }
    if(this.data.selectedItems.item3 === 4 && this.data.PUBLISHER_NATURE===''){
      wx.showToast({
        title: '发行人性质位自定义，对应字段不能为空',
        icon: "none",
        duration: 1500,
      })
      return
    }

    if (this.data.selectedItems.item8==1 && this.data.PUBLISH_OBJ_CONTENT.length==0) {
      wx.showToast({
          title: "请选择定向机构",
          icon: "none",
          duration: 1500,
      });
      return;
  }

  if (this.data.selectedItems.item8==2 && this.data.PUBLISH_OBJ_CONTENT.length==0) {
    wx.showToast({
        title: "请选择定向个人",
        icon: "none",
        duration: 1500,
    });
    return;
}
    var PUBLISHER_NATURE_VALUE =     this.data.selectedItems.item3 === 4 ?
    this.data.PUBLISHER_NATURE:this.data.arr3[this.data.selectedItems.item3];
    console.log("PUBLISHER_NATURE_VALUE============"+PUBLISHER_NATURE_VALUE);

    if(this.data.BB_ENCLOSURE_file){
      this.data.BB_ENCLOSURE.push(this.data.BB_ENCLOSURE_file)
    }
    let data={
      BOND_TYPE:this.data.arr[this.data.selectedItems.item1],
      MARKET:this.data.arr2[this.data.selectedItems.item2],
      // PUBLISHER_NATURE:this.data.arr3[this.data.selectedItems.item3],
      PUBLISHER_NATURE:PUBLISHER_NATURE_VALUE,
      GUARANTEE:this.data.arr4[this.data.selectedItems.item4],
      MAIN_GRADE:this.data.arr5[this.data.selectedItems.item5],
      BOND_PROJECT_GRADE:this.data.arr6[this.data.selectedItems.item6],
      GRADE_COMPANY:this.data.arr7[this.data.selectedItems.item7],
      PUBLISH_OBJ:this.data.arr8[this.data.selectedItems.item8],
      
      PUBLISHER:this.data.creditBond.PUBLISHER,
      BOND_NAME:this.data.creditBond.BOND_NAME,
      BOND_CODE:this.data.creditBond.BOND_CODE,
      PUBLISH_SCALE:this.data.creditBond.PUBLISH_SCALE,
      REMARKS:this.data.creditBond.REMARKS,
      FORECAST_RATE_RANGE:this.data.creditBond.rate_start+'-'+this.data.creditBond.rate_end,
      PUBLISH_DEADLINE:this.data.fxqxday +'-' + this.data.arr22[this.data.selectedItems.item22],
      PUBLISHER_DATE:this.data.creditBond.PUBLISHER_DATE,
      PAY_DATE:this.data.creditBond.PAY_DATE,
      LISTED_DATE:this.data.creditBond.LISTED_DATE,

      ENCLOSURE:this.data.BB_ENCLOSURE.join(','),

      OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,
      PUBLISH_OBJ_CONTENT:this.data.PUBLISH_OBJ_CONTENT.join(',')


      // PUBLISH_DEADLINE:'',
      // PUBLISHER_DATE:'',
      // PAY_DATE:'',
      // LISTED_DATE:''

      // BB_RESIDUAL_MATURITY:this.data.fbundDate,
      // BB_REPO_TERM:this.data.currentDate,  
      // BB_INTEREST_RATE:this.data.shouqi,
      // BB_MATURITY_RATE:this.data.daoqi,
      // BB_AMOUNT:this.data.money,
      // BB_REMARKS:this.data.remark
      // creditBond:{
      //   PUBLISHER:'',
      //   BOND_NAME:'',
      //   BOND_CODE:'',
      //   PUBLISH_SCALE:'',
      //   REMARKS:'',
      //   rate_start:'',
      //   rate_end:'',
      // }
     
    }
    if(this.data.CB_ID){
       data.CB_ID=this.data.CB_ID
    }

    console.log(data)
    
    addOrUpdateCreditBond(data).then(res => {
      console.log(res);
      if(res.STATUS == 1){
        wx.showToast({
                title: '发布成功',
                duration:1500,
                success:function(){
                  setTimeout(function(){
                    wx.navigateTo({
                    url: '/subpack/success/success',
                    })
                  },1500)
                }
              })

      }

    }).catch(e=>{
      console.log(e)
      wx.showToast({
        title: e,
        icon: "none",
        duration: 1500,
      });
    })




  },
// 时间控件精确时分
onLoad: function (options) {
  this.getSelectRlcUserInfoList()

  this.getQueryWhiteOrgList()
    //获取当前年月日时分
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    // this.setData({
    //   time: Y + '-' + M + '-' + D + ' ' + hour + ':' + minute,
    //   //  multiArray: [Y, M, D, hour, minute]
    // })

    if(options.info){
      let info = JSON.parse(options.info)
      
      console.log(info)
      if(info.PICTURE.length){
        info.PICTURE.forEach(item=> {
          this.data.BB_ENCLOSURE.push(item.URL)
        });
      }
      if(info.FILE.length){
        this.data.BB_ENCLOSURE_file=info.FILE[0].URL
        this.data.fileName= info.FILE[0].URL.split('rlc/')[1]
      }

      this.setData({
        BB_ENCLOSURE:this.data.BB_ENCLOSURE,
        BB_ENCLOSURE_file:this.data.BB_ENCLOSURE_file,
        fileName:this.data.fileName
      })
     
      if(info.CB_ID){

        let selectedItems={
          item1: -1,
          item2: -1,
          item3: -1,
          item4: -1,
          item5: -1,
          item6: -1,
          item7: -1,
          item8: -1,
          item22:0,

         }
         
          this.data.arr.map((item,index)=>{
            if(item==info.BOND_TYPE){
              console.log(index)
              selectedItems.item1=index
            }
          })
   
          this.data.arr2.map((item2,index2)=>{
   
          
            if(item2==info.MARKET){
              selectedItems.item2=index2
            }
          })
   
          this.data.arr3.map((item,index)=>{
           
            if(item==info.PUBLISHER_NATURE){
              selectedItems.item3=index    
            }
          })
   
          this.data.arr4.forEach((item,index)=>{
            if(item==info.GUARANTEE){
               //this.data.selectedItems.item4=index
              selectedItems.item4=index
               
            }
          })
   
          this.data.arr5.forEach((item,index)=>{
            if(item==info.MAIN_GRADE){
               //this.data.selectedItems.item5=index
              selectedItems.item5=index
               
            }
          })

          this.data.arr6.forEach((item,index)=>{
            if(item==info.BOND_PROJECT_GRADE){
               //this.data.selectedItems.item5=index
              selectedItems.item6=index
               
            }
          })

          this.data.arr7.forEach((item,index)=>{
            if(item==info.GRADE_COMPANY){
               //this.data.selectedItems.item5=index
              selectedItems.item7=index
               
            }
          })

          this.data.arr8.forEach((item,index)=>{
            if(item==info.PUBLISH_OBJ){
               //this.data.selectedItems.item5=index
              selectedItems.item8=index
               
            }
          })

          this.data.arr22.forEach((item,index)=>{
            if(item==info.PUBLISH_DEADLINE.split('-')[1]){
               //this.data.selectedItems.item5=index
              selectedItems.item22=index
               
            }
          })
          console.log(selectedItems)

          
          this.setData({
      
          selectedItems:selectedItems,
          'creditBond.PUBLISHER':info.PUBLISHER,
          'creditBond.BOND_NAME':info.BOND_NAME,
          'creditBond.BOND_CODE':info.BOND_CODE,
          'creditBond.PUBLISH_SCALE':info.PUBLISH_SCALE,
          'creditBond.PUBLISHER_DATE':info.PUBLISHER_DATE,
          'creditBond.PAY_DATE':info.PAY_DATE,

          'creditBond.LISTED_DATE':info.LISTED_DATE,

          'creditBond.REMARKS':info.REMARKS,
          fbundentub:true,
          entub:true,
          current:info.REMARKS.length,
          CB_ID:info.CB_ID,

          fxqxday:info.PUBLISH_DEADLINE.split('-')[0],

         
          }) 
          if(info.FORECAST_RATE_RANGE){
            this.setData({
              'creditBond.rate_start':info.FORECAST_RATE_RANGE.split('-')[0],
              'creditBond.rate_end':info.FORECAST_RATE_RANGE.split('-')[1],
            })
          }   
      }

      if(info.FB_ID){

        let selectedItems={
          item4: -1,
          item8: -1,
          item9: -1,
          item10: -1,
          item11: -1,
          item12: -1,
          item13: -1,
          item14: -1,
          item15: -1,
          item16: -1,
          item17: -1,
          item22:0,
          

         }
         
          this.data.arr4.map((item,index)=>{
            if(item==info.GUARANTEE){
              console.log(index)
              selectedItems.item4=index
            }
          })
   
          this.data.arr8.map((item2,index2)=>{
   
          
            if(item2==info.PUBLISH_OBJ){
              selectedItems.item8=index2
            }
          })
   
          this.data.arr9.map((item,index)=>{
           
            if(item==info.PUBLISHER_TYPE){
              selectedItems.item9=index    
            }
          })
   
          this.data.arr10.forEach((item,index)=>{
            if(item==info.MARKET){
               //this.data.selectedItems.item4=index
              selectedItems.item10=index
               
            }
          })
   
          this.data.arr11.forEach((item,index)=>{
            if(item==info.BOND_TYPE){
               //this.data.selectedItems.item5=index
              selectedItems.item11=index
               
            }
          })

          this.data.arr12.forEach((item,index)=>{
            if(item==info.MAIN_GRADE){
               //this.data.selectedItems.item5=index
              selectedItems.item12=index
               
            }
          })

          this.data.arr13.forEach((item,index)=>{
            if(item==info.BOND_PROJECT_GRADE){
               //this.data.selectedItems.item5=index
              selectedItems.item13=index
               
            }
          })

          this.data.arr14.forEach((item,index)=>{
            if(item==info.ISSUE_MODE){
               //this.data.selectedItems.item5=index
              selectedItems.item14=index
               
            }
          })

          this.data.arr15.forEach((item,index)=>{
            if(item==info.INTEREST_TYPE){
               //this.data.selectedItems.item5=index
              selectedItems.item15=index
               
            }
          })

          this.data.arr16.forEach((item,index)=>{
            if(item==info.PAY_MODE){
               //this.data.selectedItems.item5=index
              selectedItems.item16=index
               
            }
          })

          this.data.arr17.forEach((item,index)=>{
            if(item==info.INSUE_TRANSACTION_PLACE){
               //this.data.selectedItems.item5=index
              selectedItems.item17=index
               
            }
          })

          if(info.BOND_TERM){
            this.data.arr22.forEach((item,index)=>{
              if(item==info.BOND_TERM.split('-')[1]){
                 //this.data.selectedItems.item5=index
                selectedItems.item22=index
                 
              }
            })
          }

          
          console.log(selectedItems)
          this.setData({
      
          selectedItems:selectedItems,
          'creditBond.PUBLISHER':info.PUBLISHER,
          'creditBond.BOND_NAME':info.BOND_NAME,
          'creditBond.BOND_CODE':info.BOND_CODE,
          'creditBond.PUBLISH_SCALE':info.PUBLISH_SCALE,
          'creditBond.PUBLISHER_DATE':info.PUBLISHER_DATE,
          'creditBond.PAY_DATE':info.PAY_DATE,

          'creditBond.LISTED_DATE':info.ON_SALE_DATE,

          'creditBond.REMARKS':info.REMARKS,
          fbundentub:true,
          entub:true,
          current:info.REMARKS.length,
          FB_ID:info.FB_ID,
          currentIndex:1,
          zjqxday:info.BOND_TERM.split('-')[0],

          'creditBond.START_RATE_DATE':info.VALUE_DATE,

          'creditBond.PUBLISH_SCALE':info.INSUE_SCALE,

          time:info.RECEIVCE_BIDS_TIME,
          wentube:true
          })
          
          if(info.INTEREST_RATE_RANGE){
            this.setData({
              mini_rate:info.INTEREST_RATE_RANGE.split('-')[0],
              high_rate:info.INTEREST_RATE_RANGE.split('-')[1],
            })
          }   
      }

      if(info.IRB_ID){

        let selectedItems={
          item8: -1,
          item17: -1,
          item18: -1,
          item19: -1,
          item20: -1,
          item21: -1,
          item22: 0,
         


         }
         
          this.data.arr8.map((item,index)=>{
            if(item==info.PUBLISH_OBJ){
              console.log(index)
              selectedItems.item8=index
            }
          })
   
          this.data.arr17.map((item2,index2)=>{
   
          
            if(item2==info.LISTED_MARKET){
              selectedItems.item17=index2
            }
          })
   
          this.data.arr18.map((item,index)=>{
           
            if(item==info.BOND_TYPE){
              selectedItems.item18=index    
            }
          })
   
          this.data.arr19.forEach((item,index)=>{
            if(item==info.MARKET){
               //this.data.selectedItems.item4=index
              selectedItems.item19=index
               
            }
          })
   
          this.data.arr20.forEach((item,index)=>{
            if(item==info.STOP_BID_TIME){
               //this.data.selectedItems.item5=index
              selectedItems.item20=index
               
            }
          })

          this.data.arr21.forEach((item,index)=>{
            if(item==info.BID_TYPE){
               //this.data.selectedItems.item5=index
              selectedItems.item21=index
               
            }
          })

          this.data.arr22.forEach((item,index)=>{
            if(item==info.PUBLISH_DEADLINE.split('-')[1]){
               //this.data.selectedItems.item5=index
              selectedItems.item22=index
               
            }
          })

          


          this.data.arr17.forEach((item,index)=>{
            if(item==info.INSUE_TRANSACTION_PLACE){
               //this.data.selectedItems.item5=index
              selectedItems.item17=index
               
            }
          })
          console.log(selectedItems)
          this.setData({
      
          selectedItems:selectedItems,
          'creditBond.PUBLISHER':info.PUBLISHER,
          'creditBond.BOND_NAME':info.BOND_NAME,
          'creditBond.BOND_CODE':info.BOND_CODE,
          'creditBond.PUBLISH_SCALE':info.PUBLISH_SCALE,
          'creditBond.PUBLISHER_DATE':info.PUBLISHER_DATE,
          'creditBond.PAY_DATE':info.PAY_DATE,

          'creditBond.LISTED_DATE':info.LISTED_DATE,

          'creditBond.REMARKS':info.REMARKS,

          'creditBond.PAR_RATE':info.PAR_RATE,

          'creditBond.START_RATE_DATE':info.START_RATE_DATE,
          'creditBond.POUNDAGE':info.POUNDAGE,
          'creditBond.PURCHASE_ADVICE':info.PURCHASE_ADVICE,
          fbundentub:true,
          entub:true,
          current:info.REMARKS.length,
          IRB_ID:info.IRB_ID,
          currentIndex:2,
          fxqxday:info.PUBLISH_DEADLINE.split('-')[0],
          time:info.BID_TIME,
          myminibolk:true
          })
          
          if(info.FORECAST_RANGE){
            this.setData({
              'creditBond.rate_start':info.FORECAST_RANGE.split('-')[0],
              'creditBond.rate_end':info.FORECAST_RANGE.split('-')[1],
            })
          }   
      }
      
      if(this.data.selectedItems.item8==1){
        this.setData({
          dialog:true
        })
      }
  
      if(this.data.selectedItems.item8==2){
        this.setData({
          personaldialog:true
        })
      }

    }


 
    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
 
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    console.log(e)
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  // 点击投标时间
  wentubent(e){
    this.setData({
      wentube:true
    })
  },
  // 点击招标时间
  myminiblock(e){
    console.log(e)
    this.setData({
      myminibolk:true
    })
  }
})
