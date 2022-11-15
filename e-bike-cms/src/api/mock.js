import Mock from "mockjs";

// 定义mock请求拦截
Mock.mock('/api/userinfo/getData', function(){
    // 拦截到请求后的处理逻辑
    console.log("拦截到了");
    return 1;
})

Mock.mock('/api/login/loginRequest', 'post', (data) => {
    return {
        data: {
            token: Mock.Random.guid(),
            status: 0
        }
    }
})