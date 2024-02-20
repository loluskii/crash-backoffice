<template>
  <div>
    <div class="card">
      <div class="card-header bg-primary">
        <h4>Shop Users</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="bg-primary">
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <!-- <th>Password</th> -->
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Level</th>
                <th>Language ID</th>
                <th>User Active</th>
                <!-- <th>Assigned to Shop</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.ID }} </td>
                <td>{{ user.Username }}</td>
                <!-- <td>{{user.Password}}</td> -->
                <td>{{user.FirstName}}</td>
                <td>{{user.LastName}}</td>
                <td>{{user.UserLevel}}</td>
                <td></td>
                <td><input type="checkbox" :checked="user.Active" ></td>
                <!-- <td></td> -->
              </tr>
              <tr v-if="loading">
                <td colspan="18" class="text-center">
                  <i class="fa fa-spin fa-spinner fa-2x"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lucky_balls",
  layout: "main",
  data() {
    return {
      users: [],
      userId: "",
      data: {
        id: ""
      },
      loading: false,
    };
  },
  methods: {

  },
  mounted() {
    this.data.id = this.$route.params.UserId;
    if (this.userId === undefined) {
      this.$toast.error("Shop not found!", { icon: "times" });
      this.$router.go("/LuckyBalls");
    }
    // https://elbet.io.co.ke/:client_id/shop/manage/user/list
    this.loading = true
    this.$axios.$post("https://elbet.io.co.ke/2/shop/manage/user/list", this.data).then((res) => {
      console.log(res);
      this.users = res.data;
      this.loading = false;
    });

  },

  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Manage Shop Users");
  },
};
</script>

<style scoped></style>
