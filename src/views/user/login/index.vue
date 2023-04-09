<template>
  <div class="login-container">
    <div class="login" :class="isOpen ? 'open-22' : 'close-22'">
      <h2>- Browser Login -</h2>
      <el-form
        class="form"
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="username"
            clearable
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            minlength="5"
            maxlength="18"
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="password"
            clearable
            show-password
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            minlength="6"
            maxlength="20"
            @focus="foucsPasswd"
            @blur="blurPasswd"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-options">
          <el-checkbox v-model="loginForm.rememberme">Remember me</el-checkbox>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button @click="resetForm">Reset Form</el-button>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import request from "../../../utils/request";
import tokenTools from "../../../utils/token";
export default {
  data: () => ({
    loginForm: {
      username: "",
      password: "",
      rememberme: true,
    },
    rules: {
      username: [
        {
          required: true,
          message: "Please enter your username",
          trigger: "blur",
        },
        {
          min: 5,
          max: 18,
          message: "The length is 5 to 18 characters",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please enter your password",
          trigger: "blur",
        },
        {
          min: 6,
          max: 20,
          message: "The length is 6 to 20 characters",
          trigger: "blur",
        },
      ],
    },
    isOpen: true,
  }),
  methods: {
    foucsPasswd() {
      this.isOpen = false;
    },
    blurPasswd() {
      this.isOpen = true;
    },
    resetForm() {
      //reset login form
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        //verifi failed
        if (!valid) return;
        const { username, password } = this.loginForm;
        const res = await request({
          method: "post",
          url: "/login",
          data: {
            username,
            password,
          },
        });
        if (res.meta.status !== 200) {
          this.$message.warning(
            "Login failed, please check your account or password"
          );
          return;
        }
        //save token
        this.saveToken(res.data.token);
        this.$router.push('/home')
      });
    },
    saveToken(token) {
      const { rememberme } = this.loginForm;
      if (rememberme) {
        tokenTools.local.save(token);
      } else {
        tokenTools.session.save(token);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "../../../assets/style/variable.less";
.login-container {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::before {
    height: 100vh;
    width: 100vw;
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    animation: loopScroll 3s ease-in-out infinite;
    transform-origin: center;
  }
}
@keyframes loopScroll {
  0%,
  100% {
    transform: scale(2) translate(0px, 0px);
  }
  50% {
    transform: scale(2) translate(-10px, -8px);
  }
}

.login {
  height: 380px;
  width: 550px;
  background: #fff;
  .rounded-sm();
  position: relative;
  overflow: hidden;
  border: 5px solid #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  padding: 10px 80px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  backdrop-filter: blur(10px);
  h2 {
    margin: 0;
    padding: 0;
    color: @mainColor;
    font-size: 1.8em;
  }
  &:after {
    content: "";
    background-size: cover;
    width: calc(232px * 0.4);
    height: calc(210px * 0.4);
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.open-22 {
  &::after {
    background-image: url(~@/assets/images/22_open.png);
  }
}
.close-22 {
  &::after {
    background-image: url(~@/assets/images/22_close.png);
  }
}
.form {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  .el-form-item {
    margin-bottom: 0;
  }
}
.buttons {
  ::v-deep .el-form-item__content {
    display: flex;
  }
  button {
    width: 100%;
  }
}
.login-options {
  ::v-deep .el-form-item__content {
    display: flex;
  }
}
</style>
