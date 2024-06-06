<script>
export default {
  name: 'organize-bureau-details-bottom',
  props: {
    info: { type: Object, required: true }
  },
  computed: {
    btnText() {
      if (this.info.activityStatus === 1) {
        return `立即加入(¥${this.info.price})`
      } else if (this.info.activityStatus === 2) {
        return '已截止报名'
      } else {
        return '活动未开始'
      }
    }
  }
}
</script>

<template>
  <view class="bottom-wrapper">
    <view class="left-icon-wrapper">
      <view class="item-wrapper">
        <u-icon name="chat" size="44"/>
        <text>私信</text>
      </view>
      <view class="item-wrapper">
        <u-icon name="share" size="44"/>
        <text>分享</text>
      </view>
      <view class="item-wrapper">
        <u-icon :name="info.isCollect ? 'star-fill' : 'star'" size="44" :color="info.isCollect ? '#ff3974' : '#333333'"/>
        <text>收藏</text>
      </view>
    </view>
    <view :class="{'right-btn-wrapper': true, 'disabled': info.activityStatus !== 1}" @click="toSliderUrl(6, '/pagesZ/organize-bureau/join/index')">
      {{ btnText }}
    </view>
  </view>
</template>

<style scoped lang="scss">
.bottom-wrapper {
  padding: 20rpx 20rpx calc(env(safe-area-inset-bottom) + 20rpx) 20rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.06);

  .left-icon-wrapper {
    display: flex;
    align-items: center;
    gap: 54rpx;

    .item-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4rpx;
      font-size: $uni-font-size-sm;
      color: #A3A3A3;
      line-height: 32rpx;
    }
  }

  .right-btn-wrapper {
    width: 380rpx;
    height: 88rpx;
    background: #FC3A72;
    border-radius: 317rpx;
    text-align: center;
    font-size: $uni-font-size-medium;
    color: white;
    line-height: 88rpx;

    &.disabled {
      background: #DADADA;
    }
  }
}
</style>
