//index.js
var app = getApp();

Page({
    data: {
    bgimg:null,
    windowHeight:null,
    goodsindex:[],
    goodsid:null
  },

  //事件处理函数 
  onLoad: function () {    
    var that = this;
    that.setData({ windowHeight:app.globalData.windowHeight})//设置滚动区域全屏 
      wx.request({
        url: 'https://api.eshandz.cn/api/index/index',
        data: { p: 1, appid:app.globalData.appid, token:app.globalData.token},
        method: 'get',
        success: function (res) {        
        console.log(res);
            switch(res.data.code)
                {
                case 200: 
                // console.log(200)        
                  that.setData({
                    bgimg:res.data.data[0].thumb,
                    goodsindex: that.data.goodsindex.concat(res.data.data),  
                    goodsid:res.data.data[0].id,            
                  });             
                  break;
                case 201:
                  if(that.data.nomore){
                    return false
                  }
                  break;
                  case 400:
                  console.log("商品区加载token验证失败再次请求")
                  that.onLoad()
                  break;
                default:             
                }       
          },
        fail: function (res) { },
        complete: function (res) { },
      })

  },
  swiperChange: function (e) {
    var imgid=e.detail.current;
    var that=this;
    var img=that.data.goodsindex[imgid].thumb;
    var goodsid=that.data.goodsindex[imgid].id;
    // console.log(img);
    that.setData({
      bgimg:img,
      goodsid:goodsid
    })

  },
   onShareAppMessage: function () {
    return {
      title: 'e衫订制商城',
      path: '/page/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  onShow: function () {
  },

})
