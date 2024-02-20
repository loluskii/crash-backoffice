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
                    <select name="class" id="status" class="form-control" v-model="filterData.status">
                        <option value="">All</option>
                        <option value="1">Won</option>
                        <option value="2">Lost</option>
                    </select>
                </div>
            </div>

            <div class="row m-t-10">
                <div class="col-sm-2">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" v-model="paging" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
                </div>
                <div class="col-sm-3">
                  <div class="form-group">
                    <label class="price-alert">No. of Tickets: {{formatNumber(totalTickets, false)}}</label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="form-group">
                    <label class="price-alert">Amount Played: {{formatNumber(totalStake)}}</label>
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
              <th>Player</th>
              <th class="text-center">Ticket Number</th>
              <th>Stake</th>
              <th>Placed on</th>
              <th>Amount Won</th>
              <th>Jackpot</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(bet, index) in bets" v-if="bets.length > 0" v-show="!loading" :key="index">
              <td>
                <i class="fa fa-fw fa-angle-right pull-left"></i>
                <nuxt-link :to="'/PlayerManagement/PlayerInfo/'+bet.user_id" >
                  {{bet.username}}
                </nuxt-link>
              </td>
              <td class="text-center">{{ bet.ticket_number }}</td>
              <td>{{ formatNumber(bet.stake) }}</td>
              <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:MM') }}</td>
              <td>{{ formatNumber(bet.amount_won) }}</td>
              <td>{{ formatNumber(bet.jackpot_amount) }}</td>
              <td :class="setClass(bet.status)">{{ getStatus(bet.status) }}</td>
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
              <th>Total Tickets:</th>
              <th>{{ formatNumber(totalTickets, false) }}</th>
              <th>
                {{ formatNumber(totalStake) }}
              </th>
              <th></th>
              <th>{{ formatNumber(totalWinnings) }}</th>
              <th></th>
              <th></th>
            </tr>
            </tfoot>
          </table>
        </div>
        <div class="row mt-3">
          <!-- <div class="col-sm-12 col-md-5">
              <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">Showing 1 to 10 of 40 entries</div>
          </div> -->
          <div class="col-sm-12 col-md-7">

            <div class="dataTables_paginate paging_simple_numbers pull-right" id="sample_1_paginate">
              <paginate
                v-bind:pagination="pagination"
                v-on:click.native="getResults(pagination.current_page)"
                :offset="4">
              </paginate>

            </div>
          </div>
        </div>
      </card>

    </div>
</template>
<script>
    import Bets from "../services/bets";

    export default {
        name:'virtual_sports',
        layout: 'main',

        data(){
            return{
                title: 'Virtual Sports',
                filterData:{
                    period: 'today',
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    bet_type:  ''
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
                Bets.getVirtualSport(this.filterData, page).then(res=>{
                    this.loading = false;
                    this.bets           = res.bets.data;
                    this.totalTickets   = res.totalTickets;
                    this.totalStake     = res.totalSales;
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
          calcGGR(sales, winnings){
            return (parseFloat(sales) - parseFloat(winnings))
          },
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Virtual Sport')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);
        }
    }
</script>
