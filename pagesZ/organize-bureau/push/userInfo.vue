<script>
export default {
	data() {
	  return {
		  infoData: [
				{
					title: '默认模板',
					data: [
						{name: '昵称'},
						{name: '性别', qa: ['男', '女']},
						{name: '姓名'},
						{name: '基础疾病信息，没有请填无'},
						{name: '手机号码'},
					]
				},
				{
					title: '飞盘',
					data: [
						{name: '昵称'},
						{name: '性别', qa: ['男', '女']},
						{name: '你的盘龄', qa: ['3个月以下', '3个月到1年', '1年到2年', '2年以上']},
						{name: '擅长位置', qa: ['Handler', 'Cutter', '两者皆可']},
						{name: '加入的战队名称，若无战队请填无'},
						{name: '参加过几次比赛（pickup不计算在内）', qa: ['Handler', 'Cutter', '两者皆可']},
						{name: '基础疾病信息，没有请填无'},
						{name: '手机号码'}
					]
				},
				{
					title: '橄榄球',
					data: [
						{name: '昵称'},
						{name: '性别', qa: ['男', '女']},
						{name: '加入的战队名称，若无战队请填无'},
						{name: '参加过几次比赛', qa: ['3次', '3次-10次', '10次以上']},
						{name: '紧急联系人电话'},
						{name: '姓名'},
						{name: '身份证号码'},
						{name: '基础疾病信息，没有请填无'},
						{name: '手机号码'}
					]
				},
				{
					title: '徒步',
					data: [
						{name: '昵称'},
						{name: '性别', qa: ['男', '女']},
						{name: '姓名'},
						{name: '身份证号码'},
						{name: '基础疾病信息，没有请填无'},
						{name: '手机号码'}
					]
				},
				{
					title: '骑行',
					data: [
						{name: '昵称'},
						{name: '性别', qa: ['男', '女']},
						{name: '姓名'},
						{name: '基础疾病信息，没有请填无'},
						{name: '手机号码'}
					]
				}
			],
			tabIndex: 0,
			tabIndex_tmp: 0,
			tagList:['A','B','C','D','E','F'],
			isConfirmPopup: false,
			qaTypeData: [
				{label: '单选题', value: 1, data: {name: '', qa: ['', ''], isAdd: true}},
				{label: '文本题', value: 1, data: {name: '', isAdd: true}}
			],
			isQaTypePopup: false
		}
	},
	methods: {
		// 切换tab
		tabChange(index){
			this.tabIndex_tmp = index
			this.isConfirmPopup = true
		},
		// 删除问题
		delectQa(index){
			this.infoData[this.tabIndex].data.splice(index,1)
		},
		// 切换tab-点击弹窗里的确认按钮
		handleSubmitTab(){
			this.tabIndex = this.tabIndex_tmp
			this.isConfirmPopup = false
		},
		// 点击确认提交按钮
		handleSubmit(){
			let isEmpty = false
			this.infoData.forEach((aitem,aindex)=>{
				aitem.data.forEach((bitem, bindex)=>{
					if(bitem.name === ''){
						isEmpty = true
					}
					if(bitem.qa && bitem.qa.length > 0){
						bitem.qa.forEach((citem, cindex)=>{
							if(citem === ''){
								isEmpty = true
							}
						})
					}
				})
			})
			uni.showToast({
				title: isEmpty ? '请完善自定义问卷内容' : '提交成功',
				icon: isEmpty ? 'none' : 'success'
			})
			
			console.log("用户信息收集：", this.infoData[this.tabIndex], '是否有空项：', isEmpty)
		},
		// 选择：单选题、文本提
		selectQaType(data){
			let obj = JSON.parse(JSON.stringify(data))
			this.infoData[this.tabIndex].data.push(obj)
			this.isQaTypePopup = false
		},
		// 点击 添加问题
		addQuestion(){
			this.isQaTypePopup = true
		},
		// 添加选项
		addAnswer(index){
			if(this.infoData[this.tabIndex].data[index].qa.length < 6){
				this.infoData[this.tabIndex].data[index].qa.push('')
			}else{
				uni.showToast({
					title: '选项不能超过6个',
					icon: 'none'
				})
			}
		},
		// 删除选项
		delectAnswer(index, aindex){
			if(this.infoData[this.tabIndex].data[index].qa.length === 1){
				uni.showToast({
					title: '至少保留一个选项',
					icon: 'none'
				})
			}else{
				this.infoData[this.tabIndex].data[index].qa.splice(aindex, 1)
			}
		}
	}
}
</script>

<template>
  <view class="container">
    <view class="tabs">
			<view class="item" v-for="(item,index) in infoData" :key="index" @click="tabChange(index)" :class="tabIndex === index && 'active'">{{item.title}}</view>
		</view>
		<view class="tabContent">
			<view class="item" v-for="(item,index) in infoData[tabIndex].data" :key="index">
				<block v-if="item.isAdd">
					<view class="qtitle">
						<u--input placeholder="输入题目/50字以内" border="none" height="100" maxlength="50" type="text" v-model="infoData[tabIndex].data[index].name"/>
						<i class="icon-delete" @click="delectQa(index)"></i>
					</view>
					<view class="alist" v-if="item.qa">
						<view class="aitem" v-for="(aitem,aindex) in item.qa" :key="aindex">
							<view class="tag">{{tagList[aindex]}}.</view>
							<view class="content">
								<u--input placeholder="输入选项/50字以内" border="none" height="100" maxlength="50" type="text"  v-model="infoData[tabIndex].data[index].qa[aindex]"/>
							</view>
							<i class="icon-delete" @click="delectAnswer(index, aindex)"></i>
						</view>
						<view class="addAnswer" @click="addAnswer(index)">
							<i class="mini-icon mini-jiahao-"></i>
							<text>添加选项</text>
						</view>
					</view>
					<view class="addOption"></view>
				</block>
				<block v-else>
					<view class="qtitle">
						<view class="uni-input-input">{{item.name}}</view>
						<i class="icon-delete" @click="delectQa(index)"></i>
					</view>
					<view class="alist" v-if="item.qa">
						<view class="aitem" v-for="(aitem,aindex) in item.qa" :key="aindex">
							<view class="tag">{{tagList[aindex]}}.</view>
							<view class="content">
								<view class="uni-input-input">
									{{aitem}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="addQuestion" @click="addQuestion"><i class="mini-icon mini--jia"></i>添加问题</view>
		<view class="fixedBottom">
			<view class="btn" @click="handleSubmit">确定</view>
		</view>
		
		<u-popup :show="isConfirmPopup" mode="center" @close="isConfirmPopup=false">
			<view class="popupMain">
				<view class="popupHeader">切换模板</view>
				<view class="popupBody">切换模板后会覆盖当前内容，确定使用新的用户信息模板？</view>
				<view class="popupBottom">
					<view class="popupBtn" @click="isConfirmPopup=false">取消</view>
					<view class="popupBtn primary" @click="handleSubmitTab">确定</view>
				</view>
			</view>
		</u-popup>
		
		<u-popup :show="isQaTypePopup" mode="bottom" @close="isQaTypePopup=false">
			<view class="qaTypePopup">
				<view class="qaTypePopupBody">
					<view class="item" v-for="(item,index) in qaTypeData" :key="index" @click="selectQaType(item.data)">{{item.label}}</view>
				</view>
				<view class="qaTypePopupBottom" @close="isQaTypePopup=false">取消</view>
			</view>
		</u-popup>
  </view>
</template>

<style scoped lang="scss">
page{
	width: 100%;
	height: 100%;
	background-color: #F4F6F9;
}
.container{
	padding: 0 20rpx calc(env(safe-area-inset-bottom) + 164rpx) 20rpx;
	.tabs{
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		.item{
			margin-right: 20rpx;
			padding: 14rpx 20rpx;
			font-size: $uni-font-size-sm-base;
			color: #A3A3A3;
			line-height: 1;
			border-radius: 16rpx;
			background-color: #fff;
			&.active{
				color: #fff;
				background-color: #FC3A72;
			}
		}
	}
	.tabContent{
		.item{
			padding: 0 20rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.qtitle{
				padding: 30rpx 0;
				display: flex;
				align-self: center;
				justify-content: space-between;
				.uni-input-input{
					flex: 1;
					font-size: $uni-font-size-medium;
					color: #000000;
					line-height: 40rpx;
				}
				.icon-delete{
					width: 40rpx;
					height: 40rpx;
					background-color: #F4F6F9;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					&:before{
						display: inline-block;
						content: '';
						width: 16rpx;
						height: 1px;
						opacity: 1;
						background-color: #A3A3A3;
					}
				}
			}
			.alist{
				.aitem{
					padding: 30rpx 0;
					display: flex;
					align-items: center;
					.tag{
						margin-right: 10rpx;
						color: #FC3A72;
					}
					.content{
						flex: 1;
						.uni-input-input{
							flex: 1;
							padding: 0 10rpx;
							font-size: $uni-font-size-medium;
							color: #000;
							line-height: 40rpx;
						}
					}
					.icon-delete{
						width: 40rpx;
						height: 40rpx;
						background-color: #F4F6F9;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						&:before{
							display: inline-block;
							content: '';
							width: 16rpx;
							height: 1px;
							opacity: 1;
							background-color: #A3A3A3;
						}
					}
				}
				.addAnswer{
					padding-bottom: 25rpx;
					display: flex;
					align-items: center;
					font-size: $uni-font-size-sm-base;
					line-height: 1;
					.mini-icon{
						margin-right: 5rpx;
						font-size: $uni-font-size-medium;
						color: #FC3A72;
					}
				}
			}
		}
	}
	.addQuestion{
		height: 110rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $uni-font-size-medium;
		color: #FC3A72;
		line-height: 36rpx;
		.mini-icon{
			margin-right: 15rpx;
			font-size: $uni-font-size-medium;
			color: #FC3A72;
		}
	}
	.fixedBottom{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 20rpx calc(env(safe-area-inset-bottom) + 20rpx) 20rpx;
		background: #FFFFFF;
		box-shadow: 0 4rpx 20rpx 0 rgba(0,0,0,0.06);
		.btn{
			width: 100%;
			height: 88rpx;
			background: #FC3A72;
			border-radius: 317px 317px 317px 317px;
			opacity: 1;
			font-size: $uni-font-size-medium;
			color: #fff;
			line-height: 88rpx;
			text-align: center;
		}
	}
	.popupMain{
		padding: 40rpx 25rpx 0 25rpx;
		width: 600rpx;
		background: #FFFFFF;
		border-radius: 40rpx;
		.popupHeader{
			margin-bottom: 40rpx;
			font-size: $uni-font-size-lg;
			font-weight: bold;
			color: #000000;
			line-height: 1;
			text-align: center;
		}
		.popupBody{
			margin-bottom: 60rpx;
			font-size: $uni-font-size-medium;
			color: #A3A3A3;
			line-height: 45rpx;
			text-align: center;
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
	.qaTypePopup{
		width: 100%;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0 0;
		padding: 40rpx 20rpx 100rpx;
		box-sizing: border-box;
		.qaTypePopupBody{
			.item{
				padding: 30rpx 0;
				font-size: $uni-font-size-medium;
				color: #000000;
				line-height: 32rpx;
				text-align: center;
			}
		}
		.qaTypePopupBottom{
			margin-top: 80rpx;
			font-size: $uni-font-size-medium;
			color: #A3A3A3;
			line-height: 1;
			text-align: center;
		}
	}
}
</style>
