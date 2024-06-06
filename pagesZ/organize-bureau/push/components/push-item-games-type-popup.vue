<script>
export default {
  name: 'push-item-games-type-popup',
  data() {
    return {
      show: false,
      list: [
        { label: '飞盘', value: 1 },
        { label: '橄榄球', value: 2 },
        { label: '羽毛球', value: 3 },
        { label: '徒步', value: 4 },
        { label: '滑板', value: 5 },
        { label: '足球', value: 6 },
        { label: '新奇', value: 7 },
        { label: '冰壶', value: 8 },
        { label: '棍网球', value: 9 },
        { label: '篮球', value: 10 },
        { label: '更多', value: 11 },
      ],
      select: {}
    }
  },
  computed: {
    isActive() {
      return function (item) {
        return this.select.value === item.value
      }
    }
  },
  methods: {
    selectTypeHandler(idx) {
      this.select = this.list[idx]
      this.close()
      this.$emit('change', this.select)
    },
    open() {
      this.show = true
    },
    close() {
      this.show = false
    }
  }
}
</script>

<template>
  <u-popup :show="show" mode="bottom" :locked="false">
    <view class="content-wrapper">
      <view class="close-icon-wrapper" @click="close">
        <u-icon name="close" size="42" color="#acaeb2"/>
      </view>
      <view class="title">选择活动类型</view>
      <view class="list-wrapper">
        <block v-for="(item, idx) in list" :key="item.id">
          <view :class="['item-wrapper', { active: isActive(item) }]" @tap="selectTypeHandler(idx)">
            {{ item.label }}
          </view>
        </block>
      </view>
    </view>
  </u-popup>
</template>

<style scoped lang="scss">
.content-wrapper {
  padding: 30rpx 30rpx calc(env(safe-area-inset-bottom) + 30rpx) 30rpx;
  background: white;
  border-radius: 40rpx 40rpx 0 0;

  .close-icon-wrapper {
    position: absolute;
    top: 30rpx;
    right: 40rpx;
  }

  .title {
    font-size: $uni-font-size-medium;
    color: #000000;
    font-weight: 500;
    line-height: 32rpx;
    text-align: center;
  }

  .list-wrapper {
    margin-top: 50rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20rpx;

    .item-wrapper {
      width: 100%;
      height: 88rpx;
      background: #F4F6F9;
      border-radius: 232rpx;
      line-height: 88rpx;
      text-align: center;

      &.active {
        background: #FC3A72;
        color: #FFFFFF;
      }
    }
  }
}
</style>
