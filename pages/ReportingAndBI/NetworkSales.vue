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
                <br class="d-sm-none">
              <div class="col-sm-3">
                <select name="class" id="product-type" class="form-control" v-model="filterData.product_type">
                  <option value="">Product Type</option>
                  <option value="sports">Sports</option>
                  <option value="casino">Casino</option>
                  <option value="games">Games</option>
                  <option value="virtual">Virtual Sport</option>
                </select>

              </div>
            </div>

            <div class="row m-t-10">
                <div class="col-sm-8">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" v-model="paging" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
                </div>
                <div class="col-sm-1">
                    <button type="submit" class="btn btn-info btn-block">Search</button>
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
              <th class="text-center">Name</th>
              <th># of Bets</th>
              <th>Turnover</th>
              <th>Winnings</th>
              <th>GGR</th>
              <th>Margin (%)</th>
              <th>NGR</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(bet, index) in bets" v-if="bets.length > 0" v-show="!loading" :key="index">
              <td class="text-center">
                <i class="fa fa-fw fa-angle-right pull-left"></i>
                <nuxt-link :to="'/Network/Agent/'+bet.agent_id">
                  {{ bet.username }}
                </nuxt-link>
              </td>
              <td>{{ bet.no_of_bets }}</td>
              <td>{{ formatNumber(bet.sales) }}</td>
              <td>{{ formatNumber(bet.winnings) }}</td>
              <td :class="{ 'text-danger': calcGGR(bet.sales, bet.winngins) < 0}">{{ formatNumber(calcGGR(bet.sales, bet.winnings)) }}</td>
              <td :class="{ 'text-danger': calcGGR(bet.sales, bet.winnings) < 0}">{{ calcMargin(bet.sales, bet.winnings) }}</td>
              <td :class="{ 'text-danger': calcNGR(bet) < 0}">{{ formatNumber(calcNGR(bet)) }}</td>
            </tr>
            <tr v-if="bets.length < 1" v-show="!loading">
              <td colspan="7" class="text-center">
                <h4>No record found</h4>
              </td>
            </tr>
            <tr v-if="loading">
              <td colspan="7" class="text-center">
                <i class="fa fa-4x fa-spin fa-spinner"></i>
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <th>Total</th>
              <th>{{ formatNumber(totalTickets, false) }}</th>
              <th>{{ formatNumber(totalStake) }}</th>
              <th>{{ formatNumber(totalWinnings) }}</th>
              <th :class="{ 'text-danger': calcGGR(totalStake, totalWinnings) < 0}">{{ formatNumber(totalStake - totalWinnings)}}</th>
              <th :class="{ 'text-danger': calcGGR(totalStake, totalWinnings) < 0}">{{ calcMargin(totalStake, totalWinnings) }}</th>
              <th></th>
            </tr>
            </tfoot>
          </table>
        </div>
      </card>

    </div>
</template>
<script>
    import Bets from "../../services/bets";

    export default {
        name:'network_sales',
        layout: 'main',

        data(){
            return{
                title: 'Network Sales Report',
                filterData:{
                    period: 'today',
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    product_type:  'sports'
                },
                bets:'',
                totalTickets: 0,
                totalStake: 0,
                totalWinnings: 0,
                counter: 0,
                paging: true,
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                group_by: 'day',
                config: this.$store.state.flatpickrConfig,
                loading: false,
                offset: 4,
            }
        },
        methods:{
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
                Bets.getNetworkSales(this.filterData, page).then(res=>{
                    this.loading = false;
                    this.bets           = res.bets.data;
                    this.totalTickets   = res.totalTicket;
                    this.totalStake     = res.totalStake;
                    this.totalWinnings  = res.totalWinnings;
                    this.pagination     = res.bets;
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            resetFilter(){
                this.filterData = {
                    period: 'today',
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    bet_type:  ''
                }
            },
          calcMargin(sales, winnings){
            let margin = this.marginCalc(sales, winnings)
            return margin+'%';
          },
          calcGGR(sales, winnings){
            return (parseFloat(sales) - parseFloat(winnings))
          },
          calcNGR(bet){
            return (parseFloat(bet.sales) - parseFloat(bet.winnings))
          },
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Network Sales Report')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);
        }
    }
</script>
