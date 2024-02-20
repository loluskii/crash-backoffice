<template>
  <div>
      <form id="single-stop" @submit.prevent="calculateComm(1)">
          <div class="row m-t-10">
              <div class="col-sm-4">
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                      </div>
                      <flat-pickr v-model="filterData.from" :config="config" class="form-control"></flat-pickr>
                  </div>
              </div>
              <br class="d-sm-none">
              <div class="col-sm-4">
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                      </div>
                      <flat-pickr v-model="filterData.to" :config="config" class="form-control"></flat-pickr>
                  </div>
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
                  <label>Bonus Amount:</label>
                  <input type="number" class="form-control" v-model="bonusAmount" >
                  <button type="button" name="button" @click="pay" class="pull-right btn btn-success fa fa-money" style="width: 150px; height: 30px;">
                      Pay All
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
                          <th>Total Won</th>
                          <th>Net</th>
                          <th>Commissions</th>
                          <th>Profit</th>
                          <th></th>
                      </thead>
                      <tbody>
                          <tr v-for="(agent, index) in agents" :key="index">
                              <td><input type="checkbox" :value="agent.user_id" v-model="selected" number></td>
                              <td>
                                  <a href="" class="href">
                                      {{ agent.AgencyCodeName }}
                                  </a>
                              </td>
                              <td>{{ formatNumber(agent.NumberOfTickets) }}</td>
                              <td>{{ currency + '' +formatNumber(agent.MoneyIn) }}</td>
                              <td>{{ currency + '' +formatNumber(agent.MoneyWin) }}</td>
                              <td>{{ currency + '' +formatNumber(agent.ResultMoneyIn_Win) }}</td>
                              <td>{{ currency + '' +formatNumber(agent.Commission) }}</td>
                              <td>{{ currency+''+formatNumber(parseFloat(agent.ResultMoneyIn_Win) - parseFloat(agent.Commission))}}</td>
                              <td>
                                  <!-- <button class="btn btn-primary">Pay</button> -->
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
import Agents from '../../services/agents'
export default {
  name: 'luckyballs-commission',
  layout: 'main',
  data(){
      return {
          loading: false,
          filterData:{
              from: this.$moment().subtract(1, 'w').format('DD-MM-YYYY'),
              to:  this.$moment().format('DD-MM-YYYY'),
          },
          config: {
              dateFormat: 'd-m-Y'
          },
          current_week : '',
          current_month: '',
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
          Agents.luckyBallsCommission(page, this.filterData).then(res => {
              $('#search').attr('disabled', false);
              this.loading          = false;
              // this.current_week     = res.current_week;
              // this.current_month    = res.current_month;
              this.agents           = res.data;
              // this.pagination       = res.commissions;
          })
      },
      formatNumber(number){
          return parseFloat(number).toLocaleString(undefined, {maximumFractionDigits: 2})
      },
      pay(){
          var self = this;

          if(self.selected.length){
              self.$swal({
                  title: 'Are you sure?',
                  text: 'This will credit all agents account',
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, Pay!',
                  cancelButtonText: 'No'
              }).then(result => {
                  if(result.value){
                      let data = {
                          agentIDs: self.selected,
                          startTime: self.filterData.from,
                          endTime: self.filterData.to,
                          bonusAmount: self.bonusAmount
                      };
                      Agents.payCommission(data).then((res) => {
                      if(res.success){
                          self.$swal('Success!', 'Agents have been credited', 'success');
                          // self.agents = res.agents.data
                      }else{
                          self.$swal('Error!', 'Internal server error!', 'error');
                      }
                      });
                  }
              })
          }else{
              self.$swal('Error', 'No agent was selected', 'error')
          }
      },
  },
  mounted(){

  },
  head(){
      return{
          title: 'Commissions'
      }
  },
  asyncData ({ store }) {
      store.dispatch('setTitle', 'Commissions');
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
