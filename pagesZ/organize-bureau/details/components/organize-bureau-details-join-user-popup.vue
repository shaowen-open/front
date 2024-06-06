<script>
import ActivityList from '@/pages/message/activityList/activityList.vue'

export default {
  name: 'organize-bureau-details-join-user-popup',
  components: { ActivityList },
  props: {
    show: { type: Boolean, default: false },
    list: { type: Array, required: true }
  }
}
</script>

<template>
  <u-popup :show="show" mode="bottom">
    <view class="details-join-user-popup-wrapper">
      <view class="top-title-wrapper">
        <view class="title">仅剩12个名额</view>
        <view class="close-icon-wrapper" @click="$emit('close')">
          <u-icon name="close" size="30" color="#acaeb2"/>
        </view>
      </view>

      <view class="join-user-list-wrapper">
        <view v-for="(item, index) in list" :key="index" class="item-wrapper">
          <!-- 头像 -->
          <view :class="['avatar-wrapper', index === 0 ? 'master' : '']">
            <image class="avatar" :src="item.avatar"/>
            <view class="tips" v-if="index === 0">组局人</view>
          </view>

          <view class="info-wrapper">
            <view class="top-wrapper">
              <view class="name">{{ item.name }}</view>
              <u-icon :name="item.gender === 1 ? 'man' : 'woman'" :color="item.gender === 1 ? '#6ab9e8' : '#ff3cc7'"/>
            </view>

            <view class="slogan u-line-1">{{ item.slogan }}</view>
          </view>

        </view>
      </view>
    </view>
  </u-popup>
</template>

<style scoped lang="scss">
.details-join-user-popup-wrapper {
  position: relative;
  padding: 0 20rpx calc(env(safe-area-inset-bottom)) 20rpx;
  border-radius: 40rpx 40rpx 0 0;
  background: white;

  .top-title-wrapper {
    display: flex;
    justify-content: center;

    .title {
      font-size: $uni-font-size-medium;
      font-weight: bold;
      color: #000000;
      line-height: 32rpx;
    }

    .close-icon-wrapper {
      position: absolute;
      top: 35rpx;
      right: 25rpx;
    }
  }

  .join-user-list-wrapper {
    padding: 30rpx 0;
    display: flex;
    flex-direction: column;
    gap: 40rpx;
    height: 720rpx;
    overflow-y: auto;

    .item-wrapper {
      min-width: 0;
      display: flex;
      gap: 30rpx;

      .avatar-wrapper {
        position: relative;
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;

        &.master {
          padding: 5rpx;
          border: 2rpx solid #FC3A72;
        }

        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .tips {
          position: absolute;
          bottom: -16rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 64rpx;
          height: 28rpx;
          background: #FC3A72;
          border-radius: 6rpx;
          border: 1rpx solid #FFFFFF;
          text-align: center;
          font-size: 20rpx;
          color: #FFFFFF;
          line-height: 28rpx;
        }
      }

      .info-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 80rpx;

        .top-wrapper {
          display: flex;
          align-items: center;
          gap: 10rpx;

          .name {
            font-size: $uni-font-size-medium;
            color: #000000;
            line-height: 32rpx;
          }
        }

        .slogan {
          font-size: $uni-font-size-sm-base;
          font-weight: 400;
          color: #A3A3A3;
          line-height: 32rpx;
        }
      }
    }
  }

}
</style>
