const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

function createProxy(params) {
  const result = {};
  Object.keys(params).forEach(item => {
    result[item] = {
      target: params[item],
      changeOrigin: true,
      pathRewrite: {
        ['^' + item]: ''
      }
    };
  });
  // console.log('result:'+JSON.stringify(result))
  return result;
}

module.exports = {
  lintOnSave:false,
  // publicPath: process.env.NODE_ENV === 'development' ? './' : '/treport/mob/',
  publicPath: '/treport/mob/',
  outputDir: path.resolve(__dirname, './treportMob'),//打包dist路径
  filenameHashing: true,//hash
  assetsDir: 'static',
  devServer: {
    host: '0.0.0.0',
    port: 8088,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    proxy: {
      '/': {
        // target: 'http://218.89.67.51:85/', // 外网http://218.89.67.51:85/
        // target: 'http://10.0.134.94:85/', // 内网10.0.134.94:85
        target:'https://yingxiao.wuliangye.com.cn:8082/',//正式环境
        // target: process.env.NODE_ENV === 'development' ? 'http://10.0.134.94:85/':'http://218.89.67.51:85/',
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