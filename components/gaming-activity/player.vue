<template>
    <card title="Results" excel="true">
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th class="text-center">Username</th>
                        <th>Total Deposit</th>
                        <th># of Bets</th>
                        <th>Turnover</th>
                        <th>Winnings</th>
                        <th>GGR</th>
                        <th>Margin (%)</th>
                        <th>NGR</th>
                        <th>Bonus Spent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(bet, index) in bets" v-if="bets.length > 0" v-show="!loading" :key="index">
                        <td class="text-center">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.username }}
                            </a>
                        </td>
                        <td>{{ (bet.total_deposit == undefined)? '-':formatNumber(bet.total_deposit) }}</td>
                        <td>{{ bet.total }}</td>
                        <td>{{ formatNumber(bet.turnover) }}</td>
                        <td>{{ formatNumber(bet.winnings) }}</td>
                        <td :class="{ 'text-danger': calcGGR(bet.turnover, bet.winngins) < 0}">{{ formatNumber(calcGGR(bet.turnover, bet.winnings)) }}</td>
                        <td :class="{ 'text-danger': calcGGR(bet.turnover, bet.winnings) < 0}">{{ calcMargin(bet.turnover, bet.winnings) }}</td>
                        <td :class="{ 'text-danger': calcNGR(bet) < 0}">{{ formatNumber(calcNGR(bet)) }}</td>
                        <td>{{ formatNumber(bet.bonus)}}</td>
                    </tr>
                    <tr v-if="bets.length < 1" v-show="!loading">
                            <td colspan="6" class="text-center">
                                <h4>No record found</h4>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="6" class="text-center">
                                <i class="fa fa-4x fa-spin fa-spinner"></i>
                            </td>
                        </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{{ formatNumber(totalDeposit) }}</th>
                        <th>{{ formatNumber(totalTickets) }}</th>
                        <th>{{ formatNumber(totalStake) }}</th>
                        <th>{{ formatNumber(totalWinnings) }}</th>
                        <th :class="{ 'text-danger': calcGGR(totalStake, totalWinnings) < 0}">{{ formatNumber(totalStake - totalWinnings)}}</th>
                        <th :class="{ 'text-danger': calcGGR(totalStake, totalWinnings) < 0}">{{ calcMargin(totalStake, totalWinnings) }}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </card>
</template>
<script>
import card from '../card'
    export default {
        name: 'player_group',
        components:{
            card
        },
        data(){
            return{
                statusClass: '',
                currency: this.$store.state.currencySymbol
            }
        },
        props:[
            'bets',
            'counter',
            'pagination',
            'offset',
            'loading',
            'totalStake',
            'totalWinnings',
            'totalTickets',
            'totalDeposit'
        ],
        methods:{
            formatNumber(number){
                return this.numberFormat(this.currency, number)
            },
            calcMargin(turnover, winnings){
                let margin = this.marginCalc(turnover, winnings)
                return margin+'%';
            },
            calcGGR(turnover, winnings){
                let ggr = (parseFloat(turnover) - parseFloat(winnings))
                return ggr;
            },
            calcNGR(bet){
                let ngr = (parseFloat(bet.turnover) - parseFloat(bet.winnings) - parseFloat(bet.bonus))
                return ngr;
            },

        },
        mounted(){
        }
    }
</script>
