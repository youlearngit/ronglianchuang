// pages/login/login.js
import utils from '../utils';
import {weChatLogin} from '../../api/url'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl(),
    checked: false, //单选框的状态
    showLogin:false
  },
  // 单选框的状态
  user_agreement_checkbox: function () {
    var check = this.data.checked
    if (!check) {
      this.data.checked = true //选中checked
      console.log("选中");
    } else {
      this.data.checked = false //未选中checked
      console.log("未选中");
    }
    this.setData({
      checked: this.data.checked
    })
  },
  // 点击微信授权登录
  onWXClick(event) {
    // console.log(event); 
    if (this.data.checked == false) {
      wx.showModal({
        //   title: '我是标题', //提示的标题
        content: '请阅读并勾选页面协议', //提示的内容
        success: function (res) {
          if (res.confirm) {
            console.log(res)
            console.log('用户点击了确定')

          } else if (res.cancel) {
            console.log('用户点击了取消')
          }
        }
      })
      return
    }
      console.log("微信授权登录被点击");
      wx.showLoading({
        title: '登录中,请稍后',
        mask:true
      })
      let code = '';
      wx.login({
        success: res => {
          console.log(res)
          code = res.code;
        }
      })
      wx.getUserProfile({
        desc: "完善用户资料",
        success: (res) => {
          console.log(res);
          console.log("授权成功");
          weChatLogin({JS_CODE:code,NICK_NAME:res.userInfo.nickName}).then(r => {
            let info=r
           setTimeout(()=>{
             if(r.REGISTER_STATUS==='1'){
               wx.hideLoading()
              info.userInfo=res.userInfo
              wx.setStorageSync('wxlogininfo', info);
              console.log(info);
              // wx.showToast({
              //   title: '登录成功',
              //   icon:'none'
              // })
              wx.switchTab({
                url: "/pages/home/home", //进入首页
              });
             }else if(r.OPEN_ID==''){
              wx.showToast({
                title: r.RESULT_MSG,
                icon:'none'
              })
             }else{
              info.userInfo=res.userInfo
              wx.setStorageSync('wxlogininfo', info);
              console.log(info);
              wx.showToast({
                title: '登录成功',
                icon:'none'
              })
              wx.navigateTo({
                url: '/pages/registration/registration',
              })
             }
           
           },1000)
          }).catch(e=>{
            console.log(e)
          })

          // wx.switchTab({
          //   url: "/pages/home/home", //进入首页
          // });


        },
        fail: (res) => {
          console.log("授权失败");
        },
      });
    // }

  },
  // 注册，跳转到注册页
  toEnroll(e) {
    console.log('111');
    wx.navigateTo({
      url: '/pages/perfect/perfect',
    })

  },
  //跳转到服务协议
  toFwxy(){
   wx.navigateTo({
     url: '/pages/userGreement/userGreement',
   })
  },
  //跳转到隐私政策
  toYszc(){
    wx.navigateTo({
      url: '/pages/userGreement/userGreement',
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if(wx.getStorageSync('wxlogininfo').OPEN_ID){
      wx.switchTab({
        url: "/pages/home/home", //进入首页
      });
    }else{
      this.setData({
        showLogin:true
      })
    }
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
