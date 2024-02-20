<template>
    <div>
        <div class="row mb-3">
            <div class="col-md-12">
                <v-select label="name" 
                    v-on:input="setCategories" 
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
                        <h3 class="card-title"><i class='ti-list-ol'></i> Market Group List</h3>
                    </div>
                    <div class="card-body p-0">
                        
                        <table class="table table-bordered table-striped table-ellipsis">
                            <thead class="bg-grey-100">
                            <tr>
                                <th>Name</th>
                                <th>No. of Markets</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-if=" categories.length > 0 && !loading" v-for="category in categories" :key="category.id">
                                <td>{{category.name}}</td>
                                <td>{{ category.markets.length }}</td>
                                <td>
                                    <a href="javascript:;" class="mr-2" @click="editCategory(category)">Edit </a> | 
                                    <a href="javascript:;" class="text-danger" @click="deleteCategory($event, category.id)">Delete</a> |
                                    <a href="javascript:;" @click="deleteCategory($event, category.id, 0)" v-if="category.status === 1">Disable</a>
                                    <a href="javascript:;" @click="updateStatus($event, category.id, 1)" v-if="category.status === 0">Enable</a>
                                </td>
                            </tr>
                            <tr align="center" v-if="!categories.length">
                                <td colspan="3">Please select a sport to display market groups</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <card title="Add/Edit Markert Group" :padding="true">
                    <market-category-form :sports="sports"></market-category-form>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
    import MarketCategoryForm from "./market-category-form.vue"
    import CMS from '../../services/cms.js'
    export default {
        scrollToTop: true,
        components:{
           'market-category-form':  MarketCategoryForm,
        },
        props:[
            'sports',
            'loading'
        ],
        data(){
            return{
                title: 'Market Teasers',
                categories: [],
                sport: '',
                markets: [],
            }
        },
        methods:{
            
            setCategories(e){
                this.categories = e.market_groups;
                this.sport = e;
            },
            editCategory(category){
                this.$nuxt.$emit('EDIT_GROUP', category, this.sport)
            },
            deleteCategory(e, id){
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
                        CMS.deleteCategory(id).then((res) => {
                            if(res.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Market category has been removed', 'success');
                            }else{
                                self.$swal('Error!', msg, 'error');                            
                            }
                        }); 
                    }else{

                    }
                })
            },
            updateStatus(e, id, status){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No'
                }).then((result)=> {
                    if (result.value) {
                        self.$axios.get('/content-management/markets/groups/update-status/'+id+'?status='+status).then((res) => {
                            if(res.success){
                                self.$swal('Success!', 'Status has been updated. Reload page to see changes', 'success');
                            }else{
                                self.$swal('Error!', msg, 'error');                            
                            }
                        }); 
                    }else{

                    }
                })
            },
        },
        updated() {
            // activate Nestable for sports menu
            // $('#sports_menu').nestable({
            //     group: 1
            // });
            // this.updateOutput($('#sports_menu').data('output', $('#sports_menu_output')));
        }
    }
</script>
<style src="../../assets/css/nestable.css"></style>
<style>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
</style>
