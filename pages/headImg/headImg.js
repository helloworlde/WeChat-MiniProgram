var app = getApp();
Page({
  data:{
    headImgPath:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      headImgPath:app.headImgPath
    })
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
  },
  ensureUpload:function(){
    wx.navigateBack({
      delta: 1
    })
  }
})