<template>
    <el-form :model="form" :rules="rules" class="login-container" :inline="true" label-width="70px" ref="form">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="学工号" prop="username">
            <el-input v-model="form.username" placeholder="请输入学工号"></el-input>
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
// import Cookies from 'js-cookie'
import { login } from '../api'
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入学工号' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            }
        }
    },
    methods: {
        submit(){
            // // token信息
            // const token = Mock.Random.guid();
            // // 将token信息存入cookie用于不同页面间的通信
            // Cookie.set('token', token);
            this.$refs.form.validate((valid) => {
                if (valid) {
                    login(this.form).then(({data}) => {
                        console.log(data)
                        if (data.info.code === "0") {
                            Cookie.set('token', data.data.token)
                            Cookie.set('username', this.form.username)
                            this.$message.success('登陆成功')
                            // 跳转到首页
                            this.$router.push('/user')
                        } else if(data.info.code === "1"){
                            this.$message.error(data.info.message)
                        } else {
                            this.$message.error('未知错误，请稍后重试或联系管理员')
                        }
                    })
                }
            });
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