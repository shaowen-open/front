<script>
import OrganizeBureauListItem from '@/pagesZ/organize-bureau/components/organize-bureau-list-item.vue'
import mockData from '@/pagesZ/organize-bureau/mock-data'
import GroupGoodsSwiperItem from '@/pagesU/points-mall/group-goods-list/comonents/group-goods-swiper-item.vue'
import PointsMallGoodsItem from '@/pagesU/points-mall/comonents/points-mall-goods-item.vue'

export default {
  data() {
    return {
      tabCurrent: 0, // 当前tab索引
      swiperCurrent: 0, // 当前swiper索引
      tabList: [
        { id: 1, name: '已报名' },
        { id: 2, name: '已结束' },
        { id: 3, name: '我发布' }
      ],
      // 活动列表
      activityList: []
    }
  },
  methods: {
    // swiper切换时事件
    swiperChangeHandle(e) {
      this.tabCurrent = e.detail.current
    },
    // tab标签切换时事件
    tabChangeHandle(e) {
      this.swiperCurrent = e.index
      this.$refs.paging[this.tabCurrent].reload()
    },
    async fetchActivityList(pageNo, pageSize) {
      console.log(pageNo, pageSize)
      const activityList = await mockData.mockList()
      this.$refs.paging[this.tabCurrent].complete(activityList)
    }
  },
  onLoad() {
    this.fetchActivityList()
  },
  components: {
    PointsMallGoodsItem,
    GroupGoodsSwiperItem,
    OrganizeBureauListItem
  }
}
</script>

<template>
  <z-paging-swiper>
    <view slot="top">
      <u-tabs :list="tabList" :current="tabCurrent" @change="tabChangeHandle"/>
    </view>

    <swiper class="swiper" :current="swiperCurrent" @change="swiperChangeHandle">
      <swiper-item class="swiper-item" v-for="item in tabList" :key="item.id">
        <z-paging ref="paging" v-model="activityList" @query="fetchActivityList" :auto="false">
          <view class="list-wrapper">
            <block v-for="item in activityList" :key="item.id">
              <organize-bureau-list-item :item="item"/>
            </block>
          </view>
        </z-paging>
      </swiper-item>
    </swiper>
  </z-paging-swiper>
</template>

<style scoped lang="scss">
.swiper {
  height: 100%;
  background: #F4F6F9;

  .list-wrapper {
    margin: 20rpx;
  }
}
</style>
