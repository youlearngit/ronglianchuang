// pages/perfect/perfect.js
import utils from '../utils';
import {completeUserInfo} from '../../api/izational'
import {sensitiveWord,sendMsg,checkMsg,rlcUserInfoimage} from '../../api/url'

var countdown = 60;
var settime = function (that) {
  if (countdown == 0) {
    that.setData({
      is_show: false
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      is_show: true,
      last_time: countdown
    })

    countdown--;
  }
  that.data.timer = setTimeout(function () {
    settime(that)
  }
    , 1000)
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_show: false,
        vercode: "", // 验证码,@String
        timer: null, // 计时器,@Function
        verCodeBtnLoading: false, // 是否显示加载图标,@Boolean
        time: 60, // 倒计时60S,@Number
        beginning: false, // 显示倒计时,@Boolean
        preffixUrl: utils.preffixUrl(),
        OPEN_ID:'', //微信唯一编码
        RLC_USER_NAME:'', //用户名
        ORG_NAME:'', //机构名称
        FIRST_DEPT:'', //所属一级部门
        SECOND_DEPT:'', //所属二级部门
        THIRD_DEPT:'', //所属三级部门
        POSITION:'', //职务
        MOBILE:'', //手机号码
        PHONE:'', //固定电话
        EMAIL:'', //邮箱
        ORG_ADDR:'', //机构地址
        REFERRER_NUM:'', //"推荐人工号
        REFERRER_NUM_EDIT:false,//是否可编辑
        perfectList: [{
            redDot:'*',
            name: '姓名'
        }, {
            redDot:'*',
            name: '机构名称'
        }, {
            redDot:'*',
            name: '所属部门（一级部）'
        }, {
            name: '所属部门（二级部/团队/科室/中心）'
        },  {
            name: '所属部门（三级部/团队/科室/中心）'
        },{
            redDot:'*',
            name: '职务'
        }, {
            redDot:'*',
            name: '手机号码'
        },{
            name: '固定电话'
        },{
            name: '邮箱'
        },{
            name: '机构地址'
        },{
            name: '推荐人员工号'
        },],
        onRuted:'',//姓名
        onReadjg:'',//机构名称
        onReadbm:'',//所属部门（一级部）
        onReadzw:'',//职务
        onReadhm:'',//手机号码
        isShowOrgName:false,
        orgNameList:[],
        sensitiveName:false,//姓名
        sensitivejg:false,//机构名称
        sensitivebm:false,//所属部门(一级)
        sensitivejbm:false,//所属部门(二级)
        sensitivsjbm:false,//所属部门(三级)
        sensitivjgdz:false,//机构地址
        sensitivezw:false,//职务,
        codeNo:'',
        timer: null, // 计时器,@Function
        fuzzyList:[]
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
             wx.showLoading({
               title: '识别中',
               icon:'none'
             })
              rlcUserInfoimage({imageBase:base64}).then(res => {
               
                console.log(res);
                if(JSON.parse(res.resultVo).code==1){
                 let info=JSON.parse(res.resultVo).data
                  console.log(info);
                 let reg = new RegExp("-","g"); 
                 this.setData({
                  RLC_USER_NAME:info[0].NAME.replace(/\s/g,''),
                  FIRST_DEPT:info[0].DEPARTMENT.replace(/\s/g,''),
                  POSITION:info[0].JOB.replace(/\s/g,''),
                  MOBILE:info[0].MPHONE.replace('+86','').replace(/\s/g,'').replace(reg,''),
                  PHONE:info[0].PHONE.replace(/\s/g,'').replace(reg,''),
                  EMAIL:info[0].EMAIL.replace(/\s/g,''),
                  ORG_ADDR:info[0].ADDRESS.replace(/\s/g,''),
                  ORG_NAME:info[0].COMPANY.replace(/\s/g,'')
                 })
                }
              wx.hideLoading()
              }).catch(e=>{
                console.log(e)
                wx.showToast({
                  title:'识别失败',
                  icon:'none'
                })
              wx.hideLoading()

              })
            }
              // const images = this.data.images.concat(res.tempFilePaths)
              // this.setData({
              //     images: images
              // })
          }
      })

  },
    getcodeNo(e){
      this.setData({
        codeNo:e.detail.value
      })
    },
    getbindblur(e){
      console.log(e)
    this.setData({
      isShowOrgName:false
    })
    },
    getbindfocus(){
     this.setData({
       isShowOrgName:true
     })
    },
    
     /**
       * @event 发送验证码
       */
      handleSendVerCode() {
       let that=this
        countdown=60
       if(this.data.MOBILE == ''){
        wx.showLoading({
          title: '请先输入手机号',
          duration: 1000
        })
        return
    }
      if(!(/^1[34578]\d{9}$/.test(this.data.MOBILE)) || this.data.MOBILE.length != 11){
          wx.showToast({
            title: '请输入正确的手机号',
            icon:'none'
          })
          return
      }
      
      if(this.data.openId == ''){
        wx.showToast({
          title: '登录失效,请先登录',
          icon:'none'
        })
        setTimeout(()=>{
         wx.reLaunch({
           url: '/pages/login/login',
         })
        },500)
        return
    }

    if(!wx.getStorageSync('wxlogininfo').OPEN_ID){
      wx.showToast({
        title: '登录失效,请先登录',
        icon:'none'
      })
      setTimeout(()=>{
       wx.reLaunch({
         url: '/pages/login/login',
       })
      },500)
      return
  }

      let data={
        openId:this.data.OPEN_ID,
        phone:this.data.MOBILE
      }
      console.log(data)

      console.log(wx.getStorageSync('wxlogininfo'))

      sendMsg(data).then(res => {
        console.log(res)  
        if(res.STATUS==='1'){
         wx.showToast({
           title: '发送成功',
           icon:'none'
         })
         that.setData({
          is_show: (!that.data.is_show)  //false
        })
         clearTimeout(this.data.timer)
         settime(that);
        }
      }).catch(e=>{
        console.log(e)
        wx.showToast({
          title: e,
          icon:'none'
        })
      })
    
      },
    // 姓名
    onRuend:function(e){
      console.log(e)
      sensitiveWord({TEXT:e.detail.value}).then(res => {
        console.log(res)  
        if(res.RESULT!=='OK'){
          this.setData({
            sensitiveName:true
          })
        }else{
          this.setData({
            sensitiveName:false
          })
        }
      }).catch(e=>{
        console.log(e)
      })
        this.setData({
          RLC_USER_NAME:e.detail.value
        })
    },
    // 机构名称
    onReadcoun:function(e){
      console.log(e)
      sensitiveWord({TEXT:e.detail.value}).then(res => {
        console.log(res)  
        if(res.RESULT!=='OK'){
          this.setData({
            sensitivejg:true
          })
        }else{
          this.setData({
            sensitivejg:false
          })
        }
      }).catch(e=>{
        console.log(e)
      })
      let fuzzyList=[]
      this.data.orgNameList.forEach(item=>{
        if(item.ORG_NAME.includes(e.detail.value)){
          fuzzyList.push(item)
        }
      })
        this.setData({
          ORG_NAME:e.detail.value,
          fuzzyList:fuzzyList
        })
    },
    // 所属部门
    onReacdbm:function(e){

      sensitiveWord({TEXT:e.detail.value}).then(res => {
        console.log(res)  
        if(res.RESULT!=='OK'){
          this.setData({
            sensitivebm:true
          })
        }else{
          this.setData({
            sensitivebm:false
          })
        }
      }).catch(e=>{
        console.log(e)
      })
        this.setData({
          FIRST_DEPT:e.detail.value
        })
    },
    onReacdse:function(e){
      sensitiveWord({TEXT:e.detail.value}).then(res => {
        console.log(res)  
        if(res.RESULT!=='OK'){
          this.setData({
            sensitivejbm:true
          })
        }else{
          this.setData({
            sensitivejbm:false
          })
        }
      }).catch(e=>{
        console.log(e)
      })
      this.setData({
        SECOND_DEPT:e.detail.value
      })
  },
  onReacdth:function(e){
    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitivsjbm:true
        })
      }else{
        this.setData({
          sensitivsjbm:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })
    this.setData({
      THIRD_DEPT:e.detail.value
    })
},
    // 职务
    onReactzw:function(e){
      sensitiveWord({TEXT:e.detail.value}).then(res => {
        console.log(res)  
        if(res.RESULT!=='OK'){
          this.setData({
            sensitivezw:true
          })
        }else{
          this.setData({
            sensitivezw:false
          })
        }
      }).catch(e=>{
        console.log(e)
      })
        this.setData({
          POSITION:e.detail.value
        })
    },
    // 手机号码
    onReadsjhm:function(e){
        this.setData({
          MOBILE:e.detail.value
        })
    },

    gddh:function(e){
      this.setData({
        PHONE:e.detail.value
      })
  },
  youxiang(e){
    this.setData({
      EMAIL:e.detail.value
    })
  },
  jgdz(e){
    sensitiveWord({TEXT:e.detail.value}).then(res => {
      console.log(res)  
      if(res.RESULT!=='OK'){
        this.setData({
          sensitivjgdz:true
        })
      }else{
        this.setData({
          sensitivjgdz:false
        })
      }
    }).catch(e=>{
      console.log(e)
    })
    this.setData({
      ORG_ADDR:e.detail.value
    })
  },
  tjygh(e){
    this.setData({
      REFERRER_NUM:e.detail.value
    })
  },
  checkSensitiveWord(){
    completeUserInfo().then(res => {
     
      wx.showToast({
        title: '提交成功',
        icon:'none'
      })
    }).catch(e=>{
      console.log(e)
    })
  },
    // 点击注册按钮
    onReadzc:function(){
      if(this.data.sensitiveName){
        wx.showToast({
               title: '请输入的姓名含有敏感词',
               icon: 'none'
             })
           return
        }

        if(this.data.sensitivejg){
          wx.showToast({
              title: '请输入的机构名称含有敏感词',
              icon: 'none'
            })
          return
       }

       if(this.data.sensitivebm){
        wx.showToast({
            title: '请输入的所属部门(一级部)含有敏感词',
            icon: 'none'
          })
        return
     }
     if(this.data.sensitivejbm){
      wx.showToast({
          title: '请输入的所属部门(二级部)含有敏感词',
          icon: 'none'
        })
      return
      }

      if(this.data.sensitivsjbm){
        wx.showToast({
            title: '请输入的所属部门(三级部)含有敏感词',
            icon: 'none'
          })
        return
        }

        if(this.data.sensitivezw){
          wx.showToast({
              title: '请输入的职务含有敏感词',
              icon: 'none'
            })
          return
          }

          if(this.data.sensitivjgdz){
            wx.showToast({
                title: '请输入的机构地址含有敏感词',
                icon: 'none'
              })
            return
            }

        if(!this.data.RLC_USER_NAME){
            wx.showLoading({
              title: '请输入姓名',
              duration: 1000
            })
            return
        }
        if(!this.data.ORG_NAME){
            wx.showLoading({
                title: '请输入机构名称',
                duration: 1000
              })
              return
        }
        if(!this.data.FIRST_DEPT){
          wx.showToast({
                title: '请输入所属部门(一级部)',
                icon: 'none'
              })
              return
        }
        if(!this.data.POSITION){
            wx.showLoading({
                title: '请输入职务',
                duration: 1000
              })
              return
        }
        if(this.data.MOBILE == ''){
          wx.showLoading({
            title: '请先输入手机号',
            duration: 1000
          })
          return
      }
        if(!(/^1[34578]\d{9}$/.test(this.data.MOBILE)) || this.data.MOBILE.length != 11){
            wx.showToast({
              title: '请输入正确的手机号',
              icon:'none'
            })
            return
        }
        if(!this.data.codeNo){
          wx.showLoading({
            title: '请先输入验证码',
            duration: 1000,
            mask:true
          })
          return
      }

        var data = {
        OPEN_ID:this.data.OPEN_ID, //微信唯一编码
        RLC_USER_NAME:this.data.RLC_USER_NAME, //用户名
        ORG_NAME:this.data.ORG_NAME, //机构名称
        FIRST_DEPT:this.data.FIRST_DEPT, //所属一级部门
        SECOND_DEPT:this.data.SECOND_DEPT, //所属二级部门
        THIRD_DEPT:this.data.THIRD_DEPT, //所属三级部门
        POSITION:this.data.POSITION, //职务
        MOBILE:this.data.MOBILE, //手机号码
        PHONE:this.data.PHONE, //固定电话
        EMAIL:this.data.EMAIL, //邮箱
        ORG_ADDR:this.data.ORG_ADDR, //机构地址
        REFERRER_NUM:this.data.REFERRER_NUM, //"推荐人工号
        }
        console.log(data);
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        checkMsg({phone:this.data.MOBILE,codeNo:this.data.codeNo}).then(res => {
          console.log(res)  
          //为了拦截测试，取消拦截验证码
          // if(false){
          if((JSON.parse(res.resultVo).code)==0){
            wx.showToast({
                title: JSON.parse(res.resultVo).msg,
                icon:'none'
            })       
          }else{
            completeUserInfo(data).then(res => {
              console.log(data);
              console.log(res);
              let wxlogininfo = wx.getStorageSync('wxlogininfo')
              wxlogininfo.REGISTER_STATUS='1'
              wx.setStorageSync('wxlogininfo', wxlogininfo);
              wx.showToast({
                title: '提交成功',
                icon:'none'
              })
             setTimeout(()=>{
              wx.switchTab({
                url: "/pages/home/home", //进入首页
              });
             },1000)
            }).catch(e=>{
              console.log(e)
            })
           wx.hideLoading({
             success: (res) => {},
           })
          }
        }).catch(e=>{
          console.log(e)
          wx.showToast({
            title: e,
            icon:'none'
          })
          return
        })
      
       

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    console.log(options)
    this.setData({
      OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID
    })
    
     if(wx.getStorageSync('wxlogininfo').LIST){
       this.setData({
         orgNameList:wx.getStorageSync('wxlogininfo').LIST
       })
     }
     
     if(wx.getStorageSync('userInfo')){
       let info=wx.getStorageSync('userInfo')
       if(info.REFERRER_NUM){
        this.setData({
          REFERRER_NUM_EDIT:true
        })
      }
       this.setData({
        RLC_USER_NAME:info.RLC_USER_NAME,
        ORG_NAME:info.ORG_NAME, //机构名称
        FIRST_DEPT:info.FIRST_DEPT, //所属一级部门
        SECOND_DEPT:info.SECOND_DEPT, //所属二级部门
        THIRD_DEPT:info.THIRD_DEPT, //所属三级部门
        POSITION:info.POSITION, //职务
        MOBILE:info.MOBILE, //手机号码
        PHONE:info.PHONE, //固定电话
        EMAIL:info.EMAIL, //邮箱
        ORG_ADDR:info.ORG_ADDR, //机构地址
        REFERRER_NUM:info.REFERRER_NUM, //"推荐人工号
       })
     }
    },

    get_ORG_NAME(e){
      console.log(e)
      this.setData({
        ORG_NAME:e.currentTarget.dataset.name,
        isShowOrgName:false
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
      clearTimeout(this.data.timer)
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
