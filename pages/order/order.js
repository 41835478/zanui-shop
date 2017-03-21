// pages/order/order.js
var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Switch, {
  data: {
    sync: {
      checked: true
    },
    addressId:'',
    address:'',
    quantity:'',
    actionId:'',
    chooseoptionthumb:''
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
    var Id=wx.getStorageSync('addresslist_default');
    var a=wx.getStorageSync('addresslist');
        // console.log(a);
    if( Id!=null){     
    that.setData({
      address:a[Id]
    })
    }


     wx.request({
      url:'https://api.eshandz.cn/api/index/detail',
      data:{id:goodsid,appid: wx.getStorageSync('appid'), token: wx.getStorageSync('token')},
      method:'get',
      success:function(res){
        console.log(res); 
        that.setData({chooseoptionthumb:options.thumb,quantity:options.quantity,good:res.data.data,actionId:options.actionid})     
      },
      fail:function(){},
      complete:function(){}
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