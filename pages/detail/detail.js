// pages/detail/detail.js
var Zan = require('../../dist/index');
var app = getApp();
var Glooption;
Page(Object.assign({}, Zan.Quantity,Zan.TopTips,{
  data:{
     quantity1: {
      quantity: 1,
      min: 1,
      max: 20
    },
    good:[],
    slider: [],
    showDialog: false,
    actionid:'',
    chooseOptionId:{
    },
    chooseOption:{
      0:false,
      1:false
    },
    chooseoptionthumb:'',
    swiperCurrent: 0,
    loadbox:false,
  
  },
  backIndex:function(){
    wx.switchTab({
      url: '../../pages/index/index'
    })
  },
  needNotcie:function(){
    wx.showModal({
      title: '用户须知',
      content: '选择体验下单，无须支付，送货上门试穿后再决定是否支付；目前仅仅支持江大范围',
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

  swiperChange:function(e){
    this.setData({
    swiperCurrent: e.detail.current
    })
  },



   handleZanQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity; 

    this.setData({    
      [`${componentId}.quantity`]: quantity
    });
  },

  chooseOptionId(e){
    // console.log(e);
    var that=this;
    var chooseoptionthumb=e.currentTarget.dataset.chooseoptionthumb;
    var id=e.currentTarget.id;
    if(chooseoptionthumb){
     // console.log(chooseoptionthumb);
    that.setData({chooseoptionthumb:chooseoptionthumb})
     // console.log(that.data.chooseoptionthumb);
   }
    var option=e.currentTarget.dataset.option;
    var n="chooseOptionId";
    if(that.data.chooseOptionId[option]==e.currentTarget.id){
       this.setData({
       [`${n}.${option}`]:0
    });
    }else{
    this.setData({
       [`${n}.${option}`]:e.currentTarget.id
    });
   }
  },

  toggleDialog(e){
     // console.log(e);
    this.setData({
       actionid:e.target.dataset.actionid,
      showDialog: !this.data.showDialog
    });
  },

  // chooseOptionId:function(e){
  //   var id=e.currentTarget.id;
  //   var option=e.currentTarget.dataset.option;
  //   this.setData({
  //      [`${currentOptionId}.option`]:id
  //   });
  // },

  confirm:function(){
    var that=this;
    var actionid=this.data.actionid;
    var goodsid=this.data.good.id;
    var total=this.data.quantity1.quantity;
    var thumb=this.data.chooseoptionthumb;
    var specs=this.data.chooseOptionId[0]+"_"+this.data.chooseOptionId[1];
    // console.log(thumb);
    if(!(this.data.chooseOptionId[0])){
      this.showZanTopTips('请选择尺寸或者颜色！');
      return false;
    }
    if(!(this.data.chooseOptionId[1])){
      this.showZanTopTips('请选择尺寸或者颜色！');
      return false;
    }
    wx.navigateTo({
      url: '../../pages/order/order?goodsid='+goodsid+'&total='+total+'&actionid='+actionid+'&specs='+specs+'&thumb='+thumb
    })

  },


  onLoad:function(options){
    // 页面初始化 goodsid为页面跳转所带来的参数
    // console.log(app.globalData.token);
    wx.showLoading({
      title: '加载中',
    })
    console.log(options);
    var goodsid=options['goodsid'];
    Glooption=goodsid;
    var that = this;
    wx.request({
      url:'https://api.eshandz.cn/api/index/detail',
      data:{id:goodsid,appid:app.globalData.appid, token:wx.getStorageSync('token')},
      method:'get',
      success:function(res){
        console.log(res); 
        switch(res.data.code)
                {
                case 200: 
                 that.setData({slider:res.data.data.thumb_url,good:res.data.data,chooseoptionthumb:res.data.data.thumb})
                  wx.hideLoading()         
                  break;
                case 201:
                  if(that.data.nomore){
                    return false
                  }
                  break;
                  case 400:
                  console.log("商品区加载token验证失败再次请求")
                  app.onLaunch()
                  break;
                default:             
                }       
      },
      fail:function(){},
      complete:function(){}
    })
  },
  //  onShareAppMessage: function () {
  //   var path='/pages/detail/detail?goodsid='+Glooption+'&';
  //   return {
  //     title: 'e衫订制商城',
  //     desc: '免费送货上门',
  //     path: path,
  //     success: function(res) {
  //       // console.log(res);
  //       console.log(path);
  //       // 分享成功
  //     },
  //     fail: function(res) {
  //       // 分享失败
  //     }
  //   }
  // },
}))