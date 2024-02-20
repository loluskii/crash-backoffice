<template>
    <div>
       <form id="single-stop">
            <div class="row m-t-10">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Current Month</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="filterData.from" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="filterData.to" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
            </div>
            <div class="row m-t-10">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Pre Match/Live</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Username">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Location</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Client Type</option>
                    </select>
                </div>
            </div>
            <div class="row m-t-10">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">All</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Today</option>
                    </select>
                </div> 
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="filterData.from" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="filterData.to" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
            </div>
            <div class="row m-t-10">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Sports Balance</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="pref-Air" placeholder="< X">
                </div>
            </div>
            <div class="row m-t-10 form-group">
                <div class="col-sm-1">
                    <label class="control-label txt_media1">
                        Group By
                    </label>
                </div>
                <div class="col-sm-10">
                    <b-form-radio-group :options="groups" v-model="filterData.group_by" class="inlineRadio">
                    </b-form-radio-group>
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
                    <button class="btn btn-info btn-block">Search</button>
                </div>
                <div class="col-sm-3">
                    <a href="#">clear all filters</a>
                </div>
            </div>
        </form>
        <hr style="border: 2px solid #eee">
        <card title="Results" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Group</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Sports Balance</th>
                            <th>Virtual Balance</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>June</td>
                            <td>N0.00</td>
                            <td>N0.00</td>
                            <td>N0.00</td>
                            <td>0%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>
<script>
import card from "../../components/card.vue"

    export default {
        name:'playeractivityreport',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Player Activity Report',
                filterData:{
                    betslip_id: '',
                    username: '',
                    from: '',
                    to:  '',
                    // to:  this.$moment().format('DD-MM-YYYY 00:00'),                    
                    status: 'all',
                    group_by: 'player'
                },
               groups: [
                        { text: 'Player', value: 'player' }, 
                        { text: 'Day', value: 'day' }, 
                        { text: 'Month', value: 'month' }, 
                        { text: 'Client Type', value: 'client_type' }
                    ],
                bets:'',
                counter: 0,
                offset: 4,
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                config: {
                    wrap: true,
                    enableTime: true,
                    time_24hr: true,
                    dateFormat: 'd-m-Y H:i',        
                }, 
                loading: true,
                amount_played : 0,
                amount_won: 0,
                profit: 0,
                statusClass: '',
                currency: this.$store.state.currencySymbol
            }
        },
        methods:{
            
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Player Activity Report')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);            
        }
    }
</script>