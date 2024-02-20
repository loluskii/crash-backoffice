<template>
    <card title="Results" excel="true">
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th class="text-center">Group</th>
                        <th># of Bets</th>
                        <th>Turnover</th>
                        <th>Winnings</th>
                        <th>GGR</th>
                        <th>Margin (%)</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(bet, index) in bets" v-if="bets.length > 0" v-show="!loading" :key="index">
                        <td class="text-center" v-if="group_by == 'day'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.date }}
                            </a>
                        </td>
                        <td class="text-center" v-if="group_by == 'month'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ displayMonth(bet.month) }}
                            </a>
                        </td>
                        <td class="text-center" v-if="group_by == 'client_type'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.channel }}
                            </a>
                        </td>
                        <td class="text-center" v-if="group_by == 'event_type'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.event_type }}
                            </a>
                        </td>
                        <td class="text-center" v-if="group_by == 'bet_type'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.bet_type }}
                            </a>
                        </td>
                        <td class="text-center" v-if="group_by == 'product'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.product_type }}
                            </a>
                        </td>
                        <td class="text-center" v-if="group_by == 'sport'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.sport }}
                            </a>
                        </td>
                        <td class="text-center" v-if="group_by == 'league'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.tournament }}
                            </a>
                        </td>
                        <td class="text-center" v-if="group_by == 'market'">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.market_name }}
                            </a>
                        </td>
                        <td>{{ bet.total }}</td>
                        <td>{{ formatNumber(bet.turnover) }}</td>
                        <td>{{ formatNumber(bet.winnings) }}</td>
                        <td :class="{ 'text-danger': calcGGR(bet.turnover, bet.winngins) < 0}">{{ formatNumber(calcGGR(bet.turnover, bet.winnings)) }}</td>
                        <td :class="{ 'text-danger': calcGGR(bet.turnover, bet.winnings) < 0}">{{ calcMargin(bet.turnover, bet.winnings) }}</td>
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
                        <th></th>
                        <th>{{ formatNumber(totalStake) }}</th>
                        <th>{{ formatNumber(totalWinnings) }}</th>
                        <th :class="{ 'text-danger': calcGGR(totalStake, totalWinnings) < 0}">{{ formatNumber(totalStake - totalWinnings)}}</th>
                        <th :class="{ 'text-danger': calcGGR(totalStake, totalWinnings) < 0}">{{ calcMargin(totalStake, totalWinnings) }}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </card>
</template>
<script>
import card from '../card'
    export default {
        name: 'other_group',
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
            'group_by',
            'totalStake',
            'totalWinnings',
            'totalTickets',
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
            displayMonth(n){
                return this.$moment(n, 'MM').format('MMM');
            }
        },
        mounted(){
        }
    }
</script>
