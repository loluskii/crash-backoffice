<template>
  <div>
    <div class="card">
      <div class="card-header bg-primary">
        <h3 class="card-title text-white">Realtime Data</h3>
      </div>
      <div class="card-body nopadding">
        <realtime-data
          v-if="data.realTimeData"
          :data="data.realTimeData"
        ></realtime-data>
      </div>
    </div>
    <div class="card">
      <div class="card-header bg-primary">
        <h3 class="card-title text-white">Realtime Data</h3>
      </div>
      <div class="card-body nopadding">
        <table class="table table-striped table-bordered">
          <thead>
            <th>Currency</th>
            <th>Amount</th>
            <th>Pending</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr>
              <td>US Dollar (USD)</td>
              <td>1.00</td>
              <td>$</td>
              <td>
                <img src="" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import RealtimeData from "./RealtimeData";
import Jackpots from "../../../services/cms";
export default {
  components: {
    RealtimeData,
  },
  data() {
    return {
      data: [],
      currencies: [],
    };
  },
  mounted() {
    // this.$axios.get("/admin/dashboard/right-side").then(
    //   (res) => {
    //     this.data = res.data;
    //   },
    //   (err) => {}
    // );
  },
};
</script>
