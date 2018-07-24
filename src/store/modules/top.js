const state = {
  topTitle: '',
  backBtnStatus: false,
  infoBtnStatus: false
}

const mutations = {
  UPDATE_TOP_INFO(state, params) {
    state.topTitle = params.title
    state.backBtnStatus = params.backBtnStatus
    state.infoBtnStatus = params.infoBtnStatus
  }

}
const actions = {
  updateTopInfo({
    commit
  }, params) {
    commit('UPDATE_TOP_INFO', params)
  }
}
export default {
  state,
  mutations,
  actions
}
