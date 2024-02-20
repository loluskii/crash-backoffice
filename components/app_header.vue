<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/" class="logo">
        <!-- Add the class icon to your logo image or logo icon to add the margining -->
        <img src="~/assets/img/logo.png" alt="logo" />
      </router-link>
      <div class="navbar-collapse">
        <!-- Sidebar toggle button -->
        <div>
          <a
            href="javascript:void(0)"
            class="d-none d-lg-block d-md-block navbar-btn sidebar-toggle"
            @click="toggle_left"
            role="button"
          >
            <i class="fa fa-fw fa-bars"></i>
          </a>

          <a
            v-b-toggle.sidebar-1
            aria-controls="mobileSideNav"
            href="javascript:void(0)"
            class="d-lg-none d-md-none d-sm-inline navbar-btn sidebar-toggle"
            role="button"
          >
            <i class="fa fa-fw fa-bars"></i>
          </a>
        </div>
      </div>
      <ul class="navbar-nav mr-auto">
        <!-- <div class="message_dropdown">
          <div class="btn-group b-dropdown dropdown">
            <button aria-haspopup="true" aria-expanded="false" type="button" class="btn btn-link btn-lg">
              <i class="ti-email"></i> <span class="badge badge-success badge-pill">2</span>
            </button>
            <div role="menu" class="dropdown-menu" style="">
              <a role="menuitem" href="#" target="_self" class="dropdown-item">
                <a role="menuitem" href="#" target="_self" class="dropdown-item messages-header">
                  New Messages
                </a>
              </a>
              <a role="menuitem" href="#" target="_self" class="dropdown-item message striped-col">
                <img src="/images/avatar7.jpg?ccdd6115cac1528731d3400efd86d19d" alt="avatar-image" class="message-image rounded-circle">
                <div class="message-body"><strong>Ernest Kerry</strong>
                  <br> Can we Meet?
                  <br> <small>Just Now</small> <span class="label label-success label-mini msg-lable">New</span>
                </div>
              </a>
              <a role="menuitem" href="#" target="_self" class="dropdown-item message striped-col">
                <img src="/images/avatar7.jpg?ccdd6115cac1528731d3400efd86d19d" alt="avatar-image" class="message-image rounded-circle">
                <div class="message-body">
                  <strong>Ernest Kerry</strong>
                  <br> Can we Meet?
                  <br> <small>Just Now</small>
                  <span class="label label-success label-mini msg-lable">New</span>
                </div>
              </a>
              <a role="menuitem" href="#" target="_self" class="dropdown-item messages-footer">
                <a href="#">View All messages</a>
              </a>
            </div>
          </div>
        </div> -->
        <div
          class="right-separator text-white"
          style="padding: 10px"
          v-if="user"
        >
          <span style="font-weight: bold"
            >Welcome,
            {{ user.first_name }}</span
          >
        </div>
        <div class="right-separator text-white" style="padding-right: 10px">
          {{ todays_date }}<br />
          <div @click="playSound" id="timer">00:00</div>
        </div>
        <!-- <div class="right-separator text-white">
          <b-dropdown lazy id="dropdown-right" right  variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <small class="font-weight-bold">Wallet</small>
            </template>
            <b-dropdown-item link-class="d-flex justify-content-between align-items-center" href="#">
              KSH <button class="btn btn-sm btn-link text-dark"><i class="fa fa-refresh"></i></button>
            </b-dropdown-item>
          </b-dropdown>
        </div> -->
        <div class="btn-group" @click="logout" style="padding: 5px">
          <a href="javascript:;" class="text-white">
            <i class="fa fa-power-off fa-2x"></i>
          </a>
        </div>
      </ul>
    </nav>
    <mobile-menu></mobile-menu>
  </header>
</template>
<script>
import mobileMenu from "./mobile-menu.vue";
// import sound from '@/static/notification.mp3'

export default {
  components: { mobileMenu },
  name: "clear_header",
  data() {
    return {
      todays_date: this.$moment().format("DD/MM/YYYY"),
      audio: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    //Enable sidebar toggle
    toggle_left() {
      this.$store.commit("left_menu", "toggle");
    },
    toggle_right() {
      this.$store.commit("rightside_bar", "toggle");
    },
    async logout() {
      const token = localStorage.getItem('token');
			if (token) {
				localStorage.removeItem('token');
			}

      await this.$auth.logout();
    },
    startTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      m = this.checkTime(m);
      s = this.checkTime(s);
      document.getElementById("timer").innerHTML = h + ":" + m + ":" + s;
      let t = setTimeout(this.startTime, 1000);
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    playSound() {
      const audio_file = require('@/assets/notification.mp3').default

      const audio = new Audio(audio_file);
      audio.play();

    }
  },
  mounted() {
    this.startTime();
    this.$echo.channel('withdrawal-requests')
      .listen('WithdrawalEvent', (e) => {
        this.$swal('Alert!', 'New withdrawal request', 'info');
        document.getElementById("timer").click()
      });
  },
};
</script>
<style>
.right-separator {
  box-shadow: 1px 0 0 #40404a;
  border-right: 1px solid #636380;
  margin-right: 5px;
  padding: 0 5px;
}

@media (max-width: 600px) {
  .left-aside.sidebar-offcanvas {
    display: none;
  }
}
</style>
