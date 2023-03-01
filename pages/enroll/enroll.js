// pages/enroll/enroll.js
import utils from '../utils';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl(),
    //设置初始的状态、包含字体、颜色、还有等待事件
    sendTime: '获取验证码',
    sendColor: '#363636',
    snsMsgWait: 60,
    ondelete: '', //手机号
    onedub: '', //短信验证码
  },
  // 手机号
  onRechto: function (e) {
    this.setData({
      ondelete: e.detail.value
    })
  },
  // 输入的验证码
  onRechun: function (e) {
    console.log(e.detail.value);
    const onedub = e.detail.value
    this.setData({
      onedub
    })
  },
  // 获取验证码
  sendCode: function () {
    if (!(/^1[34578]\d{9}$/.test(this.data.ondelete)) || this.data.ondelete.length != 11 || this.data.ondelete == '') {
      wx.showToast({
        title: '请先输入手机号',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    // 60秒后重新获取验证码
    var inter = setInterval(function () {
      this.setData({
        smsFlag: true,
        sendColor: '#cccccc',
        sendTime: this.data.snsMsgWait + 's后重新发送',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#363636',
          sendTime: '获取验证码',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
  },

  // 下一步，跳转到完善信息页
  toPerfect() {
    console.log(this.data.ondelete);
    if ((/^1[34578]\d{9}$/.test(this.data.ondelete)) && this.data.ondelete.length === 11 && this.data.onedub!='') {
      wx.navigateTo({
        url: '/pages/perfect/perfect',
      })
    } else if(!(/^1[34578]\d{9}$/.test(this.data.ondelete)) || this.data.ondelete.length != 11 ){
      wx.showToast({
        title: '手机号不正确',
      })

    }else if(this.data.onedub==''){
      wx.showToast({
        title: '请输入验证码',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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