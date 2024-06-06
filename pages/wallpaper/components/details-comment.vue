<template>
	<view class="comment-wrapper">
		<!-- <view class="title-wrapper">评论</view> -->
		<slot></slot>
		<view class="placeholder-wrapper" @tap.stop="showCommendPopup">说点什么...</view>
	</view>
</template>
<script>
	export default {
		name: "details-comment",
		components: {

		},
		data() {
			return {

			}
		},


		methods: {
			showCommendPopup() {
				this.$emit('showCommendPopup')
			}
		}
	}
</script>
<style scoped lang="scss">
	.comment-wrapper {
		background: #fff;
		padding-bottom: env(safe-area-inset-bottom);
		border-radius: $uni-border-radius-base $uni-border-radius-base 0 0;

		.title-wrapper {
			padding: 0 $page-row-spacing;
			font-size: 42rpx;
			font-weight: bold;
		}

		.placeholder-wrapper {
			margin: $uni-spacing-col-lg $page-row-spacing;
			padding: $uni-spacing-col-lg $uni-spacing-row-lg;
			background: $uni-bg-color-grey;
			border-radius: $uni-border-radius-lg-er;
			color: $uni-text-color-placeholder;
		}
	}
</style>