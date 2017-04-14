// pages/order/order.js
var Zan = require('../../dist/index');
var app=getApp();
Page(Object.assign({}, Zan.Switch, {
  data: {
    sync: {
      checked: true
    },
    addressId:'',
    address:'',
    quantity:'',
    actionId:'',
    chooseoptionthumb:'',
    dateValue:'',
    timeValue:'',
    currentTime:''
  },
    handleZanSwitchChange(e) {
    var componentId = e.componentId;
    var checked = e.checked;
      // 同步开关
      this.setData({
        [`${componentId}.checked`]: checked
      });

  },
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var goodsid=options.goodsid;
    var address=wx.getStorageSync('address');
    that.setData({
      address:address
    })
  


     wx.request({
      url:'https://api.eshandz.cn/api/index/detail',
      data:{id:goodsid,appid:app.globalData.appid, token:app.globalData.token},
      method:'get',
      success:function(res){
        console.log(res); 
        that.setData({chooseoptionthumb:options.thumb,quantity:options.quantity,good:res.data.data,actionId:options.actionid})     
      },
      fail:function(){},
      complete:function(){}
    })


  },
  chooseAddress: function (e) {
    var that=this
    wx.chooseAddress({
      success: function (res) {
        wx.setStorageSync('address',res)
        that.setData({
            address:res
        })
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })

  },
  createOrder:function(){  
  },
  datePickerBindchange:function(e){
    console.log(e);
      this.setData({
        dateValue: e.detail.value
      });
  },
  timePickerBindchange:function(e){
    console.log(e);
    this.setData({
        timeValue: e.detail.value
      });
  },

  orderPay: function () {
    var code=app.globalData.code;
    var that = this;
    wx.request({
        url: 'https://api.eshandz.cn/wxpayapi/example/jsapi.php', //仅为示例，并非真实的接口地址
        data: {code:code},
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          var data=res.data
          wx.requestPayment({
             'timeStamp': data.timeStamp,
             'nonceStr': data.nonceStr,
             'package': data.package,
             'signType': 'MD5',
             'paySign':  data.paySign,
             'success':function(res){
                wx.showToast({
                   title: '支付成功',
                   icon: 'success',
                   duration: 2000
                  })
             },
             'fail':function(res){
              console.log(res)
              wx.showToast({
                title: '支付失败',
                icon: 'fail',
                duration: 2000
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
    var that=this;
     var Id=that.data.addressId;
     var a=wx.getStorageSync('addresslist');
        // console.log(a);
    if( Id!=null){     
    that.setData({
      address:a[Id]
    })
    }

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
}))