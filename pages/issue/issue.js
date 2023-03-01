import utils from '../utils';
Page({
  data: {
    clackfirstcolor: "black", //票据
    clacksecondcolor: "black", //债券
    clackthirdlycolor: "black", //理财
    clackfourthlycolor: "black", //基金
    clackfifthcolor: "black", //存单
    clacksixthcolor: "black", //同业借款
    clackqwecolor: "black", //同业存款
    clackrtycolor: "black", //资产证券化
    clackuiocolor: "black", //银团贷款
    clackfvvbccolor: "black", //资产托管
    clackhjkcolor: "black", //信托标债
    clackkjhcolor: "black", //信托非标
    preffixUrl: utils.preffixUrl(),
    checkname: '', //是点击的名字
    first: false, //票据
    second: false, //债券
    thirdly: false, //理财
    fourthly: false, //基金
    fifth: false, //存单
    sixth: false, //同业借款
    seventh: false, //同业存款
    eighth: false, //资产证券化
    ninth: false, //银团贷款
    tenth: false, //资产托管
    eleventh: false, //信托标债
    twelfth: false, //信托非标
    checkId: '', //当前选中的id
    click: true, // 点击的状态
  },
  firstcheckT(e) { //票据
    console.log(e);
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      first: !this.data.first,
      checkId: !this.data.first?id:'',
      checkname: name,
      second: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor:  !this.data.first ? 'white':'black',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);

  },
  firstcheckF() {
    this.setData({
      first: '',
      checkId: '',
      checkname: '',
      clackfirstcolor: 'black',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标

    })
  },
  secondcheckT(e) { //债券
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      second: !this.data.second,
      checkId: !this.data.second?id :'',
      checkname: name,
      first: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: !this.data.second ? 'white':'black', //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  secondcheckF() {
    this.setData({
      second: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  thirdlycheckT(e) { //理财
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      thirdly: !this.data.thirdly,
      checkId:!this.data.thirdly? id:'',
      checkname: name,
      first: '',
      second: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: !this.data.thirdly ? 'white':'black', //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  thirdlycheckF() {
    this.setData({
      thirdly: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  fourthlycheckT(e) { //基金

    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      fourthly: !this.data.fourthly,
      checkId:!this.data.fourthly ? id:'',
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: !this.data.fourthly?'white':'black', //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  fourthlycheckF() {
    this.setData({
      fourthly: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: !this.data.fourthly ?'white' : 'black', //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  fifthcheckT(e) { //存单
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      fifth: !this.data.fifth,
      checkId:!this.data.fifth?id:'',
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fourthly: '',
      sixth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: !this.data.fifth?'white' :'black', //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  fifthcheckF() {
    this.setData({
      fifth: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  sixthcheckT(e) { //同业借款
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      sixth: !this.data.sixth,
      checkId:!this.data.sixth? id:'',
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: !this.data.sixth?'white':'black', //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  sixthcheckF() {
    this.setData({
      sixth: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  seventhcheckT(e) { //同业存款
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      seventh: !this.data.seventh,
      checkId:!this.data.seventh? id:'',
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      eighth: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: !this.data.seventh?'white':'black', //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },

  seventhcheckF() {
    this.setData({
      seventh: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  eighthcheckT(e) { //资产证券化
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      eighth: !this.data.eighth,
      checkId: !this.data.eighth?id:'',
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: !this.data.eighth?'white':'black', //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  eighthcheckF() {
    this.setData({
      eighth: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  ninthcheckT(e) { //银团贷款
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      ninth: !this.data.ninth,
      checkId:!this.data.ninth ?id:'',
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
      tenth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: !this.data.ninth?'white':'black', //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  ninthcheckF() {
    this.setData({
      ninth: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  tenthcheckT(e) { //资产托管
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      tenth: !this.data.tenth,
      checkId: id,
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      eleventh: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: !this.data.tenth?'white':'black', //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  tenthcheckF() {
    this.setData({
      tenth: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  eleventhcheckT(e) { //信托标债
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      eleventh: !this.data.eleventh,
      checkId: id,
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      tenth: '',
      twelfth: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: !this.data.eleventh?'white':'black', //信托标债
      clackkjhcolor: "black", //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  eleventhcheckF() {
    this.setData({
      eleventh: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  twelfthcheckT(e) { //信托非债
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      twelfth: !this.data.twelfth,
      checkId: id,
      checkname: name,
      first: '',
      second: '',
      thirdly: '',
      fourthly: '',
      fifth: '',
      sixth: '',
      seventh: '',
      eighth: '',
      ninth: '',
      tenth: '',
      eleventh: '',
      clackfirstcolor: "black", //票据
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: !this.data.twelfth?'white':'black', //信托非标
    })
    console.log('当前点击是--' + this.data.checkname + '--他的id是--' + this.data.checkId);
  },
  twelfthcheckF() {
    this.setData({
      twelfth: '',
      checkId: '',
      checkname: '',
      clacksecondcolor: "black", //债券
      clackthirdlycolor: "black", //理财
      clackfourthlycolor: "black", //基金
      clackfifthcolor: "black", //存单
      clacksixthcolor: "black", //同业借款
      clackqwecolor: "black", //同业存款
      clackrtycolor: "black", //资产证券化
      clackuiocolor: "black", //银团贷款
      clackfvvbccolor: "black", //资产托管
      clackhjkcolor: "black", //信托标债
      clackkjhcolor: "black", //信托非标
    })
  },
  //   点击下一步
  nextstep: function () {
    if (this.data.checkId == '') {
      wx.showModal({
        title: '请选择产品类别'
      })
      return
    }
    if (this.data.checkId == 1) {
      wx.navigateTo({
        url: '/pages/releasedeal/releasedeal',
      })
    }
    if (this.data.checkId == 0) {
      wx.navigateTo({
        url: '/pages/bill/bill',
      })
    }

    if (this.data.checkId == 2) {
      wx.navigateTo({
        url: '/pages/tradeFinance/tradeFinance',
      })
    }

    if (this.data.checkId == 3) {
      wx.navigateTo({
        url: '/pages/publicFund/publicFund',
      })
    }

    if (this.data.checkId == 4) {
      wx.navigateTo({
        url: '/pages/tradeReceipt/tradeReceipt',
      })
    }

    if (this.data.checkId == 5) {
      wx.navigateTo({
        url: '/pages/tradeBorrow/tradeBorrow',
      })
    }

    if (this.data.checkId == 6) {
      wx.navigateTo({
        url: '/pages/tradeDeposit/tradeDeposit',
      })
    }

    if (this.data.checkId == 7) {
      wx.navigateTo({
        url: '/pages/securitize/securitize',
      })
    }

    if (this.data.checkId == 8) {
      wx.navigateTo({
        url: '/pages/syndicatedLoan/syndicatedLoan',
      })
    }
    if (this.data.checkId == 9 || this.data.checkId == 10 || this.data.checkId == 11) {
      wx.showToast({
        title: '敬请期待',
        icon: 'none'
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
})
