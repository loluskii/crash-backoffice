<template>
    <div id="tab-activity" class="tab-pane animated fadeInTop  active">
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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="transactions.length > 0" v-for="(transaction, i) in transactions" :key="i">
                    <td>{{ formatDate(transaction.created_at, 'DD/MM/YYYY HH:mm:ss')}}</td>
                    <td>{{transaction.reference_no}}</td>
                    <td>{{transaction.from_user}}</td>
                    <td>{{transaction.to_user}}</td>
                    <td>{{ transaction.subject}}</td>
                    <td>{{ transaction.description }}</td>
                    <td :class="getClass(transaction.tranx_type)">{{(transaction.tranx_type ==='credit')? formatNumber(transaction.amount) : '-'+formatNumber(transaction.amount)}}</td>
                    <td>{{ formatNumber((user.username == transaction.from_user) ? transaction.from_user_balance : transaction.to_user_balance) }}</td>
                    <td>
                      <span class="badge badge-warning" v-if="transaction.status === 0">Pending</span>
                      <span class="badge badge-success" v-if="transaction.status === 1">Completed</span>
                      <span class="badge badge-secondary" v-if="transaction.status === 2">Cancelled</span>
                    </td>
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
                            v-on:click.native="getTransactions(pagination.current_page)"
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
    import Player from '../../services/players';

    export default {
        props:[
            'user',
            'id'
        ],
        data(){
            return{
                transactions: [],
                loading:  true,
                currency: this.$store.state.currencySymbol,
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                offset: 4
            }
        },
        methods:{
            formatNumber(number){
                return this.currency+''+parseFloat(number).toLocaleString()
            },
            getTransactions(page){
                Player.getPlayerTransactions(this.id, page).then(res => {
                    this.transactions = res.data;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    alert('something went wrong');
                });
            },
            getClass(type){
                if(type ==='credit'){
                    return 'text-success'
                }else{
                    return 'text-danger'
                }
            }
        },
        mounted() {
            this.getTransactions(1);
        },
    }
</script>
