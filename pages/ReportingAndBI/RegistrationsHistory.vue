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
                    <select name="class" id="class-type" class="form-control">
                        <option value="">State</option>
                    </select>
                </div> 
            </div>
            <div class="row m-t-10">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.deposited">
                        <option value="">Deposited / Didn't Deposit</option>
                        <option value="yes">Deposited</option>
                        <option value="no">Didn't Deposit</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.product_type">
                        <option value="">Product Type</option>
                        <option value="sports">Sports</option>
                        <option value="casino">Casino</option>
                        <option value="games">Games</option>
                        <option value="Virtual">Virtual Sport</option>
                    </select>
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
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.verified">
                        <option value="">Email / Mobile Verification</option>
                        <option value="email_verified">Email Verified</option>
                        <option value="email_not_verified">Email Not Verified</option>
                        <option value="mobile_verified">Mobile Phone Verified</option>
                        <option value="mobile_not_verified">Mobile Phone Not Verified</option>
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
        <others v-if="group_by != 'player'" 
            :results="histories" :pagination="pagination" 
            :counter="counter" :loading="loading" :offset="offset" :group_by="group_by">
        </others>
        <player v-if="group_by == 'player'" :results="histories" :pagination="pagination" 
            :counter="counter" :loading="loading" :offset="offset"></player>
    </div>
</template>
<script>
    import Others from '../../components/registration-history/others.vue'
    import Player from '../../components/registration-history/player.vue'
    import Users from '../../services/users'
    export default {
        name:'registrations_history',
        layout: 'main',
        components:{
            Others,
            Player
        },
        data(){
            return{
                title: 'Registrations History',
                filterData:{
                    period: 'today',
                    state: '',
                    product_type: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    client_type: '',
                    deposited: '',
                    verified: '',
                    group_by: 'day'
                },
                groups: [
                    { text: 'Day', value: 'day' }, 
                    { text: 'Month', value: 'month' }, 
                    { text: 'State', value: 'state' },
                    { text: 'Player', value: 'player' }, 
                    { text: 'Product', value: 'product' }, 
                    { text: 'Client Type', value: 'client_type' }
                ],
                config: this.$store.state.flatpickrConfig, 
                histories:'',
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
                Users.getRegistrationHistory(this.filterData, page).then(res=>{
                    this.loading = false;
                    this.history = res.data;
                    this.pagination = res.bets;
                    this.group_by = this.filterData.group_by
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            resetFilter(){
                this.filterData = {
                    period: 'today',
                    state: '',
                    product_type: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    client_type: '',
                    deposited: '',
                    verified: '',
                    group_by: 'day'
                }
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Registrations History')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);            
        }
    }
</script>