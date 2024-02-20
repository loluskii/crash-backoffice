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
        <div class="card-body nopadding">
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
                    <tbody v-if="data !== null">
                        <tr>
                            <td>Casino</td>
                            <td>N0.00</td>
                            <td>N0.00</td>
                            <td>N0.00</td>
                            <td>N0.00</td>
                            <td>N0.00</td>
                            <td>N0.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <b-tabs ref="tabs" class="mt-4">
                <b-tab title="Turnover" active>
                    <bar-chart :chart-data="overalTurnOver" class="flotChart1"></bar-chart>
                </b-tab>
                <b-tab title="Margin(%)">
                    <bar-chart :chart-data="marginData"  class="flotChart1"></bar-chart>
                </b-tab>
                <b-tab title="GGR">
                    <bar-chart :chart-data="ggrData" class="flotChart1"></bar-chart>
                </b-tab>
                <b-tab title="Bonus">
                    <bar-chart :chart-data="bonusData" class="flotChart1"></bar-chart>
                </b-tab>
                <b-tab title="NGR">
                    <bar-chart :chart-data="ngrData" class="flotChart1"></bar-chart>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>
<script>
    export default {
        props : [
            'startDate',
            'endDate'
        ],
        data(){
            return{
                overalTurnOver: {},
                marginData: {},
                ggrData: {},
                bonusData: {},
                ngrData: {},
                data: null
            }
        },
        methods: {
            getReports(){
                this.$axios.post('/admin/dashboard/overall-data', {from: this.startDate, to: this.endDate}).then(res => {
                    this.data = res.data;
                }).catch( err => {

                })
            }
        },
        mounted () {
            var d11 = [130,63, 104, 54, 92, 150];
            var d12 = [58,30,46,35,55,46];
            var d3 = [78,50,46,55,75,66];
            var d14 = [158,70,116,55,55,86];
            this.overalTurnOver = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            data: d12,
                            label: "Games",
                            backgroundColor: "#66cc99"
                        },
                        {
                            data: d11,
                            label: "Casino",
                            backgroundColor: "#6699cc"
                        }, {
                            data: d3,
                            label: "Sport",
                            backgroundColor: "rgb(95, 139, 149)"
                        },{
                            data: d14,
                            label: "Virtual",
                            backgroundColor: "rgb(186, 77, 81)"
                        }
                    ]
                }
            // this.getReports();

            this.$nuxt.$on('UPDATE_REPORT', () => {
                this.getReports();
            })
        }
        // async asyncData() {

        //     return {
        //         barChartData: {
        //             labels: ['January', 'February'],
        //             datasets: [
        //                 {
        //                 label: 'GitHub Commits',
        //                 backgroundColor: '#f87979',
        //                 data: [40, 20]
        //                 }
        //             ]
        //         }
        //     }
        // },
    }
</script>
