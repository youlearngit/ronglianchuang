// json中引入了时间控件
import utils from '../utils';
import {addOrUpdateBillBusiness} from '../../api/url'
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */

    data: {
      // 上传接口参数
      option: {
        // 上传服务器地址，此地址需要替换为你的接口地址
        url: 'http://hl.j56.com/dropbox/document/upload',
        // 上传附件的key
        name: 'file',
        // 根据你接口需求自定义请求头,默认不要写content-type,让浏览器自适配
        header: {
          // 示例参数可删除
          'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsI',
          'uid': '27682',
          'client': 'app',
          'accountid': 'DP' },

        // 根据你接口需求自定义body参数
        formData: {
          // 'orderId': 1000
        } },

      // 选择文件后是否立即自动上传，true=选择后立即上传
      instantly: true,
      // 必传宽高且宽高应与slot宽高保持一致
      width: '180rpx',
      height: '180rpx',
      // 限制允许上传的格式，空串=不限制，默认为空
      formats: '',
      // 文件上传大小限制
      size: 30,
      // 文件回显列表
      files: new Map(),
      // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道
      wxFiles: [],
      // 是否打印日志
      debug: true,


      // 演示用
      tabIndex: 0,
      list: [] ,
        remark:'',
        daoqi:"",//到期
        money:"",//钱
        shouqi: "", // 首期
        disabled: true, //是否禁用
        preffixUrl: utils.preffixUrl(),
        currentDate: utils.getNowDate(new Date()), // 日期筛选
        fundDate: utils.getNowDate(new Date()), // 日期筛选
        fbundDate: utils.getNowDate(new Date()), // 日期筛选
        funudDate: utils.getNowDate(new Date()), // 日期筛选
        futitDate: utils.getNowDate(new Date()), // 日期筛选
        entub: false,
        fontentub: false,
        fbundentub: false,
        enbutub: false,
        entittub: false,
        current: 0, // 字数限制
        max: 20, // 字数限制
        // 以下是请选择单选
        tabs: ["信用债", "金融债", "利率债"],
        currentIndex: 0,
        arr: ["转贴现", "质押式回购", "买断式回购"],
        arr2: ["买入", "卖出"],
        arr3: ["电银", "电商", "纸银", "纸商"],
        arr4: ["国股", "大城商", "小城商", "三农", "其他"],
        arr5: ["公开", "定向机构", "定向个人"],
        selectedItems: {
            item1: -1,
            item2: -1,
            item3: -1,
            item4: -1,
            item5: -1,
            item6: -1,
            item7: -1,
            item8: -1,
        },
        images: [], //存放图片
        firstvalue: '',
        tabled: '',
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
            fundDate: e.detail.value
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
            funudDate: e.detail.value
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
      console.log(e)
        var value = e.detail.value;
        var length = parseInt(value.length);

        if (length > this.data.noteMaxLen) {
            return;
        }

        this.setData({
            current: length,
            remark:value
        });
    },
    choose(e) { //单选
        let item = "selectedItems.item" + e.currentTarget.dataset.item;
        
        this.setData({
            [item]: parseInt(e.detail.value, 10),
        });
        // var item1=this.data.selectedItems.item1
        // var item1=this.data.selectedItems.item2
        // var item1=this.data.selectedItems.item3
        // var item1=this.data.selectedItems.item4
        // if(item1 != '-1'){
        //     this.setData({
        //         disabled:false
        //     })
        // }
        console.log(e)
        console.log(this.data.selectedItems.item1+1);
    },
    // 输入数字
    handleInput(e) {
        let firstvalue = this.validateNumber(e.detail.value)
        this.setData({
            firstvalue: firstvalue
        })
    },
    hendllInput(e) {
        let tabled = this.validateNumber(e.detail.value)
        this.setData({
            tabled: tabled
        })
    },
    validateNumber(val) {
        return val.replace(/\D/g, '')
    },
    // 上传图片
    //点击添加按钮选择图片
    uploadFile: function (e) {
        wx.chooseImage({
            sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
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
        this.data.images.splice(idx, 1);
        var del_image = this.data.images;
        this.setData({
            images: del_image,
            files: []
        })
    },
    // 查看大图
    handleImagePreview(e) {
        const idx = e.target.dataset.idx
        const images = this.data.images
        wx.previewImage({
            current: images[idx], //当前预览的图片
            urls: images, //所有要预览的图片
        })
    },
    getshouqinum(e) {
        console.log(e.detail.value); //这个是首期利率
        this.setData({
            shouqi: e.detail.value
        })
    },
    getdaoqinum(e) {
      console.log(e.detail.value); //这个是到期利率
      this.setData({
          daoqi: e.detail.value
      })
  },
    getmoney(e){
      console.log(e)
        this.setData({
            money:e.detail.value
        })
    },
    creditdebt(e) { //信用债最后点击提交时
        console.log(e);
        console.log(e.currentTarget.dataset.fbunddate);
        // wx.navigateTo({
        //   url: '/subpack/success/success',
        // })
        let shouqi = this.data.shouqi
        let money = this.data.money
        console.log(shouqi);
        console.log(this.data.selectedItems)

        
        if (this.data.selectedItems.item1 === -1) {
            wx.showToast({
                title: "请选择业务票据",
                icon: "none",
                duration: 1500,
            });
            return;
        }
        if (this.data.selectedItems.item2 === -1) {
            wx.showToast({
                title: "请选择交易方向",
                icon: "none",
                duration: 1500,
            });
            return;
        }
        if (this.data.selectedItems.item3 === -1) {
            wx.showToast({
                title: "请选择票据类型",
                icon: "none",
                duration: 1500,
            });
            return;
        }
        if (this.data.selectedItems.item4 === -1) {
            wx.showToast({
                title: "请选择信用主体",
                icon: "none",
                duration: 1500,
            });
            return;
        }
        if (!e.currentTarget.dataset.fbunddate) {
            wx.showToast({
                title: '请输入剩余期限',
                icon: "none",
                duration: 1500,
            });
            return
        }
        if (!shouqi) {
            wx.showToast({
                title: '请输入正确的首期利率',
                icon: "none",
                duration: 1500,
            })
        }
        if (!money) {
            wx.showToast({
                title: '请输入正确的金额',
                icon: "none",
                duration: 1500,
            })
        }
        if (this.data.tabled && this.data.firstvalue) {
            if (this.data.firstvalue > 100 || this.data.tabled > 100) {
                wx.showToast({
                    title: '请输入正确的利率区间',
                    icon: "none",
                    duration: 1500,
                })
                return
            }
            if (this.data.firstvalue > this.data.tabled) {
                wx.showToast({
                    title: '请输入正确的利率区间',
                    icon: "none",
                    duration: 1500,
                })
                return
            }
        }
        let data={
          BB_BUSINESS_TYPE:this.data.arr[this.data.selectedItems.item1],
          BB_TRANSACTION:this.data.arr2[this.data.selectedItems.item2],
          BB_BILL_TYPE:this.data.arr3[this.data.selectedItems.item3],
          BB_RESIDUAL_MATURITY:this.data.fbundDate,
          BB_REPO_TERM:this.data.currentDate,
          BB_CREDIT_SUBJECT:this.data.arr4[this.data.selectedItems.item4],
          BB_INTEREST_RATE:this.data.shouqi,
          BB_MATURITY_RATE:this.data.daoqi,
          BB_AMOUNT:this.data.money,
          BB_REMARKS:this.data.remark,
          BB_PUBLISH_OBJ:this.data.arr5[this.data.selectedItems.item5]
        }
        
       console.log(data)
        addOrUpdateBillBusiness(data).then(res => {
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
        })
        // if(this.data.selectedItems.item1!=-1&&this.data.selectedItems.item2!=-1&&this.data.selectedItems.item3!=3&&this.data.selectedItems.item4!=-1&&e.currentTarget.dataset.fbunddate&&shouqi&&money){
        //     wx.showToast({
        //       title: '发布成功',
        //       duration:1500,
        //       success:function(){
        //         setTimeout(function(){
                  
        //         },1500)
        //       }
        //     })
        // }


    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    // 某文件上传结束回调(成功失败都回调)
    onuploadEnd: function onuploadEnd(item) {
      console.log("".concat(item.name, "\u5DF2\u4E0A\u4F20\u7ED3\u675F\uFF0C\u4E0A\u4F20\u72B6\u6001=").concat(item.type));

      // 更新当前状态变化的文件
      this.files.set(item.name, item);

      // 演示上传完成后取服务端数据
      if (item['responseText']) {
        console.log('演示服务器返回的字符串JSON转对象');
        this.files.get(item.name).responseText = JSON.parse(item.responseText);
      }

      // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道

      this.wxFiles = _toConsumableArray(this.files.values());


      // 强制更新视图
      this.$forceUpdate();


      // ---可删除--演示判断是否所有文件均已上传成功
      var isAll = _toConsumableArray(this.files.values()).find(function (item) {return item.type !== 'success';});
      if (!isAll) {
        console.log('已全部上传完毕');
      } else
      {
        console.log(isAll.name + '待上传');
      }

    },
    // 上传进度回调
    onprogress: function onprogress(item) {
      // 更新当前状态变化的文件
      this.files.set(item.name, item);

      console.log('打印对象', JSON.stringify(this.files.get(item.name)));
      // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道

      this.wxFiles = _toConsumableArray(this.files.values());


      // 强制更新视图
      this.$forceUpdate();

    },
    // 文件选择回调
    onChange: function onChange(files) {
      // 更新选择的文件 
      this.files = files;
      // 强制更新视图
      this.$forceUpdate();

      // 微信小程序Map对象for循环不显示，所以转成普通数组，不要问为什么，我也不知道

      this.wxFiles = _toConsumableArray(this.files.values());

    },
    // 手动上传
    upload: function upload() {
      // name=指定文件名，不指定则上传所有type等于waiting和fail的文件
      this.$refs['lsjUpload' + this.tabIndex].upload();
    },
    // 移除某个文件
    clear: function clear(name) {
      // name=指定文件名，不传name默认移除所有文件
      this.$refs['lsjUpload' + this.tabIndex].clear(name);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})