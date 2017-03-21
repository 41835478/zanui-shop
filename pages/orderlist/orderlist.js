// pages/orderlist/orderlist.js
var Zan = require('../../dist/index');
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
        title: '正在体验'
      }, {
        id: '3',
        title: '已体验'
      }, {
        id: '4',
        title: '已付款'
      }],
      selectedId: 0,  
    },
          scroll: false,
      windowHeight:'',
      autoplay:false,
      circular:true,   
     order:[
        {
          id:12,
          title:"1订单只是名称手动阀加上+规格",
          price:45,
          option:"黑色+XL",
          quantity:5,
          total:225
        },
        {
          id:13,
          title:"2订单只是名称手动阀加上+规格",
          price:45,
          option:"黑色+XL",
          quantity:5,
          total:225
        },
        {
          id:14,
          title:"3订单只是名称手动阀加上+规格",
          price:45,
          option:"黑色+XL",
          quantity:5,
          total:225
        }
      ]
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
    var componentId ="tab";  
    this.setData({
      [`${componentId}.selectedId`]: e.detail.current
    })
  },
  onLoad:function(options){  
  // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
      var that=this;
    // console.log(that.data.order)
     that.setData({ windowHeight: wx.getStorageSync('windowHeight'), loading: true })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
}))