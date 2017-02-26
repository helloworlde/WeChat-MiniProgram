var app = getApp();
var amapFile = require('../lib/amap-wx.js');
Page({
    data: {
        toView: 'red',
        scrollTop: 100,
        usersData: '',

        disabled: false,
        plain: false,
        loading: false,

        username: '',
        sex: '',
        age: '',
        school: '',
        major: '',
        address: '',
        birthday: '',

        sexs: ['男', '女'],
        schools: [
            '辽宁工程技术大学',
            '大连理工大学',
            '大连海事大学',
            '大连交通大学',
            '兰州大学'
        ],
        majors: [
            '软件工程',
            '网络工程',
            '计算机科学与技术',
            '电子信息',
            '嵌入式工程'
        ],
    },

    onLoad: function (query) {

        wx.setNavigationBarTitle({
            title: '添加新用户'
        })
    },
    register: function () {

        var that = this;
        var msg = ''
        that.registering()

        if (this.data.username != "") {
            wx.request({
                url: 'http://119.29.99.89:8080/add',
                data: {
                    username: that.data.username,
                    sex: that.data.sex,
                    age: that.data.age,
                    school: that.data.school,
                    major: that.data.major,
                    address: that.data.address,
                    birthday: that.data.birthday,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    if (res.data.STATE == "SUCCESSED") {
                        msg = "添加成功"
                        setTimeout(function () {
                            wx.navigateBack({
                                delta: 1, // 回退前 delta(默认为1) 页面
                            })
                        }, 1000)
                    }
                    else {
                        msg = "添加失败"
                    }
                },
                fail: function () {
                    msg = "请求失败"
                },
                complete: function () {
                    that.registering()
                    wx.showToast({
                        title: msg,
                        icon: 'success',
                        duration: 1000
                    })
                }
            })
        } else {
            wx.showModal({
                title: "错误",
                showCancel: false,
                content: '请输入用户信息'
            })

        }
    },
    registering: function (e) {
        this.setData({
            disabled: !this.data.disabled,
            loading: !this.data.loading
        })
    },


    inputUsername: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    inputAge: function (e) {
        this.setData({
            age: e.detail.value
        })
    },
    inputSex: function (e) {
        this.setData({
            sex: this.data.sexs[e.detail.value]
        })
    },
    inputSchool: function (e) {
        this.setData({
            school: this.data.schools[e.detail.value]
        })
    },
    inputMajor: function (e) {
        this.setData({
            major: this.data.majors[e.detail.value]
        })
    },
    inputAddress: function (e) {
        this.setData({
            address: e.detail.value
        })
    },

    inputBirthday: function (e) {
        console.log(e)
        this.setData({
            birthday: e.detail.value
        })
    },
    getLocation: function () {

        wx.showNavigationBarLoading()

        var that = this
        var latitude = ''
        var longitude = ''
        var requestUrl = 'http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&output=json&pois=1&ak=TA5hUEqvhKo3sBYT3pXui5jfCkgRVrPQ'
        wx.getLocation({
            type: 'gcj02 ',
            success: function (res) {
                latitude = res.latitude
                longitude = res.longitude
                requestUrl = requestUrl + '&location=' + latitude + ',' + longitude

                wx.request({
                    url: requestUrl,
                    data: {
                        location: latitude + ',' + longitude
                    },
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: { 'Content-Type': 'application/json' },
                    success: function (res) {
                        var loc = res.data.split('formatted_address":"')[1].split('"')[0]
                       that.setData({
                            address: loc
                        })
                    },
                    fail: function () {
                        // fail
                    },
                    complete: function () {
                        wx.hideNavigationBarLoading()
                    }
                })
            }
        })

        // wx.navigateTo({
        //   url: '../searchLocation/searchLocation',
        //   success: function(res){
        //     // success
        //   },
        //   fail: function() {
        //     // fail
        //   },
        //   complete: function() {
        //     // complete
        //   }
        // })

    }

})