var app = getApp()
var util = require('../../utils/util.js')
var id = ''
var birthday = ''
Page({
    data: {
        toView: 'red',
        scrollTop: 100,
        user: '',
        birthday: ''
    },

    onLoad: function (e) {
        //load user data from previous page 
        var that = this
        this.setData({
            user: app.user,
        })
        id = this.data.user.id
        birthday = util.formatTime(new Date(this.data.user.birthday))
        this.setData({
            birthday:birthday
        })
       
    },
    updateUser:function(e){
        var user = this.data.user
        app.user = user
        wx.navigateTo({
          url: '../updateUserInfo/updateUserInfo'
        })
    },

    deleteUser: function () {
        console.log("delete user " + this.data.user.id)
        var msg = ""
        wx.request({
            url: 'http://119.29.99.89:8080/delete',
            data: {
                id: id
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                msg = "删除成功"
            },
            fail: function () {
                // fail
                msg = "删除失败"
            },
            complete: function () {
                // complete
                wx.navigateBack({
                    delta: 1, // 回退前 delta(默认为1) 页面
                    success: function (res) {
                        // success
                    },
                    fail: function () {
                        // fail
                    },
                    complete: function () {
                        // complete
                        wx.showToast({
                            title: msg,
                            icon: 'success',
                            duration: 1000
                        })
                    }
                })
            }
        })
    },
    formatime: function (date) {
        var newDate =  util.formatTime(new Date(date))
        console.log(newDate)
        return newDate
    }
})