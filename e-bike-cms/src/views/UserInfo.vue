<template>
    <el-row :gutter="30">
        <el-col :span="12">
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
                            <p v-if="userInfo.isAdmin" class="user-access">超级管理员</p>
                            <p v-else class="user-access">普通用户</p>
                        </div>
                        <div class="btn">
                            <el-button type="danger" @click="logout">退出账户</el-button>
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
                                <el-button type="danger" @click="cancelReservation">释放充电桩</el-button>
                            </div>
                        </div>
                        <el-empty v-else description="暂无使用的充电桩" image-size="20" class="empty"></el-empty>
                    </div>
                </el-card>
                <el-card class="box-card" id="paymentInfoCard">
                    <div slot="header" class="clearfix"><span>当前缴费状态</span></div>
                    <div>
                        <div v-if="paymentRecord" class="payment-info">
                            <h3>您有一笔未缴费记录，请缴费之后再预约充电桩！</h3>
                            <p>充电区：<span>{{ paymentRecord.area }}</span></p>
                            <p>充电桩编号：<span>{{ paymentRecord.no }}</span></p>
                            <p>使用时段：<span>{{ paymentRecord.startTime }} - {{ paymentRecord.endTime }}</span></p>
                            <p>缴费金额：<span>{{ paymentRecord.cost }} 元</span></p>
                            <div class="btn">
                                <el-button type="primary" @click="pay">缴费</el-button>
                            </div>
                        </div>
                        <el-empty v-else description="暂无需要缴费的条目" image-size="20" class="empty"></el-empty>
                    </div>
                </el-card>
            </div>
        </el-col>

        <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>
            <el-card class="box-card" id="recordInfoCard">
                <div slot="header" class="clearfix"> <span>预约记录</span></div>
                <div>
                    <el-table :data="tableData" stripe style="width: 100%" :row-style="{ height: '60px' }"
                        :key="itemKey" ref="table">
                        <el-table-column prop="date" label="日期" width="180" align="center">
                        </el-table-column>
                        <el-table-column prop="area" label="充电区域" align="center">
                        </el-table-column>
                        <el-table-column prop="no" label="充电桩编号" align="center">
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="180" align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { getData } from '../api';
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            // status: 充电中，已履约，已取消，已预约，失约
            tableData: [{
                date: '2016-05-04',
                status: '充电中',
                area: '信息学部竹园充电区',
                no: 3
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }, {
                date: '2016-05-03',
                status: '已取消',
                area: '文理学部桂园充电区',
                no: 55
            }],
            userInfo: {
                isAdmin: false,
                number: 2019302110229,
            },
            chargingStatus: {
                area: '信息学部竹园充电区',
                no: 3,
                startTime: "2016-05-04 18:00",
                endTime: "2016-05-04 18:00",
            },
            paymentRecord: {
                area: '信息学部竹园充电区',
                no: 3,
                startTime: "2016-05-04 18:00",
                endTime: "2016-05-04 18:00",
                cost: 1.0
            }
        }
    },
    methods: {
        cancelReservation() {
            // todo: 向后端发送取消预约请求，获取返回值，根据返回状态显示弹窗
            var status = true;
            var content = status ? "取消预约成功！" : "未知错误，取消预约失败，请稍后重试！";
            this.$alert(content, '提示', {
                confirmButtonText: '确定',
                // callback: action => {
                //     this.$message({
                //         type: 'info',
                //         message: `action: ${action}`
                //     });
                // }
            });
            if (status) {
                this.chargingStatus = null;
                this.updataRecordInfo();
            }
        },
        pay() {
            // status取值：1（缴费成功），2（校园卡欠费导致缴费失败），3（未知错误导致缴费失败）
            var status = 1;
            var content = null;
            if (status == 1) {
                content = "缴费成功！"
            } else if (status == 2) {
                content = "缴费失败，账户余额不足，请充值后重新缴费！"
            } else if (status == 3) {
                content = "未知错误，缴费失败，请稍后重试！"
            }
            this.$alert(content, '提示', {
                confirmButtonText: '确定',
            });
            if (status == 1) {
                this.paymentRecord = null;
            }
        },
        updataRecordInfo() {
            this.tableData[0].status = "已履约";
            // table数据更新后，刷新表格控件
            this.itemKey = Math.random()
        },
        getChargingStatus() {

        },
        getPaymentRecord() {

        },
        getUserInfo() {

        },
        getRecordInfo() {

        },
        logout() {
            // 清除cookie中的token信息
            cookie.remove('token')
            this.$router.push('/login')
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
        // text-align: center;
        margin-left: 200px;
    }

    .user-avatar {
        margin-right: 40px;
    }

    .user-info {
        .user-number {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .user-access {
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