<template>
    <div>
        <div v-if="this.state==1" class="sup-kf">
        <chat-res/>
        </div>
        <button class="btnkf" @click="open1">{{msg}}</button>
    </div>
</template>

<script>
import ChatRes from '@/components/ChatRes.vue'
    export default {
  components: { ChatRes },
  methods: {
    open1() {
        if(this.state==0){
            this.state=1
        this.msg='关闭客服'
        }else if(this.state==1){
            this.state=0
        this.msg='打开客服'
        }
        
    }
  },
        data() {
            return {
                state: 0,
                msg:'打开客服'
            }
        },
    }
</script>

<style lang="scss" scoped>
    .sup-kf {
        width: 500px;
        height: 485px;
        border: 1px solid ;
    }
    .btnkf {
        padding: 5px 15px;
        color: gray;
    }
</style>