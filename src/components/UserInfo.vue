<template>
    <div class="user-info">
        <van-cell-group>
            <van-cell title="手机号" value="内容" />
        </van-cell-group>
        <div class="null"></div>
        <van-cell-group>
            <van-cell title="准假车型" value="内容" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="驾驶证编号" value="内容" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="驾驶证有效期" value="内容" />
        </van-cell-group>
        <div class="null"></div>
        <van-cell-group>
            <van-cell title="证件类型" value="内容" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="证件号码" value="内容" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="注册时间" value="内容" />
        </van-cell-group>
        <div class="null"></div>
        <van-cell-group>
            <van-cell title="审核状态" value="内容" />
        </van-cell-group>
        <van-cell-group>
            <van-cell title="审核时间" value="内容" />
        </van-cell-group>

        <van-button type="danger" size="small" @click="userLogout()"> 退出登录</van-button>
    </div>
</template>
<script>
import { removeSessionStorage } from '../utils/base.js'
export default {
  name: 'user-info',
  data() {
    return {}
  },
  mounted() {
    // 初始化头部信息
    this.$store.dispatch('updateTopInfo', {
      title: '个人信息',
      backBtnStatus: true,
      infoBtnStatus: false
    })
  },
  methods: {
    userLogout() {
      removeSessionStorage('authKey')
      this.$router.push('/home')
    }
  }
}
</script>
<style>
.user-info {
  padding-top: 20px;
}
.user-info .van-cell-group {
  box-shadow: 0px 1px 3px 0px rgba(140, 140, 140, 0.5);
}
.user-info .van-cell__title {
  text-align: left;
}
.null {
  height: 20px;
  width: 100%;
}
</style>

