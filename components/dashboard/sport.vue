<template>
    <div class="card" style="margin-bottom: 0px">
        <div class="card-header bg-primary">
            <span class="float-right">
                <a href="javascript:;" class="btn btn-success">
                    <i class="fa fa-fw fa-file-excel-o"></i> 
                </a>
            </span>
            <h3>&nbsp;</h3>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Turnover</th>
                        <th>Margin(%)</th>
                        <th>GGR</th>
                        <th># of Bets</th>
                        <th>Avg. Bet Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Live</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                        </tr>
                        <tr>
                            <td>Pre-Match</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ currency + '' +formatNumber(0.00) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>        
        </div>
    </div>
</template>

<script>
    export default {
      
        data(){
            return{
                currency: this.$store.state.currencySymbol,
            }
        },
        methods:{
            formatNumber(number){
                return this.numberFormat(this.currency, number)
            },
        }
    }
</script>
