<script>
import PointsMallGoodsDetailsPopup from '@/pagesU/points-mall/comonents/points-mall-goods-details-popup.vue'
import PetAdoptionHomeNavbar from '@/pagesP/pet-adoption/index/home/components/pet-adoption-home-navbar.vue'

export default {
  name: 'join-bottom-tools',
  components: { PetAdoptionHomeNavbar, PointsMallGoodsDetailsPopup },
  props: {
    info: { type: Object, required: true },
    totalPrice: { type: String, required: true },
  }
}
</script>

<template>
  <view class="join-bottom-tools" @click="$emit('click')">
    <view class="btn-wrapper">确认支付 ￥{{ totalPrice }}</view>
  </view>
</template>

<style scoped lang="scss">
.join-bottom-tools {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.06);
  padding: 20rpx 20rpx calc(env(safe-area-inset-bottom) + 20rpx) 20rpx;

  .btn-wrapper {
    width: 100%;
    height: 88rpx;
    background: #FC3A72;
    border-radius: 317rpx;
    font-size: $uni-font-size-medium;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
    line-height: 88rpx;
  }
}
</style>
