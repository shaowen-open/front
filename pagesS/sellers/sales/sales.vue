<template>
	<view
		:class="'mini-page-wrap global-theme-' + global__theme__  + ' global-platform-' + global__platform__ + ' global-device-' + global__device__ + ' global-tenant-' + global__tenant__.tenant_id"
		:data-theme="global__theme__  ">
		<view style="min-height: 100vh;" class="mini-page-body">
			<navBar :back="true" :home="fph" title="我的卖出" :color="global__theme__ == 'black' ? '#ffffff' : '#000000'"
				:background="global__theme__ == 'black' ? '#19191e' : '#ffffff'">
				<!-- #ifdef APP || H5 -->
				<view slot="right" class="lxy-nav-bar__logo">
				</view>
				<!-- #endif -->
			</navBar>

			<u-sticky :offsetTop="0">
				<view class="top-tabs">
					<u-tabs :list="tapbar" @click="changeTabs" :current="baridx" :scrollable="false" :lineColor="primaryColor"
						:activeStyle="{color: primaryColor}"></u-tabs>
				</view>
			</u-sticky>

			<view class="container">
				<ls-skeleton :loading="loading" :skeleton="orderListSkeleton" :animate="true">
					<view class="order-list" v-for="(item, index) in list" :key="item.id">
						<view class="order-list-top">
							<view class="on">
								订单编号：
								<text :user-select="true">{{ item.order_id }}</text>
							</view>
							<view class="state">{{ item.status_text }}</view>
						</view>

						<view class="order-list-center">
							<view class="list-center-left">
								<block v-if="index1 < 3" v-for="(imgt, index1) in item.goods" :key="imgt.id">
									<image :src="imgt.pic" mode="aspectFill"></image>
								</block>
								<view class="picsum" v-if="item.goods.length > 3">+{{ item.goods.length - 3 }}</view>
							</view>
							<view class="list-center-rigth">
								<view class="price">

									<view class="blance" v-if="item.order_amount > 0">
										¥{{ item.order_amount }}
									</view>
									<view v-if="item.order_amount > 0 && item.order_amount_coin > 0" class="jia"> + </view>
									<view class="blance gold" v-if="item.order_amount_coin > 0">
										<view class="gold-icon flex-column"><i class="gold-color mini-icon mini-Gold_coin_01"></i></view>
										{{ item.order_amount_coin }}
									</view>

								</view>
								<view class="desc flex-row">
									<view class="number" style="margin-left: 15rpx;">数量:共{{ item.goods.length }}件</view>
								</view>

							</view>
						</view>
						<view class="logistics" v-if="item.status >= 2 && item.has_virtual == 1">
							<view class="logistics-box">
								该订单包含虚拟物品，请点击[订单详情]查看
							</view>
						</view>
						<view class="logistics" v-if="item.status == 7 || ([1,2].includes(item.status) && item.has_refund == 1)">
							<view class="logistics-box">
								本次订单中，有买家申请退款的商品，请点击[订单详情]进行操作
							</view>
						</view>
						<view class="logistics" v-if="item.express && item.express_no">
							<view class="logistics-box">
								{{ item.express }}：
								<text :user-select="true">{{ item.express_no }}</text>
								<view class="copy" @tap="copyTap" :data-no="item.express_no">复制</view>
							</view>
							<view class="logistics-box" :data-nu="item.express_no"
								@tap.stop.prevent=" toSliderUrl(6, '/pagesA/shop/logistics/logistics?nu='+item.express_no + '&type=' + item.express_type)">
								查看物流
								<view class="arrow-y"></view>
							</view>
						</view>

						<u-collapse :accordion="true" :border="false" @change="linfold($event, { idx: index })">
							<u-collapse-item :clickable="false" :border="false" :isLink="false" :ref="'u_collapse_item_'+item.id">
								<view class="l-collapse-title" slot="right">
									
									<view class="title-font" @tap.stop.prevent="collapseItemChange('u_collapse_item_'+item.id)">
										订单详情
										<view v-if="particulars && lidx == index" class="arrow-d"></view>
										<view v-else class="arrow-s"></view>
									</view>
									<view class="order-btn">
										<view v-if="item.pay_status == 1 && item.status == 5" class="btn bg2">
											买家已取消订单
										</view>
										<view @tap.stop.prevent="toSliderUrl(18, item.user_id)" class="btn bg2">
											联系买家
										</view>
										<view v-if="item.pay_status == 1 && item.status == 0" class="btn bg1">
											买家未付款
										</view>
										<!-- <view v-if="item.pay_status == 2 && (item.status == 7 || ([1,2].includes(item.status) && item.has_refund == 1))" class="btn bg1">
									    买家申请退款
									</view> -->
										<view v-if="item.pay_status == 2 && item.status == 1 && item.has_refund != 1" class="btn bg1"
											@tap.stop.prevent="toSliderUrl(6, '/pagesS/sellers/deliver/deliver?oid=' + item.id)">去发货</view>
										<view v-if="item.pay_status == 2 && item.status == 2" class="btn bg1">
											待买家确定收货
										</view>
										<view @tap.stop.prevent="evaluateOrder" :data-idx="index"
											v-if="item.pay_status == 2 && item.status == 3" class="btn bg1">去晒单</view>
									</view>
								</view>
								<view class="content-box">
									<view class="content-title">买家地址</view>
									<view class="content-adds">
										<view class="left flex-row">
											<i class="mini-icon mini-dizhi3 _image"></i>
											<view class="adds">
												<view class="txt1">{{ item.adds_name }} {{ item.adds_mobile }}</view>
												<view class="txt2 u-line-2">{{ item.address }}</view>
											</view>
										</view>
										<view class="right">
											<i class="mini-icon mini-fuzhi"
												@tap.stop.prevent="toSliderUrl(17, '收件人：' + item.adds_name + '    ' + '手机号：' + item.adds_mobile + '    ' + '收货地址：' + item.address)"
												v-if="item.status == 1"></i>
										</view>
									</view>
									<view class="content-title">商品信息</view>
									<view class="content-goods">
										<view class="goods" @tap.stop.prevent="toSliderUrl(git.goods_type == 6 ? 28 : 3, git.goods_id)"
											v-for="(git, gidx) in item.goods" :key="git.id">
											<image :src="git.pic" mode="aspectFill"></image>

											<view class="goods-info">
												<view class="goods-info-name">
													<text class="_text">{{ git.name }}</text>
													<view class="icon flex-column" v-if="git.goods_type == 6">
														<i class="mini-icon2 mini-ershou"></i>
													</view>
												</view>
												<view class="goods-info-doc">{{ git.product }}</view>
												<view class="goods-info-number">
													<text class="txt">{{ git.quantity }}x</text>
													<block v-if="git.credit_type == 1">
														￥<u-count-to :endVal="git.recharge" :decimals="2"
															:color="global__theme__ == 'black' ? '#ffffff' : '#000000'" fontSize="26"></u-count-to>
													</block>
													<block v-else>
														<view class="blance gold" v-if="git.recharge > 0">
															<view class="gold-icon flex-column"><i class="gold-color mini-icon mini-Gold_coin_01"></i>
															</view>
															{{ git.recharge }}
														</view>
													</block>
												</view>
												<view class="goods-info-btn-box">
													<block v-if="item.pay_status == 2 && git.state == 0">
														<block v-if="git.goods_type == 2 || git.goods_type == 3 || git.goods_type == 4">
															<view @tap.stop.prevent="downloadGoods(git.download_url)" class="goods-info-btn bg1"
																v-if="git.goods_type == 3">
																立即下载
															</view>
															<view @tap.stop.prevent="toPaiedContent(git.name, git.paid_content)"
																class="goods-info-btn bg1" v-if="git.goods_type == 2">
																虚拟发货信息
															</view>
															<view @tap.stop.prevent="toPaiedContent(git.name, git.paid_content)"
																class="goods-info-btn bg1" v-if="git.goods_type == 4">
																查看卡密
															</view>
														</block>
														<block v-else>
															<block class="" v-if="git.refund_deadline == 0">
																<view class="goods-info-btn bg-gray">
																	商品不支持买家退款
																</view>
															</block>
															<block v-else>
																<view class="goods-info-btn bg-gray">
																	买家处于可退款时间内
																</view>
															</block>
														</block>
													</block>
													<block v-if="git.state == 1">
														<view class="goods-info-btn tbg1" @tap.stop.prevent="refund('confirm', git.id)">同意退款</view>
														<view class="goods-info-btn tbg1" @tap.stop.prevent="refund('cancel', git.id)">拒绝</view>
													</block>
													<block v-if="git.state == 2">
														<view class="goods-info-btn tbg1">我已收到退回货物，同意退款</view>
														<view class="goods-info-btn tbg1">拒绝</view>
													</block>
													<view class="goods-info-btn tbg2" v-if="git.state == 3">已退款</view>
												</view>
											</view>
										</view>
									</view>
									<block v-if="item.remark">
										<view class="content-title">卖家备注</view>
										<view class="remark-text">{{ item.remark }}</view>
									</block>
									
									<block v-if="item.face_to_face > 0 && item.order_coupon && item.order_coupon.scanner > 0">
										<view class="content-title">核销记录</view>
										<view class="content-list">
										    <text class="t1">核销人</text>
										    <text class="t2" @tap.stop.prevent="toSliderUrl(4, item.order_coupon.scanner)">{{ item.order_coupon.scan_user.user_name }}</text>
										</view>
										<view class="content-list">
										    <text class="t1">核销时间</text>
										    <text class="t2">{{ item.order_coupon.scan_at }}</text>
										</view>
										<view style="height: 20rpx;"></view>
									</block>
									
									<view class="content-title">订单信息</view>
									<view class="content-list" v-if="item.pay_way && item.pay_way.length > 0">
										<text class="t1">支付方式</text>
										<view class="num">
											{{ item.pay_way }}
										</view>
									</view>
									<view class="content-list">
										<text class="t1">下单时间</text>
										<text class="t2">{{ item.created_at }}</text>
									</view>
									<view class="content-list" v-if="item.ship_at">
										<text class="t1">发货时间</text>
										<text class="t2">{{ item.ship_at }}</text>
									</view>
									<view class="content-list">
										<text class="t1">商品总额</text>
										<view class="num">

											<view class="blance" v-if="item.goods_amount > 0">
												¥{{ item.goods_amount }}
											</view>
											<view v-if="item.goods_amount > 0 && item.goods_amount_coin > 0" class="jia"> + </view>
											<view class="blance gold" v-if="item.goods_amount_coin > 0">
												<view class="gold-icon flex-column"><i class="gold-color mini-icon mini-Gold_coin_01"></i>
												</view>
												{{ item.goods_amount_coin }}
											</view>

										</view>
									</view>
									<view class="content-list">
										<text class="t1">会员优惠</text>
										<view class="num">

											<view class="blance" v-if="item.discounts_amount > 0">
												¥{{ item.discounts_amount }}
											</view>
											<view v-if="item.discounts_amount > 0 && item.discounts_amount_coin > 0" class="jia"> + </view>
											<view class="blance gold" v-if="item.discounts_amount_coin > 0">
												<view class="gold-icon flex-column"><i class="gold-color mini-icon mini-Gold_coin_01"></i>
												</view>
												{{ item.discounts_amount_coin }}
											</view>

										</view>
									</view>
									<view class="content-list">
										<text class="t1">买家实付</text>
										<view class="num">

											<view class="blance" v-if="item.order_amount > 0">
												¥{{ item.order_amount }}
											</view>
											<view v-if="item.order_amount > 0 && item.order_amount_coin > 0" class="jia"> + </view>
											<view class="blance gold" v-if="item.order_amount_coin > 0">
												<view class="gold-icon flex-column"><i class="gold-color mini-icon mini-Gold_coin_01"></i>
												</view>
												{{ item.order_amount_coin }}
											</view>

										</view>
									</view>
								</view>
							</u-collapse-item>
						</u-collapse>
					</view>
					<u-loadmore v-if="loadmoreShow" :status="isLastPage ? 'nomore' : 'loading'" nomoreText="── THE END ──"
						iconSize="28" fontSize="28" color="#989898" />
					<block v-if="isEmpty" class="empty-view">
						<u-empty text="空" width="300" height="300" text-size="28" />
					</block>
				</ls-skeleton>
			</view>

			<u-popup :show="evaluate" @close="ckEvaluate">
				<view class="popup-box">
					<view class="evaluate-goods" @tap.stop.prevent="toSliderUrl(3, item.goods_id)"
						v-for="(item, index) in goodslist" :key="item.id">
						<image class="evaluate-goods-pic" :src="item.pic" mode="aspectFill"></image>

						<view class="evaluate-goods-text">
							<view class="t1">{{ item.name }}</view>
							<view class="t2">{{ item.product }}</view>
						</view>

						<view class="evaluate-goods-radio" @tap.stop.prevent="radioGoods" :data-check="item.is_check"
							:data-idx="index">
							<image v-if="item.is_check" src="/pagesA/static/image/isradioy.png"></image>
							<image v-else src="/pagesA/static/image/isradio.png"></image>
						</view>
					</view>
					<view class="evaluate-btn" @tap="toPostsCreat">晒单</view>
				</view>
			</u-popup>

			<u-popup :show="serviceShow" @close="ckEvaluate">
				<view class="popup-box">
					<view class="service-t1">订单已成功提交退货/退款申请</view>
					<view class="service-t2">1.如已收货请您联系客服获取退货地址，与客服沟通后将物品寄回，我们将会以最快的速度为您退款</view>
					<view class="service-t2">2.未收货品请您联系客服拦截物流，我们将会以最快的速度为您退款。</view>
					<button class="service-btn" @tap.stop.prevent="toSliderUrl(17, config_about_qq)">联系客服QQ:
						{{ config_about_qq }}</button>
				</view>
			</u-popup>
			<hover-ball v-if="isOfficial > 1" /><my-toast ref="mytoast" :isdistance="true" :toast="mytoast_data"></my-toast>
		</view>
	</view>
</template>

<script>
	import myToast from '@/contrib/components/common/toast/toast';
	import navBar from '@/components/common/navbar/navbar';
	import hoverBall from '@/contrib/components/common/hover-ball/hover-ball';
	import lsSkeleton from '@/components/common/ls-skeleton/ls-skeleton';

	const shop = require('@/mixins/shop');
	const common = require('@/mixins/common');
	var options = {};
	shop(options);
	common(options);
	export default {
		mixins: [{
			methods: options
		}],
		components: {
			myToast,
			navBar,
			hoverBall,
			lsSkeleton
		},
		computed: {
			config_about_qq: {
				get() {
					let that = this;
					return that.$store.state.config.about.qq;
				},
				set(v) {}
			},
			config_app_coins_name: {
				get() {
					let that = this;
					if (that.$store.state.config.app.coins) {
						return that.$store.state.config.app.coins.name;
					}
					return '硬币';
				},
				set(v) {}
			},
		},
		data() {
			return {
				pagebgcolorClass: 'pagebg_white',fph: false,mytoast_data: {},pageTheme: 'default',page__scene__: 54,
				needFresh: false,
				tapbar: [{
						name: '全部',
					},
					{
						name: '待支付',
						badge: {
							value: 0,
						}
					},
					{
						name: '待发货',
						badge: {
							value: 0,
						}
					},
					{
						name: '待收货',
						badge: {
							value: 0,
						}
					},
					{
						name: '退款中',
						badge: {
							value: 0,
						}
					}
				],
				orderListSkeleton: [],
				baridx: 0,
				particulars: false,
				list: [],
				lidx: 0,
				page: 1,
				loading: false,
				loadmoreShow: false,
				isLastPage: false,
				isEmpty: false,
				oid: 0,
				on: 0,
				evaluate: false,
				goodslist: [],
				refundGoods: [],
				serviceShow: false,

				imgt: {
					id: '',
					pic: ''
				},

				git: {
					goods_id: '',
					id: '',
					pic: '',
					name: '',
					product: '',
					quantity: '',
					vip_price: '',
					state: 0
				},

				gidx: 0,
			};
		},
		onLoad: function(options) {
			let that = this;
			that.globalOnloadProcess(options);
			// 骨架屏
			that.orderListSkeleton = that.$store.state.skeleton.orderList;

			if (options.type) {
				that.setData({
					baridx: options.type
				});
			}
			if (uni.$store.state.token) {
				that.getShopOrderCount(1);
				that.getShopOrderList(1);
			} else {
				uni.showModal({
					title: '前往登录',
					content: '您还没有登录无法查看订单信息',
					confirmText: '立即登录',
					cancelText: '取消',
					success: function(res) {
						if (res.confirm) {
							uni.wen.toUrl(-4, null)
						} else if (res.cancel) {

						}
					}
				});
			}
		},
		onShow: function() {
			let that = this;
			that.updateScene(54, 0);

			if (that.needFresh) {

				that.needFresh = false;
				that.page = 1;
				that.list = [];

				that.getShopOrderCount(1);
				that.getShopOrderList(1);
			}
		},
		onPullDownRefresh: function() {
			let that = this;

			that.setData({
				baridx: 0,
				particulars: false,
				list: [],
				lidx: 0,
				page: 1,
				loading: false,
				loadmoreShow: false,
				isLastPage: false,
				isEmpty: false
			});

			that.getShopOrderCount(1);
			that.getShopOrderList(1);
			uni.stopPullDownRefresh();
		},
		onReachBottom: function() {
			let that = this;
			that.setData({
				loadmoreShow: true,
				page: that.page + 1
			});
			that.getShopOrderList(1);
		},
		onShareAppMessage: function(res) {},
		methods: {
			refund(action, order_good_id) {
				let that = this;
				if (action == 'confirm') {
					uni.showModal({
						title: '提示',
						content: '确定要同意买家的退款申请吗？同意申请操作是不可逆的。',
						confirmText: '同意退款',

						success(res) {
							if (res.confirm) {

								uni.wen.util.request(
									uni.wen.api.ApiRootUrl + 'shop/orderRefund', {
										action: 'confirm',
										order_good_id: order_good_id
									}, 'POST').then(function(res) {
									if (res.status) {
										uni.showToast({
											title: '操作成功',
											icon: 'none',
											duration: 2000
										});
										setTimeout(function() {
											uni.startPullDownRefresh();
										}, 500);
									} else {
										uni.showToast({
											title: res.message,
											icon: 'none',
											duration: 2000
										});
									}
								});
							}
						}
					});
				} else if (action == 'cancel') {
					uni.showModal({
						title: '提示',
						content: '确定要拒绝买家的退款申请吗？',
						confirmText: '拒绝退款',

						success(res) {
							if (res.confirm) {

								uni.wen.util.request(
									uni.wen.api.ApiRootUrl + 'shop/orderRefund', {
										action: 'cancel',
										order_good_id: order_good_id
									}, 'POST').then(function(res) {
									if (res.status) {
										uni.showToast({
											title: '操作成功',
											icon: 'none',
											duration: 2000
										});
										setTimeout(function() {
											uni.startPullDownRefresh();
										}, 500);
									} else {
										uni.showToast({
											title: res.message,
											icon: 'none',
											duration: 2000
										});
									}
								});
							}
						}
					});
				}
			},
			collapseItemChange(id) {
				let that = this;
				that.$refs[id][0].clickHandler();
			},
			downloadGoods(url) {
				// #ifdef H5
				const {
					platform
				} = uni.getSystemInfoSync();
				if (platform === 'ios') {
					uni.showToast({
						title: '因iphone系统限制，请使用安卓下载',
						icon: 'none'
					})
				} else {
					window.location.href = url;
				}
				// #endif
				// #ifdef APP || MP-WEIXIN
				let that = this;
				uni.loading(true);
				let task = uni.downloadFile({
					url: url,
					success(res) {
						uni.loading(false);
						if (res.statusCode === 200) {
							uni.showToast({
								title: '下载成功!',
								icon: 'none'
							})
						}
					},
					error() {
						uni.loading(false);
						uni.showToast({
							title: '下载失败',
							icon: 'none'
						});
					},
				});
				// #endif
			},
			changeTabs(e) {
				this.setData({
					baridx: e.index,
					list: [],
					page: 1,
					loading: false,
					loadmoreShow: false,
					isLastPage: false,
					isEmpty: false,
					particulars: false
				});
				this.getShopOrderList(1);
			},
			toPaiedContent(title, content) {
				let item = {
					title: title,
					content: content
				};
				uni.wen.toUrl(6, '/pages/help/helpDetail/helpDetail?item=' + encodeURIComponent(JSON.stringify(item)), null);
			},

			confirmReceipt(e) {
				let that = this;
				let oid = e.currentTarget.dataset.id;
				uni.showModal({
					title: '提示',
					content: '是否确认要确认收货该订单？',

					success(res) {
						if (res.confirm) {
							that.setData({
								oid: oid
							});
							that.getShopConfirmReceipt();
						}
					}
				});
			},

			orderRefund(e) {
				let that = this;
				let index = e.currentTarget.dataset.index;
				let gidx = e.currentTarget.dataset.gidx;
				let on = e.currentTarget.dataset.on;
				uni.showModal({
					title: '提示',
					content: '确定要提交退款申请吗？退款申请操作是不可逆的。',
					confirmText: '提交退款',

					success(res) {
						if (res.confirm) {
							let list = that.list;
							let refundGoods = list[index].goods[gidx];
							list[index].goods[gidx].state = 1;
							that.setData({
								refundGoods: refundGoods,
								on: on,
								list: list
							});
							that.getShopOrderRefund();
						}
					}
				});
			},

			refundsFun(e) {
				let that = this;
				let index = e.currentTarget.dataset.index;
				let gidx = e.currentTarget.dataset.gidx;
				let on = e.currentTarget.dataset.on;
				uni.showModal({
					title: '提示',
					content: '确定要提交退货/退款申请吗？退货/退款申请操作是不可逆的。',
					confirmText: '提交申请',

					success(res) {
						if (res.confirm) {
							let list = that.list;
							let refundGoods = list[index].goods[gidx];
							list[index].goods[gidx].state = 2;
							that.setData({
								refundGoods: refundGoods,
								on: on,
								list: list
							});
							that.getShopRefundGoods();
						}
					}
				});
			},

			pushDelivery(e) {
				let that = this;
				let on = e.currentTarget.dataset.on;
				that.setData({
					on: on
				});
				that.getShopPushDelivery();
			},

			delOrder(e) {
				let that = this;
				let idx = e.currentTarget.dataset.idx;
				let oid = e.currentTarget.dataset.id;
				uni.showModal({
					title: '提示',
					content: '是否确认要删除该订单？删除操作是不可逆的。',

					success(res) {
						if (res.confirm) {
							let list = that.list;
							list.splice(idx, 1);
							that.setData({
								oid: oid,
								list: list
							});
							that.getShopDelOrder();
						}
					}
				});
			},

			cancelOrder(e) {
				let that = this;
				let idx = e.currentTarget.dataset.idx;
				let oid = e.currentTarget.dataset.id;
				uni.showModal({
					title: '提示',
					content: '是否确认要取消该订单？',

					success(res) {
						if (res.confirm) {
							let list = that.list;

							if (that.baridx == 0) {
								list[idx].status = 5;
								list[idx].status_text = '已取消';
							} else {
								list.splice(idx, 1);
							}

							that.setData({
								oid: oid,
								list: list
							});
							that.getShopCancelOrder();
						}
					}
				});
			},

			evaluateOrder(e) {
				let that = this;
				let idx = e.currentTarget.dataset.idx;
				let goodslist = that.list[idx].goods;

				for (let v of goodslist) {
					v.is_check = true;
				}

				that.setData({
					evaluate: true,
					goodslist: goodslist
				});
			},

			radioGoods(e) {
				let idx = e.currentTarget.dataset.idx;
				let check = e.currentTarget.dataset.check;
				let goodslist = this.goodslist;

				if (check) {
					goodslist[idx].is_check = false;
				} else {
					goodslist[idx].is_check = true;
				}

				this.setData({
					goodslist: goodslist
				});
			},

			ckEvaluate() {
				this.setData({
					evaluate: false,
					goodslist: []
				});
			},

			toPostsCreat() {
				let that = this;
				let goodslist = that.goodslist;
				let postsGoods = [];
				let obj = {};
				goodslist = goodslist.reduce((item, next) => {
					if (next.is_check) {
						if (obj[next.goods_id]) {
							('');
						} else {
							obj[next.goods_id] = true && item.push(next);
						}
					}

					return item;
				}, []);

				for (let v of goodslist) {
					let goods = {};
					goods.id = v.goods_id;
					goods.name = v.name;
					goods.pic = v.pic;
					postsGoods.push(goods);
				}

				uni.setStorageSync('postsGoods', postsGoods);
				uni.wen.toUrl(6, '/pagesA/creat/index/creat', null);
			},

			linfold(e, obj) {
				this.setData({
					lidx: obj.idx,
					particulars: e[0].status == "open"
				});
			},

			linexpand(e, _dataset) {
				/* ---处理dataset begin--- */
				this.datasetHandle(e, _dataset);
				/* ---处理dataset end--- */
				console.log('linexpand: ' + linexpand);
				let idx = e.currentTarget.dataset.idx;
				this.setData({
					lidx: idx,
					particulars: true
				});
			},

			copyTap(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.no
				});
			},

			toAdds(order_id, id) {
				let that = this;
				uni.wen.toUrl(6, '/pagesA/mine/address/address?isChoose=1&order=' + order_id + '&id=' + id, null);
			}

		}
	};
</script>
<style lang="scss">
	@import './sales.scss';

	.goods-info-btn {
		margin-left: 10rpx;
	}
</style>