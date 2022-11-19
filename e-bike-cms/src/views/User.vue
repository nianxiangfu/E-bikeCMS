<template>
    <el-row :gutter="30">
        <el-col :span="11">
            <div class="grid-content bg-purple">
                <el-card class="box-card" id="userInfoCard">
                    <div slot="header" class="clearfix"><span>个人基本信息</span></div>
                    <div class="user">
                        <el-avatar class="user-avatar"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="circle"
                            :size="80" fit="scale-down">
                        </el-avatar>
                        <div class="user-info">
                            <p class="user-number">
                                {{ userInfo.number }}
                            </p>
                            <!-- <p v-if="userInfo.isAdmin" class="user-school">超级管理员</p>
                            <p v-else class="user-school">普通用户</p> -->
                            <!-- <p>{{ userInfo.school }}</p> -->
                        </div>
                        <div class="btn">
                            <el-popconfirm title="确定退出当前账户吗吗？" @confirm="logout">
                                <!-- <el-button slot="reference">删除</el-button> -->
                                <el-button type="danger" slot="reference">退出账户</el-button>
                            </el-popconfirm>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card" id="chargingInfoCard">
                    <div slot="header" class="clearfix"><span>当前充电状态</span></div>
                    <div>
                        <div v-if="chargingStatus" class="charging-info">
                            <p>当前充电区：<span>{{ chargingStatus.area }}</span></p>
                            <p>当前充电桩编号：<span>{{ chargingStatus.no }}</span></p>
                            <p>使用时段：<span>{{ chargingStatus.startTime }} - {{ chargingStatus.endTime }}</span></p>
                            <div class="btn">
                                <el-button type="danger" @click="cancelEvent">释放充电桩</el-button>
                            </div>
                        </div>
                        <el-empty v-else description="暂无使用的充电桩" image-size="20" class="empty"></el-empty>
                    </div>
                </el-card>
                <el-card class="box-card" id="paymentInfoCard">
                    <div slot="header" class="clearfix"><span>当前缴费状态</span></div>
                    <div>
                        <div v-if="paymentStatus" class="payment-info">
                            <h3>您有一笔未缴费记录，请缴费之后再预约充电桩！</h3>
                            <p>充电区：<span>{{ paymentStatus.area }}</span></p>
                            <p>充电桩编号：<span>{{ paymentStatus.no }}</span></p>
                            <p>使用时段：<span>{{ paymentStatus.startTime }} - {{ paymentStatus.endTime }}</span></p>
                            <p>缴费金额：<span>{{ paymentStatus.cost }} 元</span></p>
                            <div class="btn">
                                <el-button type="primary" @click="payEvent">缴费</el-button>
                            </div>
                        </div>
                        <el-empty v-else description="暂无需要缴费的条目" image-size="20" class="empty"></el-empty>
                    </div>
                </el-card>
            </div>
        </el-col>

        <el-col :span="13">
            <div class="grid-content bg-purple-light"></div>
            <el-card class="box-card" id="recordInfoCard">
                <div slot="header" class="clearfix"> <span>预约记录</span></div>
                <div>
                    <el-table :data="recordList" stripe style="width: 100%" :row-style="{ height: '60px' }"
                        :key="itemKey" ref="table">
                        <el-table-column prop="startTime" label="开始时期" align="center">
                        </el-table-column>
                        <el-table-column prop="startTime" label="结束时期" align="center">
                        </el-table-column>
                        <el-table-column prop="area" label="充电区域" align="center">
                        </el-table-column>
                        <el-table-column prop="no" label="充电桩编号" align="center">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { getData, queryChargingStatus, queryPaymentStatus, queryRecords, cancelReservation, releasePile, pay } from '../api';
import Cookie from 'js-cookie'
import { stationList, statusList } from '@/main'
export default {
    data() {
        return {
            // status: 充电中，已履约，已取消，已预约，失约
            recordList: [{
                startTime: '2022-11-03 12:04',
                endTime: '2022-11-03 12:04',
                status: '充电中',
                area: '信息学部竹园充电区',
                no: 3
            }, {
                startTime: '2022-11-03 12:04',
                endTime: '2022-11-03 12:04',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }],
            stationList: stationList,
            statusList: statusList,
            userInfo: {
                number: Cookie.get("username"),
            },
            chargingStatus: {
                area: '信息学部竹园充电区',
                no: 3,
                startTime: "2016-05-04 18:00",
                startTime: "2016-05-04 18:00",
            },
            paymentStatus: {
                area: '信息学部竹园充电区',
                no: 3,
                startTime: "2016-05-04 18:00",
                endTime: "2016-05-04 18:00",
                cost: 1.0
            }
        }
    },
    methods: {
        cancelEvent() {
            var content = ''
            cancelReservation({"token": Cookie.get('token')}).then(({data}) => {
                if (data.info.code === '0'){
                    if (data.data.status === 0){
                        content = "取消预约成功！"
                        this.chargingStatus = null;
                        this.updataRecordInfo(2);
                    }else{
                        content = "取消预约失败！"
                    }
                }else{
                    content = "未知错误，取消预约失败，请稍后重试！"
                }
            })
            this.$alert(content, '提示', {
                confirmButtonText: '确定',
                // callback: action => {
                //     this.$message({
                //         type: 'info',
                //         message: `action: ${action}`
                //     });
                // }
            });
        },
        payEvent() {
            var content = ''
            // todo: 向后端发送取消预约请求，获取返回值，根据返回状态显示弹窗
            pay({"token": Cookie.get('token')}).then(({data}) => {
                if (data.info.code === '0'){
                    if (data.data.status === 0){
                        content = "缴费成功！"
                        this.paymentStatus = null;
                    }else{
                        content = "缴费失败！"
                    }
                }else{
                    content = "未知错误，缴费失败，请稍后重试！"
                }
            })
            this.$alert(content, '提示', {
                confirmButtonText: '确定',
            });
        },
        updataRecordInfo(status) {
            this.recordList[0].status = status;
            // table数据更新后，刷新表格控件
            this.itemKey = Math.random()
        },
        getChargingStatus() {
            queryChargingStatus({"token": Cookie.get('token')}).then(({data}) => {
                this.chargingStatus = data.data
            })
        },
        getPaymentStatus() {
            queryPaymentStatus({"token": Cookie.get('token')}).then(({data}) => {
                this.paymentStatus = data.data
            })
        },
        getRecords() {
            queryRecords({"token": Cookie.get('token')}).then(({data}) => {
                this.recordList = data.data
            })
        },
        logout() {
            // 清除cookie中的token信息
            Cookie.remove('token')
            Cookie.remove('username')
            this.$router.push('/login')
        },
        releaseEvent () {
            var content = ''
            releasePile({"token": Cookie.get('token')}).then(({data}) => {
                if (data.info.code === '0'){
                    if (data.data.status === 0){
                        content = "释放成功！"
                        this.chargingStatus = null;
                        this.updataRecordInfo(1);
                    }else{
                        content = "释放失败！"
                    }
                }else{
                    content = "未知错误，释放失败，请稍后重试！"
                }
            })
            this.$alert(content, '提示', {
                confirmButtonText: '确定',
            });
        }
    },
    mounted() {
        getData().then((data) => console.log(data))
    },
}
</script>

<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;

    .btn {
        margin-left: 120px;
    }

    .user-avatar {
        margin-right: 40px;
    }

    .user-info {
        .user-number {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .user-school {
            color: #999999;
        }
    }
}

.charging-info,
.payment-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }

    h3 {
        margin-bottom: 10px;
    }
}

.btn {
    text-align: center;
    margin-top: 15px;
}

#userInfoCard {
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 25px;
    height: 180px;
}

#chargingInfoCard {
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 20px;
    height: 240px;
}

#paymentInfoCard {
    overflow-y: auto;
    overflow-x: hidden;
    // margin-bottom: 10px;
    height: 300px;
}

#recordInfoCard {
    overflow-y: auto;
    overflow-x: hidden;
    height: 768px;
}

.clearfix {
    font-weight: 800;
}

// .el-row {
//     display: flex;
//     flex-wrap: wrap;
// }

// .el-row .el-card {
//     min-width: 100%;
//     height: 100%;
//     margin-right: 20px;
//     transition: all .5s;
//     margin-bottom: 3%;
//     height: 100%;
// }
</style>