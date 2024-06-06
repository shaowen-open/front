<script>
import ActivityList from '@/pages/message/activityList/activityList.vue'

export default {
  name: 'index',
  components: { ActivityList },
  data() {
    return {
      isAgreement: false
    }
  }
}
</script>

<template>
  <view class="settle-in-page">
    <u-navbar bgColor="transparent"/>
    <image class="top-bg" :src="require('../../static/settle-in-bg.png')"/>

    <!-- 入驻卡片信息 -->
    <view class="settle-in-ino-wrapper">
      <view class="title">填写入驻信息</view>
      <view class="item-wrapper avatar-wrapper">
        <view class="label">俱乐部头像</view>
        <image class="avatar" :src="require('../../static/avatar-default.png')"/>
        <u-icon nam="arrow-right"/>
      </view>
      <view class="item-wrapper input-wrapper">
        <view class="label">俱乐部名称</view>
        <input class="input" placeholder="填写俱乐部名称"/>
        <u-icon nam="arrow-right"/>
      </view>
      <view class="item-wrapper input-wrapper">
        <view class="label">俱乐部位置</view>
        <input class="input" placeholder="填写俱乐部位置"/>
        <u-icon nam="arrow-right"/>
      </view>
      <view class="item-wrapper input-wrapper">
        <view class="label">主理人联系方式</view>
        <input class="input" placeholder="填写主理人电话号码"/>
        <u-icon nam="arrow-right" size="17"/>
      </view>
    </view>

    <!-- 底部协议和按钮栏 -->
    <view class="bottom-tools-wrapper">
      <view class="agreement-wrapper">
        <u-icon :name="isAgreement ? 'checkmark-circle-fill' : 'minus-circle'" color="#FC3A72"/>
        <view class="agreement-text-wrapper">
          <text>我已阅读并同意组局</text>
          <text class="agreement">《用户协议》</text>
          <text class="agreement">《隐私政策》</text>
          <text>和</text>
          <text class="agreement">《组局俱乐部产品服务协议》</text>
        </view>
      </view>

      <view class="submit-button-wrapper">立即入驻</view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.settle-in-page {
  background: #F4F6F9;

  .top-bg {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 916rpx;
    z-index: -1;
  }

  .settle-in-ino-wrapper {
    margin: 792rpx 20rpx 0 20rpx;
    padding: 40rpx 20rpx;
    height: 524rpx;
    background: #FFFFFF;
    border-radius: 40rpx;

    .title {
      text-align: center;
      font-size: $uni-font-size-lg;
      color: #000000;
      line-height: 32rpx;
    }

    .item-wrapper {
      margin-top: 52rpx;
      display: flex;
      align-items: center;

      .label {
        font-size: $uni-font-size-medium;
        color: #000000;
        line-height: 32rpx;
      }

      .input {
        margin-left: auto;
        text-align: right;
      }

      &.avatar-wrapper {
        .avatar {
          margin-left: auto;
          width: 120rpx;
          height: 120rpx;
        }
      }

    }
  }

  .bottom-tools-wrapper {
    margin-top: 58rpx;
    padding: 20rpx 20rpx calc(env(safe-area-inset-bottom) + 20rpx) 20rpx;
    background: white;
    box-shadow: 4rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.1);

    .agreement-wrapper {
      display: flex;
      align-items: flex-start;
      gap: 12rpx;
      font-size: $uni-font-size-sm;
      color: #A3A3A3;
      line-height: 32rpx;

      .agreement-text-wrapper {
        .agreement {
          color: #FC3A72;
        }
      }
    }

    .submit-button-wrapper {
      margin-top: 23rpx;
      height: 88rpx;
      background: #FC3A72;
      border-radius: 88rpx;
      text-align: center;
      line-height: 88rpx;
      font-size: $uni-font-size-medium;
      color: #FFFFFF;

      &.disabled {
        background: #DADADA;
      }
    }
  }
}
</style>
