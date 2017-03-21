// pages/member/member.js
var app=getApp();
Page({
  data:{ 
  userinfo:[]   
  },
  onLoad:function(options){
    var that=this
    // 页面初始化 options为页面跳转所带来的参数
    wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userinfo:res.userInfo
              })  
            }
          })
        }
      })   

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