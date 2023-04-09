module.exports = {
    productionSourceMap: false,
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        host: '0.0.0.0',
        port: 8082,
        proxy: {
            '/API': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/API': '/API'
                }
            }
        }
    },
}
