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
                    <select name="class" id="bet-type" class="form-control" v-model="filterData.bet_type">
                        <option value="">Bet Type</option>
                        <option value="single">Single Bet</option>
                        <option value="multiple">Combo Bet</option>
                    </select>
                </div>
            </div>
            <div class="row m-t-10">
                <div class="col-sm-3">
                    <v-select label="username" v-model="username"
                        @input="setUsername" placeholder="Username"
                        :options="users" name="username"></v-select>
                </div>
                <div class="col-sm-3">
                    <select name="class" id="s-type" class="form-control" v-model="filterData.group_type">
                        <option value="">Stake/Winnings</option>
                        <option value="stake">Stake</option>
                        <option value="pot_winnings">Winnings</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="=> 1000" v-model="filterData.amount_range">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="status" class="form-control" v-model="filterData.status">
                        <option value="">Status</option>
                        <option value="2">Lost</option>
                        <option value="1">Won</option>
                        <option value="3">Cancelled</option>
                        <option value="4">CUT1 (stake)</option>
                        <option value="5">CUT1 (5%)</option>
                    </select>
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
                    <button type="submit" class="btn btn-info btn-block">Search</button>
                </div>
                <div class="col-sm-2">
                    <a href="#">clear all filters</a>
                </div>
            </div>
        </form>
        <card title="Results" excel="true">
            <div class="table-responsive" >
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
                      {{bet.user.username}}
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
                  <th>Total Stake:</th>
                  <th>{{ formatNumber(totalStake) }}</th>
                  <th>Total Winnings:</th>
                  <th>{{ formatNumber(totalWinnings) }}</th>
                </tr>
                </tfoot>
              </table>
            </div>
        </card>
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
    </div>
</template>
<script>
    import Bets from "../../services/agents";
    import card from '../../components/card'

    export default {
        name:'virtual-sport',
        components:{
            card,
        },
        props:[
            'users'
        ],
        data(){
            return{
                title: 'Bet History',
                filterData:{
                    period: 'today',
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    bet_type:  '',
                    event_type:  '',
                    sport:  '',
                    league:  '',
                    market:  '',
                    state: '',
                    group_type: '',
                    amount_range: '',
                    status: ''
                },
                totalTickets: 0,
                totalStake: 0,
                totalWinnings: 0,
                username: '',
                bets:'',
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                offset: 4,
                loading: false,
                config: this.$store.state.flatpickrConfig,
                currency: this.$store.state.currencySymbol,
            }
        },
        methods:{
            setUsername(e){
                this.filterData.username = e.username
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
                Bets.getVirtualBet(this.$store.state.pageParam, this.filterData, page).then(res=>{
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

        },
        mounted(){
            // this.listBets(this.pagination.current_page);
        }
    }
</script>


