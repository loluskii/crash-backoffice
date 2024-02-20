<template>
  <div>
    <form id="single-stop" @submit.prevent="calculateComm(1)">
      <div class="row m-t-10">
        <div class="col-md-3 col-sm-12 mb-sm-0 mb-2">
          <select
            v-model="filterData.provider"
            class="form-control"
            name="provider"
            id="provider"
          >
            <option
              v-for="(provider, index) in providers"
              :key="index"
              :value="provider.value"
              :selected="filterData.provider"
            >
              {{ provider.text }}
            </option>
          </select>
        </div>
          <div class="col-sm-3">
            <select
              v-model="period"
              class="form-control"
              name="provider"
              id="provider"
              @change="setPeriod()"
            >
              <option
                v-for="(date, index) in dates"
                :key="index"
                :value="date"
                :selected="period"
              >
                {{ date }}
              </option>
            </select>
          </div>
          <br class="d-sm-none">
          <div class="col-sm-3">

          </div>
          <br class="d-sm-none">
          <div class="col-sm-3">
              <button type="submit" id="search" class="btn btn-info btn-block">Search</button>
          </div>
      </div>
  </form>

    <hr style="border: 2px solid #eee">
    <div class="text-center" v-if="loading">
        <i class="fa fa-spin fa-spinner fa-5x"></i>
    </div>
    <br>
    <div class="card" v-if="agents && !loading">
        <div class="card-header bg-primary">
            <h3 class="card-title">Results</h3>
            <span class="float-right d-flex">
                <button type="button" name="button" @click="pay" class="pull-right btn btn-success fa fa-money">
                    Pay All Agents
                </button>
            </span>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">

                <table class="table table-bordered table-striped">
                    <thead>
                        <th><input type="checkbox" v-model="selectAll"></th>
                        <th>Agent</th>
                        <th>No. of Tickets</th>
                        <th>Amount Played</th>
                        <th>Weighted Stake</th>
                        <th>Total Won</th>
                        <th>Gross Profit</th>
                        <th>Bonus amount</th>
                        <th></th>
                    </thead>
                    <tbody>
                        <tr v-for="(agent, index) in agents" :key="index">
                            <td><input type="checkbox" :value="agent.shop_id" v-model="selected" number></td>
                            <td>
                              <nuxt-link :to="'/Network/Agent/'+agent.shop_id" class="href">
                                {{ agent.shop_name }}
                              </nuxt-link>
                            </td>
                            <td>{{ formatNumber(agent.totalTickets, false) }}</td>
                            <td>{{ formatNumber(agent.totalStake) }}</td>
                            <td>{{ formatNumber(agent.totalWeightedStake) }}</td>
                            <td>{{ formatNumber(agent.totalWinnings) }}</td>
                            <td>{{ formatNumber(agent.grossProfit) }}</td>
                            <td>{{ formatNumber(agent.monthlyBonus) }}</td>
                            <td>
                                <button class="btn btn-primary">Pay</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="row mt-3">
                    <!-- <div class="col-sm-12 col-md-5">
                        <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">Showing 1 to 10 of 40 entries</div>
                    </div> -->
                    <div class="col-sm-12 col-md-7">

                        <div class="dataTables_paginate paging_simple_numbers pull-right" id="sample_1_paginate">
                            <paginate
                                v-bind:pagination="pagination"
                                v-on:click.native="calculateComm(pagination.current_page)"
                                :offset="4">
                            </paginate>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import Reports from '../../services/reports'
import Agents from '../../services/agents'
export default {
  name: 'power-bonus-report',
  layout: 'main',
  data(){
    return {
      loading: false,
      title: 'Power Bonus Report',
      filterData:{
          from: '',
          to: '',
          provider: 'sports',
      },
      period: '',
      providers: [
        { text: "Sport", value: "sports" },
        { text: "Casino", value: "casino" },
        { text: "Poker", value: "poker" },
        { text: "Virtual", value: "virtual" },
        { text: "Casino live", value: "casino_live" },
      ],
      agents: '',
      pagination: {
          total: 0,
          per_page: 2,
          from: 1,
          to: 0,
          current_page: 1
      },
      offset: 4,
      selected: [],
      dates: [],
      date: this.$store.state.powerBonusDate,
    }
  },
  computed: {
      selectAll: {
          get: function () {
              return this.agents ? this.selected.length == this.agents.length : false;
          },
          set: function (value) {
              var selected = [];
              if (value) {
                  this.agents.forEach(function (agent) {
                      selected.push(agent.shop_id);
                  });
              }
              this.selected = selected;
          }
      }
  },
  methods: {
    calculateComm(page){
        $('#search').attr('disabled', true);
        this.loading = true;
        Reports.getPowerBonus(page, this.filterData).then(res => {
            $('#search').attr('disabled', false);
            this.loading          = false;
            this.agents           = res.data;;
            // this.pagination       = res.commissions;
        })
    },
    pay(){
        var self = this;

        if(self.selected.length){
            self.$swal({
                title: 'Are you sure?',
                text: 'This will credit all selected agent\'s account',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Pay!',
                cancelButtonText: 'No'
            }).then(result => {
                if(result.value){
                    let data = {
                        user_ids: self.selected,
                        from: self.filterData.from,
                        to: self.filterData.to,
                    };
                    Agents.payPowerBonus(data).then((res) => {
                      if(res.success){
                          self.$swal('Success!', res.message, 'success');
                          // self.agents = res.agents.data
                      }else{
                          self.$swal('Error!', res.message, 'error');
                      }
                    })
                    // .catch(err => toast['error'].);
                }
            })
        }else{
            self.$swal('Error', 'No agent was selected', 'error')
        }
    },
    setPeriod() {
      const arr = this.period.split(' - ');
      this.filterData.from = arr[0];
      this.filterData.to = arr[1];
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  asyncData ({ store }) {
    store.dispatch('setTitle', 'Power Bonus Report')
  },
  watch: {
    date: {
      immediate: true,
      handler(val) {
        console.log(val)
        // if(to.query.id){
        //   this.category_id = to.query.id;
        //   this.setCategory();
        // }
      },
    },
  },
  updated() {
    if(!this.dates.length && this.date) {
      let startDate = this.date;
      for (let index = 1; index <= 12; index++) {
        const nextDate = this.$moment(startDate).add(28, 'days').format('YYYY-MM-DD');
        this.dates.push(startDate + ' - ' + nextDate);
        startDate = nextDate;
      }
    }
  },
  mounted() {
    if (this.date) {
      let startDate = this.date;
      for (let index = 1; index <= 12; index++) {
        const nextDate = this.$moment(startDate).add(28, 'days').format('YYYY-MM-DD');
        this.dates.push(startDate + ' - ' + nextDate);
        startDate = nextDate;
      }
    }
  },

}
</script>

<style scoped>
.tab-content{
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
}
input.form-control{
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #ced4da !important;
}
</style>
