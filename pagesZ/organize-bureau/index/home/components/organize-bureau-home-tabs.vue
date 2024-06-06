<script>
export default {
  name: 'organize-bureau-home-tabs',
  props: {
    current: { type: Number, required: true },
    tabList: { type: Array, default: () => [] }
  },
  data() {
    return {
      lineBg: require('../../../../static/tabs-bg.png'),
      activeStyle: 'color: #333333; font-size: 30rpx',
      inactiveStyle: 'color: #A3A3A3; font-size: 30rpx',
      itemStyle: 'padding-left: 20rpx; padding-right: 20rpx; height: 34px;'
    }
  }
}
</script>

<template>
  <view class="tabs-wrapper">
    <u-tabs
        :list="tabList"
        :current="current"
        lineWidth="20"
        lineHeight="7"
        :lineColor="`url(${lineBg})`"
        :activeStyle="activeStyle"
        :inactiveStyle="inactiveStyle"
        :itemStyle="itemStyle"
    />
  </view>
</template>

<style scoped lang="scss">
.tabs-wrapper {
  z-index: 999999;
  position: sticky;
  top: 0;
  background: #F4F6F9;
  padding-top: 30rpx;
}
</style>
