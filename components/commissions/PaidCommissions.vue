<template>
  <div>
    <form id="single-stop" @submit.prevent="calculateComm(1)">
      <div class="row m-t-10">
        <div class="col-md-4 col-sm-12 mb-sm-0 mb-2">
          <select
            v-model="filterData.period"
            class="form-control"
            name="provider"
            id="provider"
          >
            <option value="">Select Period</option>
            <option
              v-for="(period, index) in periods"
              :key="index"
              :value="period.value"
              :selected="filterData.period"
            >
              {{ period.text }}
            </option>
          </select>
        </div>
        <div class="col-md-4 col-sm-12 mb-sm-0 mb-2">
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

          <br class="d-sm-none">
          <div class="col-sm-4">
              <button :disabled="filterData.period == ''" type="submit" id="search" class="btn btn-info btn-block">Search</button>
          </div>
      </div>
  </form>

    <hr style="border: 2px solid #eee">
    <div class="text-center" v-if="loading">
        <i class="fa fa-spin fa-spinner fa-5x"></i>
    </div>
    <div class="card" v-if="agents && !loading">
        <div class="card-header bg-primary">
            <h3 class="card-title">Results</h3>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">

                <table class="table table-bordered table-striped">
                    <thead>
                        <th>Agent</th>
                        <th>Commission Profile</th>
                        <th>No. of Tickets</th>
                        <th>Amount Played</th>
                        <th>Total Won</th>
                        <th>Net</th>
                        <th>Commissions</th>
                        <th>Profit</th>
                    </thead>
                    <tbody>
                        <tr v-for="(agent, index) in agents" :key="index">
                            <td>
                              <nuxt-link :to="'/Network/Agent/'+agent.user_id" class="href">
                                {{ agent.user.username }}
                              </nuxt-link>
                            </td>
                            <td>
                              <a href="javascript:;" class="href" @click="showCommProfile(agent.user_commission_profile_id)">
                                {{ agent.profile }}
                              </a>
                            </td>
                            <td>
                              <a href="javascript:;" class="href">
                                {{ formatNumber(agent.total_tickets, false) }}
                              </a>
                            </td>
                            <td>{{ formatNumber(agent.total_sales) }}</td>
                            <td>{{ formatNumber(agent.total_won) }}</td>
                            <td>{{ formatNumber(agent.net) }}</td>
                            <td>{{ formatNumber(agent.commission) }}</td>
                            <td>{{ formatNumber(agent.profit)}}</td>
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
  name: 'commissions-report',
  layout: 'main',
  data(){
    return {
      loading: false,
      filterData:{
        provider: 'sports',
        period: ''
      },
      providers: [
        { text: "Sport", value: "sports" },
        { text: "Casino", value: "casino" },
        { text: "Poker", value: "poker" },
        { text: "Virtual", value: "virtual" },
        { text: "Casino live", value: "casino_live" },
      ],
      periods: [],
      agents: '',
      currency: this.$store.state.currencySymbol,
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      selected: [],
      bonusAmount: 0
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
                  selected.push(agent.user_id);
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
        Reports.getPaidCommissions(page, this.filterData).then(res => {
            $('#search').attr('disabled', false);
            this.loading          = false;
            this.agents           = res.data.data;
            this.pagination       = res.data;
        })
    },
    showCommProfile(profile_id) {
      Reports.getCommission(profile_id).then((res) => {
        if(res.success) {
          this.$nuxt.$emit('commission_profile_show', res.data);
        } else {
          toastr['error']('Unable to fetch record', 'Error');
        }
      }).catch(err => {
        toastr['error']('An error occured.', 'Error');
      })
    },
    getPeriods(){
      Reports.getCommissionPeriod().then(res => {
        if(res.data.length){
          res.data.forEach(period => {
            this.periods.push({
              text: period.start_date+' - '+period.end_date,
              value: period.start_date+' - '+period.end_date,
            })
          })
        }
      })
    }
  },
  mounted() {
    this.getPeriods();
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
