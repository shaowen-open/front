<script>
import OrganizeBureauHomeNavbar from '@/pagesZ/organize-bureau/index/home/components/organize-bureau-home-navbar.vue'
import OrganizeBureauHomePage from '@/pagesZ/organize-bureau/index/home/index.vue'

export default {
  components: { OrganizeBureauHomePage, OrganizeBureauHomeNavbar },
  data() {
    return {
      tabbarIdx: 0
    }
  },
  onLoad() {
    // 主动拉取数据
    this.onRefresh()
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      this.$refs.organizeBureauHomeRef.refresh()
    },

    // 上拉加载
    scrollToLower() {
      if (this.tabbarIdx === 0) {
        this.$refs.organizeBureauHomeRef.loadMore()
      }
    },

    // 结束刷新
    endRefresh() {
      this.$refs.pagePaging.endRefresh()
    },
  }
}
</script>

<template>
  <view class="organize-bureau-home-pages">
    <z-paging ref="pagePaging" :auto-clean-list-when-reload="false" refresher-only @onRefresh="onRefresh" @scrolltolower="scrollToLower" :refresher-enabled="tabbarIdx === 0">
      <view slot="top">
        <organize-bureau-home-navbar/>
      </view>

      <!-- 首页 -->
      <organize-bureau-home-page ref="organizeBureauHomeRef" @endRefresh="endRefresh"/>
    </z-paging>
  </view>
</template>


<style lang="scss" scoped>
.organize-bureau-home-pages {
  width: 100vw;
  height: 380rpx;
  background: linear-gradient(to bottom, rgba(250, 216, 226, 1), rgba(250, 216, 226, 0));
}
</style>
