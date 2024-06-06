<script>
export default {
  name: 'join-insure-info-card',
  props: {
    info: { type: Object, required: true }
  },
  data() {
    return {
      equityList: [
        { icon: 'lock', label: '意外伤害身故、残疾', price: '10万' },
        { icon: 'question-circle', label: '意外伤害医疗', price: '1万' },
        { icon: 'rmb-circle', label: '意外伤害住院津贴', price: '100/天' }
      ]
    }
  }
}
</script>

<template>
  <view class="insure-info-card">
    <view class="img-wrapper">
      <image class="img" :src="require('../../../static/insure.png')"/>
    </view>
    <view class="title">送你意外伤害「尊享保障」组局更安心</view>
    <view class="equity-wrapper">
      <view class="item-wrapper" v-for="(item, idx) in equityList" :key="idx">
        <u-icon :name="item.icon" size="32"/>
        <view class="label">{{ item.label }}</view>
        <view class="price">¥{{ item.price }}</view>
      </view>
    </view>
    <view class="tips-wrapper">*每次住院绝对免赔3天单次最高90天累计不超过180天</view>
  </view>
</template>

<style scoped lang="scss">
.insure-info-card {
  position: relative;
  margin-top: 20rpx;
  padding: 40rpx 20rpx 30rpx 20rpx;
  background: #FFFFFF;
  border-radius: 20rpx;

  .title {
    font-size: $uni-font-size-medium;
    font-weight: bold;
    color: #000000;
    line-height: 32rpx;
  }

  .equity-wrapper {
    margin-top: 32rpx;
    display: flex;
    flex-direction: column;
    gap: 32rpx;

    .item-wrapper {
      display: flex;
      align-items: center;
      font-size: $uni-font-size-sm-base;
      color: #000000;

      .label {
        margin-left: 15rpx;
      }

      .price {
        margin-left: 40rpx;
      }
    }

  }

  .tips-wrapper {
    margin-top: 32rpx;
    font-size: $uni-font-size-sm-base;
    color: #FC3A72;
  }

  .img-wrapper {
    position: absolute;
    top: 20rpx;
    right: 20rpx;

    .img {
      width: 200rpx;
      height: 200rpx;
    }
  }
}
</style>
