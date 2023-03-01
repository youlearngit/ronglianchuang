import utils from '../utils';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    preffixUrl: utils.preffixUrl(),
    checkname:'',//是点击的名字
    first: false,//票据
    second:false,//债券
    thirdly:false,//理财
    fourthly:false,//基金
    fifth:false,//存单
    sixth:false,//同业借款
    seventh:false,//同业存款
    eighth:false,//资产证券化
    ninth:false,//银团贷款
    tenth:false,//资产托管
    eleventh:false,//信托标债
    twelfth:false,//信托非标
    checkId: '', //当前选中的id
    click: true, // 点击的状态
  },
  firstcheckT(e) {//票据
    console.log(e);
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      first: !this.data.first,
      checkId: id,
      checkname:name,
      second:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
    
  },
  firstcheckF() {
    this.setData({
      first:'',
      checkId: '',
      checkname:''
    })
  },
  secondcheckT(e) {//债券
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      second: !this.data.second,
      checkId: id,
      checkname:name,
      first:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  secondcheckF() {
    this.setData({
        second: '',
        checkId: '',
        checkname:''
    })
  },
 thirdlycheckT(e) {//理财
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
    thirdly: !this.data.thirdly,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  thirdlycheckF() {
    this.setData({
        thirdly: '',
        checkId: '',
        checkname:''
    })
  },
  fourthlycheckT(e) {//基金
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      fourthly: !this.data.fourthly,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  fourthlycheckF() {
    this.setData({
        fourthly: '',
        checkId: '',
        checkname:''
    })
  },
  fifthcheckT(e) {//存单
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      fifth: !this.data.fifth,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fourthly:'',
      sixth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  fifthcheckF() {
    this.setData({
        fifth: '',
        checkId: '',
        checkname:''
    })
  },
  sixthcheckT(e) {//同业借款
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      sixth: !this.data.sixth,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  sixthcheckF() {
    this.setData({
        sixth: '',
        checkId: '',
        checkname:''
    })
  },
  seventhcheckT(e) {//同业存款
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      seventh: !this.data.seventh,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      eighth:'',
      ninth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },

  seventhcheckF() {
    this.setData({
        seventh: '',
        checkId: '',
        checkname:''
    })
  },
  eighthcheckT(e) {//资产证券化
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      eighth: !this.data.eighth,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      ninth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  eighthcheckF() {
    this.setData({
        eighth: '',
        checkId: '',
        checkname:''
    })
  },
  ninthcheckT(e) {//银团贷款
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
        ninth: !this.data.ninth,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      eighth:'',
      tenth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  ninthcheckF() {
    this.setData({
        ninth: '',
        checkId: '',
        checkname:''
    })
  },
  tenthcheckT(e) {//资产托管
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      tenth: !this.data.tenth,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      eleventh:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  tenthcheckF() {
    this.setData({
        tenth: '',
        checkId: '',
        checkname:''
    })
  },
  eleventhcheckT(e) {//信托标债
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
      eleventh: !this.data.eleventh,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      tenth:'',
      twelfth:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  eleventhcheckF() {
    this.setData({
        eleventh: '',
        checkId: '',
        checkname:''
    })
  },
  twelfthcheckT(e) {//信托非债
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    this.setData({
     twelfth: !this.data.twelfth,
      checkId: id,
      checkname:name,
      first:'',
      second:'',
      thirdly:'',
      fourthly:'',
      fifth:'',
      sixth:'',
      seventh:'',
      eighth:'',
      ninth:'',
      tenth:'',
      eleventh:''
    })
    console.log('当前点击是--'+this.data.checkname+'--他的id是--'+this.data.checkId);
  },
  twelfthcheckF() {
    this.setData({
        twelfth: '',
        checkId: '',
        checkname:''
    })
  },
//   点击下一步
    nextstep:function(){
        if(this.data.checkId==''){
            wx.showModal({
              title:'请选择产品类别'
            })
            return
        }
        wx.navigateTo({
            url: '/pages/login/login',
        })
       
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})