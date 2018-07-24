<template>
    <div class="book-detail"></div>
</template>
<script>
export default {
  name: 'book-detail',
  data() {
    return {}
  },
  mounted() {
    // 初始化头部信息
    this.$store.dispatch('updateTopInfo', {
      title: '你的预约记录',
      backBtnStatus: true,
      infoBtnStatus: true
    })
  }
}
</script>
