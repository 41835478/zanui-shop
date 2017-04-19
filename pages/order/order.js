// pages/order/order.js
var Zan = require('../../dist/index');
var app=getApp();
Page(Object.assign({}, Zan.Switch,Zan.TopTips, {
  data: {
    sync: {
      checked: true
    },
    good:'',
    address:'',
    total:'',
    actionId:'',
    chooseoptionthumb:'',
    dateValue:'',
    timeValue:'',
    currentTime:'',
    orderDetail:'',
    loadbox:false,
    click:'on',
    remark:'',
    spec:'',
    array: ['12点-14点', '13点-15点', '14点-16点', '15点-17点','16点-18点', '17点-19点', '18点-20点', '19点-21点','20点-22点'],
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
    // console.log(options);

    var goodsid=options.goodsid;
    var address=wx.getStorageSync('address');
    that.setData({
      address:address,
      orderDetail:options
    })

    wx.request({
      url:'https://api.eshandz.cn/api/index/detail',
      data:{id:goodsid,appid:app.globalData.appid, token:app.globalData.token},
      method:'get',
      success:function(res){
        // console.log(res); 
        that.setData({
          chooseoptionthumb:options.thumb,
          total:options.total,
          good:res.data.data,
          actionId:options.actionid
        })

      },
      fail:function(){},
      complete:function(){}
    })
    wx.request({
      url:'https://api.eshandz.cn/api/order/getOptionTitle',
      data:{spec:options['specs']},
      method:'get',
      success:function(res){
        // console.log(res); 
        that.setData({
          spec:res.data.data.title
        })     
        that.setData({
          loadbox:true
        })
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
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
      }
    })

  },
  datePickerBindchange:function(e){
      this.setData({
        dateValue: e.detail.value
      });
  },

    bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var index=e.detail.value;
    var value=this.data.array[index];
    this.setData({
      index: e.detail.value,
      timeValue:value
    })
  },
  bindKeyInput: function(e) {
    // console.log(e.detail.value);
    this.setData({
      remark: e.detail.value
    })
  },


  orderPay: function () {
      var that = this;

    if(!that.data.address){
        that.showZanTopTips('请选择收货地址！');
        return false
      }

      if(!(that.data.dateValue && that.data.timeValue)){
        that.showZanTopTips('请选择体验时间！');
        return false
      }

      if (!that.data.click) {
        return false
      }
      that.setData({
        click:''
      })
      // console.log("dainji")

      // var orderDetail=new Array();
      var appid=app.globalData.appid;
      var token=app.globalData.token;
      var sessionId=wx.getStorageSync('sessionId');

      // orderDetail['title']=that.data.good.title;
      // orderDetail['option']=that.data.orderDetail.specs;
      // orderDetail['total']=that.data.orderDetail.total;
      // orderDetail['marketprice']=that.data.good.marketprice;
      // orderDetail['productprice']=that.data.good.productprice;

      var orderDetail= {        
        "goodsid":that.data.orderDetail.goodsid,
        "title":that.data.good.title,
        "option":that.data.orderDetail.specs,
        "total":that.data.orderDetail.total,
        "marketprice":that.data.good.marketprice,
        // "marketprice":0.01,
        "address":that.data.address,

        "productprice":that.data.good.productprice,
        "remark":that.data.remark+' 体验时间：'+that.data.dateValue+' '+that.data.timeValue
             };
      // console.log(orderDetail)

      var type=that.data.orderDetail.actionid;     

      // console.log(orderDetail);
        that.setData({
          loadbox:false
        })
      wx.request({
        url: 'https://api.eshandz.cn/api/Order/bulidOrder', //仅为示例，并非真实的接口地址
        data: {
          appid:appid, 
          token:token,
          sessionId:sessionId,
          data:orderDetail,
          type:type,
        },
        method:'POST',
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
          // console.log(res)     
          var data=res.data.data;
          // console.log(data);
          if(type=='normal'){
              setTimeout(function(){
                wx.hideLoading()
              },1000)
            wx.requestPayment({
               'timeStamp': data.timeStamp,
               'nonceStr': data.nonceStr,
               'package': data.package,
               'signType': 'MD5',
               'paySign':  data.paySign,
               'success':function(res){
                  that.setData({
                    loadbox:true
                  })
                  console.log(res)
                  setTimeout(function(){
                    wx.redirectTo({
                      url: '../../pages/orderlist/orderlist?selectedId=0'
                    })
                    },500)
                },
                fail:function(res){
                    that.setData({
                      loadbox:true
                    })
                  console.log(res)
                  wx.showToast({
                    title: '支付取消',
                    icon: 'success',
                    duration: 2000
                  });
                  setTimeout(function(){
                    wx.redirectTo({
                      url: '../../pages/orderlist/orderlist?selectedId=0'
                    })
                    },500)
                  }
            })
          }else{
            that.setData({
              loadbox:true
            })
            wx.showToast({
                title: '提交成功！',
                icon: 'success',
                duration: 2000
            });
            setTimeout(function(){
              wx.redirectTo({
                url: '../../pages/orderlist/orderlist?selectedId=0'
              })
              },2000,)
          }
          },
         fail:function(res){
              console.log(res)
              wx.showToast({
                title: '支付失败',
                icon: 'fail',
                duration: 2000
              })
             },
          complete:function(){
          }
      })
    
  },
  onReady:function(){
    // 页面渲染完成
  },
  // onShow:function(){
  //   // 页面显示
  //   var that=this;
  //    var Id=that.data.addressId;
  //    var a=wx.getStorageSync('addresslist');
  //       // console.log(a);
  //   if( Id!=null){     
  //   that.setData({
  //     address:a[Id]
  //   })
  //   }

  // },
}))