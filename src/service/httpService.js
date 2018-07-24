import axios from 'axios'
import config from '../config/config.json'


class HttpService {

  // 获取验证码
  getCode(type, phone) {
    return axios({
      url: `${config.service.host}/verifycode/send/${type}?phone=${phone}`,
      method: 'get'
    })
  }

  // 用户登录
  userLogin(params) {
    return axios({
      url: `${config.service.host}/user/login`,
      method: 'post',
      data: params
    })
  }

  // 用户注册
  userReg(params) {
    return axios({
      url: `${config.service.host}/user/register`,
      method: 'post',
      data: params
    })
  }


  // 图片上传
  fileUpload(formdata) {
    console.log(formdata)
    return axios({
      url: `${config.service.host}/file/upload`,
      method: 'post',
      data: formdata
    })
  }

}


const httpS = new HttpService()

export default httpS
