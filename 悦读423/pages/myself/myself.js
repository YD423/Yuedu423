// pages/personal/personal.js

var app = getApp();
Page({
  data: {
    personalWrap: "",
    personalMe: "personalMe",
    class: "personalList1",
    skinStyle: "#3eede7",
    userHead: "",
    userName: "",
    userSex: "",
  },
 
  onLoad: function (options) {
  },
  switchChange: function (e) {
    var that = this
    var style
    //如果开启
    if (e.detail.value == true) {
      that.setData({
        skinStyle: "#3eede7",
        class: "personalList2",
        personalMe: "personalMe1",
        personalWrap:"personalWrap",
      })
    // }
    }else{
      that.setData({
        skinStyle: "#eee",
        class: "personalList1",
        personalMe:"personalMe",
        personalWrap: "",
      })
    }
  },
  tap: function (e) {

    wx.navigateTo({
      url: "contact/contact",
      success: function (res) { console.log(res) },
      fail: function (res) { console.log(res) },
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function (e) {
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              var userInfo = wx.getStorageSync('userInfo');
              var sex, s_value = res.userInfo.gender;
              if(s_value == 1){
                sex = '男'
              }else sex = '女'
              this.setData({
                operation: '退出',
                login: true,
                userName: res.userInfo.nickName,
                userHead: res.userInfo.avatarUrl,
                userSex: sex
              })
            }
          })
    // 页面显示.
        }
        else {
          this.setData({
            userName: '',
            userSex: '',
            userHead: "",
            operation: '登录',
            login: false
          })
        } 
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  defaultLogin: function (e) {
    let login = e.currentTarget.dataset.login;
    if (login == true) {
      // 点击退出
      wx.showToast({
        title: '退出中',
        icon: 'loading'
      })
      setTimeout(function () {
        wx.hideToast();
        wx.removeStorageSync('userInfo');
        wx.reLaunch({
          url: '../index/index'
        })
      }, 2000);
    } else {
      // 点击登录
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  listFirst: function () {
    // 我的预订
    if (this.data.login) {
      wx.navigateTo({
        url: "collect/collect",
        success: function (res) { console.log(res) },
        fail: function (res) { console.log(res) },
      })
    } else {
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 800

      })
    }
  },
  two: function(){
    wx.navigateTo({
      url: "qr/qr",
      success: function (res) { console.log(res) },
      fail: function (res) { console.log(res) },
    })
  },
  getScanning: function () {
    app.getScanning()
  }
})