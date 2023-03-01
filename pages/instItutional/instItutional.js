// pages/index/index.js
import utils from '../utils';
import {queryOrganizationalCategory,queryOrganizationalMember} from '../../api/izational'
import zones_data from '../../api/region-picker.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl(),
     num:0,
     content:'',
     region: '',
     instlist:[],
     customItem:'全部',
     member:[],
     message:[
       {
         id:'0',
         text:"融联创",
         children:[
          {
            id:'0',
            text:"江苏银行",
          },
          {
            id:'0',
            text:"成员名称",
          }
         ]
       },
       {
         id: '1',
          text:'银行',
          children:[
            {
              id:'0',
              text:"江苏银行",
            },
            {
              id:'1',
              text:"江苏省农村信用社联合社",
            },
            {
              id:'2',
              text:"长春发展农村商业银行",
            },
            {
              id:'3',
              text:"甘肃银行",
            },
            {
              id:'4',
              text:"海口联合农村商业银行",
            },
            {
              id:'5',
              text:"徽商银行",
            },
            {
              id:'6',
              text:"江苏宝应农村商业银行 ",
            },
            {
              id:'7',
              text:"江苏高邮农村商业银行",
            },
         
           ]
       },
       {
        id: '2',
         text:'证券',
         children:[
          {
            id:'0',
            text:"成员名称",
          }
         ]
      },
      {
        id: '3',
         text:'基金',
         children:[
          {
            id:'0',
            text:"成员名称",
          }
         ]
      },
      {
        id: '4',
         text:'信托',
         children:[
          {
            id:'0',
            text:"成员名称",
          }
         ]
      },
      {
        id: '5',
         text:'保险',
         children:[
          {
            id:'0',
            text:"成员名称",
          }
         ]
      },
      {
        id: '6',
         text:'金租',
         children:[
          {
            id:'0',
            text:"成员名称",
          }
         ]
      },
      {
        id: '7',
         text:'其他',
         children:[
          {
            id:'0',
            text:"成员名称",
          }
         ]
      },
     ],
     OM_PROVINCE:'',
     zones_tree:[],
  },
  clickList: function (e) { //点击左侧
    var that = this;
    console.log(111)

    
    let num = e.currentTarget.dataset.id
    console.log(num)
    that.getmenber(num);
    this.setData({
      num: num
    })
    console.log(this)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mechanism();
   
    this.setData({
      zones_tree:zones_data.zones_tree
    })
    if (options.to == '融联创') {
      let num = 0
      this.setData({
        num: num
      })
    }
    if (options.to == '银行') {
      let num = 1
  
      this.setData({
        num: num
      })
    }
    if (options.to == '证券') {
      let num = 2
      this.setData({
        num: num
      })
    }
    if (options.to == '基金') {
      let num = 3
      this.setData({
        num: num
      })
    }
    if (options.to == '信托') {
      let num = 4
      this.setData({
        num: num
      })
    }
  },
  /**
   * 机构查询
   */
  mechanism(){
    var that= this;
    console.log(11222);
    // console.log(salary);
    let data = {}
    queryOrganizationalCategory(data).then(res => {
      console.log(res);
      if(res.STATUS == 1){
        if(res.LIST.length > 0){
          that.getmenber(res.LIST[this.data.num].OC_ID);
          that.setData({
            num:res.LIST[this.data.num].OC_ID
          })
        }
        that.setData({
          instlist:res.LIST
        })
      }else[
        that.setData({
          instlist:[]
        })
      ]

    }).catch(e=>{
      console.log(e)
      
    })
  },
 // 会员列表
  getmenber(OC_ID){
    var that= this;
    console.log(OC_ID);
    // console.log(salary);
    let data = {
      OC_ID:OC_ID,
      OM_PROVINCE:this.data.OM_PROVINCE
    }

    console.log(data)
    
    queryOrganizationalMember(data).then(res => {
      console.log(res);
      if(res.STATUS == 1){
        that.setData({
          member:res.LIST
        })

      }

    }).catch(e=>{
      console.log(e)
      wx.showToast({
        title: e,
        icon:'none'
      })
      if(e==='未查询到相关内容'){
        that.setData({
          member:[]
        })
      }
    })
  },
// 会员详情
  getdetail(e){
    var id = e.currentTarget.dataset.id;
    var thtml=e.currentTarget.dataset.url;
    var state=e.currentTarget.dataset.state;
    console.log("id=============="+id);
    console.log("e="+e.currentTarget.dataset.state);
    console.log("thtml="+thtml);
    if(state!=2){
    wx.navigateTo({
      url: '/pages/instldetail/instdetail?id='+id,
    })
  }else{
    wx.navigateTo({
      url: '/subpack/webhtml/web?web='+thtml,
    })
  }
  },
  // 省市区选择
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      region: this.data.zones_tree[e.detail.value].name,
      OM_PROVINCE:this.data.zones_tree[e.detail.value].code
    })
    this.getmenber(this.data.num);
   
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
