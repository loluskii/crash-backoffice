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
                <div class="col-sm-3">
                    <select name="class" id="event-type" class="form-control" v-model="filterData.event_type">
                        <option value="">Pre Match/Live</option>
                        <option value="pre_match">Pre-Match</option>
                        <option value="live">Live</option>
                    </select>
                </div>
              <br class="d-sm-none">
              <div class="col-sm-3">
                <select name="class" id="state-type" class="form-control" v-model="filterData.state">
                  <option value="">State</option>
                </select>
              </div>
              <br class="d-sm-none">
              <div class="col-sm-3">
                <select name="class" id="bet-type" class="form-control" v-model="filterData.bet_type">
                  <option value="">Bet Type</option>
                  <option value="single">Single Bet</option>
                  <option value="multiple">Combo Bet</option>
                </select>
              </div>
              <br class="d-sm-none">
              <div class="col-sm-3">
                <select name="class" id="client-type" class="form-control" v-model="filterData.client_type">
                  <option value="">Client Type</option>
                  <option value="website">Website</option>
                  <option value="mobile">Mobile</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>


            </div>
            <div class="row m-t-10">
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Username" v-model="filterData.username">
                </div>
              <br class="d-sm-none">
              <div class="col-sm-3">
                <select name="class" id="sport-type" class="form-control" v-model="filterData.sport">
                  <option value="">Sport</option>
                </select>
              </div>
              <br class="d-sm-none">
              <div class="col-sm-3">
                <select name="class" id="league-type" class="form-control" v-model="filterData.league">
                  <option value="">League</option>
                </select>
              </div>
              <br class="d-sm-none">
              <div class="col-sm-3">
                <select name="class" id="market-type" class="form-control" v-model="filterData.market">
                  <option value="">Market Type</option>
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
       <others v-if="group_by != 'user_id'"
            :bets="bets" :pagination="pagination"
            :counter="counter" :totalStake="totalStake" :totalTickets="totalTickets" :totalWinnings="totalWinnings"
            :loading="loading" :offset="offset" :group_by="group_by">
        </others>
        <player v-if="group_by == 'user_id'" :bets="bets" :pagination="pagination"
        :totalStake="totalStake" :totalTickets="totalTickets" :totalWinnings="totalWinnings" :totalDeposit="totalDeposit"
            :counter="counter" :loading="loading" :offset="offset"></player>

    </div>
</template>
<script>
    import Sports from "../../services/sports";
    import Bets from "../../services/bets";
    import Others from '../../components/gaming-activity/others.vue'
    import Player from '../../components/gaming-activity/player.vue'

    export default {
        name:'gamin_activity',
        layout: 'main',
        components:{
            Others,
            Player
        },
        data(){
            return{
                title: 'Gaming Activity',
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
                    product_type: 'sports',
                    client_type: '',
                    group_by: 'day'
                },
               groups: [
                    { text: 'Bet Type', value: 'bet_type' },
                    // { text: 'State', value: 'state' },
                    { text: 'Sport', value: 'sports' },
                    { text: 'League', value: 'tournaments' },
                    { text: 'Market', value: 'markets' },
                    { text: 'Player', value: 'user_id' },
                    { text: 'Product', value: 'product_type' },
                    { text: 'Day', value: 'day' },
                    { text: 'Month', value: 'month' },
                    { text: 'Client Type', value: 'client_type' },
                    { text: 'Pre-Match/Live', value: 'event_type' },
                ],
                bets:'',
                totalTickets: 0,
                totalStake: 0,
                totalWinnings: 0,
                totalDeposit: 0,
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
                agent_id: this.$store.state.pageParam
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
                Bets.getAgentGamingActivity(this.agent_id, this.filterData, page).then(res=>{
                    this.loading = false;
                    this.bets = res.bets.data;
                    this.pagination = res.bets;
                    this.totalTickets   = res.totalTickets;
                    this.totalStake     = res.totalStake;
                    this.totalWinnings  = res.totalWinnings;
                    this.totalDeposit   = res.totalDeposit;
                    this.group_by = this.filterData.group_by
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
                    bet_type:  '',
                    event_type:  '',
                    sport:  '',
                    league:  '',
                    market:  '',
                    state: '',
                    product_type: '',
                    client_type: '',
                    group_by: 'player'
                }
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Gaming Activity')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);
        }
    }
</script>
