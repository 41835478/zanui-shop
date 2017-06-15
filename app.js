//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this
    //获取token
    var token = that.gettoken();
    // console.log(token);    
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        that.globalData.windowHeight = res.windowHeight;
      }
    });
    that.globalData.token = token;
    wx.checkSession({
      success: function (res) {
        //session 未过期，并且在本生命周期一直有效 
          // console.log(res)
          var sessionId = wx.getStorageSync('sessionId');          
          if (!sessionId) {
            wx.login({
              success: function (res) {
                if (res.code) {
                  // console.log(res.code);
                  that.globalData.code = res.code;
                  wx.request({
                    url: 'https://api.eshandz.cn/api/member/getLoginSession',
                    data: {
                      appid: that.globalData.appid,
                      token: wx.getStorageSync('token'),
                      code: res.code
                    },
                    method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                      'content-type': 'application/json'
                    }, // 设置请求的 header
                    success: function (res) {
                      console.log(res)
                      wx.setStorageSync('sessionId', res.data.data)
                    },
                    fail: function () {
                    },
                    complete: function () {
                    }

                  })
                } else {
                  console.log('获取用户登录态失败！' + res.errMsg)
                }
              }
            });
          }
          console.log('储存在本地的sessionid：' + sessionId)        
      },
      fail: function () {      //登录态过期
        wx.login({
          success: function (res) {
            if (res.code) {
              // console.log(res.code);
              that.globalData.code = res.code;
              wx.request({
                url: 'https://api.eshandz.cn/api/member/getLoginSession',
                data: {
                  appid: that.globalData.appid,
                  token:  wx.getStorageSync('token'),
                  code: res.code
                },
                method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                  'content-type': 'application/json'
                }, // 设置请求的 header
                success: function (res) {
                  // console.log(res)
                  wx.setStorageSync('sessionId', res.data.data)
                },
                fail: function () {
                },
                complete: function () {
                }

              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })

  },

  // util: require('utils/util.js'),


  gettoken: function () {
    var that = this
    //获取token
    wx.request({
      url: 'https://api.eshandz.cn/api/auth/getToken',
      data: {
        appid: "5288971",
        sign: "35938A8ACF745BE26FCD9AD7A18553CE83DA3AF7"
      },
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        // console.log(res)              
        that.globalData.token = res.data.data;
        wx.setStorageSync('token', res.data.data);
        // that.globalData.appid="5288971";
        return res.data.data;
      },
      fail: function () {
      },
      complete: function () {
      }
    })//请求token
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
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
  globalData: {
    userInfo: null,
    token: null,
    appid: "5288971",
    code: null,
    sessionId: null,
    windowHeight: null
  },
})