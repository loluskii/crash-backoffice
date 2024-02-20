<template>
    <div>
        <card title="Player Balances" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Sports Real Balance</th>
                            <th>Casino Real Balance</th>
                            <th>Virtual Real Balance</th>
                            <th>Sports Bonus Balance</th>
                            <th>Casino Bonus Balance</th>
                            <th>Virtual Bonus Balance</th>
                            <th>Total Player Balances</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="player_balances && !loading">
                            <td>{{ formatNumber(player_balances.sport_balances.toFixed(2)) }}</td>
                            <td>{{ formatNumber(player_balances.casino_balance) }}</td>
                            <td>{{ formatNumber(player_balances.virtual_balance) }}</td>
                            <td>{{ formatNumber(player_balances.sport_bonus_balance) }}</td>
                            <td>{{ formatNumber(player_balances.casino_bonus_balance) }}</td>
                            <td>{{ formatNumber(player_balances.virtual_bonus_balance) }}</td>
                            <td>{{ formatNumber(player_balances.sport_balances.toFixed(2)) }}</td>
                        </tr>
                        <tr v-if="player_balances > 1">
                            <td colspan="7">No data</td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="7" class="text-center">
                                <i class="fa fa-4x fa-spin fa-spinner"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
        <card title="Funds In Transit" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <tr>
                            <th>Pending Withdrawals</th>
                            <th>Pending Deposit</th>
                            <th>Total Funds In Transit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="funds_in_transit && !loading">
                            <td>{{ formatNumber(funds_in_transit.total_withdrawal) }}</td>
                            <td>{{ formatNumber(funds_in_transit.total_deposit) }}</td>
                            <td>{{ formatNumber(funds_in_transit.total) }}</td>
                        </tr>
                        <tr v-if="funds_in_transit > 1 && !loading">
                            <td colspan="7">No data</td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="7" class="text-center">
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
import card from "../../components/card.vue"
import Players from '../../services/players'

    export default {
        name:'playerliabilityreport',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Player Liability Report',
                player_balances: '',
                funds_in_transit: '',
                loading: true,
                currency: this.$store.state.currencySymbol,

            }
        },
        methods:{
            formatNumber(number){
                return this.numberFormat(this.currency, number)
            },
            getResults(){
                Players.getLiabilityReport().then(res=>{
                    this.loading = false;
                    this.player_balances = {
                        sport_balances: res.player_balances.sport_balances,
                        casino_balance: 0,
                        virtual_balance: 0,
                        sport_bonus_balance: 0,
                        casino_bonus_balance: 0,
                        virtual_bonus_balance: 0,
                        sport_balance: 0,
                    },
                    this.funds_in_transit = {
                        total_deposit : res.funds_in_transit.total_deposit,
                        total_withdrawal : res.funds_in_transit.total_withdrawal,
                        total: res.funds_in_transit.total
                    }
                }).catch(err => {
                    console.log(err);
                    
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
            store.dispatch('setTitle', 'Player Liability Report')
        },
        mounted(){
            this.getResults();
        }
    }
</script>