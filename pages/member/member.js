// pages/member/member.js
var Zan = require('../../dist/index');
var app=getApp();
Page(Object.assign({}, Zan.Toast, {
  data:{ 
  userinfo:[],
  status0:null,
  status1:null,
  status2:null,
  status3:null  
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
    wx.showModal({
      title: '关于',
      content: 'e衫订制是镇江万通鼎文化传媒有限公司旗下产品，本公司致力于为用户提供极致的服务体验，始终坚持“您的微笑是我们最大的追求”公司服务理念，为赢得用户的信赖而努力奋斗！',
      showCancel:false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
    }
    })    
  },
  showCopyRight() {
    var that=this;
    wx.showModal({
      title: '合作联系',
      content: '联系人：彭同学，联系方式：18852850996',
      // showCancel:false,
      cancelText:'拨打',
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
        console.log('用户点击取消');
        that.makeTelphone();
        }
    }
    })    
  },
  makephone(){
    wx.makePhoneCall({
      phoneNumber: '18860873809' //仅为示例，并非真实的电话号码
    })
  },
  makeTelphone(){
    wx.makePhoneCall({
      phoneNumber: '18852850996' //仅为示例，并非真实的电话号码
    })
  },
  onShow:function(){
    var that=this
    wx.request({
      url:'https://api.eshandz.cn/api/order/getOrderTotalNum',
      data:{sessionId:wx.getStorageSync('sessionId')},
      method:'get',
      success:function(res){
        console.log(res);
        that.setData({
          status0:res.data.data.status0,
          status1:res.data.data.status1,
          status2:res.data.data.status2,
          status3:res.data.data.status3
        }) 
      },
      fail:function(){},
      complete:function(){}
    });
  },

}))