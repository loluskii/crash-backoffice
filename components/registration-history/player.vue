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
                        <th>Avg. Bet Amount</th>
                        <th>GGR</th>
                        <th>Margin (%)</th>
                        <th>NGR</th>
                        <th>Bonus Spent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(bet, index) in results" v-if="results.length > 0" v-show="!loading" :key="index">
                        <td class="text-center">
                            <i class="fa fa-fw fa-angle-right pull-left"></i>
                            <a href="#">
                                {{ bet.username }}
                            </a>
                        </td>
                        <td>{{ (bet.total_deposit == undefined)? '-':formatNumber(bet.total_deposit) }}</td>
                        <td>{{ bet.total }}</td>
                        <td>{{ formatNumber(bet.turnover) }}</td>
                        <td>{{ formatNumber(bet.average) }}</td>
                        <td :class="{ 'text-danger': calcGGR(bet) < 0}">{{ formatNumber(calcGGR(bet)) }}</td>
                        <td :class="{ 'text-danger': calcGGR(bet) < 0}">{{ calcMargin(bet) }}</td>
                        <td :class="{ 'text-danger': calcNGR(bet) < 0}">{{ formatNumber(calcNGR(bet)) }}</td>
                        <td>{{ formatNumber(parseFloat(bet.bonus) + parseFloat(bet.awuf_bonus))}}</td>
                    </tr>
                    <tr v-if="results.length < 1" v-show="!loading">
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
            'results',
            'counter',
            'pagination',
            'offset',
            'loading'
        ],
        methods:{
            formatNumber(number){
                return this.numberFormat(this.currency, number)
            },
            calcMargin(bet){
                let margin =this.marginCalc(bet)
                return margin+'%';
            },
            calcGGR(bet){
                let ggr = (parseFloat(bet.turnover) - parseFloat(bet.winnings))
                return ggr;
            },
            calcNGR(bet){
                let ngr = (parseFloat(bet.turnover) - parseFloat(bet.winnings) - parseFloat(bet.awuf_bonus) - parseFloat(bet.bonus))
                return ngr;
            },

        },
        mounted(){
        }
    }
</script>
