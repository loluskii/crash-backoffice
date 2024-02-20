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
            <div class="row m-t-10">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.client_type">
                        <option value="">Client Type</option>
                        <option value="web">Website</option>
                        <option value="mobile">Mobile</option>
                        <option value="shop">Shop</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <input type="text" v-model="filterData.username" class="form-control" id="pref-Air" placeholder="Username">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <input type="text" v-model="filterData.ip_address" class="form-control" id="pref-Air" placeholder="IP Address">
                </div>
            </div>

            <div class="row m-t-10">
                <div class="col-sm-5">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
                </div>
                <div class="col-sm-2">
                    <button type="submit" class="btn btn-info btn-block">Search</button>
                </div>
                <div class="col-sm-3">
                    <a href="javascript:;" @click="resetFilter">clear all filters</a>
                </div>
            </div>

        </form>
        <card title="Results" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Login Time</th>
                            <th>Username</th>
                            <th>IP Address</th>
                            <th>Country</th>
                            <th>Cookies</th>
                            <th>Client Type</th>
                            <th>Device</th>
                            <th>Browser Type</th>
                            <th>Browser Version</th>
                            <th>Operating System</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(history, index) in histories" v-if="histories.length > 0" v-show="!loading" :key="index">
                            <td class="text-center">
                              {{formatDate(history.created_at, 'DD/MM/YYYY HH:mm:ss')}}
                            </td>
                            <td><a href="">{{ history.username }}</a></td>
                            <td>{{ history.login_ip }}</td>
                            <td>{{ history.country }}</td>
                            <td>{{ history.cookies }}</td>
                            <td>{{ history.client_type }}</td>
                            <td>{{ history.device }}</td>
                            <td>{{ history.browser_type }}</td>
                            <td>{{ history.browser_version }}</td>
                            <td>{{ history.os }}</td>
                        </tr>
                        <tr v-if="histories.length < 1" v-show="!loading">
                            <td colspan="10" class="text-center">
                                <h4>No record found</h4>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="10" class="text-center">
                                <i class="fa fa-4x fa-spin fa-spinner"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>

    </div>
</template>
<script>
import card from '../../components/card'
import Users from '../../services/users'
    export default {
        name:'login_history',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                filterData:{
                    period: 'today',
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    client_type: '',
                    ip_address: ''
                },
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
                Users.getLoginHistory(this.filterData, page).then(res=>{
                    this.loading = false;
                    this.histories = res.data;
                    this.pagination = res;
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
                    client_type: '',
                    ip_address: ''
                }
            }
        },
        head () {
            return {
                title: 'Logins History'
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Logins History')
        },
        mounted(){
        }
    }
</script>
