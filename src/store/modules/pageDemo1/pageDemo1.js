/**
 * demo vuex文件
 */
import * as types from '../../mutation-types'
import Account from '../../../api/pageDemo1/pageDemo1'
const state = {
    pageDemo1Value: 0
};

const getters = {
    getPageDemo1Value:state=>state.pageDemo1Value
};

const actions = {
    ACCOUNT_GET_ALL_TEACHER_OF_CLASS({commit}, key){
        return new Promise(function (resolve, reject) {
            let paras = {method:10, pageno:1, pagesize:20, key:key};
            Account.requestUserAsync(function (ret) {
                let result = JSON.parse(ret);
                if (result.status == "error") {
                    if (reject) {
                        reject();
                    }
                    alert("获取教师列表失败！");
                    return;
                }
                commit(types.PAGE_DEMO1_SET_VAL, result.data);
                resolve();
            }, paras);
        });
    },
};

const mutations = {
    [types.PAGE_DEMO1_SET_VAL](state, val){
        state.pageDemo1Value = val;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}