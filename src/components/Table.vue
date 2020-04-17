<template>
    <div style="background:#ffffff;padding:0 25px">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#cccccc"
            align="center">
            <thead>
                <tr>
                    <th width="10%" 
                        v-for="(filed,index) in tableHead" 
                        :key="index" 
                        class="thbg titfont"
                        :style="{height:tbHeight,color:thColor}"
                        :align="thAlign"
                    >
                        {{filed.lable}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,idx) in data" :key="idx" >
                    <td :style="{color:tdColor}"  :align="tdAlign" v-for="(filed,index) in tableHead" :key="index">{{item[filed.prop]}}</td>
                </tr>
            </tbody>
        
        </table>
    </div>
</template>
<script>
    export default {
        name: 'Table',
        data() {
            return {
                
            }
        },
        props: {
            tableHead: {
                type: Array,
                default: () => {
                    return []
                }
            },
            data: {
                type: Array,
                default: () => {
                    return []
                }
            },
            tbHeight:{
                type:String,
                default:'44px'
            },
            thAlign:{
                type:String,
                default:'center'
            },
            thColor:{
                type:String,
                default:'#999999'
            },
            tdAlign:{
                type:String,
                default:'center'
            },
            tdColor:{
                type:String,
                default:'#333333'
            },
        }
    }
</script>
<style scoped>
    th{
        font-size: 13px;
        border:1px solid #ffffff;
        border-bottom: 1px solid #E5E5E5;
    }
    .thbg {
        background: #ffffff !important;
    }

    .titfont {

        font-size: 13px;
        font-weight: 100;
        color: #255e95;
        background-color: #e9faff;
    }
    td{
        font-size: 15px;
        height: 40px;
        background-color: #ffffff;
        border:1px solid #ffffff;
    }



</style>