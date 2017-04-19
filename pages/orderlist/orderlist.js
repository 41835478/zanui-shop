// pages/orderlist/orderlist.js
var Zan = require('../../dist/index');
var app=getApp();
Page(Object.assign({}, Zan.Tab, {
  data:{
    tab: {
      list: [{
        id: '0',
        title: '全部'
      }, {
        id: '1',
        title: '待体验'
      }, {
        id: '2',
        title: '体验中'
      }, {
        id: '3',
        title: '待发货'
      }, {
        id: '4',
        title: '完成'
      }],
      selectedId:0,  
    },
      scroll: false,
      windowHeight:'',
      autoplay:false,
      circular:true,   
      status0:[],        
      status1:[],
      status2:[],
      status3:[],
      status4:[],
      loadbox:false
  },

    handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    this.setData({
      [`${componentId}.selectedId`]: selectedId,
      selectedId:selectedId
           
    });
  },

   swiperChange: function (e) {
    // console.log(e);
    var that=this
    that.setData({
      loadbox:false
    })
    var componentId ="tab";
    var statusId;
    switch(e.detail.current)
      {
      case 0:
        statusId=4;           
        break;
      case 1: 
        statusId=1;               
        break;
      case 2:
        statusId=2;
        break;
      case 3:
        statusId=0;
        break;
      case 4:
        statusId=3;
        break;
      default:             
      }
    var current="status"+e.detail.current;
    // console.log(current);
    this.setData({
      [`${componentId}.selectedId`]: e.detail.current
    })
    wx.request({
      url:'https://api.eshandz.cn/api/order/getOrderInfo',
      data:{sessionId:wx.getStorageSync('sessionId'),status:statusId},
      method:'get',
      success:function(res){
        // console.log(res);
        that.setData({
          [`${current}`]:res.data.data,
          loadbox:true
        })
      },
      fail:function(){},
      complete:function(){}
    });

  },
  onLoad:function(options){
    var that=this;      
    // console.log(that.data.status0)
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight:res.windowHeight
        })
      }
    })
    var componentId ="tab";
    //页面初始化 options为页面跳转所带来的参数
    that.setData({
      // [`${componentId}.selectedId`]:options['selectedId'],
      selectedId:options['selectedId']
    })
    // console.log(options['selectedId'])
    if(options['selectedId']==0){
    var current="status"+options['selectedId']
    wx.request({
      url:'https://api.eshandz.cn/api/order/getOrderInfo',
      data:{sessionId:wx.getStorageSync('sessionId'),status:4},
      method:'get',
      success:function(res){
        // console.log(res);
        that.setData({
          [`${current}`]:res.data.data,
          loadbox:true
        })

      },
      fail:function(){},
      complete:function(){}
    });
    }

  },

  //确认支付
  payOrder:function(e){
    // console.log(e);
    var that=this;
    that.setData({
      loadbox:false
    })
    var orderid=e.currentTarget.dataset.orderid;
    var body=e.currentTarget.dataset.body;
    var sessionid=wx.getStorageSync('sessionId');
    wx.request({
      url:'https://api.eshandz.cn/api/order/getPayParam',
      data:{orderid:orderid,body:body,sessionId:sessionid},
      method:'POST',
      success:function(res){
        // console.log(res)
        var data=res.data.data
          wx.requestPayment({
             'timeStamp': data.timeStamp,
             'nonceStr': data.nonceStr,
             'package': data.package,
             'signType': 'MD5',
             'paySign':  data.paySign,
             'success':function(res){               
                // console.log(res)
                setTimeout(function(){
                  wx.redirectTo({
                    url: '../../pages/member/member'
                  })
                  },500)
              },
              'fail':function(res){
                // console.log(res)
                wx.showToast({
                  title: '支付取消',
                  icon: 'success',
                  duration: 2000
                });
                }
          })
      },
      fail:function(){},
      complete:function(){
         that.setData({
            loadbox:true
          })
      },
    })
  },
  closeOrder:function(e){
    var that=this;
    // var options['selectedId']=0;
    var orderid=e.currentTarget.dataset.orderid;
    wx.showModal({
      title: '提示',
      content: '订单还没有支付，确定要取消吗？',
      confirmText:'再考虑下',
      cancelText:'关闭订单',
      success: function(res) {
        // console.log(res);
        if (res.confirm) {
          console.log('用户点击确定')          
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.request({
            url:'https://api.eshandz.cn/api/order/closeOrder',
            data:{sessionId:wx.getStorageSync('sessionId'),orderid:orderid},
            method:'POST',
            success:function(res){
              console.log(res);
              if(res.data.code==200){
                wx.showToast({
                  title: '取消订单成功！',
                  icon: 'success',
                  duration: 2000
                })                
                wx.redirectTo({
                    url: '../../pages/orderlist/orderlist?selectedId=0'
                  })
              }else if(res.data.code==400){
                wx.showToast({
                  title: '取消订单失败！',
                  icon: 'success',
                  duration: 2000
                })
              }
            },
            fail:function(){},
            complete:function(){}
          });
        }
      }
    })
    
  }
}))