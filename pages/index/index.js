//index.js
//获取应用实例
var Zan = require('../../dist/index');
var app = getApp();
var p = 1;
var token;
var _this;
Page(Object.assign({}, Zan.Tab, {
  data: {
    tab: {
      list: [],
      selectedId: '0',
      scroll: true
    },
    slider: [
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    goods: [],
    loading: false,
    nodata: false,
    nomore: false,
    windowHeight: '',
    swiperCurrent: 0
  },
  //事件处理函数 
  onLoad: function () {    
    var that = this;    
    that.setData({ windowHeight: wx.getStorageSync('windowHeight'), loading: true })//设置滚动区域全屏
 
    that.loadcategory();


    that.loadMoreGoods('0');

  },
  onShow: function () {
  },



  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  handleZanTabChange(e) {
    var that = this;
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    // console.log(e);
    p = 1;
    that.loadMoreGoods(selectedId);
    that.setData({
      [`${componentId}.selectedId`]: selectedId, goods: [],
      nodata: false
    });//监听tab变化
  },

  lower: function () {
    var that=this;
    if(that.data.nomore){
      return false
    } 
    var selectedId = this.data.tab.selectedId;
    this.loadMoreGoods(selectedId);
  },

  loadMoreGoods: function (selectedId) {
    var that = this;
    // console.log(p);
      that.setData({ loading: true });
      wx.request({
        url: 'https://api.eshandz.cn/api/index/index',
        data: { p: p, appid: wx.getStorageSync('appid'), token: wx.getStorageSync('token'), pcates: selectedId },
        method: 'get',
        success: function (res) {        // console.log(res);
            switch(res.data.code)
                {
                case 200: 
                // console.log(200)        
                  that.setData({
                    goods: that.data.goods.concat(res.data.data),
                    loading: false,
                    nomore:false
                  });
                  p = p + 1;
                  break;
                case 201:
                  if(that.data.nomore){
                    return false
                  }                      
                  that.setData({ nomore: true, loading: false });
                  break;
                  case 400:
                  console.log("商品区加载token验证失败再次请求")
                  that.loadMoreGoods(selectedId)
                  break;
                default:             
                }       
          },
        fail: function (res) { },
        complete: function (res) { },
      })

  },


  getAdv:function(){
    var that=this;
    wx.request({
      url: 'https://api.eshandz.cn/api/index/getAdv',
      data: { appid: wx.getStorageSync('appid'), token: wx.getStorageSync('token') },
      method: 'get',
      success: function (res) {
        // console.log(res);
        that.setData({})
      },
      fail: function () { },
      complete: function () { }
    }) 
  },


  loadcategory: function () {
    var that = this;
    wx.request({
      url: 'https://api.eshandz.cn/api/index/getCategory',
      data: { appid: wx.getStorageSync('appid'), token: wx.getStorageSync('token') },
      method: 'get',
      success: function (res) {
        if (res.data.code == 200) {
          // console.log(res);
          var tab = [{ id: '0', title: '全部', }]
          var data = tab.concat(res.data.data)
          that.setData({ [`tab.list`]: data })
        } else {
          console.log("tab区加载token验证失败再次请求")
          that.loadcategory()

        }
      },
      fail: function () { },
      complete: function () { }
    })

  },

}))
