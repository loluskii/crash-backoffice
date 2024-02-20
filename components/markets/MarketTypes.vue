<template>
    <div>
        <div class="row mb-3">
            <div class="col-md-12">
                <v-select label="name" 
                    v-on:input="setMarkets" 
                    placeholder="Select Sports"
                    v-model="sport"
                    :options="sports" 
                    name="sport">
                </v-select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-7">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title"><i class='ti-list-ol'></i> Market Types List</h3>
                    </div>
                    <div class="card-body p-0">
                        
                        <table class="table table-bordered table-striped table-ellipsis">
                            <thead class="bg-grey-100">
                            <tr>
                                <th>Name</th>
                                <th>Provider ID</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-if=" markets.length > 0 && !loading" v-for="market in markets" :key="markets.id">
                                <td>{{ market.name}}</td>
                                <td>{{ market.provider_id }}</td>
                                <td>
                                    <a href="javascript:;" class="mr-2" @click="editMarket(market)">Edit </a> | 
                                    <a href="javascript:;" class="text-danger" @click="deleteMarket($event, market.id)">Delete</a>
                                </td>
                            </tr>
                            <tr align="center" v-if="!markets.length">
                                <td colspan="3">Please select a sport to display market types</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <card title="Add/Edit Markert Type" :padding="true">
                    <market-type-form :sports="sports"></market-type-form>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
    import MarketTypeForm from "./market-type-form.vue"
    import CMS from '../../services/cms.js'
    export default {
        scrollToTop: true,
        components:{
           'market-type-form':  MarketTypeForm,
        },
        props:[
            'sports',
            'loading'
        ],
        data(){
            return{
                title: 'Market Types',
                sport: '',
                markets: [],
            }
        },
        methods:{
            
            setMarkets(e){
                this.markets = e.market_types;
                this.sport = e;
            },
            editMarket(market){
                this.$nuxt.$emit('EDIT_MTYPE', market, this.sport)
            },
            deleteMarket(e, id){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete item!',
                    cancelButtonText: 'No, keep item'
                }).then((result)=> {
                    if (result.value) {
                        this.$axios.get('admin/content-management/markets/types/delete/'+id).then((res) => {
                            if(res.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Market type has been removed', 'success');
                            }else{
                                self.$swal('Error!', msg, 'error');                            
                            }
                        }); 
                    }else{

                    }
                })
            },
        }
    }
</script>
<style>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
</style>
