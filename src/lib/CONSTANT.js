/**
 *  华容道布局
 */

// 横刀立马
const CROSS_KNIFE = [
    { uid: 'zhangfei', name: 'zhangfei', width: 1, height: 2, x0: 0, y0: 0 },
    { uid: 'caocao', name: 'caocao', width: 2, height: 2, x0: 1, y0: 0 },
    { uid: 'zhaoyun', name: 'zhaoyun', width: 1, height: 2, x0: 3, y0: 0 },
    { uid: 'machao', name: 'machao', width: 1, height: 2, x0: 0, y0: 2 },
    { uid: 'guanyu', name: 'guanyu', width: 2, height: 1, x0: 1, y0: 2 },
    { uid: 'xb1', name: 'xiaobing', width: 1, height: 1, x0: 1, y0: 3 },
    { uid: 'xb2', name: 'xiaobing', width: 1, height: 1, x0: 2, y0: 3 },
    { uid: 'xb3', name: 'xiaobing', width: 1, height: 1, x0: 0, y0: 4 },
    { uid: 'xb4', name: 'xiaobing', width: 1, height: 1, x0: 3, y0: 4 },
    { uid: 'huangzhong', name: 'huangzhong', width: 1, height: 2, x0: 3, y0: 2 },
    { uid: 'empty1', name: 'empty', width: 1, height: 1, x0: 1, y0: 4, isEmpty: true },
    { uid: 'empty2', name: 'empty', width: 1, height: 1, x0: 2, y0: 4, isEmpty: true }
]

// 横刀立马2
const CROSS_KNIFE2 = [
    { uid: 'zhangfei', name: 'zhangfei', width: 1, height: 2, x0: 0, y0: 0 },
    { uid: 'caocao', name: 'caocao', width: 2, height: 2, x0: 1, y0: 0 },
    { uid: 'zhaoyun', name: 'zhaoyun', width: 1, height: 2, x0: 3, y0: 0 },
    { uid: 'machao', name: 'machao', width: 1, height: 2, x0: 0, y0: 3 },
    { uid: 'guanyu', name: 'guanyu', width: 2, height: 1, x0: 1, y0: 2 },
    { uid: 'xb1', name: 'xiaobing', width: 1, height: 1, x0: 1, y0: 3 },
    { uid: 'xb2', name: 'xiaobing', width: 1, height: 1, x0: 2, y0: 3 },
    { uid: 'xb3', name: 'xiaobing', width: 1, height: 1, x0: 0, y0: 2 },
    { uid: 'xb4', name: 'xiaobing', width: 1, height: 1, x0: 3, y0: 2 },
    { uid: 'huangzhong', name: 'huangzhong', width: 1, height: 2, x0: 3, y0: 3 },
    { uid: 'empty1', name: 'empty', width: 1, height: 1, x0: 1, y0: 4, isEmpty: true },
    { uid: 'empty2', name: 'empty', width: 1, height: 1, x0: 2, y0: 4, isEmpty: true }
]

// 齐头并进
const HANDINHAND = [
    { uid: 'zhangfei', name: 'zhangfei', width: 1, height: 2, x0: 0, y0: 0 },
    { uid: 'caocao', name: 'caocao', width: 2, height: 2, x0: 1, y0: 0 },
    { uid: 'zhaoyun', name: 'zhaoyun', width: 1, height: 2, x0: 3, y0: 0 },
    { uid: 'machao', name: 'machao', width: 1, height: 2, x0: 0, y0: 3 },
    { uid: 'guanyu', name: 'guanyu', width: 2, height: 1, x0: 1, y0: 3 },
    { uid: 'xb1', name: 'xiaobing', width: 1, height: 1, x0: 1, y0: 2 },
    { uid: 'xb2', name: 'xiaobing', width: 1, height: 1, x0: 2, y0: 2 },
    { uid: 'xb3', name: 'xiaobing', width: 1, height: 1, x0: 0, y0: 2 },
    { uid: 'xb4', name: 'xiaobing', width: 1, height: 1, x0: 3, y0: 2 },
    { uid: 'huangzhong', name: 'huangzhong', width: 1, height: 2, x0: 3, y0: 3 },
    { uid: 'empty1', name: 'empty', width: 1, height: 1, x0: 1, y0: 4, isEmpty: true },
    { uid: 'empty2', name: 'empty', width: 1, height: 1, x0: 2, y0: 4, isEmpty: true }
]

// 兵分三路
const THREEROAD = [
    { uid: 'zhangfei', name: 'zhangfei', width: 1, height: 2, x0: 0, y0: 1 },
    { uid: 'caocao', name: 'caocao', width: 2, height: 2, x0: 1, y0: 0 },
    { uid: 'zhaoyun', name: 'zhaoyun', width: 1, height: 2, x0: 3, y0: 1 },
    { uid: 'machao', name: 'machao', width: 1, height: 2, x0: 0, y0: 3 },
    { uid: 'guanyu', name: 'guanyu', width: 2, height: 1, x0: 1, y0: 2 },
    { uid: 'xb1', name: 'xiaobing', width: 1, height: 1, x0: 1, y0: 3 },
    { uid: 'xb2', name: 'xiaobing', width: 1, height: 1, x0: 2, y0: 3 },
    { uid: 'xb3', name: 'xiaobing', width: 1, height: 1, x0: 0, y0: 0 },
    { uid: 'xb4', name: 'xiaobing', width: 1, height: 1, x0: 3, y0: 0 },
    { uid: 'huangzhong', name: 'huangzhong', width: 1, height: 2, x0: 3, y0: 3 },
    { uid: 'empty1', name: 'empty', width: 1, height: 1, x0: 1, y0: 4, isEmpty: true },
    { uid: 'empty2', name: 'empty', width: 1, height: 1, x0: 2, y0: 4, isEmpty: true }
]

// 屯兵东路
const STAYEAST = [
    { uid: 'zhangfei', name: 'zhangfei', width: 1, height: 2, x0: 2, y0: 0 },
    { uid: 'caocao', name: 'caocao', width: 2, height: 2, x0: 0, y0: 0 },
    { uid: 'zhaoyun', name: 'zhaoyun', width: 1, height: 2, x0: 3, y0: 0 },
    { uid: 'machao', name: 'machao', width: 1, height: 2, x0: 0, y0: 3 },
    { uid: 'guanyu', name: 'guanyu', width: 2, height: 1, x0: 0, y0: 2 },
    { uid: 'xb1', name: 'xiaobing', width: 1, height: 1, x0: 2, y0: 2 },
    { uid: 'xb2', name: 'xiaobing', width: 1, height: 1, x0: 2, y0: 3 },
    { uid: 'xb3', name: 'xiaobing', width: 1, height: 1, x0: 3, y0: 3 },
    { uid: 'xb4', name: 'xiaobing', width: 1, height: 1, x0: 3, y0: 2 },
    { uid: 'huangzhong', name: 'huangzhong', width: 1, height: 2, x0: 1, y0: 3 },
    { uid: 'empty1', name: 'empty', width: 1, height: 1, x0: 1, y0: 4, isEmpty: true },
    { uid: 'empty2', name: 'empty', width: 1, height: 1, x0: 2, y0: 4, isEmpty: true }
]

let LAYOUTS =
    [{
        value: CROSS_KNIFE,
        label: '横刀立马'
    }, {
        value: CROSS_KNIFE2,
        label: '横刀立马2'
    }, {
        value: HANDINHAND,
        label: '齐头并进'
    }, {
        value: THREEROAD,
        label: '兵分三路'
    }, {
        value: STAYEAST,
        label: '屯兵东路'
    }];

export {LAYOUTS};
