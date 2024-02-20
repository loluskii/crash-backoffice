<template>
    <card title="Results" excel="true">
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th v-if="group_by == 'day'">Day</th>
                        <th v-if="group_by == 'month'">Month</th>
                        <th v-if="group_by == 'state'">State</th>
                        <th v-if="group_by == 'client_type'">Client Type</th>
                        <th v-if="group_by == 'product'">Product</th>
                        <th>Registrations</th>
                        <th>Registered and Deposited</th>
                        <th>First Depositors</th>
                        <th>Conversation Ratio</th>
                        <th>Total Deposit Amount</th>
                        <th>Turnover</th>
                        <th>NGR</th>
                        <th>Bonus Spent</th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(result, index) in results" v-if="results.length > 0" v-show="!loading" :key="index">
                        <td class="text-center" v-if="group_by == 'day'">
                            {{ result.date }}
                        </td>
                        <td class="text-center" v-if="group_by == 'month'">
                            {{ displayMonth(result.month) }}
                        </td>
                        <td class="text-center" v-if="group_by == 'client_type'">
                            {{ result.channel }}
                        </td>
                        <td class="text-center" v-if="group_by == 'product'">
                            {{ result.product_type }}
                        </td>
                        <td class="text-center" v-if="group_by == 'state'">
                            {{ result.state }}
                        </td>
                        <td>{{ result.total_registered }}</td>
                        <td>{{ result.registered_deposited }}</td>
                        <td>{{ result.first_depositors }}</td>
                        <td>0%</td>
                        <td>{{ formatNumber(result.total_deposit) }}</td>
                        <td>{{ formatNumber(result.turnover) }}</td>
                        <td :class="{ 'text-danger': calcNGR(result) < 0}">{{ formatNumber(calcGGR(result)) }}</td>
                        <td>{{ formatNumber(result.bonus)}}</td>
                    </tr>
                    <tr v-if="results.length < 1" v-show="!loading">
                            <td colspan="9" class="text-center">
                                <h4>No record found</h4>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="9" class="text-center">
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
            'results',
            'counter',
            'pagination',
            'offset',
            'loading',
            'group_by'
        ],
        methods:{
            formatNumber(number){
                return this.numberFormat(this.currency, number)
            },
            calcMargin(bet){
                let margin =this.marginCalc(bet)
                return margin+'%';
            },
            calcNGR(bet){
                let ngr = (parseFloat(bet.turnover) - parseFloat(bet.winnings) - parseFloat(bet.awuf_bonus) - parseFloat(bet.bonus))
                return ngr;
            },
            displayMonth(n){
                return this.$moment(n, 'MM').format('MMM');
            }
        },
        mounted(){
        }
    }
</script>
