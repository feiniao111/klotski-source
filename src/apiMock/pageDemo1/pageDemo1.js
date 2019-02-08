/**
 * demo api请求文件Mock
 */
var Mock = require('mockjs');
//拦截url,返回模拟数据
Mock.mock('/rj/frontend/src/3rdparty/common.js', 'get',
    {
        "data": {
            "cur_page": '这是mock的数据'
        }
    }
);

//在这里添加mock方法，拦截其他请求