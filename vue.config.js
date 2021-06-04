module.exports = {
    transpileDependencies: [
        'vuetify'
    ], devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5555', // 后端提供给你的接口地址
                ws: true,
                pathRewrite: {
                    '^/api': '/api' // 代理api使用方法=> /proxyApi/test/where
                }
            }
        }
    },
    publicPath: './'
}
