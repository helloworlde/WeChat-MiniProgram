var app = getApp();

var usersData = ''

var pageObject = {
    onLoad: function () {
        wx.setNavigationBarTitle({
            title: '用户信息',
        })
        var that = this
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })
        })
        wx.getSystemInfo({
            success: function (systemInfo) {
                that.setData({
                    systemInfo: systemInfo
                })
            }
        })
        wx.getNetworkType({
            success: function (networkType) {
                that.setData({
                    networkType: networkType
                })
            }
        })
    },
    data: {
        disabled: false,
        plain: false,
        loading: false,
    },
    querying: function (e) {
        this.setData({
            disabled: !this.data.disabled,
            loading: !this.data.loading
        })
    },

    //query user
    queryUsers: function () {
        wx.navigateTo({
            url: '../query/query'
        })
    },
}

Page(pageObject)