<template>
  <div id="app">
          <div class="chat-head">客服端</div>

          <div class="chat-main">

          <!-- <div class="gk-ms">
              <span class="kf-img"><img src="/14.jpg" alt="" style="width:100%"></span>
              <span class="gk-msg" id="gkmsg">${this.backData}</span>
            </div> -->

          </div>
          
          <div class="user-bd">
            <input class="user-msg" id="usermsg" type="text" maxlength="19" v-model="infoData" />
          </div>

          <div class="send1">
            <el-button class="btn1" type="primary" @click="send">发送</el-button>
          </div>
        </div>
</template>

<script>
import io from "../../node_modules/socket.io-client/dist/socket.io.js";

// list.scrollTop = list.scrollHeight
export default {
   name: "App",
  data() {
    return {
      backData:null,
      infoData: "",
      socket: null,
      avatar:"./assets/kf.png",
    };
  },
  methods: {
    send() {
      this.socket.emit("kfmsg", this.infoData);
      let list = document.querySelector('.chat-main')
      console.log(list)
      list.innerHTML += `
        <div class="kf-ms" id="kfms">
            <div class="zz tx">
             <span class="kf-img"><img src='/kf.png' alt="" style="width:100%"></span>
            </div>
            <div class="zz wz">
            <span class="kf-msg" id="kfmsg">${this.infoData}</span>
            </div>
            </div>
      `
      list.scrollTop = list.scrollHeight
      this.infoData=''
    },
  },
  mounted() {
    this.socket = io("http://localhost:3000/");
    this.socket.on("connect", function () {
      console.log("连接成功");
    });
    this.socket.on('textmsg1',function(data){
      this.backData=data
      console.log(data)
      let list = document.querySelector('.chat-main')
      list.innerHTML += `
        <div class="gk-ms">
              <span class="kf-img"><img src="/14.jpg" alt="" style="width:100%"></span>
              <span class="gk-msg" id="gkmsg">${this.backData}</span>
            </div>
      `
      list.scrollTop = list.scrollHeight
    })
  },
};
</script>

<style scoped>
@import url("../assets/chat.css");
</style>
