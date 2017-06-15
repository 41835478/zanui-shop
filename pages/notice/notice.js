// pages/notice/notice.js
var time;
Page({
  data:{
    windowWidth:'',
    windowHeight:''
  },
  onLoad:function(options){
    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    // var val=setInterval(function(){
    //   that.enterIndex(val)
    // },3000)
    var res = wx.getSystemInfoSync();
    // console.log(res.windowWidth);
    // console.log(res.windowHeight);
    this.setData({
      windowWidth:res.windowWidth,
      windowHeight:res.windowHeight
    })
  },

  enterIndex:function(){
      clearInterval(time);
      wx.switchTab({
        url: '../../pages/index/index'
      })
  },
  onReady:function(){
    var X=30;
    var Y=30;
    var R=25;
    var that=this;
    var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。 
    var num=-0.5;  
    time=setInterval(function(){
                num=num+0.02;
                cxt_arc.setLineWidth(6); 
                cxt_arc.setStrokeStyle('#d2d2d2');
                cxt_arc.setFontSize(16);//设置填充文本字体的大小
                // cxt_arc.setFontStyle('#ffffff');//设置填充文本字体的大小
                cxt_arc.fillText('跳过',14,35);
                cxt_arc.setLineCap('round') 
                cxt_arc.beginPath();//开始一个新的路径 
                cxt_arc.arc(X, Y, R, 0, 2*Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径 
                cxt_arc.stroke();//对当前路径进行描边 
                cxt_arc.setLineWidth(6); 
                cxt_arc.setStrokeStyle('#3ea6ff'); 
                cxt_arc.setLineCap('round') 
                cxt_arc.beginPath();//开始一个新的路径 
                cxt_arc.arc(X, Y, R, -Math.PI * 0.5, Math.PI*num, false); 
                cxt_arc.stroke();//对当前路径进行描边
                cxt_arc.draw();
                if (num>=1.5) {                  
                  that.enterIndex();
                }
            },50)
  }
  
})