<script>
export default {
  name: 'organize-bureau-home-navbar'
}
</script>

<template>
  <view>
    <u-navbar placeholder bgColor="transparent">
      <view class="u-nav-left-slot" slot="left">
        <u-icon name="arrow-left" size="40" color="#fff" @click.stop.prevent="toSliderUrl(-2)"/>
        <u-line direction="column" :hairline="false" color="#fff" length="32" margin="0 10px"/>
        <u-icon name="home" size="40" color="#fff"/>
      </view>
    </u-navbar>

    <view class="location-wrapper">
      <u-icon name="map-fill" size="36" color="#ff3974"/>
      <view class="city-label">湖南省</view>
      <u-icon name="arrow-down" size="34" color="#000"/>
    </view>
  </view>
</template>

<style scoped lang="scss">
.u-nav-left-slot {
  display: flex;
  align-items: center;
  padding: 9rpx 17rpx;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 29rpx;
  border: 1rpx solid rgba(237, 237, 237, 0.5);
}

.location-wrapper {
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 10rpx;

  .city-label {
    font-size: $uni-font-size-medium;
    color: #000000;
  }
}
</style>
