
<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />

    <div class="register-panel">
      <van-field v-model="username" label="用户名" icon="clear" :error-message='usernameErrorMsg' placeholder="请输入用户名" required @click-icon="username = ''" />

      <van-field v-model="password" type="password" label="密码" :error-message='passwordErrorMsg' placeholder="请输入密码" required />
      <div class="register-button">
        <van-button type="primary" size="large" :loading='openLoading' @click="registerAction">马上注册</van-button>
      </div>
    </div>

  </div>
</template>
 
<script>
import axios from "axios";
import { URL } from "@/URL.config";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false,
      usernameErrorMsg: "", //当用户名出现错误的时候
      passwordErrorMsg: "" //当密码出现错误的时候
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction() {
      this.checkForm() && this.postRegister();
    },
    postRegister() {
      this.openLoading = true;
      axios
        .post(URL.register, {
          userName: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            Toast.success("注册成功");
            setTimeout(() => {
              // this.$router.push("./shoppingMall.vue");
            }, 500);
          } else {
            Toast.fail("注册失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          Toast.fail("注册失败");
        });
    },
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不得小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不得小于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }

      return isOk;
    }
  }
};
</script>
 
<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
 