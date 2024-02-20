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
            </div>

            <div class="row m-t-10 form-group">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.transaction_type">
                        <option value="">Operation Group</option>
                        <option value="bet_deposits">Bet Deposits</option>
                        <option value="bet_winnings">Bet Winnings</option>
                        <option value="deposits">Deposits</option>
                        <option value="withdrawals">Withdrawals</option>
                        <option value="d_w">Deposits & Withdrawals</option>
                        <option value="bonuses">Bonuses</option>
                        <option value="interaccount">Interaccount Transfers</option>
                        <option value="cut_1_stake">CUT(1) Stake</option>
                        <option value="cut_1_5">CUT(1) 5%</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Transaction ID" v-model="filterData.transaction_id">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Keyword" v-model="filterData.keyword">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Username" v-model="filterData.username">
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
        <hr style="border: 2px solid #eee">

        <card title="Results" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Operation Type</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Prev. Balance</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(result, index) in results" v-if="results.length > 0 && !loading" :key="index">
                            <td>{{ formatDate(result.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                            <td>{{ result.reference_no}}</td>
                            <td>
                                <a href="#">
                                    {{ result.from_user }}
                                </a>
                            </td>
                            <td>
                                <a href="#">
                                    {{ result.to_user }}
                                </a>
                            </td>
                            <td>{{ result.subject }}</td>
                            <td>{{ result.description }}</td>
                            <td :class="{'text-danger': result.tranx_type == 'debit'}">
                                {{ formatNumber(result.amount, result.tranx_type) }}
                            </td>
                            <td>{{
                                result.tranx_type === 'debit' ? formatNumber(parseFloat(result.from_user_balance) + parseFloat(result.amount)) : formatNumber(parseFloat(result.to_user_balance) - parseFloat(result.amount))
                                 }}
                            </td>
                            <td>{{
                                result.tranx_type === 'debit' ? formatNumber(parseFloat(result.from_user_balance)) : formatNumber(parseFloat(result.to_user_balance))
                            }}</td>
                        </tr>
                        <tr v-if="results.length < 1" v-show="!loading">
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
import card from "../../components/card.vue"
import Reports from '../../services/reports'

    export default {
        name:'money_transactions',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Money Transactions',
                filterData:{
                    period: 'today',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    transaction_type: '',
                    transaction_id: '',
                    keyword: '',
                    username: '',
                },
                config: this.$store.state.flatpickrConfig,
                currency: this.$store.state.currencySymbol,
                results: '',
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
            }
        },
        methods:{
            formatNumber(number, type){
                let n = parseFloat(number).toLocaleString()
                if(type == 'debit'){
                    return this.currency+'-'+n;
                }else{
                    return this.currency+''+n;
                }
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
                Reports.getMoneyTransactions(this.filterData, page).then(res=>{
                    this.loading = false;
                    this.results = res.data;
                    this.pagination = res;
                }).catch(err => {
                    this.loading = false;
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            resetFilter(){
                this.filterData = {
                    period: 'today',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    transaction_type: '',
                    transaction_id: '',
                    keyword: '',
                    username: '',
                }
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Money Transactions')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);
        }
    }
</script>
