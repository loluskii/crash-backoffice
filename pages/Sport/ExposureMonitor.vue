<template>
    <div >
       <form id="single-stop">
            <div class="row m-t-10">
                <div class="col-sm-2">
                    <label>Tickets per page</label>
                    <input type="text" class="form-control" id="pref-Air" v-model="filterData.page_size" placeholder="Recent X Placed Bets">
                </div>
                <div class="col-sm-2">
                    <label>Refresh Page every</label>
                    <select name="class" id="class-type" class="form-control" v-model="filterData.refresh_time">
                        <option value="30000">5 mins</option>
                        <option value="60000">10 mins</option>
                        <option value="90000">15 mins</option>
                        <option value="120000">20 mins</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <label>Completion %:</label>
                    <input type="text" class="form-control" id="pref-Air" v-model="filterData.completion_percent" placeholder="60%">
                </div>
                <div class="col-sm-2">
                    <label>Filter By</label>
                    <select name="class" id="class-type" class="form-control" v-model="filterData.monitor_type">
                        <option value="">Stake/Winnings</option>
                        <option value="stake">Stake</option>
                        <option value="pot_winnings">Pot. Winnings</option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <label>Amount range</label>
                    <input type="text" class="form-control" id="pref-Air" placeholder="=> 1000" v-model="filterData.amount_range">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <label>&nbsp;&nbsp;</label>
                    <button type="button" @click="loadData(1)" class="btn btn-info btn-block">Apply Filter</button>
                </div>
            </div>
        </form>
        <hr style="border: 2px solid #eee">
        <card title="Results" excel="false">
            <div class="table-responsive" >
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Betslip ID</th>
                        <th>Username</th>
                        <th>Bet Type</th>
                        <th>Stake</th>
                        <th>Pot. Winnings</th>
                        <th>Date/Time</th>
                        <th>Total Selection</th>
                        <th>Won</th>
                        <th>Running</th>
                        <th>% Complete</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody v-for="(bet, index) in bets" :key="index" v-if="bets.length > 0 && !loading">
                        <tr>
                            <td>
                                <a href="javascript:;" @click="showChild($event, index, bet.betslip_id)">
                                    {{ bet.betslip_id }}
                                </a>
                            </td>
                            <td>
                                <nuxt-link :to="'/PlayerManagement/PlayerInfo/'+bet.user_id" v-if="bet.role_id !== 4">
                                    {{bet.username}}
                                </nuxt-link>
                                <nuxt-link :to="'/Network/Agent/'+bet.user_id" v-if="bet.role_id === 4">
                                    {{bet.username}}
                                </nuxt-link>
                            </td>
                            <td>{{ bet.bet_type}}</td>
                            <td>{{ formatNumber(bet.stake) }}</td>
                            <td>{{ formatNumber(bet.pot_winnings) }}</td>
                            <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                            <td>{{ bet.total }}</td>
                            <td>{{ bet.won }}</td>
                            <td>{{ bet.running }}</td>
                            <td v-html="calculatePerc(bet)"></td>
                            <td>
                                <button type="button"
                                    class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                                    style="color: #757575" @click="updateTicket(bet.id, 'reject')">
                                    <i class="fa fa-ban" aria-hidden="true"></i>
                                </button>
                                <button type="button"
                                    class="btn btn-sm btn-icon btn-flat btn-success text-white"
                                    style="color: #757575" @click="updateTicket(bet.id, 'pending')">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                        <tr :id="index+'_child'" class='d-none'>
                            <td colspan="10">
                                <div style="width: 100%" v-if="loadingChild" class="text-center">
                                    <i class="fa fa-spin fa-spinner fa-3x"></i>
                                </div>
                                <bet-details v-if="details" :bet="details"></bet-details>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!loading && !bets.length" class="text-center nodata mt-2">
                    No result found
                </div>
                <div style="width: 100%" v-if="loading" class="text-center">
                    <i class="fa fa-spin fa-spinner fa-3x"></i>
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
                            v-on:click.native="loadData(pagination.current_page)"
                            :offset="4">
                        </paginate>
                    </div>
                </div>
            </div>
        </card>
    </div>
</template>
<script>
    import Bets from "../../services/bets";
    import card from '../../components/card'
    import BetDetails from '../../components/BetDetails'
    export default {
        name:'bets-monitor',
        layout: 'main',
        components:{
            card,
            BetDetails
        },
        data(){
            return{
                title: 'Exposure Monitor',
                filterData:{
                    // bet_type:'',
                    monitor_type: '',
                    amount_range: '',
                    completion_percent: '',
                    page_size: 50,
                    refresh_time: 30000
                },
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                settings: false,
                offset: 4,
                timer: '',
                bets: [],
                details: null,
                loading: false,
                loadingChild: false,
                refreshing: null,
                currency: this.$store.state.currencySymbol,
            }
        },
        methods:{
            formatNumber(number){
                return this.currency+''+parseFloat(number).toLocaleString()
            },
            loadData(page){
                this.loading = true
                this.$axios.post('/admin/sport/exposure-monitor?page='+page, this.filterData).then(res=>{
                    this.loading = false;
                    this.bets = res.data.data;
                    this.pagination = res.data;
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            showChild(e, index, betslip){
                let y = $(e.target).hasClass('fa-caret-right');
                if (y) {
                    $(e.target).removeClass('fa-caret-right')
                    $(e.target).addClass('fa-caret-down');
                }else{
                    $(e.target).removeClass('fa-caret-down')
                    $(e.target).addClass('fa-caret-right');
                        this.loadingChild = true;
                    this.$axios.get('admin/sport/get-bet?betslip_id='+betslip).then(res => {
                        this.details = res.data;
                        this.loadingChild = false;
                    }).catch(err => {
                        this.$toast.error('An error occured',{icon: 'times'})
                    })
                }
                $("#"+index+"_child").toggleClass('d-none');

            },
            calculatePerc(bet){
                let perc = parseFloat(bet.won * 100/bet.total).toFixed(2);
                if(perc < 50){
                    return '<span class="badge badge-info p-1">'+ perc +'</span>';
                }else if(perc < 70) {
                    return '<span class="badge badge-warning p-1">'+ perc +'</span>';
                }else {
                    return '<span class="badge badge-danger p-1">'+ perc +'</span>';
                }
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
                        self.loadData(self.pagination.current_page);
                    })
                }, function(dismiss) {

                })
            },
        },
        mounted() {
            let self =this;
            this.$axios.get('/admin/settings?category=exposure-monitor').then(res =>  {
                $.each(res.data, function(key, item){
                    if(item.option == 'monitor_type'){
                        self.filterData.monitor_type = item.value
                    }
                    if(item.option == 'amount_range'){
                        self.filterData.amount_range = item.value
                    }
                    if(item.option == 'page_size'){
                        self.filterData.page_size = item.value
                    }
                    if(item.option == 'completion_percent'){
                        self.filterData.completion_percent = item.value
                    }
                });
            }).catch(error => {
                toastr['error']('An error occured.', 'Error');
            });

            this.refreshing = setInterval(() => {
                self.loadData(1)
            }, this.filterData.refresh_time);
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Exposure Monitor')
        },
        beforeDestroy: function(){
            clearInterval(this.refreshing);
        }
    }
</script>
<style scoped>

</style>
