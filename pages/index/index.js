//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  login: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  register:function(){
    wx.navigateTo({
      url: '../register/register'
    })
  },
  query:function(){
    wx.navigateTo({
      url: '../query/query'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
