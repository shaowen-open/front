<template>
	<view>
		<view class="comment" v-for="(res, index) in commentList" :key="res.id">
			<view class="left">
				<image :src="res.url" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ res.name }}</view>
				</view>
				<view class="content">{{ res.comment_content }}</view>
				<!-- <view class="reply-box" v-if="isShowReplyBox">
					<view class="item" v-for="(item, index) in res.replyList" :key="item.index">
						<view class="username">{{ item.name }}</view>
						<view class="text">{{ item.contentStr }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
						共{{ res.allReply }}条回复
						<u-icon class="more" name="arrow-right" :size="26"></u-icon>
					</view>
				</view> -->
				<view class="bottom">
					{{ res.date }}
					<!-- <view class="reply">回复</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	数据示例 
	[
		{
			id: 1,
			name: '叶轻眉',
			date: '12-25 18:58',
			content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
			url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
			allReply: 12,
			likeNum: 33,
			isLike: false,
			replyList: [
				{
					name: 'uview',
					content: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
				},
				{
					name: '粘粘',
					content: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
				}
			]
		},
		{
			id: 2,
			name: '叶轻眉1',
			date: '01-25 13:58',
			content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
			allReply: 0,
			likeNum: 11,
			isLike: false,
			url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
		},
		{
			id: 3,
			name: '叶轻眉2',
			date: '03-25 13:58',
			content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
			allReply: 0,
			likeNum: 21,
			isLike: false,
			allReply: 2,
			url: '../../../static/logo.png',
			replyList: [
				{
					name: 'uview',
					content: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
				},
				{
					name: '豆包',
					content: '想吃冰糖葫芦粘豆包，但没钱5555.........'
				}
			]
		},
		{
			id: 4,
			name: '叶轻眉3',
			date: '06-20 13:58',
			content: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
			url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
			allReply: 0,
			likeNum: 150,
			isLike: false
		}
	]
	*/
	export default {
		name: 'gdbase-goods-comment',
		props: {
			// 评论数据
			commentList: {
				type: Array,
				default () {
					return [];
				}
			},
			// 是否显示回复框
			isShowReplyBox: {
				type: Boolean,
				default: false
			},
			// 是否显示回复 按钮
			isShowReplyBtn: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {

			}
		},
	}
</script>

<style lang="scss">
	.comment {
		display: flex;
		padding: 20rpx 40rpx;

		.left {
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 50%;
				background-color: #f2f2f2;
			}
		}

		.right {
			flex: 1;
			padding-left: 20rpx;
			font-size: $uni-font-size-medium;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: #5677fc;
				}

				.like {
					display: flex;
					align-items: center;
					color: #9a9a9a;
					font-size: $uni-font-size-sm-base;

					.num {
						margin-right: 4rpx;
						color: #9a9a9a;
					}
				}

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx #666;

					.username {
						font-size: $uni-font-size-sm;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
			}

			.bottom {
				margin-top: 20rpx;
				display: flex;
				font-size: $uni-font-size-sm;
				color: #9a9a9a;

				.reply {
					color: #5677fc;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>