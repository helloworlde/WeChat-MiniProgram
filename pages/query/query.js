var app = getApp();
Page({
    data: {
        toView: 'red',
        scrollTop: 100,
        usersData: '',

        disabled: false,
        plain: false,
        loading: false,

    },

    onLoad: function (query) {
        var that = this;
        var msg = ''
        that.querying()
        wx.request({
            url: 'http://119.29.99.89:8080/query',
            data: {
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                if (res.data.length != 0) {
                    that.setData({
                        usersData: res.data
                    })
                }
                else {
                    wx.showToast({
                        title: "查询失败",
                        icon: 'success',
                        duration: 1000
                    })
                }
            },
            fail: function () {
                wx.showToast({
                    title: "网络错误",
                    icon: 'success',
                    duration: 1000
                })
            },
            complete: function () {
                that.querying()

            }
        })
        wx.setNavigationBarTitle({
            title: '用户信息'
        })
    },
    querying: function (e) {
        this.setData({
            disabled: !this.data.disabled,
            loading: !this.data.loading
        })
    },

    //navigete to userDetail page for view user information 
    viewUserDetail: function (e) {
        var user = e.currentTarget.dataset.user
        app.user = user
        wx.navigateTo({
            url: '../userDetail/userDetail'
        })
    },

    upper: function (e) {
        console.log(e)

    },
    lower: function (e) {
        console.log(e)
    },
    scroll: function (e) {
        console.log(e)
    },
    tap: function (e) {
        for (var i = 0; i < order.length; ++i) {
            if (order[i] === this.data.toView) {
                this.setData({
                    toView: order[i + 1]
                })
                break
            }
        }
    },
    tapMove: function (e) {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    }

})