// pages/notice/notice.js
Page({
  data:{
    windowWidth:'',
    windowHeight:''
  },
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    // var val=setInterval(function(){
    //   that.enterIndex(val)
    // },3000)
    var res = wx.getSystemInfoSync();
    // console.log(res.windowWidth);
    // console.log(res.windowHeight);
    this.setData({
      windowWidth:res.windowWidth,
      windowHeight:res.windowHeight
    })
  },

  enterIndex:function(val){
      wx.switchTab({
        url: '../../pages/index/index'
      })
      // clearInterval(val)
  }
  
})