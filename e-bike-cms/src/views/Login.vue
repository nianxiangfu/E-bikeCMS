<template>
    <el-form :model="form" :rules="rules" class="login-container" :inline="true" label-width="70px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="margin-left: 105px; margin-top: 10px" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            }
        }
    },
    methods: {
        submit(){
            // token信息
            const token = Mock.Random.guid();
            // 将token信息存入cookie用于不同页面间的通信
            Cookie.set('token', token);
        }
    }
}
</script>
<style lang="less" scoped>
.login-container{
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .el-input {
        width: 198px;
    }
    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
}
</style>