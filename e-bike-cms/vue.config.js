const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  // devServer:{
  //   proxy:{
  //     '^/api':{
  //       target:'http://localhost:5050/',
  //       changeOrigin:true,
  //       logLevel:'debug',
  //       pathRewrite:{'^/api':'/'},
  //     },
  //   }
  // }
})
