import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Bar,
    mixins: [reactiveProp],
    data(){
        return {
            options: {
                // responsive: false,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        // stacked: true,
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }],
                    xAxes: [{
                        // stacked: true,
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                }
            }
        }
    },
    mounted () {
        this.renderChart(this.chartData, this.options)
    }
}