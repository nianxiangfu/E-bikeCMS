<template>
    <el-row :gutter="30">
        <el-col :span="12">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>个人基本信息</span>
                    </div>
                    <div class="user">
                        <el-avatar class="user-avatar"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="circle"
                            :size="80" fit="scale-down"></el-avatar>
                        <div class="user-info">
                            <p class="user-number">
                                2019302110229
                            </p>
                            <p class="user-access">
                                超级管理员
                            </p>
                        </div>
                    </div>

                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>当前充电状态</span>
                        <el-empty class="empty" description="暂无使用的充电桩" image-size="20"></el-empty>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>当前缴费状态</span>
                        <el-empty description="暂无需要缴费的条目" image-size="20"></el-empty>
                    </div>
                </el-card>
            </div>
        </el-col>

        <el-col :span="12">
            <div class="grid-content bg-purple-light"></div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>预约记录</span>
                </div>
                <div>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="充电桩编号">
                        </el-table-column>
                        <el-table-column prop="name" label="状态" width="180">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    }
}
</script>

<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;

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

// .box-card{
//     margin-bottom: 20px;
//     // min-height: 100%;
//     height: 30%;
//     margin-bottom: 0%;
// }
// .empty{
//     height: 100%;
// }
.el-row {
    // margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
}

.el-row .el-card {
    min-width: 100%;
    height: 100%;
    margin-right: 20px;
    transition: all .5s;
    margin-bottom: 3%;
    height: 100%;
}
</style>