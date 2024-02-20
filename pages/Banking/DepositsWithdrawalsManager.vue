<template>
    <div>
       <form id="single-stop" @submit.prevent="getResults(1)">
           <div class="row m-t-10 form-group">
                <div class="col-sm-10">
                    <b-form-radio-group :options="groups" @change="results = []" v-model="filterData.type" class="inlineRadio">
                    </b-form-radio-group>
                </div>
            </div>
            <div class="row m-t-10">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.status">
                        <option value="">Transaction Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Declined">Declined</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.payment_method">
                        <option value="">Payment Method</option>
                        <option value="Paystack">Paystack</option>
                        <option value="Interswitch">Interswitch</option>
                        <option value="Flutterwave">Flutterwave</option>
                        <option value="9Pay">9Pay</option>
                        <option value="OPay">OPay</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Location</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Bank</option>
                    </select>
                </div>
            </div>
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
            <div class="row m-t-10">
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Username" v-model="filterData.username">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Transaction ID" v-model="filterData.transaction_id">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Keyword" v-model="filterData.keyword">
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
                    <a href="#">clear all filters</a>
                </div>
            </div>
        </form>
        <hr style="border: 2px solid #eee">
        <card title="Results" excel="true">
            <div class="table-responsive">
                <withdrawal-table v-if="filterData.type === 'Withdrawal'" :payouts="results"></withdrawal-table>
                <deposit-table v-if="filterData.type === 'Deposit'" :deposits="results"></deposit-table>
                <div v-if="!loading && !results.length" class="text-center nodata">
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
    </div>
</template>
<script>
import card from "../../components/card.vue"
import WithdrawalTable from "../../components/WithdrawalTable"
import DepositTable from "../../components/DepositTable"
import Reports from '../../services/reports'

    export default {
        name:'depositwithdrawalsmanager',
        layout: 'main',
        components:{
            card,
            WithdrawalTable,
            DepositTable
        },
        data(){
            return{
                title: 'Deposits/Withdrawals Manager',
                filterData:{
                    period: 'today',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    status: '',                 
                    payment_method: '',
                    type: 'Withdrawal',
                    username: '',
                    transaction_id: '',
                    keyword: '',
                },
                groups: [
                    { text: 'Withdrawals', value: 'Withdrawal' }, 
                    { text: 'Deposits', value: 'Deposit' }, 
                ],
                config: this.$store.state.flatpickrConfig,
                currency: this.$store.state.currencySymbol,
                results:'',
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
                Reports.getDepositWithdrawal(this.filterData, page).then(res=>{
                    this.loading = false;
                    this.results = res.data;
                    this.pagination = res;
                }).catch(err => {                    
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Deposits/Withdrawals Manager')
        },
        mounted(){
            this.$nuxt.$on('withdrawal_update', ()=>{
                this.getResults(this.pagination.current_page)
            })
        }
    }
</script>