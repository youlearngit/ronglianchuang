// custom-tab-bar/index.js
Component({
    /**
     * 组件的初始数据
     */
    data: {
        selected: 0, // 当前选中的下标
        color: '#3E415C', // tabbar 未选中字体的颜色
        selectedColor: "#4181FC", // tabbar 选中字体的颜色
        list: [ // tababr 循环数据集
            {
                "pagePath": "/pages/home/home",
                "iconPath": "/assets/tabBar/home.png",
                "selectedIconPath": "/assets/tabBar/home_active.png",
                "text": "首页"
            },
            {
                "iconPath": "/assets/tabBar/issue.png",
                "selectedIconPath": "/assets/tabBar/issue.png",
                "pagePath": "/pages/issue/issue",
                "text": "交易发布",
                "isSpecial": true
            },
            {
                "pagePath": "/pages/my/my",
                "iconPath": "/assets/tabBar/my.png",
                "selectedIconPath": "/assets/tabBar/my_active.png",
                "text": "我的"
            }
        ]
    },
    
    attached() {},
    onLoad: function (options) {
        console.log(options.newindex);
        this.setData({
            selected: options.newindex
        })
    },
    methods: {
        switchTab(e) {
            let data = e.currentTarget.dataset;
            console.log(data.path);
                 this.setData({
                     selected: data.index
                 })
                if(data.index=='0'){
                    wx.switchTab({
                      url: '/pages/home/home',
                    })
                }
                 if(data.index=='1'){
                    console.log(1111);

                    if(!wx.getStorageSync('wxlogininfo')){
                      wx.navigateTo({
                        url: '/pages/login/login',
                      })
                      return
                    }

                    if(wx.getStorageSync('wxlogininfo').REGISTER_STATUS==='0'){
                      wx.navigateTo({
                        url: '/pages/registration/registration',
                      })
                      return
                    }
                    if(wx.getStorageSync('wxlogininfo').AUDIT_FLAG==='0'){
                      wx.showToast({
                        title: '您注册的信息正在审核中,请耐心等待',
                        icon:'none'
                      })
                      return
                    }
                     wx.switchTab({
                       url: '/pages/issue/issue',
                     })
                 }
                 if(data.index=='2'){
                     console.log(2222);
                     if(!wx.getStorageSync('wxlogininfo')){
                      wx.navigateTo({
                        url: '/pages/login/login',
                      })
                      return
                    }
                     if(wx.getStorageSync('wxlogininfo').REGISTER_STATUS==='0'){
                      wx.navigateTo({
                        url: '/pages/registration/registration',
                      })
                      return
                    }
                    if(wx.getStorageSync('wxlogininfo').AUDIT_FLAG==='0'){
                      wx.showToast({
                        title: '您注册的信息正在审核中,请耐心等待',
                        icon:'none'
                      })
                      return
                    }
                     wx.switchTab({
                       url: '/pages/my/my',
                     })  
                 }
        }
    }
})