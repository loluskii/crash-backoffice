<template>
    <div>
        <form id="single-stop" @submit.prevent="listTransactions(1)">
            <div class="row m-t-10">
                <div class="col-sm-4">
                    <v-select label="username" v-model="from_user" v-validate="'required'"
                        placeholder="Select User"
                        @input="setFormData"
                        :options="users" name="from_user"></v-select>
                        <i v-show="errors.has('from_user')" class="fa fa-warning text-danger"></i>
                        <span v-show="errors.has('from_user')" class="help is-danger text-danger">Please select a user</span>
                </div>
                <div class="col-sm-4">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="filterData.from" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-4">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="filterData.to" :config="config" class="form-control"></flat-pickr>
                    </div>
                </div>
            </div>
            <div class="row m-t-10">
                <div class="col-sm-8">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
                </div>

                <div class="col-sm-2">
                    <button type="submit" class="btn btn-info btn-block" id="filterBtn">Filter</button>
                </div>
                <div class="col-sm-2">
                    <a href="#">clear all filters</a>
                </div>
            </div>
        </form>
        <div class="table-responsive" v-if="!loading">
            <table class="table table-bordered" data-animate="fade" data-child="tr"
          data-selectable="selectable">
            <thead>
              <tr>
                <th class="0" scope="col">Date</th>
                <th class="0" scope="col">Transaction ID</th>
                <th class="0" scope="col">From</th>
                <th class="0" scope="col">To</th>
                <th class="0" scope="col">Operation Type</th>
                <th class="0" scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="transactions.length > 0" v-for="(transaction, i) in transactions" :key="i">
                <td>{{formatDate(transaction.created_at, 'DD/MM/YYYY HH:mm:ss')}}</td>
                <td>{{transaction.reference_no}}</td>
                <td>{{transaction.from_user}}</td>
                <td>{{transaction.to_user}}</td>
                <td>{{ transaction.subject}}</td>
                <td>{{ transaction.description }}</td>
                <td :class="getClass(transaction.from_user)">{{(transaction.from_user === filterData.username)? '-'+formatNumber(transaction.amount) : formatNumber(transaction.amount)}}</td>
                <td>{{ formatNumber((filterData.username == transaction.from_user) ? transaction.from_user_balance : transaction.to_user_balance) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row mt-3">
                <!-- <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">Showing 1 to 10 of 40 entries</div>
                </div> -->
                <div class="col-sm-12 col-md-7">

                    <div class="dataTables_paginate paging_simple_numbers pull-right" id="sample_1_paginate">
                         <paginate
                            v-bind:pagination="pagination"
                            v-on:click.native="listTransactions(pagination.current_page)"
                            :offset="4">
                        </paginate>

                    </div>
                </div>
            </div>
        <div v-if="loading" class="text-center">
            <i class="fa fa-spin fa-spinner fa-4x"></i>
        </div>
    </div>
</template>
<script>
    import Agent from '../../services/agents';

    export default {
        props:[
            'users',
        ],
        data(){
            return{
                from_user: '',
                filterData:{
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                },
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                offset: 4,
                transactions: [],
                loading:  false,
                currency: this.$store.state.currencySymbol,
                config: this.$store.state.flatpickrConfig,
            }
        },
        methods:{
            setFormData(e){
                this.filterData.username = e.username
            },
            formatNumber(number){
                return this.currency+''+parseFloat(number).toLocaleString()
            },
            listTransactions(page){
                if (this.filterData.username != '') {
                    this.loading = true
                    $('#filerBtn').attr('disabled', true).html('Please wait..');

                    //get agent users transactions
                    Agent.getTransactions(this.filterData, page).then((res) => {
                        this.loading = false
                        this.transactions = res.data;
                        this.pagination = res
                        $('#filterBtn').attr('disabled', false).html('Filter');
                    });
                }else{
                    alert('Please select a user to list transactions')
                }
            },
            getClass(username){
                if(username === this.filterData.username){
                    return 'text-danger'
                }else{
                    return 'text-success'
                }
            }
        },
        mounted() {
        },
    }
</script>
