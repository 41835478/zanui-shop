// pages/member/member.js
var Zan = require('../../dist/index');
var app=getApp();
Page(Object.assign({}, Zan.Toast, {
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
  showToast() {
    this.showZanToast('本版本为测试版本V0.1。由彭思文提供技术支持！联系电话18852850996');
  },
  makephone(){
    wx.makePhoneCall({
      phoneNumber: '18860873809' //仅为示例，并非真实的电话号码
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
}))