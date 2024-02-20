<template>
<div>
  <div>
    <form id="single-stop" @submit.prevent="getProfitability">
      <div class="row m-t-10">
        <div class="col-sm-2 pr-0">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text bg-white"
                ><i class="fa fa-fw ti-calendar"></i
              ></span>
            </div>
            <flat-pickr
              v-model="filterData.from"
              :config="config"
              class="form-control"
            ></flat-pickr>
          </div>
        </div>
        <div class="col-sm-2 pr-0">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text bg-white"
                ><i class="fa fa-fw ti-calendar"></i
              ></span>
            </div>
            <flat-pickr
              v-model="filterData.to"
              :config="config"
              class="form-control"
            ></flat-pickr>
          </div>
        </div>
        <div class="col-sm-2 pr-0">
          <select
            name="class"
            id="class-type"
            class="form-control"
            v-model="filterData.type"
          >
            <option value="">Pre Match/Live</option>
            <option value="pre">Pre-Match</option>
            <option value="live">Live</option>
          </select>
        </div>
        <div class="col-sm-2 pr-0">
          <v-select
              label="name"
              v-model="sport"
              v-on:input="setGroups"
              placeholder="Select Sports"
              :options="sports" name="sport">
          </v-select>
        </div>
        <div class="col-sm-2 pr-0">
          <v-select
              label="name"
              class="rounded-0"
              v-model="market"
              placeholder="Select Market"
              :options="markets" name="market">
          </v-select>
        </div>
        <div class="col-2">
          <button type="submit" class="btn btn-info btn-block">Search</button>
        </div>
        <!-- <div class="col-sm-3 mt-3">
          <select name="class" id="class-type" class="form-control">
            <option value="">Sport</option>
          </select>
        </div>
        <div class="col-sm-3 mt-3">
          <select name="class" id="class-type" class="form-control">
            <option value="">League</option>
          </select>
        </div> -->
      </div>
    </form>
    <card title="Results">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Sport</th>
              <th>Tournament</th>
              <th>Event</th>
              <th>Date</th>
              <th>Market</th>
              <th>Selection</th>
              <th>Price</th>
              <th>Bet Count</th>
              <th>Stake</th>
              <th>Potential Winnings</th>
            </tr>
          </thead>
          <tbody
            v-for="(result, index) in results"
            :key="index"
          >
            <tr v-if="results.length > 0 && !loading">
              <td>{{ result.sport }}</td>
              <td>{{ result.tournament }}</td>
              <td>{{ result.event }}</td>
              <td>{{ result.date }}</td>
              <td>{{ result.market_name }}</td>
              <td>{{ result.odd_name }}</td>
              <td>{{ result.price }}</td>
              <td>{{ result.bet_count }}</td>
              <td>{{ formatNumber(result.stake) }}</td>
              <td>{{ formatNumber(result.winnings) }}</td>
            </tr>
            <tr v-if="!loading && !results.length" class="text-center nodata">
              <td colspan="10">No data</td>
            </tr>
          </tbody>
        </table>
        <div style="width: 100%" v-if="loading" class="text-center">
          <i class="fa fa-spin fa-spinner fa-2x"></i>
        </div>
      </div>
    </card>
  </div>
</div>
</template>

<script>
import Risk from "../../services/risk";
export default {
  name: "profitability",
  layout: "main",
  data() {
    return {
      title: "Profitability",
      sport: '',
      market: '',
      filterData: {
        from: this.$moment().format("YYYY-MM-DD 00:00:00"),
        to: this.$moment().format("YYYY-MM-DD 23:59:00"),
        type: "",
        market: "",
      },
      loading: false,
      results: [],
      sports: [],
      markets:[],
      config: {
        wrap: true,
        enableTime: true,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i:S'
      },
      currency: this.$store.state.currencySymbol,
    };
  },
  methods: {
    listSports(){
      this.loading= true;
      this.$axios.get('/admin/content-management/markets').then(response =>  {
          this.sports = response.data.sports
          this.loading = false;
      }).catch(error => {
          this.loading = false;
      });
    },
    formatNumber(number){
      return this.numberFormat(this.currency, number)
    },
    getProfitability() {
      this.loading = true;
      this.filterData.sport = this.sport.name;
      this.filterData.market = this.market.name;
      Risk.getProfitability(this.filterData).then((res) => {
        console.log(res);
        this.results = res.data;
        this.loading = false;
      });
    },
    setGroups(e){
      this.groups = e.market_groups
      this.markets = e.markets
    }
  },
  mounted() {
    // this.getLiability();
    this.listSports();
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Profitability");
  },
};
</script>

<style>

</style>
