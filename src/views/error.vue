<template>
    <div class="error" id="error">
        <img :src="require('../assets/img/'+type+'.png')" width="80%">
        <!-- <img src="../assets/img/404.png" width="80%"> -->
        <div style="font-size:14px">{{message}}</div>
        <div style="color:#b2b2b2" v-if="type=='getCodeErr'">code:{{code}}</div>
    </div>
</template>
<script>
export default {
    name:'error',
    data(){
        return{
            type:'404',
            message:'错误',
            code:''
        }
    },
    created(){
        this.$ddapi.setTitle(" ");
        let hash = window.location.hash
        console.log(sessionStorage.getItem("code"),22);
        let code = sessionStorage.getItem("code")
        if (hash.indexOf('type')!=-1) {
            console.log(hash.substring(hash.indexOf('type')+5));
            this.type = hash.substring(hash.indexOf('type')+5)
            if (this.type=='404') {
                this.message = '页面找不到了~'
            }else if (this.type == 'getCodeErr') {
                this.message = '免登失败~'
                this.code = code||'123456'
            }
        }else{
            console.log('么有type');
        }
        
    }
}
</script>
<style scoped>
    .error{
        width: 100%;
        height: calc(100% + 106px);
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .error div{
        margin-top: 8px;
    }
</style>