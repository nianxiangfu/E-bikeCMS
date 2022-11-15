<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h1>公告信息</h1>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <ol class="announcements">
            <li v-for="item in announcements" :key="item.id">
                {{ item.content }}
            </li>
        </ol>
        <!-- <div v-for="o in 4" :key="" class="text item">
            {{ '列表内容 ' + o }}
        </div> -->
    </el-card>
</template>
<script>
    export default {
        data() {
            return {
                announcements: [
                    {id: 1, content: "请勿使用程序脚本、频繁调用接口等非正常方式使用本系统，违者将视情节轻重一段时间内被取消本系统的使用权限。"},
                    {id: 2, content: "默认使用学校统一平台的学工号和密码登录本系统。"},
                    {id: 3, content: "公共资源禁止长时间占用，充电结束后超24小时不取车没收充电器，领取时填写违规入册本，严重超时将作无人车处理！"},
                    {id: 4, content: "接下来几个月雨水多，建议大家车篓里放个防雨袋子或防水包！最好自已及时取车！"},
                ]
            }
        }
    }
</script>
<style>
.announcements {
    font-size: 30px;
}
li {
    margin-bottom: 15px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 99%;
    height: 99%
}
</style>
