<template>
<view :class="'mini-page-wrap global-theme-' + global__theme__  + ' global-platform-' + global__platform__ + ' global-device-' + global__device__ + ' global-tenant-' + global__tenant__.tenant_id" :data-theme="global__theme__  ">
	<view class="mini-page-body wallpaper-wrap">
		<view class="grid">
			<!-- <ls-skeleton :loading="wallpaperLoaded" :skeleton="waterfallSkeleton" :animate="true">

			</ls-skeleton> -->
			<block v-if="lists.length > 0">
				<view class="item" v-for="item in lists" :key="item.id">
					<view class="panel" @click="goDetail(item)">
						<image class="card-img" :src="item.firstImg" mode="aspectFit"></image>
						<text class="card-num-view">{{item.imgNum}}P</text>
						<view class="card-bottm row">
							<view class="car-title-view row">
								<text class="card-title">{{item.title}}</text>
							</view>
						</view>
					</view>
				</view>
			</block>

			<block v-if="lists.length <= 0">
				<u-empty :text="`还没有${config2_page_wallpapers_name}`" width="300" height="300" text-size="28" />
			</block>
		</view>
		<hover-ball v-if="isOfficial > 1" /><my-toast ref="mytoast" :isdistance="true" :toast="mytoast_data"></my-toast>
	</view>
</view>
</template>

<script>
	import myToast from '@/contrib/components/common/toast/toast';
	import navBar from '@/components/common/navbar/navbar';
	import hoverBall from '@/contrib/components/common/hover-ball/hover-ball';
	import lsSkeleton from '@/components/common/ls-skeleton/ls-skeleton';

	 //预览图片

	export default {
		components: {
			myToast,navBar,hoverBall,lsSkeleton
		},
		computed:{
			config2_page_wallpapers_name:{
				get(){
					let that = this;
					if(that.$store.state.config2.page.wallpapers && that.$store.state.config2.page.wallpapers.name){
						return that.$store.state.config2.page.wallpapers.name;
					}else{
						return '图集';
					}
				},
				set(v){}
			},
		},
		data() {
			return {
				pagebgcolorClass: 'pagebg_white',fph: false,mytoast_data: {},pageTheme: 'default',page__scene__: 59,
				page: 0,
				lists: [],
				isRefresh: false,
				wallpaperLoaded: true,
				waterfallSkeleton: []
			}
		},
		onLoad(options) {
			let that = this;
			that.globalOnloadProcess(options);

			if(that.$store.state.config2.page.wallpapers && that.$store.state.config2.page.wallpapers.name){
				uni.setNavigationBarTitle({
					title: '我的' + that.$store.state.config2.page.wallpapers.name
				});
			}else{
				uni.setNavigationBarTitle({
					title: '我的图集'
				});
			}

			that.waterfallSkeleton = that.$store.state.skeleton.waterfall;

			that.getData();
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								});
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								});
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								});
								break;
							default:
								break;
						}
					}
					that.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败', e);
				}
			});
		},
		onPullDownRefresh() {
			let that = this;
			that.setData({
				lists: [],
				isRefresh: true,
				page: 0,
				wallpaperLoaded: true
			});
			that.getData();
		},
		onReachBottom() {
			this.getData();
		},
		onShow: function() {
			let that = this;
			that.updateScene(59, 0, true, false, 0, 2);
		},
		methods: {
			getData() {
				let that = this;
				if(that.page == 0){
					that.wallpaperLoaded = true;
				}
				uni.wen.util.request(uni.wen.api.ApiRootUrl + 'wallpaper/collected', {page: that.page}).then(function(res) {
					if(res.status){
						that.setData({
							lists: that.lists.concat(res.data),
							page: that.page + 1,
							wallpaperLoaded: false
						});

					}else{

						uni.showToast({
							title: res.message,
							icon:'error'
						});
					}

					if(that.isRefresh){
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
					}

				});
			},
			goDetail(item) {
				uni.wen.toUrl(6, '/pages/wallpaper/detail?data=' + encodeURIComponent(JSON.stringify(item)), null);
			}
		}
	}
</script>

<style lang="scss">
@import '@/pages/wallpaper/wallpaper.scss';
</style>
