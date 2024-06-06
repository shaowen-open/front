<script>
export default {
  name: 'organize-bureau-list-item',
  props: {
    item: { type: Object, required: true }
  },
  data() {
    return {
      activityStatusList: ['未开始', '报名中', '已结束']
    }
  }
}
</script>

<template>
  <view class="list-item-wrapper" @click="toSliderUrl(6, '/pagesZ/organize-bureau/details/index')">
    <!-- 活动信息 -->
    <view class="main-info-wrapper">
      <view class="cover-wrapper">
        <image class="cover" :src="item.cover"/>
        <view :class="['activity-status', `status-${item.activityStatus}`]">{{ activityStatusList[item.activityStatus] }}</view>
      </view>

      <view class="text-info-wrapper">
        <view class="title">{{ item.title }}</view>
        <view class="other-text-wrapper">
          <u-icon name="clock" size="25" color="A3A3A3"/>
          <view>{{ item.date }}</view>
        </view>

        <view class="other-text-wrapper">
          <u-icon name="map" size="25" color="A3A3A3"/>
          <view>{{ item.distance }} {{ item.location }}</view>
        </view>

        <view class="user-info-wrapper">
          <view class="user-wrapper">
            <image class="avatar" :src="item.avatar"/>
            <view class="nickname">{{ item.name }}</view>
          </view>
          <view class="auth-wrapper" v-if="item.auth">
            <image class="auth-icon" :src="require('../../static/icon-auth.png')"/>
            <view class="label">已认证</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 分隔符 -->
    <view class="line"/>

    <!-- 报名区域u -->
    <view class="bottom-wrapper">
      <view class="join-user-wrapper">
        <view class="avatar-list-wrapper">
          <image class="avatar" v-for="(item, index) in item.joinUserList" :key="index" :src="item"/>
        </view>

        <view>{{ item.joinUserList.length }}人想去</view>
      </view>

      <view :class="['join-button-wrapper', item.activityStatus === 0 ? 'disabled' : '']">
        {{ item.activityStatus === 3 ? '查看影集' : '立即加入' }}
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.list-item-wrapper {
  margin-bottom: 20rpx;
  padding: 20rpx;
  width: 100%;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .main-info-wrapper {
    display: flex;
    gap: 20rpx;
    min-width: 0;

    .cover-wrapper {
      position: relative;

      .cover {
        width: 200rpx;
        height: 240rpx;
        border-radius: 20rpx;
      }

      .activity-status {
        position: absolute;
        top: 0;
        left: 0;
        padding: 1rpx 9rpx;
        font-size: $uni-font-size-sm;
        color: #FFFFFF;
        border-radius: 20rpx 0 20rpx 0;

        &.status-0, &.status-2 {
          background: #a3a3a3;
        }

        &.status-1 {
          background: #fc3a72;
        }
      }
    }

    .text-info-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: $uni-font-size-base;
        color: #000000;
        line-height: 42rpx;
      }

      .other-text-wrapper {
        display: flex;
        align-items: center;
        gap: 12rpx;
        font-size: $uni-font-size-sm;
        color: #A3A3A3;
        line-height: 26rpx;
      }

      .user-info-wrapper {
        display: flex;
        align-items: center;
        gap: 20rpx;

        .user-wrapper {
          display: flex;
          align-items: center;
          gap: 10rpx;

          .avatar {
            width: 36rpx;
            height: 36rpx;
            border-radius: 50%;
          }

          .nickname {
            font-size: $uni-font-size-sm;
            color: #A3A3A3;
            line-height: 32rpx;
          }
        }

        .auth-wrapper {
          display: flex;
          align-items: center;
          gap: 10rpx;

          .auth-icon {
            width: 30rpx;
            height: 30rpx;
          }

          .label {
            font-size: $uni-font-size-sm;
            color: #A3A3A3;
            line-height: 32rpx;
          }
        }
      }
    }
  }

  .line {
    margin: 20rpx 0 30rpx 0;
    width: 100%;
    height: 1rpx;
    background: #F5F5F5;
  }

  .bottom-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .join-user-wrapper {
      display: flex;
      align-items: center;
      gap: 10rpx;
      font-size: $uni-font-size-sm;
      color: #A3A3A3;
      line-height: 32rpx;

      .avatar-list-wrapper {
        .avatar {
          width: 46rpx;
          height: 46rpx;
          border-radius: 100%;
          box-shadow: 0 0 5rpx 2rpx rgba(0, 0, 0, 0.1);

          &:not(:first-child) {
            margin-left: -23rpx;
          }
        }
      }
    }

    .join-button-wrapper {
      padding: 14rpx 20rpx;
      background: #FC3A72;
      border-radius: 139rpx;
      font-size: $uni-font-size-medium;
      color: #FFFFFF;
      line-height: 32rpx;

      &.disabled {
        background-color: #a3a3a3;
      }
    }
  }
}
</style>
