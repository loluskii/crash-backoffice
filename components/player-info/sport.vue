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
                    <select name="class" id="class-type" class="form-control" v-model="filterData.bet_type">
                        <option value="">Bet Type</option>
                        <option value="Single">Single Bet</option>
                        <option value="Multiple">Multiple Bet</option>
                        <option value="Combo">System Bet</option>
                        <option value="Split">Split Bet</option>
                    </select>
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
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.status">
                        <option value="">Status</option>
                        <option value="2">Lost</option>
                        <option value="1">Won</option>
                        <option value="3">Cancelled</option>
                        <option value="4">CUT 2</option>
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
                <div class="col-sm-6">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
                </div>

                <div class="col-sm-3">
                    <button type="submit" class="btn btn-info btn-block">Search</button>
                </div>
                <div class="col-sm-3">
                    <a href="#">clear all filters</a>
                </div>
            </div>
        </form>
        <card title="Results" excel="true">
            <div class="table-responsive" >
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Betslip ID</th>
                        <th>Bet Type</th>
                        <th>Placed on</th>
                        <!-- <th>State</th> -->
                        <!-- <th>Sports Limit</th> -->
                        <th>Bet Status</th>
                        <th>Odds</th>
                        <th>Stake</th>
                        <th>Return</th>
                        <th>Win/Loss</th>
                        <th>Sport</th>
                        <th>League</th>
                        <th>Event</th>
                        <th>Market</th>
                        <th>Selection</th>

                        <th>Client Type</th>
                        <th>Bonus</th>
                        <!-- <th>Real Money%</th> -->
                        <!-- <th>Bonus Money%</th> -->
                        <!-- <th>Gain with Real Money%</th> -->
                        <th>Bet Settled Date & Time</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody v-for="(bet, index) in bets" :key="index" v-if="bets.length > 0 && !loading">
                    <tr>
                        <td>
                            <i class="fa fa-caret-right mr-3" style="cursor: pointer" @click="showChild($event, index)"></i>
                            <a href="javascript:;" @click="showChild($event, index)">
                                {{ bet.betslip_id }}
                            </a>
                        </td>
                        <td>{{ bet.bet_type_desc}}</td>
                        <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                        <!-- <td>100%</td> -->
                        <td :class="setClass(bet.status)">{{ getStatus(bet.status) }}</td>
                        <td>{{ bet.odds.toFixed(2) }}</td>
                        <td>{{ currency+''+bet.stake }}</td>
                        <td>{{ formatNumber(bet.winnings) }}</td>
                        <td :class="setClass(bet.status)">{{ calcWinLoss(bet) }}</td>
                        <td>{{ bet.sports }}</td>
                        <td>{{ bet.tournaments}}</td>
                        <td>{{ bet.events}}</td>
                        <td>{{ bet.markets}}</td>
                        <td>{{ bet.selections_count}} Selection(s)</td>
                        <td>{{ bet.channel }}</td>
                        <td>{{ formatNumber(bet.bonus) }}</td>
                        <!-- <td>100.00%</td> -->
                        <!-- <td>{{ calcBonusPerc(bet)}}</td> -->
                        <!-- <td>{{ formatNumber(bet.winnings) }}</td> -->
                        <td>{{ bet.settled_at }}</td>
                        <td>
                            <button type="button"
                          class="btn btn-sm btn-icon btn-flat btn-info text-white"
                          style="color: #757575" @click="edit(bet)">
                          <i class="fa fa-edit" aria-hidden="true"></i>
                        </button>
                        <button type="button"
                          class="btn btn-sm btn-icon btn-flat btn-danger text-white"
                          style="color: #757575" @click="deleteTicket($event, bet.id)">
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                        <button type="button"
                          class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                          style="color: #757575" v-if="bet.status !== 2" @click="updateTicket(bet.id, 'lost')">
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                        <button type="button"
                          class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                          style="color: #757575" v-if="bet.status !== 3" @click="updateTicket(bet.id, 'void')">
                          <i class="fa fa-ban" aria-hidden="true"></i>
                        </button>
                        <button type="button"
                          class="btn btn-sm btn-icon btn-flat btn-success text-white"
                          style="color: #757575" v-if="bet.status !== 1" @click="updateTicket(bet.id, 'won')">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                        </td>
                    </tr>
                    <tr :id="index+'_child'" class='d-none'>
                        <td colspan="21">
                            <bet-details :bet="bet"></bet-details>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div v-if="!loading && !bets.length" class="text-center nodata">
                    <h5>No data</h5>
                </div>
                <div style="width: 100%" v-if="loading" class="text-center">
                    <i class="fa fa-spin fa-spinner fa-4x"></i>
                </div>
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
        <edit-bet></edit-bet>
    </div>
</template>
<script>
    import Sports from "../../services/sports";
    import Player from "../../services/players";
    import card from '../../components/card'
    import BetDetails from '../../components/BetDetails'
    import EditBet from '../../components/EditBet'

    export default {
        name:'bethistory',
        layout: 'main',
        props:[
            'id'
        ],
        components:{
            card,
            BetDetails,
            EditBet
        },
        data(){
            return{
                title: 'Bet History',
                filterData:{
                    period: 'today',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    bet_type:  '',
                    event_type:  '',
                    sport:  '',
                    league:  '',
                    market:  '',
                    client_type: '',
                    group_type: '',
                    amount_range: '',
                    betslip_id: '',
                    status: ''
                },
                bets:'',
                counter: 0,
                weeklySales: 0,
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                offset: 4,
                loading: false,
                amount_played : 0,
                amount_won: 0,
                profit: 0,
                config: this.$store.state.flatpickrConfig,
                currency: this.$store.state.currencySymbol,
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
            formatNumber(number){
                return this.currency+''+parseFloat(number).toLocaleString()
            },
            getResults(page){
                this.loading = true
                Player.getPlayerBetList(this.id, this.filterData, page).then(res=>{
                    this.loading = false;
                    this.bets = res.bets.data;
                    this.pagination = res.bets;
                    // this.amount_won = res.amount_won;
                    // this.profit = res.profit;
                    // this.amount_played = res.amount_played;
                    // this.weeklySales = res.weeklySales;
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            getStatus(status){
                if(status == 1){
                    return 'Won';
                }else if(status == 2){
                    return 'Lost';
                }else if(status == 3){
                    return 'Cancelled';
                }else if(status == 4){
                    return 'CUT1 (stake)';
                }else if(status == 5){
                    return 'CUT1 (5%)';
                }else if(status == 6){
                    return 'Cancelled';
                }
            },
            calcBonusPerc(bet){
                let perc = (100*bet.bonus/parseFloat(bet.pot_winnings))
                return perc.toFixed(2).toLocaleString()+'%'
            },
            calcWinLoss(bet){
                if(bet.status === 1 || bet.status === 4){
                    let winloss = parseFloat(bet.winnings) - parseFloat(bet.stake)
                    return "-"+this.formatNumber(winloss.toFixed(2));
                }else if(bet.status === 2){
                    return this.formatNumber(bet.stake);
                }else{
                    return 0;
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
            },
            updateTicket(id, action){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    // text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No'
                }).then(function() {
                    Bets.updateTicket(id, action).then(res=>{
                    window.location.reload()
                    })
                }, function(dismiss) {

                })
            },
            edit(ticket){
                this.$nuxt.$emit('edit_ticket', ticket)
            },
            deleteTicket(e, id){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete item!',
                    cancelButtonText: 'No, keep item'
                }).then((result)=> {
                    if (result.value) {
                        Bets.delete(id).then(res=>{
                            if(res.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Item has been removed', 'success');
                            }
                        });
                    }
                }, function(dismiss) {

                })
            }
        }
    }
</script>


