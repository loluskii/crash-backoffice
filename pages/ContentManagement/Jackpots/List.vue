<template>
    <div>
        <router-link to="/ContentManagement/Jackpots/AddNew" class="btn btn-success" style="margin-right: 10px">
            <i class="fa fa-fw fa-plus"></i>
            Add New
        </router-link>
        <card title="List">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead class="bg-grey-100">
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Min. Stake</th>
                            <th>No. of Games</th>
                            <th>No. of Tickets</th>
                            <th>GGR</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(jackpot, index) in jackpots" v-if="jackpots.length > 0" :key="index">
                            <td>{{jackpot.title}}</td>
                            <td>{{formatNumber(jackpot.amount)}}</td>
                            <td>{{formatNumber(jackpot.stake)}}</td>
                            <td>{{ countFixtures(jackpot.fixtures)}}</td>
                            <td>{{ jackpot.total_bets }}</td>
                            <td>{{ formatNumber(jackpot.ggr) }}</td>
                            <td class="text-nowrap">
                                <div class="ui-group-buttons">
                                    <router-link :to="'/ContentManagement/Jackpots/'+jackpot.id" class="btn btn-primary">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </router-link>
                                    <div class="or"></div>
                                    <a href="#" class="btn btn-danger" role="button" @click="deleteJackpot($event, jackpot.id)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!jackpots.length && !loading">
                            <td colspan="6" align="center">No record found</td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="6" class="text-center">
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
                title: 'Jackpots Manager',
                jackpots: [],
                loading: true
            }
        },
        methods:{
            countFixtures(fixtures) {
                return fixtures.split(',').length;
            },
            deleteJackpot: function deleteJackpot(e, id) {
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
                        CMS.deleteJackpot(id).then((res) => {
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
            store.dispatch('setTitle', 'Jackpots Manager')
        },
        mounted(){
            CMS.listJackpots().then(res=>{
                this.jackpots = res;
                this.loading = false;
            })   
        }
    }
</script>