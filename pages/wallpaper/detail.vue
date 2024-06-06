<template>
	<view
		:class="'mini-page-wrap global-theme-' + global__theme__  + ' global-platform-' + global__platform__ + ' global-device-' + global__device__ + ' global-tenant-' + global__tenant__.tenant_id" :data-theme="global__theme__  ">
		<view class="mini-page-body">
			<view class="index">
				<swiper @change="swpierChange" :style="{height:screenHeight + 'px'}">
					<swiper-item v-for="(img,index) in imgList" :key="index" @click="preImg(index)">
						<image :src="img" mode="widthFix"></image>
					</swiper-item>
				</swiper>
				<!-- #ifndef H5 -->
				<view class="detail-btn-view">
					<view class="btn download" @click="download">
						<i class="mini-icon mini-xiazai2"></i>
					</view>
					<!-- #ifdef APP-PLUS -->
					<view v-if="showBtn" class="btn setting" @click="setting">设为壁纸</view>
					<!-- #endif -->
					<view class="btn collect" @click="collect">
						<view v-if="!icCollect" class="mini-icon mini-shoucang-kongxin1"></view>
						<view v-else class="mini-icon mini-shoucang-shixin1" style="color: yellow;"></view>
					</view>
					<view class="btn collect" @click="open">
						<view class="mini-icon mini-sixin"></view>
					</view>
				</view>
				<!-- #endif -->
				<hover-ball v-if="isOfficial > 1" /><my-toast ref="mytoast" :isdistance="true" :toast="mytoast_data"></my-toast>
			</view>
		</view>
		<u-popup :show="commentShow" @close="close" @open="open" mode="bottom">
			<details-comment @showCommendPopup="showCommendPopup">
				<view class="commets-cont">
					<view class="inner">
						<view class="title">{{commentTotal}}条留言</view>
						<view class="goods-comment">
							<!-- <goods-comment :commentList="commentList" /> -->
							<block v-if="commentList.length">
								<goods-comment v-for="(item, index) in commentList" :key="index" :data="item" @reply="toReply"
									:index="index" ref="comment"></goods-comment>
								<u-loadmore v-if="commentLoadmoreShow" :status="commentIsLastPage ? 'nomore' : 'loading'"
									nomoreText="── THE END ──" :bgClass="''" iconSize="28" fontSize="28" color="#989898" />
								<view class="goods-comment_bottom" @tap.stop="loadMoreComment"
									v-if="!commentLoadmoreShow && !commentIsLastPage">
									查看更多<u-icon name="arrow-right" color="#555555" size="26rpx"></u-icon>
								</view>
							</block>
							<u-empty text="暂无留言" width="300" height="300" text-size="28" v-else />
						</view>
					</view>

				</view>
			</details-comment>

		</u-popup>
		<!-- <u-overlay :show="showOverlay" @click.stop="overlayClick" :z-index="20000"></u-overlay> -->
		<u-popup :show="showOverlay" @close="showOverlay=false" @open="open" mode="bottom" zIndex="20001" :overlayStyle="{'z-index':20000}">
			<view class="detail-popup" :style="detailPopupStyle" v-if="showOverlay">
				<view class="inner">
					<view class="detail-popup-header">
						<text class="cancel" @tap="showOverlay = false">取消</text>
						<text class="title">留言</text>
						<text class="confirm" @tap="addCommentOrReply">确定</text>
					</view>
					<!-- <u-line style="transform: scaleY(0.5);"></u-line> -->
					<textarea v-model="message" :adjust-position="false" :focus="focus" 
						class="detail-popup-textarea" ref="detail-popup-textarea" :placeholder="replyc" @blur="blur"
						@focus="focusChange" max-length="240" confirm-type="done" @confirm="addCommentOrReply"></textarea>
					<view class="detail-popup-footer">
						<view class="detail-popup-footer-icon" @tap="iconClick('smile')">
							<i class="mini-icon mini-xiaolian" :style="iconType === 'smile'? 'color: #F7E253;':'color: #323233;'"></i>
						</view>
						<text class="detail-popup-footer-text">{{240-message.length}}</text>
					</view>
					<view class="detail-popup-panel" :style="detailPopupPanelStyle" v-if="panelHeight && iconType === 'smile'">
						<emoji @chooseEmoji="chooseEmoji" :height="keyboardHeight-20">
						</emoji>
					</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import myToast from '@/contrib/components/common/toast/toast';
	import navBar from '@/components/common/navbar/navbar';
	import hoverBall from '@/contrib/components/common/hover-ball/hover-ball';
	import goodsComment from '@/pages/wallpaper/components/cu-comment/comment.vue'
	import emoji from '@/pages/wallpaper/components/cu-emoji/cu-emoji.vue'
	import detailsComment from "@/pages/wallpaper/components/details-comment.vue";
	import {
		commentItem
	} from '@/pages/wallpaper/components/comment.js'

	//预览图片
	export default {
		components: {
			myToast,
			navBar,
			hoverBall,
			goodsComment,
			emoji,
			detailsComment
		},
		mixins: [commentItem],
		data() {
			return {
				id: 0,
				imgShow: false,
				index: 0,
				showBtn: false,
				screenHeight: 0,
				imgLength: 0,
				providerList: [],
				imgList: [],
				detailDec: "",
				icCollect: 0,
				title: '',
				commentShow: false,
				commentTotal: 0
			}
		},
		onReady(){
			let that = this;
			uni.setNavigationBarTitle({
				title: "1/" + that.imgLength
			});
			
		},
		onLoad(options) {
			let that = this;
			that.globalOnloadProcess(options);

			// #ifdef APP-PLUS
			if (that.$store.state.platform === 'android') {
				that.showBtn = true;
			}
			// #endif
			that.screenHeight = uni.getSystemInfoSync().windowHeight;
			// 分享
			var wx_scene = decodeURIComponent(options.scene);
			if (wx_scene && wx_scene != 'undefined') {
				let query = {};
				if (wx_scene.indexOf('&') !== -1) {
					let scene_arr = wx_scene.split('&');
					scene_arr.map((item) => {
						let queryData = item.split('=')
						query[queryData[0]] = queryData[1]
					})
				} else {
					let queryData = scene.split('=')
					query[queryData[0]] = queryData[1]
				}
				if (query.from_user && query.from_user.length > 0) {
					uni.setStorageSync('form_user', query.from_user);
					uni.$store.commit('updateFormUser', query.from_user);
				}
				that.fph = true;
				that.getWallpaperDetail();
			} else if (options.id) {
				that.id = options.id;
				that.getWallpaperDetail();
			} else {
				that.detailDec = options.data;
				let data = JSON.parse(decodeURIComponent(options.data));
				that.imgList = data.imgs;
				that.imgLength = data.imgNum;
				that.icCollect = data.iscollect;
				that.id = data.id;
				that.title = data.title;
				that.commentTotal = data.comment_count;
			}
			
			// 获取分享通道
			uni.getProvider({
				service: "share",
				success: (e) => {
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log("获取登录通道失败", e);
				}
			});
			this.getCommentList()
		},
		onShareAppMessage() {
			let that = this;
			return {
				title: this.title,
				path: '/pages/wallpaper/detail?id=' + that.id + '&fph=1&from_user=' + that.$store.state.userInfo.id +
					'&tenant=' + that.global__tenant__.tenant_id,
				imageUrl: that.imgList[that.index] || that.$store.state.config.img.default_share
			}
		},
		onShareTimeline: function(res) {
			let that = this;
			return {
				title: that.$store.state.config.share.format.app_share_right,
				query: '' + 'fph=1&from_user=' + that.$store.state.userInfo.id + '&tenant=' + that.global__tenant__.tenant_id,
				imageUrl: that.imgList[that.index] || that.$store.state.config.img.default_share
			};
		},

		onNavigationBarButtonTap(e) {
			let that = this;

			if (e.index === 0) {
				// #ifdef APP-PLUS
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type ===
								'WXSenceTimeline' ?
								'WXSenceTimeline' : 'WXSceneSession',
							type: 0,
							title: that.$store.state.config2.page.wallpapers.name || '图集',
							summary: that.title,
							imageUrl: this.imgList[this.index],
							href: uni.wen.api.homeUrl,
							success: (res) => {
								console.log('success:' + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				});
				// #endif
			}
		},
		onShow: function() {
			let that = this;
			that.updateScene(58, 0, false, false, 0, 2);
		},
		onPullDownRefresh: function () {
		    uni.stopPullDownRefresh();
		},
		methods: {
			open() {
				// console.log('open');
				this.commentShow = true;
			},
			close() {
				this.commentShow = false
				// console.log('close');
			},
			getWallpaperDetail() {
				let that = this;
				uni.loading(true);
				uni.wen.util.request(uni.wen.api.ApiRootUrl + 'wallpaper/detail', {
					id: that.id
				}).then(function(res) {
					uni.loading(false);
					if (res.status) {
						that.setData({
							imgList: res.data.imgs,
							imgLength: res.data.imgNum,
							icCollect: res.data.iscollect,
							title: res.data.title,
						});
						uni.setNavigationBarTitle({
							title: "1/" + that.imgLength
						});
					} else {
						uni.showToast({
							title: res.message,
							icon: 'error'
						});
					}
				});
			},
			download() {
				uni.downloadFile({
					url: this.imgList[this.index],
					success: (e) => {
						uni.saveImageToPhotosAlbum({
							filePath: e.tempFilePath,
							success: () => {
								uni.showToast({
									icon: 'none',
									title: '已保存到手机相册'
								})
							},
							fail: () => {
								uni.showToast({
									icon: 'none',
									title: '保存到手机相册失败'
								})
							}
						});
					},
					fail: (e) => {
						uni.showModal({
							content: '下载失败，' + e.errMsg,
							showCancel: false
						})
					}
				})
			},
			collect() {
				let that = this;
				uni.wen.util.request(uni.wen.api.ApiRootUrl + 'wallpaper/action/collect', {
					id: that.id
				}).then(function(res) {
					if (res.status) {
						that.setData({
							icCollect: res.data.isCollect
						});
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'error'
						});
					}

				});

			},
			//#ifdef APP-PLUS
			setting() {
				uni.showToast({
					icon: 'none',
					title: '正在设为壁纸'
				})
				setTimeout(() => {
					var WallpaperManager = plus.android.importClass('android.app.WallpaperManager');
					var Main = plus.android.runtimeMainActivity();
					var wallpaperManager = WallpaperManager.getInstance(Main);
					plus.android.importClass(wallpaperManager);
					var BitmapFactory = plus.android.importClass('android.graphics.BitmapFactory');
					uni.downloadFile({
						url: this.imgList[this.index],
						success: (e) => {
							var filePath = plus.io.convertLocalFileSystemURL(e.tempFilePath);
							var bitmap = BitmapFactory.decodeFile(filePath);
							try {
								wallpaperManager.setBitmap(bitmap);
								uni.showToast({
									icon: 'none',
									title: '壁纸设置成功'
								})
							} catch (e) {
								uni.showToast({
									icon: 'none',
									title: '壁纸设置失败'
								})
							}
						},
						fail: () => {
							uni.showToast({
								icon: 'none',
								title: '壁纸设置失败'
							})
						}
					})
				}, 100)
			},
			//#endif
			swpierChange(e) {
				this.index = e.detail.current;
				uni.setNavigationBarTitle({
					title: e.detail.current + 1 + '/' + this.imgLength
				})
			},
			preImg(index) {
				if (this.imgShow) { //防止点击过快导致重复调用 
					return;
				}
				this.imgShow = true;
				setTimeout(() => {
					this.imgShow = false;
				}, 1000)
				setTimeout(() => {
					uni.previewImage({
						current: this.imgList[index],
						urls: this.imgList
					})
				}, 150)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-popup {
		z-index: 99999;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		display: flex;
		flex-direction: column;
		position: fixed;
		width: 750rpx;
		bottom: 0;
		transform: translateY(100%);
		align-items: stretch;
		transition-property: transform;
		transition-duration: 250ms;
		transition-timing-function: ease;
		@include background_color(page-box-background-color);
		color: #333 !important;

		.inner {
			width: $page-content-body-width;
			margin: auto;

			.detail-popup-header {
				height: 90rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.cancel {
					padding: 16rpx 0;
					font-size: $uni-font-size-base;
					color: #a9a9a9;
					font-weight: 600;
				}

				.title {
					flex: 1;
					display: flex;
					flex-direction: row;
					justify-content: center;
					padding: 16rpx 9;
					font-weight: 600;
					color: #323233;
					font-size: $uni-font-size-base;
					text-align: center;
				}

				.confirm {
					padding: 16rpx 9;
					font-size: $uni-font-size-base;
					color: #FB6E67;
					font-weight: 600;
				}
			}

			.detail-popup-textarea {
				height: 500rpx;
				width: $page-content-body-width;
				font-size: $uni-font-size-base;
				@include background_color(page-gray-background-color);
				border-radius: 20rpx;
				padding: 20rpx;
				box-sizing: border-box;
				color: #333 !important;
			}

			.detail-popup-footer {
				height: 80rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.detail-popup-footer-icon {
					padding: 0 0;

					.mini-icon {
						display: inline-flex;
						font-size: 50rpx;
					}
				}

				.detail-popup-footer-text {
					flex: 1;
					text-align: right;
					font-size: $uni-font-size-sm;
					color: #a9a9a9;
					padding-right: 24rpx;
				}
			}
		}
	}

	.commets-cont {
		position: relative;
		z-index: 99;
		overflow: hidden;
		@include background_color(page-box-background-color);
		width: 750rpx;
		padding-top: 30rpx;
		max-height: 60vh;
		overflow-y: scroll;
		border-radius: $uni-border-radius-base $uni-border-radius-base 0 0;
		.inner {
			width: $page-content-body-width;
			margin: auto;

			.goods-comment {
				padding-top: 24rpx;
			}

			.goods-comment_bottom {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: $uni-font-size-base;
				color: #555555;
				padding: 24rpx 0;
			}
		}
	}
</style>
<style lang="scss">
	swiper {
		background-color: #fff !important;
	}

	.index {
		flex: 1;
		width: 750upx;
		min-height: 100vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.detail-btn-view {
		width: 750upx;
		position: fixed;
		bottom: 75upx;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
	}

	.detail-btn-view .btn {
		height: 80upx;
		border-radius: 80upx;
		width: 80upx;
		justify-content: center;
		align-items: center;
		line-height: 80upx;
		margin: 0 30upx;
		font-family: texticons;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
	}

	.detail-btn-view image {
		width: 60upx;
		height: 60upx;
	}

	.detail-btn-view .setting {
		width: 300upx;
		text-align: center;
	}

	.detail-btn-view view text {
		margin-left: 10upx;
	}

	page {
		background-color: #000;
		height: 100%;
	}

	swiper {
		flex: 1;
		width: 750upx;
		background-color: #000;
		display: flex;
		flex-direction: column;
	}

	swiper-item {
		display: flex;
		align-items: center;
	}

	image {
		width: 750upx;
		height: 1125upx;
	}

	.detail-btn-view .btn .mini-icon {
		font-size: 56upx;
	}
</style>