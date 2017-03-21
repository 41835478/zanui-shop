// pages/address/address.js
var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.TopTips, {
  data:{
    showDialog: false,
    checked:'',
    addresslist:[],
    changeaddress:[],
    currentId:''
  },

  toggleDialog() {
    this.setData({
      changeaddress:[],
      currentId:'',
      showDialog: !this.data.showDialog
    });
  },

  checked:function(e) {
     wx.setStorageSync('addresslist_default', e.currentTarget.id);
      // console.log(e);
    this.setData({
      checked:e.currentTarget.id
    });
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    if(prevPage){
      prevPage.setData({
        addressId:e.currentTarget.id
      })
      wx.navigateBack({delta: 1})
    }
  },

  changeAddress:function(e) {
      var id=e.currentTarget.id
      var index=wx.getStorageSync("addresslist");
      index=index[id];
    this.setData({    
       changeaddress:index, 
       currentId:id,
       showDialog: !this.data.showDialog
    });
  },
  showTopTips() {
    this.showZanTopTips('请填写好信息！');
  },


  formBindsubmit:function(e){
    var that=this;
    // console.log(e.detail.value);
    var address=new Array();
    var value=new Array();
    if(wx.getStorageSync('addresslist')){
      address=wx.getStorageSync('addresslist');
    }
    // console.log(address);
    value=e.detail.value;  
    if(value.id.length!=0){
      var m=wx.getStorageSync('addresslist');
      m[value.id]=value;
      wx.setStorageSync('addresslist', m);
      // console.log(value.id);
    }else if((value.name.length!=0)&&(value.mobile.length!=0)&&(value.address.length!=0)){
       value=address.concat(value);
       wx.setStorageSync('addresslist', value);
        this.setData({
      showDialog: !this.data.showDialog,
      addresslist:wx.getStorageSync('addresslist')
    });
       // console.log(value.id.length);
    }else{
       this.showZanTopTips('请填写好信息！');
    }
   
    // var g=wx.getStorageSync('addresslist');
    // console.log(g);
 
  },
  removeaddress:function(e){        
      wx.removeStorageSync('addresslist');
         this.setData({
      showDialog: !this.data.showDialog,
      addresslist:wx.getStorageSync('addresslist')
    });

  },

  
  onLoad:function(options){        
      this.setData({   
      addresslist:wx.getStorageSync('addresslist'),
      checked: wx.getStorageSync('addresslist_default')
    });
  },
  onReady:function(){
    // 页面渲染完成
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