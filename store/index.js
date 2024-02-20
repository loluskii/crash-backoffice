export const state = () => ({
  title: "Dashboard",
  user: null,
  left_open: true,
  right_open: false,
  preloader: true,
  currencySymbol: "",
  powerBonusDate: null,
  flatpickrConfig: {
    wrap: true,
    enableTime: true,
    time_24hr: true,
    dateFormat: "d-m-Y H:i:S",
    // clickOpens: false
  },
  countries: [],
  months: [
    { number: "01", name: "January" },
    { number: "02", name: "February" },
    { number: "03", name: "March" },
    { number: "04", name: "April" },
    { number: "05", name: "May" },
    { number: "06", name: "June" },
    { number: "07", name: "July" },
    { number: "08", name: "August" },
    { number: "09", name: "September" },
    { number: "10", name: "October" },
    { number: "11", name: "November" },
    { number: "12", name: "December" },
  ],
  years: [
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
  ],
  pageParma: "",
});

export const mutations = {
  left_menu(state, option) {
    if (option == "open") {
      state.left_open = true;
    } else if (option == "close") {
      state.left_open = false;
    } else if (option == "toggle") {
      state.left_open = !state.left_open;
    }
    if (state.left_open) {
      document.getElementsByTagName("body")[0].classList.remove("left-hidden");
    } else {
      document.getElementsByTagName("body")[0].classList.add("left-hidden");
    }
  },
  rightside_bar(state, option) {
    if (option == "open") {
      state.right_open = true;
    } else if (option == "close") {
      state.right_open = false;
    } else if (option == "toggle") {
      state.right_open = !state.right_open;
    }
    if (state.right_open) {
      document
        .getElementsByTagName("body")[0]
        .classList.add("sidebar-right-opened");
    } else {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("sidebar-right-opened");
    }
  },
  routeChange(state, loader) {
    if (loader == "start") {
      state.preloader = true;
    } else if (loader == "end") {
      state.preloader = false;
    }
  },
  SET_TITLE(state, title) {
    state.title = title;
  },
  SET_PAGE_PARAM(state, param) {
    state.pageParam = param;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_CURRENCY(state, currency) {
    state.currencySymbol = currency;
  },
  SET_POWER_BONUS_DATE(state, date) {
    state.powerBonusDate = date;
  },
  RESET_STATE(state) {
    (state.title = "Dashboard"), (state.user = null);
    state.left_open = true;
    state.right_open = false;
    state.preloader = true;
    state.currencySymbol = "";
    state.powerBonusDate = null;
    state.pageParma = "";
  },
};

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.user;
  },
};

export const actions = {
  setTitle({ commit }, title) {
    commit("SET_TITLE", title);
  },
  reset({ commit }) {
    commit("RESET_STATE");
  },
  setPageParam({ commit }, param) {
    commit("SET_PAGE_PARAM", param);
  },
  setToken({ commit }, token) {
    commit("SET_TOKEN", token);
  },
  setCurrency({ commit }, currency) {
    commit("SET_CURRENCY", currency);
  },
  setPowerBonusDate({ commit }, date) {
    commit("SET_POWER_BONUS_DATE", date);
  },
  setUser({ commit }, data) {
    commit("setUser", data);
  },

};

export const strict = false;
