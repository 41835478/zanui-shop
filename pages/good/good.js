// pages/good/good.js
var app = getApp();
var p;
var i=0;
Page({
  data: {
    goods: [],
    loading: false,
    nodata: false,
    nomore: false,
    selectedId: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(options)
    p = 1
    var that = this
    that.setData({
      selectedId: options['cateid'],
      windowHeight: wx.getStorageSync('windowHeight')+45
    })
    that.loadMoreGoods(options['cateid'])
    
  },

  loadMoreGoods: function () {    
    var that = this;
    if (that.data.nomore) {
      return false
    }
     if(i==1){ 
      return false;
    }
    i=1;
    var selectedId=that.data.selectedId;
    console.log("success");
    that.setData({ loading: true });
    wx.request({
      url: 'https://api.eshandz.cn/api/index/index',
      data: { p: p, appid: app.globalData.appid, token: app.globalData.token, pcates: selectedId },
      method: 'get',
      success: function (res) {
        // console.log("it's success");
        i=0
        switch (res.data.code) {
          case 200:
            console.log(200)        
            that.setData({
              goods: that.data.goods.concat(res.data.data),
              loading: false,
              nomore: false
            });
            p = p + 1;        
            break;
          case 201:
            if (that.data.nomore) {
              return false
            }
            that.setData({ nomore: true, loading: false });
            break;
          case 400:
            console.log("token验证失败good重新开启")
            app.gettoken();
            that.onLoad();
            break;
          default:
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }

})