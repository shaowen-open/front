var app = getApp();

Component({
    data: {
        quot: '"',
        selected: 0,
        sysMessageCount: 0,
        color: 'rgb(140,140,140)', // 只能是rgb格式，默认值：rgb(140,140,140)，需要引号
        selectColor: 'rgb(50,50,50)', // 只能是rgb格式，默认值：rgb(0,0,0)，需要引号
        size: 58, // 默认值 58
        selectSize: 62,  // 默认值 62
        midSize: 76,  // 默认值 76
        midColor: '#fc3a72',
        background: '#ffffff;',
        showPopup: false,
        list: [
			{
				pagePath: "/pages/tabbar/index/index",
				// iconPath: "/static/icon/iconfont.ttf#mini-shouye",
				// selectedIconPath: "/static/icon/iconfont.ttf#mini-shouye",
				name: "mini-wx-shouye",
			}, {
				pagePath: "/pages/tabbar/circle/circle",
				// iconPath: "/image/tabbar/tab_shop_normal.png",
				// selectedIconPath: "/image/tabbar/tab_shop_active.png",
				name: "mini-wx-faxian",
			},
			{
				pagePath: "/pages/creat/index/creat",
				name: "mini-wx-fabu",
				isSpecial: 1,
				isMidButton: 1,
			},
			{
				pagePath: "/pages/tabbar/notice/notice",
				// iconPath: "/image/tabbar/tab_nearby_normal.png",
				// selectedIconPath: "/image/tabbar/tab_nearby_active.png",
				name: "mini-wx-xiaoxi",
			}, {
				pagePath: "/pages/tabbar/mine/mine",
				// iconPath: "/image/tabbar/tab_user_normal.png",
				// selectedIconPath: "/image/tabbar/tab_user_active.png",
				name: "mini-wx-wo",
			}
		],
		popupTip: '',
		popupStyle: {
			bgcolor: "#ffffff",
			itemBgcolor: "#f5f5f5",
			fontColor: "#000000"
		},
		popup: {
			tip: {
				login: '',
				nologin: '',
			},
			button: {
				first: {
					text1: '',
					text2: '',
					path: ''
				},
				second: {
					icon: '',
					text: '',
					path: ''
				},
				third: {
					icon: '',
					text: '',
					path: ''
				},
				fourth: {
					icon: '',
					text: '',
					path: ''
				}
			},
			hot: {
				title: '',
				desc: '',
				list: []
			}
		}
    },
    attached: function () {
        this.setData({
            midColor: this.hex2rgb(this.data.midColor)
        });
    },
    methods: {
        hex2rgb: function (hex) {
            var rgb = [];
            hex = hex.substr(1);

            if (hex.length === 3) {
                hex = hex.replace(/(.)/g, '$1$1');
            }
            hex.replace(/../g, function (color) {
                rgb.push(parseInt(color, 0x10));
                return color;
            });

            return 'rgb(' + rgb.join(',') + ')';
        },
		miniMoveHandle(){},
        shutPopup: function () {
            app.globalData.$mpTabbar.setData({
                showPopup: false
            });
        },
		navigateTo: function (e) {
			app.globalData.$mpTabbar.setData({
			    showPopup: false
			});
			let url = e.currentTarget.dataset.url;
			wx.navigateTo({
				url,
				fail() {
					if(url == "/pagesA/creat/index/creat"){
						wx.navigateTo({
							url: "/pages/creat/index/creat"
						});
					}
				}
			});
		},
        switchTab: function (e) {
            // 短震动骚操作
            wx.vibrateShort();

            let index = e.currentTarget.dataset.index;
            let url = e.currentTarget.dataset.url;

            if (this.data.list[index].isSpecial) {
				if(app.globalData.popup && app.globalData.popup.tip && app.globalData.popup.tip.login && app.globalData.popup.tip.login.length > 0){
					if( app.globalData.user_created_at && app.globalData.user_created_at.length > 0 ){
						var now = new Date();
						var targetDate = new Date(app.globalData.user_created_at);
						var timeDiff = now.getTime() - targetDate.getTime();
						var daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
						
						app.globalData.$mpTabbar.setData({
							popup: app.globalData.popup,
						    showPopup: true,
							popupTip: app.globalData.popup.tip.login.replace('[in_days]', daysDiff)
						});
					}else{
						app.globalData.$mpTabbar.setData({
							popup: app.globalData.popup,
						    showPopup: true,
							popupTip: app.globalData.popup.tip.nologin
						});
					}
				}else{
					// wx.showToast({
					// 	title: '请先在后台—移动端-发布进行配置',
					// 	icon: 'none'
					// })
					wx.navigateTo({
						url: '/pages/creat/index/creat'
					})
				}
            } else {
                wx.switchTab({
                    url
                });
            }
        }
    }
});
