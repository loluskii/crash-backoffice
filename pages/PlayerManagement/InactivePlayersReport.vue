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
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Status</option>
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
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>Inactivity Date</th>
                            <th>Last Login Date</th>
                            <th>Balance</th>
                            <th>Process Status</th>
                            <th>Add Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>
<script>
import card from "../../components/card.vue"

    export default {
        name:'inactiveplayersreport',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Inactive Players Report',
                filterData:{
                    betslip_id: '',
                    username: '',
                    from: '',
                    to:  '',
                    // to:  this.$moment().format('DD-MM-YYYY 00:00'),                    
                    status: 'all',
                },
                config: {
                    wrap: true,
                    enableTime: true,
                    time_24hr: true,
                    dateFormat: 'd-m-Y H:i',        
                }, 
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
            store.dispatch('setTitle', 'Inactive Players Report')
        },
        mounted(){
            // this.listBets(this.pagination.current_page);            
        }
    }
</script>