<template>
  <div class="container-fluid login">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-10 col-sm-8 mx-auto login-form">
          <h2 class="text-center logo_h2">
            <img src="~/assets/img/pages/clear_black.png" alt="Logo" />
          </h2>

          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <vue-form :state="formstate" @submit.prevent="login">
                  <div class="row">
                    <span class="text-danger text-center" v-if="error">{{
                      error
                    }}</span>

                    <div class="col-sm-12 mt-3">
                      <div class="form-group">
                        <validate tag="div">
                          <input
                            v-model="model.username"
                            name="username"
                            id="username"
                            type="username"
                            required
                            autofocus
                            placeholder="E-mail"
                            class="form-control"
                          />
                          <field-messages
                            name="username"
                            show="$invalid && $submitted"
                            class="text-danger"
                          >
                            <div slot="required">Email is a required field</div>
                            <div slot="email">Email is not valid</div>
                          </field-messages>
                        </validate>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <validate tag="div">
                          <input
                            v-model="model.password"
                            name="password"
                            id="password"
                            type="password"
                            required
                            placeholder="Password"
                            class="form-control"
                          />
                          <field-messages
                            name="password"
                            show="$invalid && $submitted"
                            class="text-danger"
                          >
                            <div slot="required">Password is required</div>
                            <div slot="minlength">
                              Password should be atleast 6 characters long
                            </div>
                            <div slot="maxlength">
                              Password should be atmost 10 characters long
                            </div>
                          </field-messages>
                        </validate>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group checkbox">
                        <label for="remember">
                          <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                          />&nbsp; Remember Me
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      id="loginBtn"
                      class="btn btn-primary btn-block mb-3"
                    >
                      Sign In
                    </button>
                  </div>
                </vue-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LocalStorageService from "../services/localStorageService.js";
export default {
  name: "login",
  auth: false,
  data() {
    return {
      formstate: {},
      model: {
        username: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        $("#loginBtn").text("Validating...Please wait!").attr("disabled", true);
        await this.$auth
          .loginWith("local", {
            data: {
              username: this.model.username,
              password: this.model.password,
            },
          })
          .then(async (res) => {
            console.log(res);
            if (res.data.success) {
              await this.$auth.setUser(res.data.data)
              this.$auth.$storage.setUniversal('user', res.data.data, true)
              await this.$auth.setUserToken(res.data.data.access_token, res.data.data.refresh_token);
              $("#loginBtn").text("Success!!");
              LocalStorageService.setToken(this.$auth.getToken("local"));
              this.$router.push("/dashboard");
            }else{
              throw Error;
            }
          });
      } catch (e) {
        $("#loginBtn").text("Sign In").attr("disabled", false);
        console.log(e);
        // if(e.response.status === 401)
        //     this.error = e.response.data.message
      }
    },
  },
  mounted: function () {
    if (this.$auth.loggedIn) {
      this.$router.push(
        decodeURIComponent(this.$route.query.redirect || "/dashboard")
      );
    }
  },
  destroyed: function () {},
};
</script>
<style src="~/assets/css/login.css" scoped></style>
<style type="text/css" scoped>
.login {
  padding-top: 6.5%;
  padding-bottom: 2%;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: radial-gradient(ellipse at center, #5a93af 0%, #004e74 100%);
  overflow-y: auto;
}
</style>
