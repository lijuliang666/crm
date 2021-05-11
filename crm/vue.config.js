module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/': {
                target:'http://localhost:8000',
                changeOrigin: true
            }
        }
    }

}