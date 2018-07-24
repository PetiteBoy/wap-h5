<template>
  <div class="home">
    <div class="notice">
      <div class="title">公告</div>
    </div>
    <div class="list">
      <div class="item">满分教育</div>
      <div class="item">审验教育</div>
      <div class="item">敬请期待</div>
      <div class="item">敬请期待</div>
    </div>
    <div class="list">
      <div class="item" @click="goUserInfo()">个人信息</div>
      <div class="item" @click="goBookList()">预约单</div>
      <div class="item" @click="goAuditQuery()">审核状态</div>
      <div class="item">敬请期待</div>
    </div>
  </div>
</template>
<script>
import httpS from '../service/httpService.js'
import { getSessionStorage } from '../utils/base.js'
export default {
  name: '',
  data() {
    return {}
  },
  mounted() {
    // 初始化头部信息
    this.$store.dispatch('updateTopInfo', {
      title: '教育管理平台',
      backBtnStatus: false,
      infoBtnStatus: true
    })
  },
  methods: {
    // 个人信息
    goUserInfo() {
      this.$router.push('/user-info')
      // if (getSessionStorage('authKey')) {
      //   this.$router.push('/user-info')
      // } else {
      //   this.$router.push('/login')
      // }
    },
    // 查看审验状态
    goAuditQuery() {
      this.$router.push('/audit-query')
    },
    goBookList() {
      this.$router.push('/book-list')
    }
  }
}
</script>
<style>
.notice {
  margin: 0 10px;
  margin-top: 10px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(140, 140, 140, 0.5);
  padding: 10px;
  box-sizing: border-box;
}
.notice .title {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.list {
  height: 80px;
  display: flex;
  margin: 0 10px;
  margin-top: 10px;
}
.item {
  flex: 1;
  position: relative;
  background: #ffffff;
  box-shadow: 0px 1px 3px 0px rgba(140, 140, 140, 0.5);
  border-radius: 4px;
  cursor: pointer;
  line-height: 80px;
  font-size: 12px;
}

.item:nth-child(2n) {
  margin: 0 10px;
}
</style>

