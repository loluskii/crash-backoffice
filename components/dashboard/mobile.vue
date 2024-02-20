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
                        <th>Bonus Given</th>
                        <th>Bonus Spent</th>
                        <th>NGR</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Casino</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>0.00%</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                            <td>{{ formatNumber(0.00) }}</td>
                        </tr>
                        <tr>
                            <td role="gridcell" aria-label="Column Product, Value Games" style="text-align: left;">Games</td>
                            <td role="gridcell" aria-label="Column Turnover, Value NGN 100.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Margin(%), Value 100.00%" style="text-align: left;">0.00%</td>
                            <td role="gridcell" aria-label="Column GGR, Value NGN 100.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Bonus Given, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Bonus Spent, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column NGR, Value NGN 100.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                        </tr>
                        <tr  role="row" aria-selected="false">
                            <td role="gridcell" aria-label="Column Product, Value Sport" style="text-align: left;">Sport</td>
                            <td role="gridcell" aria-label="Column Turnover, Value NGN 7,826,350.87" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Margin(%), Value 28.83%" style="text-align: left;">0.00%</td>
                            <td role="gridcell" aria-label="Column GGR, Value NGN 2,256,435.83" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Bonus Given, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Bonus Spent, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column NGR, Value NGN 2,256,435.83" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                        </tr>
                        <tr class="dx-row dx-data-row dx-row-alt dx-column-lines" role="row" aria-selected="false">
                            <td role="gridcell" aria-label="Column Product, Value Virtual Sport" style="text-align: left;">Virtual Sport</td>
                            <td role="gridcell" aria-label="Column Turnover, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Margin(%), Value 0.00%" style="text-align: left;">0.00%</td>
                            <td role="gridcell" aria-label="Column GGR, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Bonus Given, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column Bonus Spent, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                            <td role="gridcell" aria-label="Column NGR, Value NGN 0.00" style="text-align: left;">{{ currency + '' +formatNumber(0.00) }}</td>
                        </tr>
                    </tbody>
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