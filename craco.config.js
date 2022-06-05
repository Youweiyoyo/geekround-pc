const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    proxy: {
      '/': {
        // 这是请求接口中要替换的标识
        target: 'http://geek.itheima.net/v1_0', // 被替换的目标地址，即把 /api 替换成这个
        pathRewrite: { '/v1_0': '' }, // 把/api 替换为空
        changeOrigin: true, // 加了这个属性，那后端收到的请求头中的host是目标地址 target
      },
    },
  },
}
