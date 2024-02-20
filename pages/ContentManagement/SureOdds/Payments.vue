<template>
    <div>
       
        <card title="List">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead class="bg-grey-100">
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Sure Odd</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(payment, index) in payments" v-if="payments.length > 0" :key="index">
                            
                            <td>{{ payment.payed_by}}</td>
                            <td>{{payment.phone_number}}</td>
                            <td>{{payment.sure_odd.title}}</td>
                            <td>{{payment.status === 0 ? 'Not Treated' : 'Treated'}}</td>
                            <td class="text-nowrap">
                                <a href="#" class="btn btn-success" v-if="payment.status === 0" role="button" @click="deleteSureOdd($event,banner.id)">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                </a>
                            </td>
                        </tr>
                        <tr v-if="!payments.length && !loading">
                            <td colspan="5" align="center">No record found</td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="5" class="text-center">
                                <i class="fa fa-4x fa-spin fa-spinner"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row mt-3">
                <div class="col-sm-12 col-md-7">
                    <div class="dataTables_paginate paging_simple_numbers pull-right" id="sample_1_paginate">
                         <paginate
                            v-bind:pagination="pagination"
                            v-on:click.native="getResults(pagination.current_page)"
                            :offset="4">
                        </paginate>
                    </div>
                </div>
            </div>
        </card>
    </div>
</template>
<script>
    import card from "../../../components/card.vue"
    import CMS from '../../../services/cms.js'
    import axios from '~/plugins/axios'

    export default {
        scrollToTop: true,
        name:'pages',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Sure Odds Payments',
                payments: [],
                loading: true,
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
                offset: 4,
            }
        },
        methods:{
            getResults(page) {
                CMS.listSureOddPayments().then(res=>{
                    this.payments = res.data;
                    this.pagination = res;
                    this.loading = false;
                })   
            },

            deleteSureOdd: function deleteBanner(e, id) {
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete item!',
                    cancelButtonText: 'No, keep item'
                }).then(result => {
                    if(result.value){
                        CMS.deleteSureOdd(id).then((res) => {
                            if(res.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Item has been removed', 'success');
                            }
                        });
                    }
                }, function(dismiss) {
                    
                });
            }
        },
        head() {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Sure Odds Payments')
        },
        mounted(){
            this.getResults()
        }
    }
</script>