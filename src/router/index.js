import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Reg from '@/components/Reg'
import UserInfo from '@/components/UserInfo'
import AuditQuery from '@/components/AuditQuery'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/reg',
    name: 'Reg',
    component: Reg
  }, {
    path: '/user-info',
    name: 'UserInfo',
    component: UserInfo
  }, {
    path: '/audit-query',
    name: 'AuditQuery',
    component: AuditQuery
  }]
})
