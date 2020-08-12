<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 手机号码-->
      <div class="input_box">
        <input
          type="text"
          v-model="mobile"
          length="11"
          required
          placeholder="请输入手机号码"
          class="input"
        />
      </div>
      <!-- 验证码 -->
      <div class="input_box"></div>
      <input
        type="text"
        name="code"
        maxlength="6"
        placeholder="验证码"
        class="input2"
      />
      <el-button type="primary" size="mini" class="sendCode" @click="getCode(mobile)"
        >获取验证码</el-button
      >

      <!-- 按钮区域 -->
      <div class="login_button">
        <el-button type="primary" :style="selfstyle" @click="login"
          >登录</el-button
        >
      </div>
      <!-- 其他登录方式 -->
      <div class="oauth">
        <img
          title="微信"
          alt="微信"
          src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/wechat.e0ff124.svg"
          @click="oauthWx"
        />
        <img
          title="GitHub"
          alt="GitHub"
          src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/github.547dd8a.svg"
          @click="oauthGit"
        />
    
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      mobile: "",
      code: "",
      selfstyle: {
        color: "white",
        marginTop: "20px",
        width: "250px"
      }
    };
  },

  methods: {
    getCode:function() {
       this.$axios.post('http://localhost:8080/login/code_request').then(res => {
          console.log(77, res)
          if (res.data) {
            this.cityList = res.data.cityList
          }
        })
    },
    login:function(){
        
    },
      oauthWx:function (){
      const appid='wx9b65aad1bf925ceb';
      const authorize_url="https://open.weixin.qq.com/connect/oauth2/authorize"
      const edirect_url="http://localhost:8080/login/wxoauth/redirect";
      window.location.href = `${authorize_url}?appid=${this.appid}&redirect_uri=${this.redirect_url}&response_type=code&scope=SCOPE&state=STATE#wechat_redirect`
  },
  oauthGit: function() {
    const client_id = "c27b8b3952f2204fc51d";
    const authorize_uri = "https://github.com/login/oauth/authorize";
    const redirect_uri = "http://localhost:8080/login/gitoauth/redirect";
    window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
  }
  },


};
</script>
<style scoped>
.login_container {
  height: 100%;
}
.login_box {
  height: 250px;
  width: 400px;
  border: 2px solid #eee;
  border-radius: 10rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.input_box {
  position: relative;
}
.input {
  height: 30px;
  width: 250px;
  margin: 20px;
}
.input2 {
  height: 30px;
  width: 150px;
}
.oauth {
  margin-top: 20px;
}
</style>
