<template>
    <div>
       <form id="single-stop" @submit.prevent="getResults(1)">
            <div class="row m-t-10">
                <div class="col-sm-2">
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
                <div class="col-sm-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="filterData.from" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="filterData.to" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.payment_method">
                        <option value="">Payment Method</option>
                        <option value="paystack">Paystack</option>
                        <option value="internal_transfr">Internal transefer</option>
                        <option value="bank_transfer">Bank transefer</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.client_type">
                        <option value="">Client Type</option>
                        <option value="website">Website</option>
                        <option value="mobile">Mobile</option>
                        <option value="cashier">Cashier</option>
                    </select>
                </div>
            </div>

            <div class="row m-t-10 form-group">
                <div class="col-sm-2">
                    <label class="control-label txt_media1">
                        Group By
                    </label>
                </div>
                <div class="col-sm-10">
                    <b-form-radio-group :options="groups" v-model="filterData.group_by" class="inlineRadio">
                    </b-form-radio-group>
                </div>
            </div>
            <div class="row m-t-10">
                <div class="col-sm-8">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
                </div>

                <div class="col-sm-2">
                    <button class="btn btn-info btn-block">Search</button>
                </div>
                <div class="col-sm-2">
                    <a href="#" @click="resetFilter">clear all filters</a>
                </div>
            </div>

        </form>
        <div class="row">

        </div>
        <card title="Total Net Cash" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th># of Deposits</th>
                            <th>Deposit Amount</th>
                            <th>Average Deposit Amount</th>
                            <th># of Withdrawals</th>
                            <th>Withdrawal Amount</th>
                            <th>Average Withdrawal Amount</th>
                            <th>Net Cash</th>
                            <th>Net Cash to Deposit Ratio(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="overall != ''" v-show="!loading">
                            <td>{{ overall.no_of_deposits}}</td>
                            <td>{{ formatNumber(overall.total_deposit) }}</td>
                            <td>{{ formatNumber(overall.avg_deposit) }}</td>
                            <td>{{ overall.no_of_withdrawals }}</td>
                            <td>{{ formatNumber(overall.total_withdrawal) }}</td>
                            <td>{{ formatNumber(overall.avg_withdrawal) }}</td>
                            <td>{{ formatNumber(overall.net_cash) }}</td>
                            <td>{{ calcMargin(overall) }}</td>
                        </tr>
                        <tr v-if="overall.length < 1" v-show="!loading">
                            <td colspan="9" class="text-center">
                                <h4>No record found</h4>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="9" class="text-center">
                                <i class="fa fa-4x fa-spin fa-spinner"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
        <card title="Results" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th># of Deposits</th>
                            <th>Deposit Amount</th>
                            <th>Average Deposit Amount</th>
                            <th># of Withdrawals</th>
                            <th>Withdrawal Amount</th>
                            <th>Average Withdrawal Amount</th>
                            <th>Net Cash</th>
                            <th>Net Cash to Deposit Ratio(%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(report, index) in reports" v-if="!loading && reports.length > 0" :key="index">
                            <td v-if="group_by == 'day'">
                                <a href="#">
                                    <i class="fa fa-fw fa-arrow-circle-o-right"></i>
                                    {{ report.date }}
                                </a>
                            </td>
                            <td v-if="group_by == 'month'">
                                <a href="#">
                                    <i class="fa fa-fw fa-arrow-circle-o-right"></i>
                                    {{ displayMonth(report.month) }}
                                </a>
                            </td>
                            <td v-if="group_by == 'payment_method'">
                                <a href="#">
                                    <i class="fa fa-fw fa-arrow-circle-o-right"></i>
                                    {{ report.payment_method }}
                                </a>
                            </td>
                            <td v-if="group_by == 'client_type'">
                                <a href="#">
                                    <i class="fa fa-fw fa-arrow-circle-o-right"></i>
                                    {{ report.channel }}
                                </a>
                            </td>
                            <td v-if="group_by == 'shop'">
                                <a href="#">
                                    <i class="fa fa-fw fa-arrow-circle-o-right"></i>
                                    {{ report.shopname }}
                                </a>
                            </td>
                            <td>{{ report.no_of_deposits }}</td>
                            <td>{{ formatNumber(report.total_deposit) }}</td>
                            <td>{{ formatNumber(report.avg_deposit) }}</td>
                            <td>{{ report.no_of_withdrawals }}</td>
                            <td>{{ formatNumber(report.total_withdrawal) }}</td>
                            <td>{{ formatNumber(report.avg_withdrawal) }}</td>
                            <td>{{ formatNumber(report.net_cash) }}</td>
                            <td>{{ calcMargin(report) }}</td>
                        </tr>
                        <tr v-if="reports.length < 1" v-show="!loading">
                            <td colspan="9" class="text-center">
                                <h4>No record found</h4>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="9" class="text-center">
                                <i class="fa fa-4x fa-spin fa-spinner"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>
<script>
import card from "../../components/card.vue"
import Reports from '../../services/reports'
    export default {
        name:'net_cash_report',
        layout: 'main',
        components:{
            card
        },
        data(){
          return{
            title: 'Net Cash Report',
            filterData:{
              period: 'today',
              from: this.$moment().format('DD-MM-YYYY 00:00:00'),
              to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
              client_type: '',
              payment_method: '',
              group_by: 'shop'
            },
            groups: [
              { text: 'Shop', value: 'shop' },
              { text: 'Day', value: 'day' },
              { text: 'Month', value: 'month' },
              { text: 'Payment Method', value: 'payment_method' },
              { text: 'State', value: 'state' },
              { text: 'Client Type', value: 'client_type' }
            ],
            config: this.$store.state.flatpickrConfig,
            currency: this.$store.state.currencySymbol,
            reports:'',
            overall:'',
            counter: 0,
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
            group_by: 'month',

          }
        },
        methods:{
          // formatNumber(number){
          //   return this.numberFormat(this.currency, number)
          // },
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
            Reports.getNetCashReport(this.filterData, page).then(res=>{
              this.loading = false;
              this.reports = res.reports.data || res.reports;
              this.pagination = res.reports;
              this.overall = res.total_netcash;
              this.group_by = this.filterData.group_by
            }).catch(err => {
                this.$toast.error('An error occured',{icon: 'times'})
            })
          },
          calcMargin(report){
            let margin =parseFloat(report.net_cash)*100/parseFloat(report.total_deposit)
            return margin.toFixed(2)+'%';
          },
          displayMonth(n){
            return this.$moment(n, 'MM').format('MMM');
          },
          resetFilter(){
            this.filterData = {
              period: 'today',
              from: this.$moment().format('DD-MM-YYYY 00:00:00'),
              to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
              client_type: '',
              payment_method: '',
              group_by: 'month'
            }
          }
        },
        head () {
          return {
            title: this.title
          }
        },
        asyncData ({ store }) {
          store.dispatch('setTitle', 'Net Cash Report')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);
        }
    }
</script>
