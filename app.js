//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this 
    wx.login({
      success: function(res) {
        if (res.code) {
          // console.log(res.code);
          that.globalData.code=res.code;
  
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
      //获取token
      that.gettoken();
        wx.getSystemInfo({
          success: function(res) {
           console.log(res);
            that.globalData.windowHeight=res.windowHeight;
        }      
       })
    },

  util: require('utils/util.js'),


  gettoken:function(){
      var that = this  
      //获取token
   wx.request({
            url: 'https://api.eshandz.cn/api/auth/getToken',
            data: {
                appid: "5288971",
                sign:"35938A8ACF745BE26FCD9AD7A18553CE83DA3AF7"
            },
            method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (res) {
                console.log(res)              
                that.globalData.token=res.data.data;
                // that.globalData.appid="5288971";
                // return res.data.data;
             },
            fail: function () {         
            },
            complete: function () {
            }
        })//请求token
 },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    token:null,
    appid:"5288971",
    code:null,
    windowHeight:null
  },
  siteInfo: {
    'uniacid': '2', //公众号uniacid
    'acid': '2', 
    'multiid': '8907',  //小程序版本id
    'version': '1.0.0',  //小程序版本
    'siteroot': 'https://www.eshandz.cn/app/index.php',  //站点URL
    'token': 'Rss035a6ogA8z1q8303E8OS1o361AaKD' //将用于接口中的数据安全校验
  }
})