<template>
    <div class="book-list">
        <div class="list-title">
            <div class="list-row-title">预约单号</div>
            <div class="list-row-title">预约类型</div>
            <div class="list-row-title">场次</div>
        </div>
        <van-list v-model="loading" :finished="finished" @load="onLoad">
            <van-cell v-for="item in list" :key="item" @click="goBookDetail(item)">
                <div class="book-item">151850106</div>
                <div class="book-item">满分教育</div>
                <div class="book-item">
                    2018-06-10 上午场（8:00-12:00）</div>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
export default {
  name: 'book-list',
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  mounted() {
    // 初始化头部信息
    this.$store.dispatch('updateTopInfo', {
      title: '你的预约记录',
      backBtnStatus: true,
      infoBtnStatus: true
    })
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    goBookDetail() {
      this.$router.push('/book-detail')
    }
  }
}
</script>
<style>
.book-list {
  position: relative;
  padding-top: 25px;
}
.list-title {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
  font-size: 12px;
  padding: 10px 15px;
  box-sizing: border-box;
}
.list-row-title {
  flex: 1;
  text-align: center;
  line-height: 20px;
  height: 20px;
}
.book-list .van-cell {
  display: flex;
  flex-direction: row;
}
.van-cell__value {
  display: flex;
  flex: 1;
}
.book-list .van-cell .book-item {
  flex: 1;
  font-size: 12px;
  text-align: center;
  color: #455a64;
}
</style>
