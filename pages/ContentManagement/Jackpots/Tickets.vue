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
                    <select name="class" id="class-type" class="form-control" v-model="filterData.jackpot_id">
                        <option value="">Select Jackpot</option>
                        <option v-for="jackpot in jackpots" :key="jackpot.id" :value="jackpot.id">{{ jackpot.title }}</option>

                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">State</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" class="form-control" v-model="filterData.status">
                        <option value="">Status</option>
                        <option value="1 lost">1 Lost</option>
                        <option value="2 lost">2 Lost</option>
                        <option value="all lost">All lost</option>
                        <option value="all won">All Won</option>
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
                        <th>Betslip ID</th>
                        <th>Placed on</th>
                        <th>By</th>
                        <th>Status</th>
                      <th>Stake</th>
                      <th>Amount won</th>
                        <th>Total Games</th>
<!--                        <th>Lost Events</th>-->
                        <th>Client Type</th>
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
                        <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                        <td>
                            <span v-if="bet.user">
                                <nuxt-link :to="'/PlayerManagement/PlayerInfo/'+bet.user.id" v-if="bet.user.role_id !== 4">
                                    {{bet.user.username}}
                                </nuxt-link>
                                <nuxt-link :to="'/Network/Agent/'+bet.user.id" v-if="bet.user.role_id === 4">
                                    {{bet.user.username}}
                                </nuxt-link>
                            </span>
                            <span v-else>{{bet.user_id}}</span>

                        </td>
                        <td :class="setClass(bet.status)">{{ getStatus(bet.status) }}</td>
                        <td>{{ currency+''+bet.stake }}</td>
                      <td>{{ formatNumber(bet.winnings) }}</td>
                      <td>{{ bet.selections_count}} Events</td>
<!--                        <td>{{ bet.lost_events_count}}</td>-->
                        <td>{{ bet.channel }}</td>
                        <td>{{ bet.settled_at }}</td>
                        <td>
<!--                        <button type="button" v-permission="'Delete ticket'"-->
<!--                          class="btn btn-sm btn-icon btn-flat btn-danger text-white"-->
<!--                          style="color: #757575" @click="deleteTicket($event, bet.id)">-->
<!--                          <i class="fa fa-trash" aria-hidden="true"></i>-->
<!--                        </button>-->
                        <button type="button" v-permission="'Cancel Ticket'"
                          class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                          style="color: #757575" v-if="bet.status !== 2" @click="updateTicket(bet.id, 'lost')">
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                        <button type="button" v-permission="'Void Ticket'"
                          class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                          style="color: #757575" v-if="bet.status !== 3" @click="updateTicket(bet.id, 'void')">
                          <i class="fa fa-ban" aria-hidden="true"></i>
                        </button>
                        <button type="button" v-permission="'Mark as won'"
                          class="btn btn-sm btn-icon btn-flat btn-success text-white"
                          style="color: #757575" v-if="bet.status !== 1" @click="showWinningModal(bet)">
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                        </td>
                    </tr>
                    <tr :id="index+'_child'" class='d-none'>
                        <td colspan="11">
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
        <winning-modal />
    </div>
</template>
<script>
    import Bets from "../../../services/bets";
    import CMS from "../../../services/cms";
    import card from '../../../components/card'
    import BetDetails from '../../../components/BetDetails'
    import WinningModal from '../../../components/JackpotWinningModal'

    export default {
        name:'jackpot-tickets',
        layout: 'main',
        components:{
            card,
            BetDetails,
            WinningModal
        },
        data(){
            return{
                title: 'Jackpot Tickets',
                filterData:{
                    period: 'today',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    jackpot_id:  '',
                    client_type: '',
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
                jackpots: [],
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
                Bets.getJackpotTickets(this.filterData, page).then(res=>{
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
            getJackpots(){
                CMS.listActiveJackpots().then(res=>{
                    this.jackpots = res;
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
                    return 'CUT 2';
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
            showWinningModal(ticket){
                this.$nuxt.$emit('show_winning_modal', ticket)
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
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Jackpot Tickets')
        },
        mounted(){
            this.getJackpots();
        }
    }
</script>


