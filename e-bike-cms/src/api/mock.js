import Mock from "mockjs";

// 定义mock请求拦截
Mock.mock('/api/user/getData', function () {
    // 拦截到请求后的处理逻辑
    console.log("拦截到了");
    return 1;
})

Mock.mock('/api/user/login', 'post', (data) => {
    return {
        status: 200,
        info: {
            code: "0",
            message: "success"
        },
        data: {
            token: "RWQREIRMSFJDA3190238FJLSFSED231S12"
        }
    }
})