// pages/my/my.js
import utils from '../utils';
import {queryRegisterInfo,rlcuploadFile} from '../../api/url'
import {completeUserInfo} from '../../api/izational'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        preffixUrl: utils.preffixUrl(),
        isShowEditSave:true,
        phone:'025-888888',
        email:'wossdddaaa@163.com',
        address:'江苏省南京市中华路26号',
        userInfo:{},
        wxlogininfo:{},
        BB_ENCLOSURE:[],
        url:app.globalData.CDNURL
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log(wx.getStorageSync('wxlogininfo'))
     this.setData({
       wxlogininfo:wx.getStorageSync('wxlogininfo')
     })
    
    },

    uploadImage: function (e) {
      wx.chooseImage({
          count:1,
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
                  this.saveUserInfo()
                }
              
              }).catch(e=>{
                console.log(e)
              })
            }
              // const images = this.data.images.concat(res.tempFilePaths)
              // this.setData({
              //     images: images
              // })
          }
      })

  },

    saveUserInfo(){
      let that=this
      if(!this.data.userInfo.RLC_USER_NAME){
        wx.showLoading({
          title: '请输入姓名',
          duration: 1000
        })
        return
    }
    if(!this.data.userInfo.ORG_NAME){
        wx.showLoading({
            title: '请输入机构名称',
            duration: 1000
          })
          return
    }
    if(!this.data.userInfo.FIRST_DEPT){
        wx.showLoading({
            title: '请输入所属部门(一级部)',
            duration: 1000
          })
          return
    }
    if(!this.data.userInfo.POSITION){
        wx.showLoading({
            title: '请输入职务',
            duration: 1000
          })
          return
    }
    if(this.data.userInfo.MOBILE == ''){
      wx.showLoading({
        title: '请先输入手机号',
        duration: 1000
      })
      return
  }
    if(!(/^1[34578]\d{9}$/.test(this.data.userInfo.MOBILE)) || this.data.userInfo.MOBILE.length != 11){
        wx.showToast({
          title: '请输入正确的手机号',
          icon:'none'
        })
        return
    }
    var data = {
    OPEN_ID:this.data.userInfo.OPEN_ID, //微信唯一编码
    RLC_USER_NAME:this.data.userInfo.RLC_USER_NAME, //用户名
    ORG_NAME:this.data.userInfo.ORG_NAME, //机构名称
    FIRST_DEPT:this.data.userInfo.FIRST_DEPT, //所属一级部门
    SECOND_DEPT:this.data.userInfo.SECOND_DEPT, //所属二级部门
    THIRD_DEPT:this.data.userInfo.THIRD_DEPT, //所属三级部门
    POSITION:this.data.userInfo.POSITION, //职务
    MOBILE:this.data.userInfo.MOBILE, //手机号码
    PHONE:this.data.userInfo.PHONE, //固定电话
    EMAIL:this.data.userInfo.EMAIL, //邮箱
    ORG_ADDR:this.data.userInfo.ORG_ADDR, //机构地址
    REFERRER_NUM:this.data.userInfo.REFERRER_NUM, //"推荐人工号
    HEAD_PHOTO:this.data.BB_ENCLOSURE[0]
    }

    console.log(data)
    
    completeUserInfo(data).then(res => {
      console.log(data);
      console.log(res);
      that.getqueryRegisterInfo()
      wx.showToast({
        title: '保存成功',
        icon:'none'
      })
    //  setTimeout(()=>{
    //   that.setData({
    //     isShowEditSave: !that.data.isShowEditSave
    // })
    //  },1000)
    }).catch(e=>{
      console.log(e)
    })
   
    },

    getmobile(e){
      console.log(e)
      this.setData({
        'userInfo.MOBILE':e.detail.value
      })
    },
    getphone(e){
      this.setData({
        'userInfo.PHONE':e.detail.value
      })
    },

    getemail(e){
      this.setData({
        'userInfo.EMAIL':e.detail.value
      })
    },
    getaddr(e){
      this.setData({
        'userInfo.ORG_ADDR':e.detail.value
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
                selected: 2
            })
        }
       this.getqueryRegisterInfo()
    },
    getqueryRegisterInfo(){
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
    /**
     * 跳转我的发布列表页面
     */
    myrelease:function(){
      wx.navigateTo({
        url: '/subpack/myrelease/releaselist/releaselist',
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

    },

    isShowEdit(){
      wx.navigateTo({
        url: '/pages/perfect/perfect?is_edit=true',
      })
    //   this.setData({
    //     isShowEditSave: !this.data.isShowEditSave
    // })
    console.log(this.data.isShowEditSave)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})