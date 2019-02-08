<!--demo页面级组件-->
<template>
    <div class="pageDemo1">
        <helloworld></helloworld>
        <h3>
            vuex变量
            <span></span>
        </h3>
        <h3>
            mock请求
            <button @click="req()">请求文件内容</button>
        </h3>
    </div>
</template>

<script>
    import helloworld from '@/components/HelloWorld.vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'pageDemo1',
        components:{
            helloworld
        },
        data() {
            return {
            }
        },
        computed: {
            ...mapGetters([
                "getPageDemo1Value"
            ])
        },
        methods: {
            req() {
                $.ajax({
                    url: "/rj/frontend/src/3rdparty/common.js",
                    async: true,
                    success: function(ret){
                        alert(ret);
                    },
                    type: 'GET'
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
