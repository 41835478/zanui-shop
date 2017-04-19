// pages/orderdetail/orderdetail.js
var app=getApp();
Page({
  data:{
    loadbox:false,
    clock: '',
    detail:'',
    steps: [    
      {
        current: false,
        done: false,
        text: '未付款',
      },
      {
        current: false,
        done: false,
        text: '待体验',   
      },
      {
        done: false,
        current: false,
        text: '体验中',
      },
      {
        done: false,
        current: false,
        text: '已付款'
      },
      {
        done: false,
        current: false,
        text: '完成'
      }
    ],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    // console.log(that.data.detail);  
    wx.request({
      url:'https://api.eshandz.cn/api/order/getOrderDetail',
      data:{orderid:options['orderid']},
      method:'get',
      success:function(res){
        console.log(res); 
        that.setData({
          detail:res.data.data,
          loadbox:true
        });
         
      },
      fail:function(){},
      complete:function(){}
    });

    // setTimeout(function(){
      that.reflesh(that);
    // },1000);
       
  },
  reflesh:function(that){
    var endtime=that.data.detail.finishtimeStap;
    var caltime=that.calTimeLoad(endtime); 
     

    if (caltime <= 0) {
      return ;
    }
    var timeFormatOut=that.timeFormat(caltime);
    that.setData({
      clock:timeFormatOut
    })
    // console.log(timeFormatOut);  
    setTimeout(function(){
      that.reflesh(that);
    },1000);

  },
  calTimeLoad:function(endtime){
    var that=this;
    var dateNow=new Date();
    var timeNow=dateNow.getTime();
    // var dateEnd=new Date(endtime);
    // var timeEnd=dateEnd.getTime();
    return endtime-timeNow;
    // console.log('timeNow');
  },
  fill_zero_prefix:function(num) {
    return num < 10 ? "0" + num : num
  },//补足位数
  timeFormat:function(timeload){
    var that=this;
    // var hr = Math.floor(timeload / 3600);
    var second = Math.floor(timeload / 1000);
    //天数
    var dr=Math.floor(second/(24*3600));
    // 小时位
    var hr = Math.floor((second-dr*24*3600)/ 3600);    
    // 分钟位
    var min = that.fill_zero_prefix(Math.floor((second-dr*24*3600 - hr * 3600) / 60));
    // 秒位
    var sec = that.fill_zero_prefix((second -dr*24*3600- hr * 3600 - min * 60));// equal to => var sec = second % 60;
  // 毫秒位，保留2位
    // var micro_sec = that.fill_zero_prefix(Math.floor((timeload % 1000) / 10));
    var ret='';
    if(dr){
      ret=dr+"天 ";
    }
    if(hr){
      ret=ret+hr+"小时 ";
    }
    if(min){
      ret=ret+min+"分钟 ";
    }
    if(sec){
      ret=ret+sec+"秒 ";
    }   
    ret= '还有 '+ret+'订单将自动关闭，请尽快处理';
    return ret;

  },
    //确认支付
  orderPay:function(e){
    // console.log(e);
    var that=this;
    that.setData({
      loadbox:false
    })
    var orderid=that.data.detail.id;
    var body=that.data.detail.goods[0].title+' '+that.data.detail.goods[0].optionname;
    var sessionid=wx.getStorageSync('sessionId');
    wx.request({
      url:'https://api.eshandz.cn/api/order/getPayParam',
      data:{orderid:orderid,body:body,sessionId:sessionid},
      method:'POST',
      success:function(res){
        console.log(res)
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
                console.log(res)
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
  }

})