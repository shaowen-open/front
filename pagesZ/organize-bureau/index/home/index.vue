<script>
import OrganizeBureauHomeTabs from '@/pagesZ/organize-bureau/index/home/components/organize-bureau-home-tabs.vue'
import PetAdoptionListItem from '@/pagesP/pet-adoption/components/pet-adoption-list-item.vue'
import OrganizeBureauListItem from '@/pagesZ/organize-bureau/components/organize-bureau-list-item.vue'
import mockData from '@/pagesZ/organize-bureau/mock-data'

export default {
  name: 'organize-bureau-home-page',
  components: { OrganizeBureauListItem, PetAdoptionListItem, OrganizeBureauHomeTabs },
  data() {
    return {
      tabSwiperIdx: 0, // 当前Tab和Swiper的索引
      swiperHeight: 0, // 当前swiper高度
      swiperList: [
        'https://img0.baidu.com/it/u=3623278613,842439947&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
        'https://img0.baidu.com/it/u=2086434863,2940864750&fm=253&fmt=auto&app=138&f=JPEG?w=631&h=500'
      ],
      tabList: [
        { name: '全部', value: 0 },
        { name: '探店', value: 1 },
        { name: '观影', value: 2 },
        { name: '交友', value: 3 },
        { name: '运动', value: 4 },
        { name: '桌游', value: 5 },
        { name: '其他', value: 6 }
      ],
      // 活动列表
      activityList: [],
      // 查询活动列表参数
      activityListParams: { pageNo: 1, pageSize: 10 }
    }
  },
  methods: {
    // 当列表高度改变时，通知页面的swiper同步更改高度
    contentHeightChanged(height) {
      const finalHeight = this.activityList.length ? height : 0
      // 限制内容最小高度为屏幕可见高度减z-tabs高度。注意，页面中有使用slot="top"插入的view，则此处的minHeight还应该减去slot="top"插入的view的高度
      const minHeight = uni.getSystemInfoSync().windowHeight - uni.upx2px(80)
      // 默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
      let relaHeight = Math.max(finalHeight, minHeight)
      this.swiperHeight = relaHeight === 0 ? uni.getSystemInfoSync().windowHeight - uni.upx2px(80) : relaHeight
      console.log(this.swiperHeight, '=========')
    },
    // 切换Tab
    setCurrent(current) {
      if (current !== this.tabSwiperIdx) {
        // 切换tab时，将上一个tab的数据清空
        this.$refs.pagingRef[this.tabSwiperIdx].clear()
        this.tabSwiperIdx = current
        // 切换tab时，刷新列表
        this.refresh()
      }
    },

    refresh() {
      this.$refs.pagingRef[this.tabSwiperIdx].reload()
    },

    // 当滚动到底部时，通知当前显示的Tab列表加载更多
    loadMore() {
      this.$refs.pagingRef[this.tabSwiperIdx].doLoadMore()
    },

    // reload 执行的方法，查询数据
    async queryList(pageNo, pageSize) {
      console.log(pageNo, pageSize)
      this.activityListParams.pageNo = pageNo
      this.activityListParams.pageSize = pageSize

      const list = await mockData.mockList()

      this.$refs.pagingRef[this.tabSwiperIdx].complete(list)
      this.$emit('endRefresh')
    },
  }
}
</script>

<template>
  <view class="organize-bureau-home-page">
    <!-- 轮播 -->
    <view class="banner-list-wrapper">
      <u-swiper :list="swiperList" keyName="poster" height="300" circular radius="16"/>
    </view>

    <!-- tabs -->
    <organize-bureau-home-tabs :current="tabSwiperIdx" :tab-list="tabList"/>

    <!-- 组局活动列表 -->
    <swiper class="swiper" :style="{ height: `${swiperHeight}px` }" :current="tabSwiperIdx" @animationfinish="e => setCurrent(e.detail.current)">
      <swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
        <view class="content" ref="activityListRef">
          <z-paging
              ref="pagingRef"
              :auto="false"
              :refresher-enabled="false"
              use-page-scroll
              v-model="activityList"
              :auto-clean-list-when-reload="false"
              @query="queryList"
              @contentHeightChanged="contentHeightChanged"
          >
            <!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
            <view class="activity-list-wrapper">
              <organize-bureau-list-item v-for="item in activityList" :key="item.id" :item="item"/>
            </view>
            <!-- 空数据显示 -->
            <view slot="empty">
              <u-empty text="暂时还没有活动可以报名哦～" width="300" height="300" textSize="28"/>
            </view>
          </z-paging>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style scoped lang="scss">
.organize-bureau-home-page {
  background-color: #F4F6F9;

  .banner-list-wrapper {
    margin: 0 20rpx;
  }

  .swiper {
    height: 1000px;

    .swiper-item {

      .content {
        height: 100%;
      }
    }
  }

  .activity-list-wrapper {
    margin: 24rpx 20rpx;
  }
}
</style>
