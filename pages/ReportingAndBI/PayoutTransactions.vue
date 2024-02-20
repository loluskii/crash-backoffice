<template>
  <div>
     <form id="single-stop" @submit.prevent="getResults(1)">
          <div class="row m-t-10">
              <div class="col-sm-3">
                  <select name="class" id="class-type" class="form-control" v-model="filterData.period" @change="setDateRange">
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="current_week">Current Week</option>
                      <option value="last_week">Last Week</option>
                      <option value="current_month">Current Month</option>
                      <option value="last_month">Last Month</option>
                      <option value="last_30_days">Last 30 Days</option>
                      <option value="date_range">Date Range</option>
                  </select>
              </div>
              <br class="d-sm-none">
              <div class="col-sm-3">
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                      </div>
                      <flat-pickr v-model="filterData.from" :config="config" class="form-control"></flat-pickr>
                  </div>
              </div>
              <br class="d-sm-none">
              <div class="col-sm-3">
                  <div class="input-group">
                      <div class="input-group-prepend">
                          <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                      </div>
                      <flat-pickr v-model="filterData.to" :config="config" class="form-control"></flat-pickr>
                  </div>
              </div>
              <div class="col-sm-3">
                  <select name="class" id="class-type" class="form-control" v-model="filterData.client_type">
                      <option value="">Client Type</option>
                      <option value="website">Website</option>
                      <option value="mobile">Mobile</option>
                      <option value="cashier">Cashier</option>
                  </select>
              </div>
          </div>

          <div class="row m-t-10">
              <div class="col-sm-3">
                  <div class="form-group icheck-element">
                      <label class="price-alert">
                          <input type="checkbox" name="c1" id="c1" value=""> Show only changed balances
                      </label>
                  </div>
              </div>
              <div class="col-sm-3">
                  <div class="form-group icheck-element">
                      <label class="price-alert">
                          <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                      </label>
                  </div>
              </div>
              <div class="col-sm-1">
                  <button class="btn btn-info btn-block">Search</button>
              </div>
              <div class="col-sm-3">
                  <a href="#" @click="resetFilter">clear all filters</a>
              </div>
          </div>

      </form>
      <card title="Results" excel="true">
          <div class="table-responsive">
              <table class="table table-bordered table-striped">
                  <thead>
                      <tr>
                          <th>Username</th>
                          <th>No of Bets</th>
                          <th>Total Winning</th>
                          <th>Total Payout</th>
                          <th>Pending Payout</th>
                          <th>Available Balance</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in reports" v-if="reports.length > 0" v-show="!loading" :key="index">
                          <td>
                            <nuxt-link :to="'/Network/Agent/'+row.agent_id">
                              {{ row.username }}
                            </nuxt-link>
                          </td>
                          <!-- no of bets -->
                          <td>
                            {{ numberFormat('', row.no_of_bets) }}
                          </td>
                          <!-- total winning -->
                          <td>
                            {{ formatNumber(row.winnings) }}
                          </td>
                          <!-- total payout -->
                          <td>
                            {{ formatNumber(row.payouts) }}
                          </td>
                          <!-- pending payout -->
                          <td>
                            {{ formatNumber(row.winnings - row.payouts) }}
                          </td>
                          <!-- available balance -->
                          <td>
                            {{ formatNumber(row.balance) }}
                          </td>

                      </tr>
                      <tr v-if="reports.length < 1" v-show="!loading">
                          <td colspan="6" class="text-center">
                              <h4>No record found</h4>
                          </td>
                      </tr>
                      <tr v-if="loading">
                          <td colspan="6" class="text-center">
                              <i class="fa fa-4x fa-spin fa-spinner"></i>
                          </td>
                      </tr>
                  </tbody>
                  <tfoot>
                      <tr>
                          <th>Total</th>
                          <th>{{ numberFormat('', totalTickets) }}</th>
                          <th>{{ formatNumber(totalWinnings) }}</th>
                          <th>{{ formatNumber(totalPayouts) }}</th>
                          <th>{{ formatNumber(totalWinnings - totalPayouts) }}</th>
                          <th>{{ formatNumber(totalBalance) }}</th>
                      </tr>
                  </tfoot>
              </table>
          </div>
      </card>

  </div>
</template>
<script>
import card from '../../components/card'
import Reports from '../../services/reports'
  export default {
      name:'payout_transactions',
      layout: 'main',
      components:{
          card
      },
      data(){
          return{
              filterData:{
                  period: 'today',
                  from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                  to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                  client_type: '',
              },
              config: this.$store.state.flatpickrConfig,
              currency: this.$store.state.currencySymbol,
              reports:'',
              counter: 0,
              totalTickets: 0,
              totalStake: 0,
              totalWinnings: 0,
              totalPayouts: 0,
              totalBalance: 0,
              paging: true,
              pagination: {
                  total: 0,
                  per_page: 2,
                  from: 1,
                  to: 0,
                  current_page: 1
              },
              loading: false,
              offset: 4,
          }
      },
      methods:{
          formatNumber(number){
              return this.numberFormat(this.currency, number)
          },
          setDateRange(){
              switch(this.filterData.period) {
                  case 'today':
                      this.config.clickOpens = false;
                      this.filterData.from = this.$moment().format('DD-MM-YYYY 00:00:00');
                      this.filterData.to = this.$moment().format('DD-MM-YYYY 23:59:59');
                      break;
                  case 'yesterday':
                      this.filterData.from = this.$moment().subtract(1, 'day').format('DD-MM-YYYY 00:00:00');
                      this.filterData.to = this.$moment().subtract(1, 'day').format('DD-MM-YYYY 23:59:59');
                      break;
                  case 'current_week':
                      this.filterData.from = this.$moment().startOf('isoWeek').format('DD-MM-YYYY 00:00:00');
                      this.filterData.to = this.$moment().endOf('isoWeek').format('DD-MM-YYYY 23:59:59');
                      break;
                  case 'last_week':
                      this.filterData.from = this.$moment().subtract(1, 'week').startOf('isoWeek').format('DD-MM-YYYY 00:00:00');
                      this.filterData.to = this.$moment().subtract(1, 'week').endOf('isoWeek').format('DD-MM-YYYY 23:59:59');
                      break;
                  case 'current_month':
                      this.filterData.from = this.$moment().startOf('month').format('DD-MM-YYYY 00:00:00');
                      this.filterData.to = this.$moment().endOf('month').format('DD-MM-YYYY 23:59:59');
                      break;
                  case 'last_month':
                      this.filterData.from = this.$moment().subtract(1, 'month').startOf('month').format('DD-MM-YYYY 00:00:00');
                      this.filterData.to = this.$moment().subtract(1, 'month').endOf('month').format('DD-MM-YYYY 23:59:59');
                      break;
                  case 'last_30_days':
                      this.filterData.from = this.$moment().subtract(30, 'days').format('DD-MM-YYYY 00:00:00');
                      this.filterData.to = this.$moment().format('DD-MM-YYYY 23:59:59');
                      break;
                  default:
                      this.filterData.from = this.$moment().format('DD-MM-YYYY 00:00:00');
                      this.filterData.to = this.$moment().format('DD-MM-YYYY 23:59:59');
              }
          },
          getResults(page){
                this.loading = true
                Reports.getPayoutReports(this.filterData, page).then(res=>{
                    this.loading = false;
                    this.reports        = res.results.data;
                    this.totalTickets   = res.totalTicket;
                    this.totalPayouts     = res.totalPayouts;
                    this.totalWinnings  = res.totalWinnings;
                    this.totalBalance  = res.totalBalance;
                    this.pagination     = res.bets;
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
          resetFilter(){
              this.filterData = {
                  period: 'today',
                  from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                  to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                  client_type: '',
              }
          }
      },
      head () {
          return {
              title: 'Accounting Reporting'
          }
      },
      asyncData ({ store }) {
          store.dispatch('setTitle', 'Payout Transactions')
      },
      mounted(){

          // this.listBets(this.pagination.current_page);
      }
  }
</script>
