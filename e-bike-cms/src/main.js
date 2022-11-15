import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './api/mock'
import Cookie from 'js-cookie'

Vue.use(ElementUI);

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断token是否存在
  const token = Cookie.get('token')
  // token不存在，说明当前用户未登录，应该跳转到登录页
  if (!token && to.name !== 'login'){
    next({name: 'login'})
  } else if (token && to.name === 'login'){ // token存在，说明用户登录，此时跳转至首页
    next({name: 'userinfo'})
  } else{
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
