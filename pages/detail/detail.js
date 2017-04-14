// pages/detail/detail.js
var Zan = require('../../dist/index');
var app = getApp();
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
    swiperCurrent: 0
  
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
    var quantity=this.data.quantity1.quantity;
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
      url: '../../pages/order/order?goodsid='+goodsid+'&quantity='+quantity+'&actionid='+actionid+'&specs='+specs+'&thumb='+thumb
    })

  },


  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(app.globalData.token);
    var options=options.goodsid;
    var that = this;

   // console.log(that.data.option);
    wx.request({
      url:'https://api.eshandz.cn/api/index/detail',
      data:{id:options,appid:app.globalData.appid, token:app.globalData.token},
      method:'get',
      success:function(res){
        // console.log(res); 
        that.setData({slider:res.data.data.thumb_url,good:res.data.data,chooseoptionthumb:res.data.data.thumb})     
      },
      fail:function(){},
      complete:function(){}
    })
  },



  onReady:function(){
    // 页面渲染完成
  },
  onPullDownRefresh:function(e){
    console.log('下拉'+e)
  },
  onPullDownRefresh: function() {
    // Do something when pull down.
     console.log('onPullDownRefresh'+e)
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