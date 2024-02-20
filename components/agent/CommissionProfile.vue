<template>
  <b-row>
    <b-col>
      <card class="mb-3" v-for="(profile, index) in activeProfile" :key="index" title="Active Commission Profile">
        <table class="table text-center">
          <tbody>
            <tr>
              <td class="font-weight-bolder">Name</td>
              <td>{{ profile.profile.name }}</td>
            </tr>
            <tr>
              <td class="font-weight-bolder">Provider Group</td>
              <td>{{ profile.profile.provider_group }}</td>
            </tr>
            <tr>
              <td class="font-weight-bolder">Period</td>
              <td>{{ profile.profile.period }}</td>
            </tr>
            <tr>
              <td class="font-weight-bolder">Commission Type</td>
              <td>
                <span v-if="profile.profile.commission_type == 1"
                  >Turnover ( {{ profile.profile.period }} )</span
                >
                <span v-if="profile.profile.commission_type == 2"
                  >Turnover ( {{ profile.profile.period }} )</span
                >
                <span v-if="profile.profile.commission_type == 3"
                  >Turnover ( {{ profile.profile.period }} )</span
                >
              </td>
            </tr>
            <tr>
              <td class="font-weight-bolder">Type</td>
              <td>{{ profile.profile.type }}</td>
            </tr>
            <tr v-if="profile.profile.type == 'flat'">
              <td class="font-weight-bolder">Type</td>
              <td>{{ profile.profile.percentage }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-center p-4" v-if="!activeProfile">
          <h5>No active profle</h5>
        </div>
      </card>
    </b-col>
    <b-col>
      <card title="Set Commission Profile" :padding="true">
        <form
          class="form-horizontal columns column is-multiline is-12"
          role="form"
          @submit.prevent="saveProfile"
          v-if="!loading"
        >
          <div class="form-row form-group">
            <label for="" class="col-4">Choose Profile</label>
            <select
              name=""
              class="col-8 form-control"
              id=""
              v-model="formData.commission_profile_id"
            >
              <option value="">Select profile</option>
              <option
                v-for="(profile, index) in profiles"
                :key="index"
                :value="profile.id"
              >
                {{ profile.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <button
              class="button btn btn-success btn-block saveBtn"
              type="submit"
              name="button"
            >
              Save
            </button>
          </div>
        </form>
        <div class="text-center" v-if="loading">
          <i class="fa fa-spin fa-spinner fa-3x"></i>
        </div>
      </card>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      formData: {
        user_id: this.$store.state.pageParam,
        commission_profile_id: "",
      },
      loading: false,
      activeProfile: null,
      profiles: [],
    };
  },
  methods: {
    async saveProfile() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          $(".saveBtn").attr("disabled", true).text("Saving...");
          this.$axios
            .post("/commissions/profile/assign/user", this.formData)
            .then((res) => {
              $(".saveBtn").attr("disabled", false).text("Save");
              if (res.data.success) {
                this.activeProfile = res.data.profile;
                this.$swal("Success", "Profile saved!", "success");
                this.$nuxt.$emit('refresh_profile');
                this.formData.commission_profile_id = '';
              } else {
                this.$swal("Error", "An Error occurred!", "error");
                this.$nuxt.$emit('refresh_profile');
                this.formData.commission_profile_id = '';
              }
            })
            .catch((err) => {
              $(".saveBtn").attr("disabled", false).text("Save");
            });
        }
      });
    },
    getProfiles() {
      this.loading = true;
      this.$axios.get("commissions/profile").then((res) => {
        this.profiles = res.data.data;
        this.loading = false;
      });
    },
    getActiveProfile() {
      this.loading = true;
      this.$axios .get( "commissions/profile/" + this.$store.state.pageParam + "/user/profiles" ).then((res) => {
        this.activeProfile = res.data.data;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getProfiles();
    this.$nuxt.$on('refresh_profile', () => {
        this.getActiveProfile();
    })

    this.$axios
      .get(
        "commissions/profile/" + this.$store.state.pageParam + "/user/profiles"
      )
      .then((res) => {
        this.activeProfile = res.data.data;
        this.loading = false;
      });
  },
};
</script>
