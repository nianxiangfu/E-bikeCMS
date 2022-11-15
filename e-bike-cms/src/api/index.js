import http from "../utils/request"


export const getData = () => {
    // 返回一个promise对象
    return http.get('/userinfo/getData')
}

export const loginRequest = (data) => {
    return http.post('/login/loginRequest', data)
}