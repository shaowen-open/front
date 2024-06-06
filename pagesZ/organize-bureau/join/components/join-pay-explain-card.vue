<script>
export default {
  name: 'join-pay-explain-card',
  props: {
    info: { type: Object, required: true },
  },
  data() {
    return {
      explainList: [
        { label: '退换规则', explain: ['距活动开始前随时可退'] },
        { label: '无条件退换规则', explain: ['因天气恶劣导致活动无法正常举行', '疫情原因导致活动无法举办'] },
        {
          label: '运动意外保障服务声明',
          explain: [
            '动意外保障投保年龄范围为1岁（含）-70岁(含）',
            '不符合年龄范围会导致投保失败',
            '运动意外保障服务需要填写身份信息才会生效,因身份信息填写错误或未领取保障服务,均视为自动放弃该服务。'
          ]
        },
        { label: '免责声明', explain: ['因活动造成的意外损伤风险自担,平台及活动组织方无任何责任,报名成功视为自愿受本声明约束'] }
      ]
    }
  }
}
</script>

<template>
  <view class="join-pay-explain-card">
    <view class="title">支付说明</view>
    <view class="explain-list-wrapper" v-for="(item, idx) in explainList" :key="idx">
      <view class="label">{{ item.label }}</view>
      <view class="item-wrapper" v-for="(item1, idx1) in item.explain" :key="idx1">
        <view>·</view>
        <view>{{ item1 }}</view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.join-pay-explain-card {
  margin-top: 20rpx;
  padding: 40rpx 20rpx;
  background: #FFFFFF;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;

  .title {
    font-size: $uni-font-size-base;
    font-weight: bold;
    color: #000000;
    line-height: 32rpx;
  }

  .explain-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .label {
      font-size: $uni-font-size-sm-base;
      font-weight: bold;
      color: #000;
    }

    .item-wrapper {
      display: flex;
      gap: 20rpx;
      font-size: $uni-font-size-sm-base;
      color: #A3A3A3;
    }
  }
}
</style>
