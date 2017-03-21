//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
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
                wx.setStorageSync('appid', "5288971")
                wx.setStorageSync('token', res.data.data)
                that.globalData.token=res.data.data;
                // that.globalData.appid="5288971";
             },
            fail: function () {         
            },
            complete: function () {
            }
        })//请求token

  var res = wx.getSystemInfoSync();
  wx.setStorageSync('windowHeight',res.windowHeight);


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
    appid:null
  }
})