<template>
  <div class="reg">
    <div class="id">
      <van-button size="large" @click="idTpyeStatus = true">{{idBtnVal}}</van-button>
      <van-popup v-model="idTpyeStatus" position="bottom" :overlay="true">
        <van-picker show-toolbar title="请选择" :columns="idList" @cancel="onCancel" @confirm="onIdConfirm" />
      </van-popup>
      <van-cell-group>
        <van-field v-model="regData.idNo" :disabled="!regData.idType" label="证件号" placeholder="请输入证件号" />
      </van-cell-group>
    </div>
    <div class="license">
      <van-button size="large" @click="licenseTpyeStatus = true">{{licenseBtnVal}}</van-button>
      <van-popup v-model="licenseTpyeStatus" position="bottom" :overlay="true">
        <van-picker show-toolbar title="请选择" :columns="licenseList" @cancel="onCancel" @confirm="onLicenseConfirm" />
      </van-popup>
      <van-cell-group>
        <van-field v-model="regData.licenseNo" :disabled="!regData.licenseType" label="证档案编号" placeholder="请输入驾驶证档案编号" />
      </van-cell-group>
    </div>
    <div class="begin">
      <van-cell-group>
        <van-button size="large" @click="licenseBeginDateStatus = true">{{beginBtnVal}}</van-button>
      </van-cell-group>
      <van-popup v-model="licenseBeginDateStatus" position="bottom" :overlay="true">
        <van-datetime-picker v-model="currentDate" type="date" @cancel="onCancel" @confirm="onBeginConfirm" />
      </van-popup>
    </div>
    <div class="end">
      <van-cell-group>
        <van-button size="large" @click="licenseEndDateStatus = true">{{endBtnVal}}</van-button>
      </van-cell-group>
      <van-popup v-model="licenseEndDateStatus" position="bottom" :overlay="true">
        <van-datetime-picker v-model="currentDate" type="date" @cancel="onCancel" @confirm="onEndConfirm" />
      </van-popup>
    </div>
    <div class="row">
      <van-uploader :after-read="onReadIdCard" multiple>
        上传驾驶人证件图片
      </van-uploader>
      <img v-if="idCardImgUrl" :src="idCardImgUrl" alt="">
    </div>
    <div class="row">
      <van-uploader :after-read="onReadHeadUrl" accept="image/gif, image/jpeg" multiple>
        上传驾驶人本人头像
      </van-uploader>
      <img v-if="headUrl" :src="headUrl" alt="">
    </div>
    <div class="login">
      <van-cell-group>
        <van-field v-model="regData.phone" label="手机号" placeholder="请输入手机号" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="regData.verifyCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="primary" @click="getVerifyCode()">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="row">
        <van-button type="primary" size="small" @click="userReg()">注册</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { Toast } from 'vant'
import httpS from '../service/httpService.js'
export default {
  name: 'reg',
  data() {
    return {
      // 证件类型弹窗
      idTpyeStatus: false,
      //   证件类型
      idBtnVal: '请选择证件类型',
      //   驾驶证类型弹窗
      licenseTpyeStatus: false,
      //   驾驶证类型
      licenseBtnVal: '请选择准驾车型',
      //   开始时间弹窗
      licenseBeginDateStatus: false,
      //   开始时间
      beginBtnVal: '驾驶证开始时间',
      //   结束时间弹窗
      licenseEndDateStatus: false,
      //   结束时间
      endBtnVal: '驾驶证结束时间',
      currentDate: new Date(),
      headUrl: '',
      idCardImgUrl: '',
      regData: {
        phone: '',
        verifyCode: '',
        verifyCodeToken: '',
        //   证件类别
        idType: '',
        //   证件编号
        idNo: '',
        //   驾驶证类型
        licenseType: '',
        //   驾驶证编号
        licenseNo: '',
        //   驾驶证有效期开始时间
        licenseBeginDate: 0,
        //   驾驶证有效期结束时间
        licenseEndDate: 0,
        // 证件图片token
        idCardImgUrlToken: '',
        // 驾驶人本人头像token
        headUrlToken: ''
      },
      type: 'register'
    }
  },
  computed: {
    idList() {
      return this.$store.state.data.idList
    },
    idTypeList() {
      return this.$store.state.data.idTypeList
    },
    licenseList() {
      return this.$store.state.data.licenseList
    }
  },
  mounted() {
    //   初始化头部信息
    this.$store.dispatch('updateTopInfo', {
      title: '注册',
      backBtnStatus: true,
      infoBtnStatus: true
    })
  },
  methods: {
    onCancel() {
      this.idTpyeStatus = false
      this.licenseTpyeStatus = false
      this.licenseBeginDateStatus = false
      this.licenseEndDateStatus = false
    },
    // 选择id确认
    onIdConfirm(val) {
      this.idBtnVal = val
      this.regData.idType = this.idTypeList[val]
      this.idTpyeStatus = false
    },
    // 选择驾驶证确认
    onLicenseConfirm(val) {
      this.licenseBtnVal = val
      this.regData.licenseType = val
      this.licenseTpyeStatus = false
    },
    // 开始时间确认
    onBeginConfirm(val) {
      let date = Date.parse(new Date(val))
      this.beginBtnVal = moment(date).format('YYYY-MM-DD')
      this.regData.licenseBeginDate = date
      this.licenseBeginDateStatus = false
    },
    // 结束时间确认
    onEndConfirm(val) {
      let date = Date.parse(new Date(val))
      this.endBtnVal = moment(date).format('YYYY-MM-DD')
      this.regData.licenseEndDate = date
      this.licenseEndDateStatus = false
    },
    // 选择证件照
    onReadIdCard(file) {
      let imgdata = new FormData()
      imgdata.append('file', file.file)
      httpS.fileUpload(imgdata).then(res => {
        this.regData.idCardImgUrlToken = res.data.data.token
        this.idCardImgUrl = res.data.data.url
      })
    },
    // 选择头像照
    onReadHeadUrl(file) {
      let imgdata = new FormData()
      imgdata.append('file', file.file)
      httpS.fileUpload(imgdata).then(res => {
        this.regData.headUrlToken = res.data.data.token
        this.headUrl = res.data.data.url
      })
    },
    // 发送验证码
    getVerifyCode() {
      if (this.regData.phone === '') {
        Toast('手机号不能为空')
      } else {
        httpS.getCode(this.type, this.regData.phone).then(res => {
          let result = res.data
          if (result.status === '0x0000') {
            this.regData.verifyCodeToken = result.data.token
            this.regData.verifyCode = result.data.code
          } else {
            Toast(result.message)
          }
        })
      }
    },
    // 用户注册
    userReg() {
      if (!this.regData.idType) {
        Toast('证件类别不能为空')
        return
      }
      if (!this.regData.idNo) {
        Toast('证件编号不能为空')
        return
      }
      if (!this.regData.licenseType) {
        Toast('驾驶证类型不能为空')
        return
      }
      if (!this.regData.licenseNo) {
        Toast('驾驶证编号不能为空')
        return
      }
      if (!this.regData.phone) {
        Toast('手机号不能为空')
        return
      }
      if (!this.regData.verifyCode) {
        Toast('手机验证码不能为空')
        return
      }
      httpS.userReg(this.regData).then(res => {
        let result = res.data
        if (result.status === '0x0000') {
          Toast('注册成功')
          this.$router.push('/home')
        } else {
          Toast(result.message)
        }
      })
    }
  }
}
</script>
<style>
.reg .van-button--large {
  border: none;
  border-radius: 0;
  font-size: 12px;
}
.row {
  margin-top: 20px;
  min-height: 40px;
  line-height: 40px;
  background: #ffffff;
  margin-bottom: 10px;
}
.row img {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
  margin-top: 5px;
}
</style>

