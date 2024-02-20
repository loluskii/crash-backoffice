<template>
  <div>
    <div class="card">
      <div class="card-header bg-primary">
        <h4>Shops</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead class="bg-primary">
              <tr>
                <th>ID Agency</th>
                <th>Address</th>
                <th>City</th>
                <th>Code</th>
                <th>Agent</th>
                <th>Is Active</th>
                <th>Min Bet</th>
                <th>Min Combination Bet</th>
                <th>Max Bet</th>
                <th>Max Payout</th>
                <th>Worker InOut</th>
                <th>Time Zone</th>
                <th>Assigned</th>
                <th>Track Credit</th>
                <th>Current Credit</th>
                <th>Commission</th>
                <th>Software Charge</th>
                <!-- <th>Action</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(shop, index) in shops" :key="index">
                <td scope="row">{{ shop.AgencyName }}</td>
                <td>{{ shop.AgencyAddress }}</td>
                <td>{{ shop.AgencyCity }}</td>
                <td scope="row">{{ shop.AgencyCode }}</td>
                <td>{{ shop.AgencyName }}</td>
                <td>{{ shop.AgencyActive ? "Active" : "Inactive" }}</td>
                <td scope="row">{{ shop.LuckyColor_MinBet }}</td>
                <td>{{ shop.LuckyColor_MinBetCombination }}</td>
                <td>{{ shop.LuckyColor_MaxBet }}</td>
                <td scope="row">{{ shop.LuckyColor_MaxWin }}</td>
                <td>{{ shop.ShopWorkerMonyeInOut }}</td>
                <td>{{ shop.TimeZone }}</td>
                <td scope="row">{{ shop.Assigned ? "True" : "False" }}</td>
                <td>--</td>
                <td>--</td>
                <td scope="row">{{ shop.CommissionPerc }}</td>
                <td>{{ shop.SoftwareCharge }}</td>
                <!-- <td><span class="badge badge-primary">View</span></td> -->
              </tr>
              <tr v-if="loading">
                <td colspan="18">Please wait...</td>
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
      shops: [],
      loading: false,
    };
  },
  methods: {
    getShops() {
      this.loading = true;
      this.$axios.$post("https://elbet.io.co.ke/2/shop/list").then((res) => {
        this.shops = res.data;
        this.loading - false;
      });
    },
  },
  mounted() {
    this.getShops();
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Lucky Balls");
  },
};
</script>

<style scoped></style>
