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
                    <select name="class" id="class-type" class="form-control" v-model="filterData.bet_type">
                        <option value="">Bet Type</option>
                        <option value="Single">Single Bet</option>
                        <option value="Multiple">Multiple Bet</option>
                        <option value="Combo">System Bet</option>
                        <option value="Split">Split Bet</option>
                    </select>
                </div>
            </div>
            <div class="row m-t-10">

                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.event_type">
                        <option value="">Pre Match/Live</option>
                        <option value="pre_match">Pre-Match</option>
                        <option value="live">Live</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Sport</option>
                    </select>
                </div>
                                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">League</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Markets</option>
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
                    <input type="text" class="form-control" id="pref-Air" placeholder="Betslip ID" v-model="filterData.betslip_id">
                </div>
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.group_type">
                        <option value="">Stake/Winnings</option>
                        <option value="stake">Stake</option>
                        <option value="pot_winnings">Winnings</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="=> 1000" v-model="filterData.amount_range">
                </div>
            </div>
            <div class="row m-t-10">
                <div class="col-sm-2">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
                </div>
                <div class="col-sm-3">
                  <div class="form-group">
                    <label class="price-alert">No. of Tickets: {{formatNumber(total_tickets, false)}}</label>
                  </div>
                </div>
                <div class="col-sm-3">
                  <div class="form-group">
                    <label class="price-alert">Amount Played: {{formatNumber(amount_played)}}</label>
                  </div>
                </div>
                <div class="col-sm-2">
                    <button type="submit" class="btn btn-info btn-block">Search</button>
                </div>
                <div class="col-sm-2">
                    <a href="#" @click="resetFilter">clear all filters</a>
                </div>
            </div>
        </form>
        <card title="Results" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Betslip ID</th>
                        <th>Bet Type</th>
                        <th>Placed on</th>
                        <th>By</th>
                        <!-- <th>State</th> -->
                        <!-- <th>Sports Limit</th> -->
                        <th>Odds</th>
                        <th>Stake</th>
                        <th>Potential Winnings</th>
                        <th>To Return</th>
                        <th>Sport</th>
                        <th>League</th>
                        <th>Event</th>
                        <th>Market</th>
                        <th>Selection</th>
                        <th>Client Type</th>
                    </tr>
                    </thead>
                    <tbody>
                        <template v-for="(bet, index) in bets">
                            <tr  :key="bet.id" v-if="bets.length > 0 && !loading">
                                <td>
                                    <i class="fa fa-caret-right mr-3" :id="'details_'+index" style="cursor: pointer" @click="showChild($event, index)"></i>
                                    <a href="javascript:;" @click="showChild($event, index)">
                                        {{ bet.betslip_id }}
                                    </a>
                                </td>
                                <td>{{ bet.bet_type}}</td>
                                <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                                <td>
                                    <router-link :to="'/PlayerManagement/PlayerInfo/'+bet.user_id" target="_blank">{{ bet.user.username }}</router-link>
                                </td>
                                <!-- <td>{{ bet.user.state.name }}</td> -->
                                <!-- <td>100%</td> -->
                                <td>{{ bet.odds.toFixed(2) }}</td>
                                <td>{{ currency+''+bet.stake }}</td>
                                <td>{{ formatNumber(bet.pot_winnings) }}</td>
                                <td>{{ formatNumber(bet.winnings) }}</td>
                                <td>{{ bet.sports }} </td>
                                <td>{{ bet.tournaments}}</td>
                                <td>{{ bet.events}}</td>
                                <td>{{ bet.markets}}</td>
                                <td>{{ bet.selections_count}} Selection(s)</td>

                                <td>{{ bet.channel }}</td>
                            </tr>
                            <tr :id="index+'_child'" class='d-none' :key="index">
                                <td colspan="21">
                                    <bet-details :bet="bet"></bet-details>
                                </td>
                            </tr>
                        </template>

                    <tr v-if="bets.length < 1" v-show="!loading">
                        <td colspan="15" class="text-center">
                            <h4>No record found</h4>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="15" class="text-center">
                            <i class="fa fa-4x fa-spin fa-spinner"></i>
                        </td>
                    </tr>

                    </tbody>
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
    import Sports from "../../services/sports";
    import Bets from "../../services/agents";
    import card from '../../components/card'
    import BetDetails from '../BetDetails'

    export default {
        name:'openbets',
        layout: 'main',
        components:{
            card,
            BetDetails
        },
        props:[
            'users'
        ],
        data(){
            return{
                title: 'Open Bets',
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
                    group_type: '',
                    amount_range: '',
                    betslip_id: ''
                },
                username: '',
                bets:'',
                counter: 0,
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                offset: 4,
                loading: false,
                amount_played: 0,
                total_tickets: 0,
                config: this.$store.state.flatpickrConfig,
                currency: this.$store.state.currencySymbol
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
                Bets.getOpenBets(this.$store.state.pageParam, this.filterData, page).then(res=>{
                    this.loading = false;
                    this.bets = res.bets.data;
                    this.pagination = res.bets;
                    this.amount_played = res.totalSales;
                    this.total_tickets = res.totalTickets;
                    // this.amount_won = res.amount_won;
                    // this.profit = res.profit;
                    // this.amount_played = res.amount_played;
                    // this.weeklySales = res.weeklySales;
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            showBetSlip(bet){
                console.log(bet);
            },
            resetFilter(){
                this.filterData = {
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
                    client_type: '',
                    group_type: '',
                    amount_range: '',
                    betslip_id: ''
                }
            },
            showChild(e, index){
                let y = $(e.target).hasClass('fa-caret-right');
                if (y) {
                    $(e.target).removeClass('fa-caret-right')
                    $(e.target).addClass('fa-caret-down')
                }else{
                    $(e.target).removeClass('fa-caret-down')
                    $(e.target).addClass('fa-caret-right')
                }
                $("#"+index+"_child").toggleClass('d-none');
            }

        },
        mounted(){
        }
    }
</script>
