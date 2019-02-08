import Vue from 'vue'
import Vuex from 'vuex'
import pageDemo1 from './modules/pageDemo1/pageDemo1'

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        pageDemo1
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store