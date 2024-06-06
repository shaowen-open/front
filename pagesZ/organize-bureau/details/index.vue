<script>
import mockData from '@/pagesZ/organize-bureau/mock-data'
import OrganizeBureauDetailsBottom from '@/pagesZ/organize-bureau/details/components/organize-bureau-details-bottom.vue'
import OrganizeBureauDetailsJoinUserPopup from '@/pagesZ/organize-bureau/details/components/organize-bureau-details-join-user-popup.vue'

export default {
  components: { OrganizeBureauDetailsJoinUserPopup, OrganizeBureauDetailsBottom },
  data() {
    return {
      // 报名用户列表弹窗
      joinUserListPopupShow: false,
      detailsInfo: {}
    }
  },
  computed: {
    joinUserList() {
      const enroll = this.detailsInfo.enroll
      if (enroll && enroll.userList && enroll.userList.length > 0) {
        return enroll.userList.slice(0, 6)
      } else {
        return []
      }
    }
  },
  async onLoad() {
    this.detailsInfo = await mockData.mockDetails()
  }
}
</script>

<template>
  <view class="organize-bureau-details-page">
    <!-- 顶部导航栏 -->
    <u-navbar :autoBack="true" bgColor="transparent" leftIconColor="#FFF"/>
    <!-- 轮播图 -->
    <u-swiper height="560" :list="detailsInfo.picList" circular indicator indicator-mode="dot"/>

    <!-- 内容区域 -->
    <view class="content-wrapper">
      <view class="title">{{ detailsInfo.title }}</view>

      <!-- 活动时间 -->
      <view class="date-wrapper">
        <u-icon name="clock" size="30"/>
        <view>{{ detailsInfo.date }}</view>
      </view>

      <!-- 地址 -->
      <view class="address-wrapper">
        <u-icon name="map" size="30"/>
        <view>{{ detailsInfo.distance }} {{ detailsInfo.location }}</view>
      </view>

      <!-- 报名卡片 -->
      <view class="enroll-wrapper" @click="joinUserListPopupShow = true">
        <view class="number-wrapper">
          <view class="left">{{ detailsInfo.enroll.count - detailsInfo.enroll.residue }}人已报名</view>
          <view class="right">仅剩{{ detailsInfo.enroll.residue }}个名额</view>
          <u-icon name="arrow-right" color="#FC3A72" size="20"/>
        </view>

        <!-- 报名用户 -->
        <view class="user-list-wrapper">
          <view v-for="(item, index) in joinUserList" :key="index" :class="['item-wrapper', index === 0 ? 'master' : '']">
            <image class="avatar" :src="item.avatar"/>
            <view class="tips" v-if="index === 0">组局人</view>
          </view>
          <view class="join-wrapper">
            <u-icon name="plus" size="40" color="#acaeb2"/>
          </view>
        </view>
      </view>

      <!-- 分隔符 -->
      <view class="gap-wrapper"/>

      <!-- 活动描述 -->
      <view class="desc-wrapper" v-if="detailsInfo.desc">
        <view class="title">活动描述</view>
        <text class="desc">{{ detailsInfo.desc }}</text>
      </view>

      <!-- 分隔符 -->
      <view class="gap-wrapper"/>

      <!-- 注意事项 -->
      <view class="note-wrapper" v-if="detailsInfo.note">
        <view class="title">注意事项</view>
        <text class="note">{{ detailsInfo.note }}</text>
      </view>

      <!-- 分隔符 -->
      <view class="gap-wrapper"/>

      <!-- 详情图片 -->
      <view class="introduce-pic-wrapper">
        <view class="title">详情图片</view>
        <image class="pic" v-for="(item, index) in detailsInfo.introducePicList" :key="index" :src="item" mode="aspectFill"/>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <organize-bureau-details-bottom :info="detailsInfo"/>

    <!-- 报名用户列表 -->
    <organize-bureau-details-join-user-popup
        :show="joinUserListPopupShow"
        :list="detailsInfo.enroll.userList"
        @close="joinUserListPopupShow = false"
    />
  </view>
</template>

<style scoped lang="scss">
.organize-bureau-details-page {
  .content-wrapper {
    padding: 28rpx 20rpx calc(env(safe-area-inset-bottom) + 148rpx) 20rpx;
    position: absolute;
    top: 522rpx;
    left: 0;
    right: 0;
    background: #FFFFFF;
    border-radius: 40rpx 40rpx 0 0;

    .title {
      font-size: $uni-font-size-lg;
      color: #000000;
      line-height: 46rpx;
    }

    .date-wrapper {
      padding: 32rpx 0;
      display: flex;
      align-items: center;
      gap: 20rpx;
      font-size: $uni-font-size-sm-base;
      color: #000000;
      line-height: 26rpx;
    }

    .address-wrapper {
      padding: 32rpx 0;
      display: flex;
      align-items: center;
      gap: 20rpx;
      font-size: $uni-font-size-sm-base;
      color: #000000;
      line-height: 26rpx;
    }

    .enroll-wrapper {
      padding: 20rpx 20rpx 32rpx 20rpx;
      background: #F4F6F9;
      border-radius: 20rpx;

      .number-wrapper {
        display: flex;
        align-items: center;

        .left {
          font-size: $uni-font-size-sm-base;
          color: #000000;
          line-height: 32rpx;
        }

        .right {
          margin-left: auto;
          font-size: $uni-font-size-sm-base;
          color: #FC3A72;
          line-height: 32rpx;
        }
      }

      .user-list-wrapper {
        margin-top: 30rpx;
        display: flex;
        align-items: center;
        gap: 17rpx;

        .item-wrapper {
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

        .join-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80rpx;
          height: 80rpx;
          border: 1rpx dashed #acaeb2;
          border-radius: 50%;
        }
      }
    }

    .gap-wrapper {
      margin: 30rpx -20rpx;
      height: 16rpx;
      background-color: #F4F6F9;
    }

    .desc-wrapper {
      .title {
        font-size: $uni-font-size-base;
        font-weight: bold;
        color: #000000;
        line-height: 32rpx;
      }

      .desc {
        margin-top: 20rpx;
        display: inline-block;
        font-size: $uni-font-size-base;
        color: #333333;
        line-height: 50rpx;
      }
    }

    .note-wrapper {
      .title {
        font-size: $uni-font-size-base;
        font-weight: bold;
        color: #000000;
        line-height: 32rpx;
      }

      .note {
        margin-top: 20rpx;
        display: inline-block;
        font-size: $uni-font-size-base;
        color: #A3A3A3;
        line-height: 50rpx;
      }
    }

    .introduce-pic-wrapper {
      margin: 0 -20rpx;

      .title {
        margin: 0 20rpx 20rpx 20rpx;
        font-size: $uni-font-size-base;
        font-weight: bold;
        color: #000000;
        line-height: 32rpx;
      }

      .pic {
        width: 100%;
      }
    }
  }
}
</style>
