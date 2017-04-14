// pages/cate/cate.js
var app = getApp();
Page({
  data:{
    category:[]
  },

    loadcategory: function () {
    var that = this;
    wx.request({
      url: 'https://api.eshandz.cn/api/index/getCategory',
      data: { appid:app.globalData.appid, token:app.globalData.token},
      method: 'get',
      success: function (res) {
         // console.log(res);       
          switch(res.data.code)
                {
                case 200: 
                var tab = [{ id: '0', title: '全部',advimg:'http://ohy7djn2s.bkt.clouddn.com/%E4%B8%8B%E8%BD%BD.png' }]
                var data = tab.concat(res.data.data)
                that.setData({ category: data })
                  break;
                case 201:
                  if(that.data.nomore){
                    // return false
                  }
                  break;
                  case 400:
                  console.log("token验证失败tab重新开启")
                  app.gettoken();
                  that.onLoad();
                  break;
                default:             
                }

      },
      fail: function () { },
      complete: function () { }
    })

  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this
    that.loadcategory()

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})