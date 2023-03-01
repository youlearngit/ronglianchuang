// json中引入了时间控件
import utils from '../utils';
import {addOrUpdateBillBusiness,rlcuploadFile,sensitiveWord,selectRlcUserInfoList,queryWhiteOrgList} from '../../api/url'
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */

    data: {
      url:app.globalData.CDNURL,
      fileName:'',
      bgColor:'rgba(49, 126, 243, 0.5)',
      color:'#55aa00',
      uploadTask : null,
		  downloadTask:null,
	
			cubgColor: '',
			loading: false,
			value: 5,
			show: false,
			msg: '执行完毕~',
			showH5: false,
			showTip: false,
		
      list: [] ,
        isEdit:false,
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
        arr6: ["D", "M", "Y"],
        arr7: ["D", "M", "Y"],


        selectedItems: {
            item1: -1,
            item2: -1,
            item3: -1,
            item4: -1,
            item5: -1,
            item6: 0,
            item7: 0,
            item8: -1,
        },
        images: [], //存放图片
        firstvalue: '',
        tabled: '',
        BB_ID:'',

        syqxday:'',
        hgqxday:'',
        postUploadFile:'',
        base64Images:[],
        BB_ENCLOSURE:[],
        BB_ENCLOSURE_file:'',
        
        sensitiveRemark:false,

        orgNameList:[],

        personaldialog:false,
        infoList:[],
        dialog:false,
        pageNo:1,
        pageSize:10,
        choose_obj_name:'',
        PUBLISH_OBJ_CONTENT:[],
        keywords:'',
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
   
    moreRlcUser(){
      this.data.pageNo++;
      this.getSelectRlcUserInfoList();
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
    getsyqxday(e){
    this.setData({
      syqxday:e.detail.value
    })
    },
    gethgqxday(e){
      this.setData({
        hgqxday:e.detail.value
      })
      },
    // 日期筛选
    bindDateChange: function (e) {
      console.log(e)
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
            current: length,
            remark:value
        });
    },
    choose(e) { //单选
        let item = "selectedItems.item" + e.currentTarget.dataset.item;
        
        this.setData({
            [item]: parseInt(e.detail.value, 10),
           
        });
        if(e.currentTarget.dataset.item==5){
          this.setData({
            choose_obj_name:'',
            PUBLISH_OBJ_CONTENT:[],
          })
        }
        if(e.currentTarget.dataset.item==5&&this.data.selectedItems.item5==1){
          this.setData({
            dialog:true,
            choose_obj_name:'',
            PUBLISH_OBJ_CONTENT:[],
          })
        }
    
        if(e.currentTarget.dataset.item==5&&this.data.selectedItems.item5==2){
          this.setData({
            personaldialog:true,
            choose_obj_name:'',
            PUBLISH_OBJ_CONTENT:[],
          })
        }
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
    uploadImage: function (e) {
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
            BB_ENCLOSURE:del_image,
            files: []
        })
    },
    // 查看大图
    handleImagePreview(e) {
        const idx = e.target.dataset.idx
        const images = []
        this.data.BB_ENCLOSURE.forEach(item=> {
          images.push(this.data.url+item)
        });
        console.log(this.data.BB_ENCLOSURE)
        console.log(images)
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

        if(this.data.sensitiveRemark){
          wx.showToast({
              title: '您输入的备注含有敏感词',
              icon: 'none'
            })
          return
       }

        
        if (this.data.selectedItems.item1 === -1) {
            wx.showToast({
                title: "请选择业务类型",
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

        if (this.data.selectedItems.item6 === -1) {
          wx.showToast({
              title: "请输入剩余期限",
              icon: "none",
              duration: 1500,
          });
          return;
      }

      if (!this.data.syqxday) {
        wx.showToast({
            title: "请输入剩余期限",
            icon: "none",
            duration: 1500,
        });
        return;
    }


        // if (!e.currentTarget.dataset.fbunddate) {
        //     wx.showToast({
        //         title: '请输入剩余期限',
        //         icon: "none",
        //         duration: 1500,
        //     });
        //     return
        // }
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
        if (this.data.selectedItems.item5==1 && this.data.PUBLISH_OBJ_CONTENT.length==0) {
          wx.showToast({
              title: "请选择定向机构",
              icon: "none",
              duration: 1500,
          });
          return;
      }

      if (this.data.selectedItems.item5==2 && this.data.PUBLISH_OBJ_CONTENT.length==0) {
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
          BB_BUSINESS_TYPE:this.data.arr[this.data.selectedItems.item1],
          BB_TRANSACTION:this.data.arr2[this.data.selectedItems.item2],
          BB_BILL_TYPE:this.data.arr3[this.data.selectedItems.item3],
          BB_CREDIT_SUBJECT:this.data.arr4[this.data.selectedItems.item4],
          BB_PUBLISH_OBJ:this.data.arr5[this.data.selectedItems.item5],
          BB_RESIDUAL_MATURITY:this.data.syqxday + '-'+ this.data.arr6[this.data.selectedItems.item6],
          BB_REPO_TERM:this.data.hgqxday+ '-' +this.data.arr7[this.data.selectedItems.item7],  
          BB_INTEREST_RATE:this.data.shouqi,
          BB_MATURITY_RATE:this.data.daoqi,
          BB_AMOUNT:this.data.money,
          BB_REMARKS:this.data.remark,
          BB_ENCLOSURE:this.data.BB_ENCLOSURE.join(','),
          OPEN_ID:wx.getStorageSync('wxlogininfo').OPEN_ID,
          PUBLISH_OBJ_CONTENT:this.data.PUBLISH_OBJ_CONTENT.join(',')

        }
        if(this.data.isEdit){
          data.BB_ID=this.data.BB_ID
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
                        url: '/subpack/success/success?type=bill',
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
      this.getSelectRlcUserInfoList()
      this.getQueryWhiteOrgList()
      
     if(options.info){
       let info = JSON.parse(options.info)
       
       console.log(info)
       let selectedItems={
        item1: -1,
        item2: -1,
        item3: -1,
        item4: -1,
        item5: -1,

        item6: 0,
        item7: 0
       }

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
       

      this.data.arr6.forEach((item,index)=>{
        if(item==info.BB_RESIDUAL_MATURITY.split('-')[1]){
           //this.data.selectedItems.item5=index
          selectedItems.item6=index
           
        }
      })
      
      if(info.BB_REPO_TERM){
        this.data.arr7.forEach((item,index)=>{
          if(item==info.BB_REPO_TERM.split('-')[1]){
             //this.data.selectedItems.item5=index
            selectedItems.item7=index
             
          }
        })
      }
      

        this.data.arr.map((item,index)=>{
          if(item==info.BB_BUSINESS_TYPE){
            console.log(index)
            selectedItems.item1=index
          }
        })

        this.data.arr2.map((item2,index2)=>{

        
          if(item2==info.BB_TRANSACTION){
            selectedItems.item2=index2
          }
        })

        this.data.arr3.map((item,index)=>{
         
          if(item==info.BB_BILL_TYPE){
            selectedItems.item3=index    
          }
        })

        this.data.arr4.forEach((item,index)=>{
          if(item==info.BB_CREDIT_SUBJECT){
             //this.data.selectedItems.item4=index
            selectedItems.item4=index
             
          }
        })

        this.data.arr5.forEach((item,index)=>{
          if(item==info.BB_PUBLISH_OBJ){
             //this.data.selectedItems.item5=index
            selectedItems.item5=index
             
          }
        })
        console.log(selectedItems)
        
        this.setData({
        // BB_RESIDUAL_MATURITY:this.data.fbundDate,
        // BB_REPO_TERM:this.data.currentDate,  
        // BB_INTEREST_RATE:this.data.shouqi,
        // BB_MATURITY_RATE:this.data.daoqi,
        // BB_AMOUNT:this.data.money,
        // BB_REMARKS:this.data.remark
        selectedItems:selectedItems,
        fbundDate:info.BB_RESIDUAL_MATURITY,
        currentDate:info.BB_REPO_TERM,
        shouqi:info.BB_INTEREST_RATE,
        daoqi:info.BB_MATURITY_RATE,
        money:info.BB_AMOUNT,
        remark:info.BB_REMARKS,
        fbundentub:true,
        entub:true,
        current:info.BB_REMARKS.length,
        isEdit:true,
        BB_ID:info.BB_ID,

        syqxday:info.BB_RESIDUAL_MATURITY.split('-')[0],

        hgqxday:info.BB_REPO_TERM.split('-')[0]
        })
        

     }
     this.setData({
       fileName:this.data.fileName
     })

     if(this.data.selectedItems.item5==1){
      this.setData({
        dialog:true
      })
    }

    if(this.data.selectedItems.item5==2){
      this.setData({
        personaldialog:true
      })
    }
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
   parseFileToBase64() {
      // 获取到文件对象
      var file = this.files[0];
      // 获取FileReader实例
      var reader = new FileReader();
      // 将文件加载进入
      reader.readAsDataURL(file);
      reader.onload = function (e) { 
          // 转换完成输出该文件base64编码
          console.log(this.result);
      }
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
					this.setdefUI();
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
    handleWXUpload({url,name = 'file',header,addName,addSize,...formData} = {},tempFile) {
      let opt = {url,name,formData,header,filePath:tempFile.path};
      
      console.log(opt)

			if (addName) {opt.formData[addName] = tempFile.name;}
			if (addSize) {opt.formData[addSize] = tempFile.size;}
			let fileName = tempFile.name;
			opt['fail'] = (e) => {
				this.data.showTip = false;
				return this.errorHandler('文件上传失败',this.upErr)
			};
			opt['success'] = (res) => {
      console.log(res)

				if (res.statusCode==200) {
					let data = JSON.parse(res.data);
					//可自行添加后台返回状态验证
					// return this.onCommit(this.$emit('up-success',{fileName,size:tempFile.size,data}));
				}
				return this.errorHandler('文件上传失败',this.upErr);
      };
			this.data.showTip = true;
			this.data.uploadTask = wx.uploadFile(opt);
			this.data.uploadTask&&this.data.uploadTask.onProgressUpdate(({progress = 0}) => {
				if (progress <= 100) {
					this.data.value = progress;
					//this.$forceUpdate();
				}
			});
		},
    setdefUI() {
			this.data.cubgColor = this.data.bgColor;
			this.data.value = 0;
			this.data.loading = true;
			this.data.show = true;
		},
    errorHandler(errText,reject) {
			this.data.msg = errText;
			this.data.loading = false;
			this.data.cubgColor = 'rgba(229, 77, 66, 0.5)';
			this.data.uploadTask = null;
			this.data.downloadTask = null;
			setTimeout(()=>{this.data.show = false;},1500);
			return reject(errText);
		},
    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
