// pages/index/index.js
import utils from '../utils';
import {queryResearchCategoryList,queryResearchSpecialColumnList,queryResearchSpecialColumnInfo} from '../../api/url'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl(),
    url:app.globalData.CDNURL,
     num:0,
     content:'',
     member:[],
     instlist:[],
     message:[
       {
         id:'0',
         text:"综合",
         children:[
          {
            id:'0',
            text:"苏银消金",
            title:"苏银消金是苏银凯基消费金融有限公司",
            enubn:"江苏银行股份有限公司"
          },
          {
            id:'0',
            text:"苏银金融科技",
            title:"发布江苏银行金融科技相关信息",
            enubn:"江苏银行股份有限公司"
          }
         ]
       },
       {
         id: '1',
          text:'宏观',
          children:[
            {
              id:'0',
              text:"苏银金融科技",
              title:"发布江苏银行金融科技相关信息",
              enubn:"江苏银行股份有限公司"
            }
           ]
       },
       {
        id: '2',
         text:'固收',
         children:[
          {
            id:'0',
            text:"苏银金融科技",
            title:"发布江苏银行金融科技相关信息",
            enubn:"江苏银行股份有限公司"
          }
         ]
      },
      {
        id: '3',
         text:'股市',
         children:[
          {
            id:'0',
            text:"苏银金融科技",
            title:"发布江苏银行金融科技相关信息",
            enubn:"江苏银行股份有限公司"
          }
         ]
      },
      {
        id: '4',
         text:'商品',
         children:[
          {
            id:'0',
            text:"苏银金融科技",
            title:"发布江苏银行金融科技相关信息",
            enubn:"江苏银行股份有限公司"
          }
         ]
      },
      {
        id: '5',
         text:'外汇',
         children:[
          {
            id:'0',
            text:"苏银金融科技",
            title:"发布江苏银行金融科技相关信息",
            enubn:"江苏银行股份有限公司"
          }
         ]
      },
      {
        id: '6',
         text:'知识库',
         children:[
          {
            id:'0',
            text:"苏银金融科技",
            title:"发布江苏银行金融科技相关信息",
            enubn:"江苏银行股份有限公司"
          }
         ]
      },
      {
        id: '7',
         text:'研修班',
         children:[
          {
            id:'0',
            text:"苏银金融科技",
            title:"发布江苏银行金融科技相关信息",
            enubn:"江苏银行股份有限公司"
          }
         ]
      },
     ]
  },
  clickList:function(e){//点击左侧
     console.log(e)
     let num = e.currentTarget.dataset.id
     console.log(num)
    this.getmenber(num);

      this.setData({
          num:num,
      })
      console.log(this) 
  },
  getdetail(e){
    var id = e.currentTarget.dataset.id;
    var thtml=e.currentTarget.dataset.url;
    var reflag = e.currentTarget.dataset.reflag;
    var item=e.currentTarget.dataset.item
    console.log(id);
    if(item.ENCLOSURE!==''){
      item.ENCLOSURE =  item.ENCLOSURE.split(';')
    }
    if(item.ENCLOSURE.length==1){
      queryResearchSpecialColumnInfo({RSC_ID:id}).then(res => {  
        console.log(res)
      }).catch(e=>{    
      })
      let url= this.data.url+item.ENCLOSURE[0]
      console.log(url)
      wx.showLoading({
        title: '加载中,请稍后',
        mask:true
      })
      let that=this
      wx.downloadFile({
        url:url,
        success: function (res) {
          console.log(res)
          wx.openDocument({
            filePath: res.tempFilePath,
            fileType:'pdf',
  
            success: function (res) {
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
    }else if(reflag!=2){
      wx.navigateTo({
        url: '/pages/thedetail/thedetail?id='+id,
      })
    }else{
      queryResearchSpecialColumnInfo({RSC_ID:id}).then(res => {  
        console.log(res)
      }).catch(e=>{    
      })
      wx.navigateTo({
        url: '/subpack/webhtml/web?web='+thtml,
      })
    }

    // if(reflag!=2){
    // wx.navigateTo({
    //   url: '/pages/thedetail/thedetail?id='+id,
    // })
    // }else{
    //   queryResearchSpecialColumnInfo({RSC_ID:id}).then(res => {
      
    //     console.log(res)
        
    //     // console.log(JSON.parse(res.loopListString));
    //   }).catch(e=>{
       
    //   })
    //   wx.navigateTo({
    //     url: '/subpack/webhtml/web?web='+thtml,
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options)
    if(options.index){
      let num =  options.index
    
       this.setData({
          num:num
      })
    }
    this.mechanism();

    
  },

  mechanism(){
    var that= this;
    console.log(11222);
    // console.log(salary);
    let data = {}
    queryResearchCategoryList(data).then(res => {
      console.log(res);
      console.log(this.data.num)
      if(res.STATUS == 1){
        if(res.LIST.length > 0){
          that.getmenber(res.LIST[this.data.num].RC_TYPE);
          that.setData({
            num:res.LIST[this.data.num].RC_TYPE
          })
        }
        that.setData({
          instlist:res.LIST
        })
      }

    }).catch(e=>{
      console.log(e)
      
    })
  },
  getmenber(RC_TYPE){
    var that= this;
    console.log(RC_TYPE);
    // console.log(salary);
    let data = {
      RC_TYPE:RC_TYPE
    }

   
    queryResearchSpecialColumnList(data).then(res => {
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

