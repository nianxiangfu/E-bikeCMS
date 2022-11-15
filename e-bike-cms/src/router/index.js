import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import UserInfo from '../views/UserInfo.vue'
import Charging from '../views/Charging.vue'
import Administrate from '../views/Administrate.vue'
import Bulletin from '../views/Bulletin.vue'
import Login from '../views/Login.vue'
import UserLogin from "@/views/UserLogin";
Vue.use(VueRouter)

const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        redirect: "/userinfo",
        children: [
            // 子路由（嵌套路由）
            {path: 'userinfo', component: UserInfo, name: 'userinfo'},
            {path: 'charging', component: Charging},
            // {path: 'administrate', component: Administrate},
            {path: 'bulletin', component: Bulletin},
            {path: 'userlogin',component: UserLogin}
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = new VueRouter({
    routes
})

export default router
