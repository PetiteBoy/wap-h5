<template>
  <van-nav-bar :title=topTitle :fixed="fixed">
    <van-icon v-if="infoBtnStatus" name="contact" slot="right" @click="userInfo()" />>
    <van-icon v-if="backBtnStatus" name="arrow-left" slot="left" @click="backBtn()" />
  </van-nav-bar>
</template>

<script>
import { Toast } from 'vant'
import $store from '../store'
export default {
  name: 'top',
  data() {
    return {
      fixed: true
    }
  },
  $store,
  computed: {
    topTitle() {
      return this.$store.state.top.topTitle
    },
    backBtnStatus() {
      return this.$store.state.top.backBtnStatus
    },
    infoBtnStatus() {
      return this.$store.state.top.infoBtnStatus
    }
  },
  methods: {
    backBtn() {
      history.back()
    },
    userInfo() {
      this.$router.push('/login')
    }
  }
}
</script>
