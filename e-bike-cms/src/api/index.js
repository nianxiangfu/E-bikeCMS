import http from "../utils/request"

export const getData = () => {
    return http.get('/user/getData')
}

export const login = (data) => {
    return http.post('/user/login', data)
}

export const queryChargingStatus = (data) => {
    return http.post('/user/queryChargingStatus', data)
}

export const queryPaymentStatus = (data) => {
    return http.post('/user/queryPaymentStatus', data)
}

export const queryRecords = (data) => {
    return http.post('/user/queryRecords', data)
}

export const cancelReservation = (data) => {
    return http.post('/user/cancelReservation', data)
}

export const pay = (data) => {
    return http.post('/user/pay', data)
}

export const releasePile = (data) => {
    return http.post('/user/releasePile', data)
}

export const queryPiles = (data) => {
    return http.post('/charging/queryPiles', data)
}

export const bookPile = (data) => {
    return http.post('/charging/bookPile', data)
}