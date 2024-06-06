<script>
export default {
  name: 'join-activity-info-card',
  props: {
    info: { type: Object, required: true }
  }
}
</script>

<template>
  <view class="activity-info-card">
    <view class="info-wrapper">
      <image class="cover" :src="info.picList[0]"/>
      <view class="right-wrapper">
        <view class="title">{{ info.title }}</view>
        <view class="address-wrapper">
          <u-icon name="map" size="30"/>
          <view>{{ info.distance }} {{ info.location }}</view>
        </view>
      </view>
    </view>

    <view class="divider"/>

    <view class="tips-wrapper">
      <u-icon color="#FC3A72" name="info-circle-fill" size="36"/>
      <view>距活动开始12小时前随时可退~</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.activity-info-card {
  padding: 20rpx;
  background: #FFFFFF;
  border-radius: 20rpx;

  .info-wrapper {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 20rpx;

    .cover {
      width: 160rpx;
      height: 160rpx;
      border-radius: 20rpx;
    }

    .right-wrapper {
      flex: 1;

      .title {
        font-size: $uni-font-size-medium;
        font-weight: bold;
        color: #000000;
        line-height: 42rpx;
      }

      .address-wrapper {
        margin-top: 32rpx;
        display: flex;
        align-items: center;
        gap: 17rpx;
        font-size: $uni-font-size-sm-base;
        color: #000000;
        line-height: 26rpx;
      }
    }
  }


  .divider {
    margin: 20rpx 0;
    height: 1rpx;
    background-color: #F5F5F5;
  }

  .tips-wrapper {
    padding: 16rpx 20rpx;
    display: flex;
    align-items: center;
    gap: 10rpx;
    background: rgba(252, 58, 114, 0.05);
    border-radius: 16rpx;
    font-size: $uni-font-size-sm-base;
    color: #FC3A72;
    line-height: 32rpx;
  }
}
</style>
