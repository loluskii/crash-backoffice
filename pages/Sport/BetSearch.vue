<template>
    <div>
       <form id="single-stop" @submit.prevent="findBet()">
            <div class="row m-t-10">
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="pref-Air" v-model="filterData.betslip_id" placeholder="Betslip ID">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <button type="submit" class="btn btn-info btn-block">Search</button>
                </div>
            </div>
        </form>
        <hr style="border: 2px solid #eee">
        <card title="Results" excel="true">
            <div class="table-responsive" >
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
                        <th>Market</th>
                        <th>Selection</th>
                        <th>Odds</th>
                        <th>Stake</th>
                        <th>Return</th>
                        <th>Win/Loss</th>
                        <th>Client Type</th>
                        <th>Bet Status</th>
                        <th>Bet Settled Date & Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="bet && !loading">
                        <td>
                            <a href="javascript:;" @click="showBetSlip(bet)">
                                {{ bet.betslip_id }}
                            </a>
                        </td>
                        <td>
                          {{ bet.bet_type}}
                          ({{ bet.event_type === 'pre' ? 'P' : 'L' }})
                        </td>
                        <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                        <td>
                            <a href="javascript:;">
                                {{ bet.user.username }}
                            </a>
                        </td>                    <!-- <td>{{ bet.user.state.name }}</td> -->
                        <td>100%</td>
                        <td>{{ bet.sports_count }} Sports</td>
                        <td>{{ bet.tournaments_count}} Leagues</td>
                        <td>{{ bet.events_count}} Events</td>
                        <td>{{ bet.markets_count}} Markets</td>
                        <td>{{ bet.selections_count}} Selection(s)</td>
                        <td>{{ bet.bet_type === 'Combo' ? `${bet.min_odds}/${bet.odds.toFixed(2)}` : bet.odds.toFixed(2) }}</td>
                        <td>{{ currency+''+bet.stake }}</td>
                        <td>{{ formatNumber(bet.winnings) }}</td>
                        <td :class="statusClass">{{ calcWinLoss(bet) }}</td>
                        <td>{{ bet.channel }}</td>
                        <td :class="statusClass">{{ getStatus(bet.status) }}</td>
                        <td>{{ bet.settled_at }}</td>
                    </tr>
                    <tr v-if="bet.length < 1 && !loading">
                        <td colspan="21" class="text-center">
                            <h4>No record found</h4>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="21" class="text-center">
                            <i class="fa fa-4x fa-spin fa-spinner"></i>
                        </td>
                    </tr>
                    <tr id="details" class='d-none'>
                        <td colspan="17">
                          <bet-details :bet="bet"></bet-details>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>
<script>
    import Bets from "../../services/bets";
    import card from '../../components/card'
    import BetDetails from '../../components/BetDetails'

    export default {
        name:'quicksearch',
        layout: 'main',
        components:{
          card,
          BetDetails
        },
        data(){
            return{
                title: 'Quick Bet Search',
                filterData:{
                    betslip_id: '',
                },
                bet:'',
                statusClass: '',
                currency: this.$store.state.currencySymbol,
                loading: false
            }
        },
        methods:{
            formatNumber(number){
                return this.currency+''+parseFloat(number).toLocaleString()
            },
            findBet(){
                this.loading = true
                Bets.findBet(this.filterData).then(res=>{
                    this.loading = false;
                    this.bet = res;
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            showBetSlip(){
              $("#details").toggleClass('d-none');
            },
            getStatus(status){
                if(status == 1){
                    this.statusClass = 'text-danger'
                    return 'Won';
                }else if(status == 2){
                    this.statusClass = 'text-success'
                    return 'Lost';
                }else if(status == 3){
                    this.statusClass = 'text-secondary'
                    return 'Cancelled';
                }else if(status == 4){
                    this.statusClass = 'text-success'
                    return 'Void';
                }else if(status == 5){
                    this.statusClass = 'text-success'
                    return 'CUT1';
                }else if(status == 6){
                    this.statusClass = 'text-success'
                    return 'Pending Approval';
                }
            },
            calcBonusPerc(bet){
                let bonus = parseFloat(bet.bonus) + parseFloat(bet.awuf_bonus);
                let perc = (100*bonus/parseFloat(bet.pot_winnings))
                return perc.toFixed(2).toLocaleString()+'%'
            },
            calcBonus(bet){
                let bonus = parseFloat(bet.bonus) + parseFloat(bet.awuf_bonus)
                return this.formatNumber(bonus.toFixed(2))
            },
            calcWinLoss(bet){
                let winloss = parseFloat(bet.pot_winnings) - parseFloat(bet.stake)
                return this.formatNumber(winloss.toFixed(2));
            },
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Quick Bet Search')
        },
        mounted(){
        }
    }
</script>

