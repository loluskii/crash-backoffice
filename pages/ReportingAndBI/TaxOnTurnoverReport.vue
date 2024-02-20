<template>
    <div>
       <form id="single-stop" @submit.prevent="getResults">
            <div class="row m-t-10">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.month">
                        <option :value="month.number" v-for="(month, index) in months" :key="index">{{month.name}}</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.year">
                        <option :value="year" v-for="(year, index) in years" :key="index">{{year}}</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-3">
                    <select name="class" id="class-type" class="form-control" v-model="filterData.product_type">
                        <option value="">Product</option>
                        <option value="Sports">Sports</option>
                        <option value="Casino">Casino</option>
                        <option value="Casino">Games</option>
                        <option value="Virtual">Virtual Sports</option>
                    </select>
                </div>
            </div>
            
            <div class="row m-t-10">
                <div class="col-sm-6">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
                </div>
                <div class="col-sm-1">
                    <button type="submit" class="btn btn-info btn-block">Search</button>
                </div>
                <div class="col-sm-3">
                    <a href="#" @click="resetFilter">clear all filters</a>
                </div>
            </div>
            
        </form>
        <hr style="border: 2px solid #eee">

        <card title="Summary" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Return Before Tax</th>
                            <th>Return After Tax</th>
                            <th>Tax Amount</th>
                            <th>Tax %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="summary != '' && !loading">
                            <td>{{ displayMonth(summary.month)+' '+summary.year }}</td>
                            <td>{{ formatNumber(summary.turnover) }}</td>
                            <td>{{ formatNumber(summary.turnover) }}</td>
                            <td>N0.00</td>
                            <td>0%</td>
                        </tr>
                        <tr v-if="summary < 1" v-show="!loading">
                            <td colspan="5" class="text-center">
                                <h4>No record found</h4>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="5" class="text-center">
                                <i class="fa fa-4x fa-spin fa-spinner"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
        <card title="Results" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <tr>
                            <th>Month</th>
                            <th>Return Before Tax</th>
                            <th>Return After Tax</th>
                            <th>Tax Amount</th>
                            <th>Tax %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(result, index) in results" v-if="results.length > 0 && !loading" :key="index">
                            <td>
                                <a href="#">
                                    {{result.date}}
                                </a>
                            </td>
                            <td>{{ formatNumber(result.turnover) }}</td>
                            <td>{{ formatNumber(result.turnover) }}</td>
                            <td>N0.00</td>
                            <td>0%</td>
                        </tr>
                        <tr v-if="results.length < 1" v-show="!loading">
                            <td colspan="5" class="text-center">
                                <h4>No record found</h4>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="5" class="text-center">
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
import Reports from '../../services/reports'

    export default {
        name:'taxonTurnover',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Tax On Turnover Report',
                filterData:{
                    month: this.$moment().format('MM'),
                    year: this.$moment().format('Y'),
                    product_type: '',
                },
                currency: this.$store.state.currencySymbol,
                months: this.$store.state.months,
                years: this.$store.state.years,
                summary: '',
                results: '',
                loading: false
            }
        },
        methods:{
            formatNumber(number){
                return this.numberFormat(this.currency, number)
            },
            getResults(){
                this.loading = true
                Reports.getTaxOnTurnover(this.filterData).then(res=>{
                    this.loading = false;
                    this.results = res.results;
                    this.summary = res.summary;
                    this.group_by = this.filterData.group_by
                }).catch(err => {
                    console.log(err);
                    
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            displayMonth(n){
                return this.$moment(n, 'MM').format('MMM');
            },
            resetFilter(){
                this.filterData = {
                    month: this.$moment().format('MM'),
                    year: this.$moment().format('Y'),
                    product_type: '',
                }
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Tax On Turnover Report')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);    
            console.log(this.$moment().format('MM'));
                    
        }
    }
</script>