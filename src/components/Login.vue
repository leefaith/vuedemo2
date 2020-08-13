<template>
  <div class="login_container">
    <div class="login_box" :model="loginForm">
      <!-- 手机号码-->
      <div class="input_box">
        <input
          type="text"
          length="11"
          v-model="loginForm.mobile"
          placeholder="请输入手机号码"
          class="input_mobile"
        />
      </div>
      <!-- 验证码 -->
      <div class="input_box">
        <input
          type="text"
          length="6"
          v-model="loginForm.code"
          placeholder="验证码"
          class="input_code"
        />
        <el-button type="primary" size="mini" class="sendCode" @click="getCode"
          >获取验证码</el-button
        >
      </div>
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
      // 这是登录表单的数据绑定对象
      loginForm: {
        mobile: "",
        code: ""
      },

      selfstyle: {
        color: "white",
        marginTop: "20px",
        width: "250px"
      }
    };
  },

  methods: {
    getCode: function() {
      this.$axios({
        methods: "get",
        url: "/login/code_request",
        data: {
          mobile: this.mobile
        }
      })
        .then(res => {
          console.log(res.data.code_state);
        })
        .catch(error => {
          console.log(error);
        });
    },
    login: function() {
      this.$axios({
        methods: "get",
        url: "/login/code_check",
        data: {
          loginForm: this.loginForm
        }
      })
        .then(res => {
          if (res.data == 404) {
            this.$message.error("登录失败");
          } else {
            console.log(res);
            this.$message.success("登录成功");
            window.sessionStorage.setItem("token", res.data);
            this.$router.push("/welcome");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    oauthWx: function() {
      //   const appid='wx9b65aad1bf925ceb';
      //   const authorize_url="https://open.weixin.qq.com/connect/oauth2/authorize"
      //   const edirect_url="http://localhost:8080/login/wxoauth/redirect";
      //   window.location.href = `${authorize_url}?appid=${this.appid}&redirect_uri=${this.redirect_url}&response_type=code&scope=SCOPE&state=STATE#wechat_redirect`
    },
    oauthGit: function() {
      this.$axios({
        methods: "get",
        url: "/login/git_request",
        data: {
          redirect_uri: "http://localhost:8080/oauth/redirect"
        }
      })
        .then(res => {
          console.log(res.data.href);
        //  window.location.href = res.data.href
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
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
.input_mobile {
  height: 30px;
  width: 250px;
  margin: 20px;
}
.input_code {
  height: 30px;
  width: 150px;
}
.oauth {
  margin-top: 20px;
}
</style>
