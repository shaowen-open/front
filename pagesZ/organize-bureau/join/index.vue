<script>
import mockData from '@/pagesZ/organize-bureau/mock-data'
import JoinActivityInfoCard from '@/pagesZ/organize-bureau/join/components/join-activity-info-card.vue'
import JoinPayInfoCard from '@/pagesZ/organize-bureau/join/components/join-pay-info-card.vue'
import JoinInsureInfoCard from '@/pagesZ/organize-bureau/join/components/join-insure-info-card.vue'
import JoinPayExplainCard from '@/pagesZ/organize-bureau/join/components/join-pay-explain-card.vue'
import JoinBottomTools from '@/pagesZ/organize-bureau/join/components/join-bottom-tools.vue'
import JoinPickInsurePopup from '@/pagesZ/organize-bureau/join/components/join-pick-insure-popup.vue'
import JoinAddRecipientPopup from '@/pagesZ/organize-bureau/join/components/join-add-recipient-popup.vue'

export default {
  components: {
    JoinAddRecipientPopup,
    JoinPickInsurePopup,
    JoinBottomTools,
    JoinPayExplainCard,
    JoinInsureInfoCard,
    JoinPayInfoCard,
    JoinActivityInfoCard
  },
  data() {
    return {
      // 领取保险弹窗
      pickInsurePopupShow: false,
      // 领取人信息完善
      addRecipientPopupShow: false,
      detailsInfo: {},
      payInfoForm: {
        // 购买数量
        number: 1,
        // 保险领取人
        recipient: {}
      }
    }
  },
  computed: {
    totalPrice() {
      return (this.detailsInfo.price * this.payInfoForm.number).toFixed(2)
    }
  },
  methods: {
    popupHandle(e) {
      if (e.type === 'pick-insure-popup') {
        // 领取保险弹窗中的事件
        if (e.fn === 'close') {
          this.pickInsurePopupShow = false
        } else if (e.fn === 'openAddRecipientPopup') {
          // 打开领取人信息完善弹窗，并关闭领取保险的弹窗
          this.pickInsurePopupShow = false
          this.addRecipientPopupShow = true
        } else if (e.fn === 'submitBtn') {
          this.pickInsurePopupShow = false
          this.toSliderUrl(6, '/pagesZ/organize-bureau/details/index')
        }
      } else if (e.type === 'add-recipient-popup') {
        // 领取人信息填写弹窗中的事件
        if (e.fn === 'close') {
          // 关闭领取人信息完善弹窗，并打开领取保险的弹窗
          this.addRecipientPopupShow = false
          this.pickInsurePopupShow = true
        } else if (e.fn === 'submitBtn') {
          // 提交按钮事件
          this.payInfoForm.recipient = e.data
          this.addRecipientPopupShow = false
          this.pickInsurePopupShow = true
        }
      }
    }
  },
  async onLoad() {
    this.detailsInfo = await mockData.mockDetails()
  },
}
</script>

<template>
  <view class="join-page">
    <!-- 活动基本信息 -->
    <join-activity-info-card :info="detailsInfo"/>

    <!-- 支付信息 -->
    <join-pay-info-card :total-price="totalPrice" :number="payInfoForm.number" @change="e => payInfoForm.number = e"/>

    <!-- 保险信息 -->
    <join-insure-info-card :info="detailsInfo"/>

    <!-- 支付说明 -->
    <join-pay-explain-card :info="detailsInfo"/>

    <!-- 底部操作栏 -->
    <join-bottom-tools :info="detailsInfo" :total-price="totalPrice" @click="pickInsurePopupShow = true"/>

    <!-- 领取保险弹窗 -->
    <join-pick-insure-popup :show="pickInsurePopupShow" :recipient="payInfoForm.recipient" @popup="popupHandle"/>

    <!-- 领取人信息填写 -->
    <join-add-recipient-popup :show="addRecipientPopupShow" @popup="popupHandle"/>
  </view>
</template>

<style scoped lang="scss">
.join-page {
  min-height: 100vh;
  padding: 25rpx 20rpx calc(env(safe-area-inset-bottom) + 173rpx) 20rpx;
  background: #F4F6F9;
}
</style>
