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
                        <flat-pickr v-model="filterData.from" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Betslip ID" v-model="filterData.betslip_id">
                </div>
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Username" v-model="filterData.username">
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
                        <th>Sports Limit</th>
                        <th>Sport</th>
                        <th>League</th>
                        <th>Event</th>
                        <th>Event Date</th>
                        <th>Market</th>
                        <th>Selection</th>
                        <th>Odds</th>
                        <th>Stake</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="bet in bets" :key="bet.id" v-if="bets.length > 0 && !loading">
                        <td>
                            <a href="javascript:;" @click="showBetSlip(bet)">
                                {{ bet.betslip_id }}
                            </a>
                        </td>
                        <td>{{ bet.bet_type}}</td>
                        <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                        <td>
                            <a href="javascript:;">
                                {{ bet.username }}
                            </a>
                        </td>                    <!-- <td>{{ bet.user.state.name }}</td> -->
                        <td>100%</td>
                        <td>{{ bet.sport }}</td>
                        <td>{{ bet.tournament }}</td>
                        <td>{{ bet.event }}</td>
                        <td>{{ displayDate(bet.start_date, 'DD/MM/YYYY HH:mm') }}</td>
                        <td>{{ bet.market_name }}</td>
                        <td>{{ bet.odd_name }}</td>
                        <td>{{ bet.odd }}</td>
                        <td>{{ formatNumber(bet.stake) }}</td>
                    </tr>
                    <tr v-if="bets.length < 1 && !loading">
                        <td colspan="13" class="text-center">
                            <h4>No record found</h4>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="13" class="text-center">
                            <i class="fa fa-4x fa-spin fa-spinner"></i>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- <div class="row">
                <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">Showing 1 to 10 of 40 entries</div>
                </div>
                <div class="col-sm-12 col-md-7">
                    <div class="dataTables_paginate paging_simple_numbers pull-right" id="sample_1_paginate">
                        <ul class="pagination">
                            <li class="paginate_button page-item previous disabled" id="sample_1_previous">
                                <a href="#" tabindex="0" class="page-link">Previous</a>
                            </li>
                            <li class="paginate_button page-item active"><a href="#" aria-controls="sample_1" tabindex="0" class="page-link">1</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="sample_1" tabindex="0" class="page-link">2</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="sample_1" tabindex="0" class="page-link">3</a></li>
                            <li class="paginate_button page-item "><a href="#" aria-controls="sample_1" data-dt-idx="4" tabindex="0" class="page-link">4</a></li>
                            <li class="paginate_button page-item next" id="sample_1_next"><a href="#" aria-controls="sample_1" data-dt-idx="5" tabindex="0" class="page-link">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div> -->
        </card>
    </div>
</template>
<script>
    import Bets from "../../services/bets";
    import card from '../../components/card'
    export default {
        name:'declinedbets',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Declined Bets History',
                filterData:{
                    period: 'today',
                    betslip_id: '',
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
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
                config: this.$store.state.flatpickrConfig,
                currency: this.$store.state.currencySymbol
            }
        },
        methods:{
            formatNumber(number){
                return this.currency+''+parseFloat(number).toLocaleString()
            },
            displayDate(str, format) {
                var t = new Date(str*1000);
                let tm = t/1000;
                return this.$moment(tm).format(format);
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
                Bets.getDeclinedBets(this.filterData, page).then(res=>{
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
            showBetSlip(bet){
                console.log(bet);
            },
            resetFilter(){
                this.filterData = {
                    period: 'today',
                    betslip_id: '',
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                }
            }

        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Declined Bets History')
        },
        mounted(){
        }
    }
</script>
