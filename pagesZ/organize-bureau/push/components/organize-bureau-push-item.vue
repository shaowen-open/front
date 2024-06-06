<script>
export default {
  name: 'organize-bureau-push-item',
  props: {
    popupTitle: { type: String},
    icon: { type: String, required: true },
    label: { type: String, required: true },
    labelText: { type: String, default: '' },
    startDate: { type: Array, default: ()=> [] },
    url: { type: String, default: '' },
    placeholder: { type: String, default: '请输入' },
    subPlaceholder: { type: String, default: '' },
    tip: { type: String, default: '' },
    maxLength: { type: Number | String, default: 100 },
    value: { type: String | Object, required: false },
    type: {
      type: 'input' | 'input-number' | 'gameTypeCheck' | 'gameDatePick' | 'endDatePick' | 'openCheck' | 'url' | 'refundPicker' | 'picker' | 'isWaitingSwitch' | 'isQuotaSwitch' | 'signDatePicker' | 'signRangeCheck' | 'region-picker' | 'date-picker' | 'checkbox' | 'picture' | 'location'
    },
		isLocation: { type: Boolean, default: false },
    range: { type: Array, default: () => [] },
		isRequire: { type: Boolean, default: false }
  },
	data(){
		return {
			isShowPopup: false,
			curValue: null,
			isWaitingVal: false,
			isQuotaVal: false,
			pickerIndex: [0, 0, 0],
			gameDateStartPickerIndex: [0, 0, 0],
			isStartDate: true,
			isDisabledEndDateSubmitBtn: false
		}
	},
	computed: {
	  inputType() {
	    if (this.type === 'input-number') {
	      return 'number'
	    } else {
	      return 'text'
	    }
	  }
	},
	methods: {
		handleClose(){
			this.isShowPopup = false
		},
		handleOpen(){
			if(this.type === 'url'){
				uni.navigateTo({
					url: this.url
				})
			}else if(this.type === 'endDatePick'){
				if(this.startDate[0] === ''){
					uni.showToast({
						title: '请先选择比赛时间',
						icon: 'none'
					})
				}else{
					if(this.startDate[0][0] >= this.pickerIndex[0] && this.startDate[0][1] >= this.pickerIndex[1] && this.startDate[0][2] >= this.pickerIndex[2]){
						this.isDisabledEndDateSubmitBtn = true
					}else{
						this.isDisabledEndDateSubmitBtn = false
					}
					this.isShowPopup = true
				}
			}else if(this.isLocation){
				this.getLocation()
			}else{
				this.isShowPopup = true
			}
		},
		handleSubmit(e){
			if(this.type === 'refundPicker'){
				this.curValue = this.range[this.pickerIndex[0]]
			} else if(this.type === 'gameDatePick'){
				this.isStartDate = true
				this.curValue = {label: this.range[0][this.gameDateStartPickerIndex[0]] + ' ' + this.range[1][this.gameDateStartPickerIndex[1]] + ':' + this.range[2][this.gameDateStartPickerIndex[2]] + ' - ' + this.range[0][this.pickerIndex[0]] + ' ' + this.range[1][this.pickerIndex[1]] + ':' + this.range[2][this.pickerIndex[2]], value: [this.gameDateStartPickerIndex, this.pickerIndex]}
			} else if(this.type === 'signDatePicker'){
				if(this.pickerIndex[0] !== 0 && this.pickerIndex[1] !== 0 && this.pickerIndex[2] !== 0){
					this.curValue = this.range[0][this.pickerIndex[0]] + ' ' + this.range[1][this.pickerIndex[1]] + ':' + this.range[2][this.pickerIndex[2]]
				}else{
					this.curValue = this.range[0][0]
				}
			} else if(this.type === 'endDatePick'){
				this.curValue = {label: this.range[0][this.pickerIndex[0]] + ' ' + this.range[1][this.pickerIndex[1]] + ':' + this.range[2][this.pickerIndex[2]], value: this.pickerIndex}
			} else if(this.type === 'isWaitingSwitch' || this.type === 'isQuotaSwitch'){
				this.curValue = e
			}
			
			console.log(this.curValue)
			if(this.curValue !== '' && this.curValue !== null){
				this.$emit('input', this.curValue)
				this.handleClose()
			}else{
				uni.showToast({
					title: '内容不能为空',
					icon: 'none'
				})
			}
		},
		setValue(e){
			this.curValue = e
		},
		getLocation(){
			uni.getLocation({
				type: 'wgs84',
				success:(res) => {
					if (res.errMsg == "getLocation:ok") {
						uni.chooseLocation({
							latitude: res.latitude,
							longitude: res.longitude,
							scale: 8,
							success:(resData)=>{
								this.$emit('input', resData.address)
							}
						})
					}
				},
			})
		},
		handleSelectRange(data){
			this.isShowPopup = false
			this.$emit('input', data)
		},
		bindPickerChange(e){
			this.pickerIndex = e.detail.value
			if(this.startDate[0] !== '' && this.type === 'endDatePick'){
				if(this.startDate[0][0] >= this.pickerIndex[0] && this.startDate[0][1] >= this.pickerIndex[1] && this.startDate[0][2] >= this.pickerIndex[2]){
					this.isDisabledEndDateSubmitBtn = true
				}else{
					this.isDisabledEndDateSubmitBtn = false
				}
			}
		},
		handleNextDate(){
			this.gameDateStartPickerIndex = JSON.parse(JSON.stringify(this.pickerIndex))
			this.isStartDate = false
		},
		handlePreDate(){
			this.isStartDate = true
		}
	}
}
</script>

<template>
	<view class="organize-bureau-push-item-wrapper">
		<!-- 比赛类型 -->
		<view class="item" v-if="type==='gameTypeCheck'">
			<view class="flex" @click="isShowPopup = true">
				<image class="icon" :src="require(`../../../static/push/${icon}`)"/>
				<view class="label">{{ value.label || label }}</view>
				<view class="right-icon">
					<u-icon name="arrow-right" style="color:#ACAEB2"/>
				</view>
			</view>
			<view class="default" v-if="!value.label">
				<view class="default-item" v-for="(item,index) in range" :key="index" @click="handleSelectRange(item)" v-if="item.isDefault">{{ item.label }}</view>
			</view>
		</view>
		<!-- switch --> 
		<view class="item" v-else-if="type==='isWaitingSwitch'">
			<view class="flex">
				<image class="icon" :src="require(`../../../static/push/${icon}`)"/>
				<view class="label">{{ label }}</view>
				<view class="right-icon">
					<u-switch v-model="isWaitingVal" @input="e => handleSubmit(e)" active-color="#FC3A72" inactive-color="#F4F6F9"></u-switch>
				</view>
			</view>
		</view>
		<view class="item" v-else-if="type==='isQuotaSwitch'">
			<view class="flex">
				<image class="icon" :src="require(`../../../static/push/${icon}`)"/>
				<view class="label">{{ label }}</view>
				<view class="right-icon">
					<u-switch v-model="isQuotaVal" @input="e => handleSubmit(e)" active-color="#FC3A72" inactive-color="#F4F6F9"></u-switch>
				</view>
			</view>
		</view>
		<!-- 其他 -->
		<view class="item" @click="handleOpen" v-else>
			<image class="icon" :src="require(`../../../static/push/${icon}`)"/>
			<view class="label" v-if="labelText && value">{{ labelText }}</view>
			<view class="label" v-else>{{ value.label || label }}</view>
			<view class="sub" v-if="subPlaceholder">{{ subPlaceholder }}</view>
			<view class="right-icon" v-if="!(labelText && type==='gameDatePick')">
				<u-icon name="arrow-right" style="color:#ACAEB2"/>
			</view>
		</view>
		
		<!-- 弹窗 -->
		<u-popup :show="isShowPopup" :mode="type==='input-number' ? 'center' : 'bottom'" @close="isShowPopup=false">
			<!-- 比赛类型 -->
			<view class="popupMain" v-if="type==='gameTypeCheck'">
				<view class="popupHeader">
					<view class="popupClose"></view>
					<view class="popupTitle">{{ popupTitle }}</view>
					<i class="close-icon mini-icon mini-shanchu2" @click="isShowPopup=false"/>
				</view>
				<view class="popupBody gameType">
					<view class="gameTypeItem" v-for="(item, index) in range" :key="index" @click="handleSelectRange(item)" :class="item.value === value.value && 'active'">{{ item.label }}</view>
				</view>
			</view>
			<!-- 比赛时间 -->
			<view class="popupMain" v-else-if="type==='gameDatePick'">
				<view class="popupHeader" v-if="isStartDate">
					<view class="popupClose" @click="isShowPopup=false">取消</view>
					<view class="popupTitle">开始时间</view>
					<view class="popupSubmit mini-icon mini-arrowRight" @click="handleNextDate()"></view>
				</view>
				<view class="popupHeader" v-else>
					<view class="popupClose mini-icon mini-arrowLeft" @click="handlePreDate()"></view>
					<view class="popupTitle">结束时间</view>
					<view class="popupSubmit" @click="handleSubmit()">确定</view>
				</view>
				<view class="popupBody gameDate">
					<picker-view :value="pickerIndex" @change="bindPickerChange" class="team-picker-view">
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[0] === index ? 'active' : ''" v-for="(item, index) in range[0]" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[1] === index ? 'active' : ''" v-for="(item, index) in range[1]" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[2] === index ? 'active' : ''" v-for="(item, index) in range[2]" :key="index">{{ item }}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
			<!-- 选择可见范围 -->
			<view class="popupMain" v-else-if="type==='openCheck'">
				<view class="popupHeader">
					<view class="popupClose"></view>
					<view class="popupTitle">{{ popupTitle }}</view>
					<i class="close-icon mini-icon mini-shanchu2" @click="isShowPopup=false"/>
				</view>
				<view class="popupBody openSee">
					<view class="openSeeItem" v-for="(item, index) in range" :key="index" @click="handleSelectRange(item)">
						<view class="openSeeItem-label">{{ item.label }}</view>
						<i class="mini-icon" :class="item.value === value.value ? 'mini-a-mianxing' : 'mini-quan'"/>
					</view>
				</view>
			</view>
			<!-- 退款政策 -->
			<view class="popupMain" v-else-if="type==='refundPicker'">
				<view class="popupHeader">
					<view class="popupClose" @click="isShowPopup=false">取消</view>
					<view class="popupTitle">{{ popupTitle || label }}</view>
					<view class="popupSubmit" @click="handleSubmit">确定</view>
				</view>
				<view class="popupBody refundList">
					<view class="tip">{{tip}}</view>
					<picker-view :value="pickerIndex" @change="bindPickerChange" class="team-picker-view">
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[0] === index ? 'active' : ''" v-for="(item, index) in range" :key="index">
								{{ item.label }}
							</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
			<!-- 几支战队、每队人数、每队多少钱 -->
			<view class="popupMain popupMainCenter" v-else-if="type==='input-number'">
				<view class="popupTop">{{ popupTitle }}</view>
				<view class="popupBody">
					<view class="input-wrapper">
					  <u--input :value="value" :placeholder="placeholder" border="none" height="100" :maxlength="maxLength" :type="inputType" @input="e => setValue(e)"/>
					</view>
					<view class="input-tip" v-if="tip">{{ tip }}</view>
				</view>
				<view class="popupBottom">
					<view class="popupBtn" @click="isShowPopup=false">取消</view>
					<view class="popupBtn primary" @click="handleSubmit">确定</view>
				</view>
			</view>
			<!-- 定时报名 -->
			<view class="popupMain" v-else-if="type==='signDatePicker'">
				<view class="popupHeader">
					<view class="popupClose" @click="isShowPopup=false">取消</view>
					<view class="popupTitle">{{ popupTitle || label }}</view>
					<view class="popupSubmit" @click="handleSubmit()">确定</view>
				</view>
				<view class="popupBody signDate">
					<picker-view :value="pickerIndex" @change="bindPickerChange" class="team-picker-view">
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[0] === index ? 'active' : ''" v-for="(item, index) in range[0]" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[1] === index ? 'active' : ''" v-for="(item, index) in range[1]" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[2] === index ? 'active' : ''" v-for="(item, index) in range[2]" :key="index">{{ item }}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
			<!-- 报名范围 -->
			<view class="popupMain" v-else-if="type==='signRangeCheck'">
				<view class="popupHeader">
					<view class="popupClose" @click="isShowPopup=false">取消</view>
					<view class="popupTitle">{{ popupTitle || label }}</view>
					<view class="popupSubmit" @click="handleSubmit">确定</view>
				</view>
				<view class="popupBody signRange">
					<view class="signRangeItem" v-for="(item, index) in range" :key="index" @click="setValue(item)">
						<view class="signRangeItem-label">{{ item.label }}</view>
						<i class="mini-icon mini-icon_669" v-if="curValue && curValue.value && (curValue.value === item.value)"/>
					</view>
				</view>
			</view>
			<!-- 报名截止时间 -->
			<view class="popupMain" v-else-if="type==='endDatePick'">
				<view class="popupHeader">
					<view class="popupClose" @click="isShowPopup=false">取消</view>
					<view class="popupTitle">{{ popupTitle || label }}</view>
					<view class="popupSubmit" @click="handleSubmit" v-if="isDisabledEndDateSubmitBtn">确定</view>
					<view class="popupSubmit disabled" v-else>确定</view>
				</view>
				<view class="popupBody gameDate">
					<picker-view :value="pickerIndex" @change="bindPickerChange" class="team-picker-view">
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[0] === index ? 'active' : ''" v-for="(item, index) in range[0]" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[1] === index ? 'active' : ''" v-for="(item, index) in range[1]" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="team-picker-item" :class="pickerIndex[2] === index ? 'active' : ''" v-for="(item, index) in range[2]" :key="index">{{ item }}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<style scoped lang="scss">
.organize-bureau-push-item-wrapper {
	.item{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 30rpx 0;
		border-bottom: 1px solid #F5F5F5;
		.flex{
			width: 100%;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
  .icon {
    width: 44rpx;
    height: 44rpx;
  }

  .label {
		flex: 1;
    margin-left: 12rpx;
    font-size: $uni-font-size-medium;
    color: #000000;
    line-height: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
  }

  .sub {
    margin: 0 12rpx;
    font-size: $uni-font-size-medium;
    color: #A3A3A3;
    line-height: 1;
		text-align: right;
  }

  .right-icon {
    margin-left: auto;
  }
	
	.default{
		margin-top: 30rpx;
		width: 100%;
		display: flex;
		align-items: center;
		.default-item{
			margin-right: 20rpx;
			padding: 7rpx 30rpx;
			background: #F4F6F9;
			border-radius: 50rpx;
			font-size: $uni-font-size-medium;
			color: #000000;
			line-height: 50rpx;
		}
	}
}
.popupMain{
	border-radius: 40rpx 40rpx 0 0;
	background-color: #fff;
	.popupHeader{
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.close-icon{
			color: #acaeb2;
		}
		.popupClose{
			font-size: $uni-font-size-medium;
			color: #A3A3A3;
			line-height: 1;
			&.mini-icon{
				font-size: 40rpx;
				font-weight: bold;
				color: #A3A3A3;
			}
		}
		.popupTitle{
			font-size: $uni-font-size-medium;
			font-weight: bold;
			color: #000000;
			line-height: 1;
			text-align: center;
		}
		.popupSubmit{
			font-size: $uni-font-size-medium;
			color: #FC3A72;
			line-height: 1;
			&.mini-icon{
				font-size: 40rpx;
				font-weight: bold;
				color: #FC3A72;
			}
			&.disabled{
				color: #A3A3A3;
			}
		}
	}
	.popupBody{
		padding: 50rpx 20rpx calc(env(safe-area-inset-bottom) + 50rpx) 20rpx;
		.input-wrapper{
			padding: 20rpx;
			background-color: #F4F6F9;
			border-radius: 20rpx;
			font-size: $uni-font-size-medium;
			color: #000;
		}
		&.gameType{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 30rpx 14rpx;
			.gameTypeItem{
				margin: 0 20rpx 20rpx 0;
				width: 214rpx;
				height: 88rpx;
				background: #F4F6F9;
				font-size: $uni-font-size-medium;
				font-family: PingFang SC-Bold, PingFang SC;
				color: #000000;
				line-height: 88rpx;
				text-align: center;
				overflow: hidden;
				border-radius: 88rpx;
				&:nth-child(3n){
					margin-right: 0;
				}
				&.active{
					background-color: #FC3A72;
					color: #fff;
				}
			}
		}
		&.openSee{
			.openSeeItem{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 40rpx 0;
				border-bottom: 1px solid #F5F5F5;
				.openSeeItem-label{
					font-size: $uni-font-size-medium;
					color: #000000;
					line-height: 1;
				}
				.mini-icon{
					font-size: $uni-font-size-medium;
					&.mini-quan{
						color: #A3A3A3;
					}
					&.mini-a-mianxing{
						color: #FC3A72;
					}
				}
			}
		}
		&.refundList{
			padding-top: 30rpx;
			padding-left: 0;
			padding-right: 0;
			border-top: 1px solid #F5F5F5;
			.tip{
				padding: 0 20rpx 20rpx;
				font-size: $uni-font-size-sm-base;
				color: #A3A3A3;
				line-height: 1;
			}
			.team-picker-view {
				width: 100%;
				padding: 0 20rpx;
				height: 300rpx;
				.team-picker-item{
					font-size: $uni-font-size-lg-er;
					color: #CFCFCF;
					text-align: center;
					&.active{
						font-size: $uni-font-size-lg-er;
						font-weight: bold;
						color: #000000;
						line-height: 34px;
					}
				}
			}
		}
		&.signDate, &.gameDate{
			.team-picker-view {
				width: 100%;
				padding: 0 20rpx;
				height: 300rpx;
				.team-picker-item{
					font-size: $uni-font-size-lg-er;
					color: #CFCFCF;
					text-align: center;
					&.active{
						font-size: $uni-font-size-lg-er;
						font-weight: bold;
						color: #000000;
						line-height: 34px;
					}
				}
			}
		}
		&.signRange{
			.signRangeItem{
				padding: 30rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.signRangeItem-label{
					font-size: $uni-font-size-medium;
					color: #000000;
					line-height: 35rpx;
				}
				.mini-icon{
					font-weight: bold;
					font-size: 35rpx;
					color: #FC3A72;
				}
			}
		}
	}
	
	&.popupMainCenter{
		width: 600rpx;
		border-radius: 40rpx;
		.popupTop{
			padding: 40rpx;
			font-size: $uni-font-size-lg;
			font-weight: bold;
			color: #000000;
			line-height: 32rpx;
			text-align: center;
		}
		.popupBody{
			padding: 0 30rpx 38rpx 30rpx;
			.input-wrapper{
				margin-bottom: 20rpx;
			}
			.tip{
				font-size: $uni-font-size-sm-base;
				color: #A3A3A3;
				line-height: 1;
			}
		}
		.popupBottom{
			height: 100rpx;
			border-top: 1px solid #E9E9E9;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.popupBtn{
				width: 50%;
				font-size: $uni-font-size-medium;
				font-weight: bold;
				color: #000000;
				line-height: 100rpx;
				text-align: center;
				&.primary{
					color: #FC3A72;
					border-left: 1px solid #E9E9E9;
				}
			}
		}
	}
}
</style>
