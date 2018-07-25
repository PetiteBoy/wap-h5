<template>
  <div class="audit">
    <van-cell-group>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="verifyCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <van-button slot="button" size="small" type="primary" @click="getVerifyCode()">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="row">
      <van-button type="primary" size="small" @click="auditQuery()">查询</van-button>
    </div>
  </div>
</template>
<script>
import httpS from '../service/httpService.js'
import { Toast } from 'vant'
export default {
  name: 'audit-query',
  data() {
    return {
      phone: '',
      type: 'auditstate',
      verifyCode: '',
      verifyToken: '',
      timer: null
    }
  },
  mounted() {
    //   初始化头部信息
    this.$store.dispatch('updateTopInfo', {
      title: '审验状态',
      backBtnStatus: true,
      infoBtnStatus: true
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
    }
  }
}
</script>

<style>
.audit {
  padding-top: 20px;
}
.row {
  margin-top: 20px;
  background: #ffffff;
}
</style>

