<template>
  <div class="card">
    <div class="card-header bg-primary text-white">
      <h3 class="card-title">
        <i class="fa fa-fw ti-pencil"></i> User Details
      </h3>
    </div>
    <div class="card-body">
      <form @submit.prevent="saveAgent">
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group row">
              <div class="col-sm-4 txt_media">
                <label class="form-control-label" for="first_name">
                  First Name
                </label>
              </div>
              <div class="col-sm-8">
                <input
                  name="first_name"
                  v-validate="'required'"
                  class="form-control"
                  :class="{
                    input: true,
                    'is-danger': errors.has('first_name'),
                  }"
                  type="text"
                  placeholder=""
                  v-model="formData.first_name"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-4 txt_media">
                <label class="form-control-label" for="first_name">
                  Last Name
                </label>
              </div>
              <div class="col-sm-8">
                <input
                  name="first_name"
                  v-validate="'required'"
                  class="form-control"
                  :class="{
                    input: true,
                    'is-danger': errors.has('first_name'),
                  }"
                  type="text"
                  placeholder=""
                  v-model="formData.last_name"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-4">
                <label class="form-control-label" for="password">
                  Password
                </label>
              </div>
              <div class="col-sm-8">
                <input
                  name="password"
                  v-validate="'required'"
                  class="form-control"
                  :class="{ input: true, 'is-danger': errors.has('password') }"
                  type="password"
                  placeholder=""
                  v-model="formData.password"
                  ref="password"
                />
                <i
                  v-show="errors.has('password')"
                  class="fa fa-warning text-danger"
                ></i>
                <span
                  v-show="errors.has('password')"
                  class="help is-danger text-danger"
                  >{{ errors.first("password") }}</span
                >
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-4 txt_media">
                <label class="form-control-label" for="email"> Email </label>
              </div>
              <div class="col-sm-8">
                <input
                  name="email"
                  v-validate="'required|email'"
                  class="form-control"
                  :class="{ input: true, 'is-danger': errors.has('email') }"
                  type="email"
                  placeholder=""
                  v-model="formData.email"
                  ref="email"
                />
                <i
                  v-show="errors.has('email')"
                  class="fa fa-warning text-danger"
                ></i>
                <span
                  v-show="errors.has('email')"
                  class="help is-danger text-danger"
                  >{{ errors.first("email") }}</span
                >
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-6 ml-auto">
                <nuxt-link
                  to="/Settings/UserManagement"
                  class="btn btn-default btn-block"
                  >Cancel</nuxt-link
                >
              </div>
              <div class="col-sm-6">
                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                  id="saveBtn"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group row">
              <div class="col-sm-4 txt_media">
                <label class="form-control-label" for="username">
                  Username
                </label>
              </div>
              <div class="col-sm-8">
                <input
                  name="username"
                  v-validate="'required'"
                  class="form-control"
                  :class="{ input: true, 'is-danger': errors.has('username') }"
                  type="text"
                  placeholder=""
                  v-model="formData.username"
                />
                <i
                  v-show="errors.has('username')"
                  class="fa fa-warning text-danger"
                ></i>
                <span
                  v-show="errors.has('username')"
                  class="help is-danger text-danger"
                  >{{ errors.first("username") }}</span
                >
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-4 txt_media">
                <label class="form-control-label" for="user_type">
                  User Level
                </label>
              </div>
              <div class="col-sm-8">
                <select
                  name="user_type"
                  id="user_type"
                  v-model="formData.user_type"
                  class="form-control"
                >
                  <option value="Agent">Agent</option>
                  <option value="Cashier">Cashier</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-4 txt_media">
                <label class="form-control-label" for="country">
                  Country
                </label>
              </div>
              <div class="col-sm-8">
                <select
                  name="country"
                  id="country"
                  v-model="formData.country_id"
                  class="form-control"
                >
                  <option
                    :value="country.id"
                    v-for="(country, index) in countries"
                    :key="index"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-4 txt_media">
                <label class="form-control-label" for="currency">
                  Currency
                </label>
              </div>
              <div class="col-sm-8">
                <select
                  name="country"
                  id="country"
                  v-model="formData.currency"
                  class="form-control"
                >
                  <option
                    :value="cur.country.currencyCode"
                    v-for="(cur, index) in currencies"
                    :key="index"
                  >
                    {{ cur.country.currencyCode }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Autocomplete from "vuejs-auto-complete";
import { getCountries, createAgent, getRates } from "../../plugins/queries";
export default {
  name: "add-shop",
  layout: "main",
  data() {
    return {
      title: "Add New User",
      formData: {
        country_id: "160",
        currency: "NGN",
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        user_type: "",
      },
      roles: [],
      agents: [],
      countries: [],
      currencies: [],
    };
  },
  methods: {
    getUrl(input) {
      return process.env.prodURL + "/api/users/find?q=" + input;
    },
    addUser(user) {
      this.formData.parent_agent = user.value;
    },
    async saveAgent() {
      $("#saveBtn").attr("disabled", true).text("Submit...");
      await createAgent(this.formData)
        .then((res) => {
          $("#saveBtn").attr("disabled", false).text("Save");
          if (res.success) {
            this.$toast.success(res.data.message, { icon: "check" });
            this.formData = {
              country: "160",
              currency: "NGN",
              first_name: "",
              last_name: "",
              username: "",
              password: "",
              email: "",
              user_type: "",
            };
            this.$router.push("/Network/AgencyList");
          } else {
            this.$toast.error(
              "Something went wrong. Unable to create new shop!",
              { icon: "times" }
            );
          }
        })
        .catch((err) => {
          $("#saveBtn").attr("disabled", false).text("Save");
          this.$toast.error(err, { icon: "times" });
        });
    },
    setStates() {
      // find country
      const country = this.countries.find(
        (country) => country.id === this.formData.country_id
      );
      // console.log(country);
      if (country) {
        this.formData.currency = country.currencyCode;
      }
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Add New User");
  },
  async mounted() {
    await getCountries()
      .then((res) => {
        this.countries = res.data;
      })
      .catch(() => {
        this.countries = [];
        this.loading = false;
        // alert('an err')
      });
    await getRates()
      .then((res) => {
        this.currencies = res.data;
      })
      .catch(() => {
        this.currencies = [];
        this.loading = false;
        // alert('an err')
      });
  },
};
</script>
