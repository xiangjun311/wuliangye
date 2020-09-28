const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir); 
}
module.exports = {
  lintOnSave:false,
  publicPath: '/treport/mob/',
  outputDir: path.resolve(__dirname, './treportMob'),//打包dist路径
  assetsDir: 'static',
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    proxy: {
      '/': {
        target: 'http://10.0.134.94:85/', // 外网http://218.89.67.51:85/
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },

  configureWebpack:(config)=> {
    config.resolve={
      extensions: [".js", ".vue", ".json", ".less"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src"),
      }
    }
  }
}