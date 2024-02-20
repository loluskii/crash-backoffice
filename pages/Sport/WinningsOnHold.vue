<template>
    <div >

        <card title="Results" excel="false">
            <div class="table-responsive" >
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Betslip ID</th>
                        <th>Username</th>
                        <th>Bet Type</th>
                        <th>Selection</th>
                        <th>Odds</th>
                        <th>Stake</th>
                        <th>Return</th>
                        <th>Client Type</th>
                        <th>Date/Time</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody v-for="(bet, index) in bets" :key="index" v-if="bets.length > 0 && !loading">
                        <tr>
                            <td>
                                <a href="javascript:;" @click="showChild($event, index)">
                                    {{ bet.betslip_id }}
                                </a>
                            </td>
                            <td>
                                <a href="javascript:;">
                                    {{ bet.user.username }}
                                </a>
                            </td>
                            <td>{{ bet.bet_type}}</td>
                            <td>{{ bet.selections_count}} Selection(s)</td>
                            <td>{{ bet.odds }}</td>
                            <td>{{ formatNumber(bet.stake) }}</td>
                            <td>{{ formatNumber(bet.winnings) }}</td>
                            <td>{{ bet.channel }}</td>
                            <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                            <td>
                                <button type="button"
                                    class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                                    style="color: #757575" @click="updateTicket(bet.id, 'lost')">
                                    <i class="fa fa-ban" aria-hidden="true"></i>
                                </button>
                                <button type="button"
                                    class="btn btn-sm btn-icon btn-flat btn-success text-white"
                                    style="color: #757575" @click="updateTicket(bet.id, 'won')">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                        <tr :id="index+'_child'" class='d-none'>
                            <td colspan="10">
                                <bet-details :bet="bet"></bet-details>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="!loading && !bets.length" class="text-center nodata mt-2">
                    Set your preferences in the filters and press Apply
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
        name:'winnings-onhold',
        layout: 'main',
        components:{
            card,
            BetDetails
        },
        data(){
            return{
                title: 'Winnings On Hold',

                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                offset: 4,
                timer: '',
                bets: [],
                loading: false,
                currency: this.$store.state.currencySymbol,
            }
        },
        methods:{
            formatNumber(number){
                return this.currency+''+parseFloat(number).toLocaleString()
            },
            loadData(page){
                this.loading = true
                Bets.getWinnings(page).then(res=>{
                    this.loading = false;
                    this.bets = res;
                    // this.pagination = res.bets;
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
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
                        self.loadData(self.pagination.current_page);
                    })
                }, function(dismiss) {

                })
            },
        },
        mounted() {
            this.loadData(1);
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Winnings On Hold')
        },
        beforeDestroy: function(){
            clearInterval(this.timer);
        }
    }
</script>
<style scoped>

</style>
