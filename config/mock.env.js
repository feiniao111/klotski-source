var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"mock"',
    // TARGETSERVER: 'http://172.21.116.201:9001',
    TARGETSERVER: 'http://172.21.149.6:9000',
    // TARGETSERVER: 'http://127.0.0.1:9001',
    // TARGETSERVER: 'http://172.21.5.12:9001',
    LOACALSERVER: 'http://127.0.0.1:8081',
    TARGETWEBROOT: '/rj',
    // COOKIEREMOTEDOMIN:"172.21.116.201:9001",
    COOKIEREMOTEDOMIN:"172.21.149.6:9000",
    // COOKIEREMOTEDOMIN:"127.0.0.1:9001",
    // TARGETSERVER: 'http://172.21.5.12:9001',
    COOKIELOCALDOMIN:"127.0.0.1:8081"
})
