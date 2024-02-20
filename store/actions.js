let actions = {
    setTitle ({ commit }, title){
        commit('SET_TITLE', title)
    },
    setPageParam ({ commit }, param){
        commit('SET_PAGE_PARAM', param)
    },
    setToken({ commit }, token){
        commit('SET_TOKEN', token)
    },
    setCurrency({commit}, currency){
      commit('SET_CURRENCY', currency)
    },
    setPowerBonusDate({commit}, date){
      commit('SET_POWER_BONUS_DATE', date)
    },
    setPaymentDay({commit}, day){
      commit('SET_PAYMENT_DAY', day)
    }

}
export default actions
