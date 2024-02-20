<template>
  <div>
    <form id="single-stop" @submit.prevent="getLiability">
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
              <td>
                <span v-if="result.market_status === 0" class="text-danger">{{ result.market_name }}</span>
                <a href="javascript:;" v-if="result.market_status === 1" class="text-success" title="Disable Market" @click="disableMarket(result)">{{ result.market_name }}</a>
              </td>
              <td>{{ result.odd_name }}</td>
              <td>{{ result.price }}</td>
              <td>{{ result.bet_count }}</td>
              <td>{{ formatNumber(result.stake) }}</td>
              <td>{{ formatNumber(result.winnings) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="!loading && !results.length" class="text-center nodata">
          <h5>No data</h5>
        </div>
        <div style="width: 100%" v-if="loading" class="text-center">
          <i class="fa fa-spin fa-spinner fa-4x"></i>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import Risk from "../../services/risk";
export default {
  name: "liability",
  layout: "main",
  data() {
    return {
      title: "Open Bets",
      sport:'',
      market:'',
      filterData: {
        from: this.$moment().format("YYYY-MM-DD 00:00:00"),
        to: this.$moment().format("YYYY-MM-DD 23:59:00"),
        type: "",
        market: "",
        sport: "",
      },
      config: {
        wrap: true,
        enableTime: true,
        time_24hr: true,
        dateFormat: 'Y-m-d H:i:S'
      },
      loading: false,
      results: [],
      sports: [],
      markets:[],
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
    getLiability() {
      this.loading = true;
      this.filterData.sport = this.sport.name;
      this.filterData.market = this.market.name;
      Risk.getLiability(this.filterData).then((res) => {
        this.results = res.data;
        this.loading = false;
      });
    },
    setGroups(e){
      this.groups = e.market_groups
      this.markets = e.markets
    },
    disableMarket(data) {
      var self = this;
      self.$swal({
          title: 'Disable this market',
          text: `This will disable ${data.market_name} for ${data.event} and will no longer be offered on your site.`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, disable',
          cancelButtonText: 'No, keep market'
      }).then((result)=> {
          if (result.value) {
            Risk.disableEventMarket({
              fixture_id: data.fixture_id,
              market_id: data.market_id
            }).then(res=>{
              if(res.success){
                this.getLiability();
                self.$swal('Disable!', 'Market has been disable', 'success');
              }
            });
          }
      }, function(dismiss) {

      })
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
    store.dispatch("setTitle", "Liability");
  },
};
</script>

<style></style>
