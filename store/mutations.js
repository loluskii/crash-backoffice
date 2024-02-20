let mutations = {
    left_menu(state, option) {
        if (option == "open") {
            state.left_open = true
        } else if (option == "close") {
            state.left_open = false
        } else if (option == "toggle") {
            state.left_open = !state.left_open
        }
        if (state.left_open) {
            document.getElementsByTagName("body")[0].classList.remove("left-hidden")
        } else {
            document.getElementsByTagName("body")[0].classList.add("left-hidden")
        }
    },
    rightside_bar(state, option) {
        if (option == "open") {
            state.right_open = true
        } else if (option == "close") {
            state.right_open = false
        } else if (option == "toggle") {
            state.right_open = !state.right_open
        }
        if (state.right_open) {
            document.getElementsByTagName("body")[0].classList.add("sidebar-right-opened")
        } else {
            document.getElementsByTagName("body")[0].classList.remove("sidebar-right-opened")
        }
    },
    routeChange(state, loader) {
        if (loader == "start") {
            state.preloader = true
        } else if (loader == "end") {
            state.preloader = false
        }
    },
    SET_TITLE(state, title){
        state.title = title
    },
    SET_PAGE_PARAM(state, param){
        state.pageParam = param
    },
    SET_TOKEN(state, token){
        state.token = token;
    },
    SET_CURRENCY(state, currency) {
        state.currencySymbol = currency;
    },
    SET_POWER_BONUS_DATE(state, date) {
      state.powerBonusDate = date;
    },
    SET_PAYMENT_DAY(state, day){
      state.paymentDay = day;
    }
}
export default mutations
