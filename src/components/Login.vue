<template>
  <div class="login">
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="verifyCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary" @click="getVerifyCode()">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="row">
      <van-button type="primary" size="small" @click="userLogin()">登录</van-button>
      <van-button type="primary" size="small" @click="userReg()">注册</van-button>
    </div>
  </div>
</template>
<script>
import httpS from '../service/httpService.js'
import { Toast } from 'vant'
import { setSessionStorage } from '../utils/base.js'
export default {
  name: 'login',
  data() {
    return {
      phone: '',
      type: 'login',
      verifyCode: '',
      verifyToken: '',
      timer: null
    }
  },
  mounted() {
    //   初始化头部信息
    this.$store.dispatch('updateTopInfo', {
      title: '登录',
      backBtnStatus: true,
      infoBtnStatus: false
    })
  },
  methods: {
    // 发送验证码
    getVerifyCode() {
      if (this.phone === '') {
        Toast('手机号不能为空')
      } else {
        httpS.getCode(this.type, this.phone).then(res => {
          let result = res.data
          if (result.status === '0x0000') {
            this.verifyToken = result.data.token
            this.verifyCode = result.data.code
          } else {
            Toast(result.message)
          }
        })
      }
    },
    // 用户登录
    userLogin() {
      if (this.phone && this.verifyCode) {
        httpS
          .userLogin({
            username: this.phone,
            password: this.verifyCode,
            verifyCodeToken: this.verifyToken
          })
          .then(res => {
            let result = res.data
            if (result.status === '0x0000') {
              setSessionStorage('authKey', result.data.authKey)
              this.$router.push('/home')
            } else {
              Toast(result.message)
            }
          })
      } else {
        Toast('手机号验证码不可为空')
      }
    },
    // 用户注册
    userReg() {
      this.$router.push('/reg')
    }
  }
}
</script>
<style>
.row {
  margin-top: 20px;
  background: #ffffff;
}
.login {
  padding-top: 20px;
}

.login .van-cell-group {
  box-shadow: 0px 1px 3px 0px rgba(140, 140, 140, 0.5);
}
</style>

