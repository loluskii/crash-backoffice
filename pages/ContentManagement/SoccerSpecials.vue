<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title"><i class='ti-list-ol'></i> Specials List</h3>
                    </div>
                    <div class="card-body">
                        <v-select label="name" 
                            v-on:input="setSpecials" 
                            placeholder="Select Category"
                            :options="categories" 
                            name="categories">
                        </v-select>

                        <table class="table table-striped mt-3">
                            <tr :data-id="special.id" v-for="(special, m) in specials" :key="m">
                                <td>
                                    <h6>{{ trimName(special.name, 40) }}</h6> 
                                    <small>{{ special.start_date }}</small>
                                </td>
                                <td>
                                    <small>
                                        <a href="javascript:;" @click="showModal(special)">Settle Market</a> | 
                                        <a href="javascript:;" @click="edit(special, m)">Edit</a> |
                                        <a href="javascript:;" @click="deleteSpecial($event, special.id, m)">Delete</a>
                                    </small>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="mt-4">
                    <b-tabs ref="tabs">
                        <b-tab title="Add/Edit Soccer Specials" ref="special-tab" active class="template-list" title-link-class="template-list-link" style="padding: 20px" >
                            <special-form :categories="categories"></special-form>
                        </b-tab>
                        <b-tab title="Add/Edit Soccer Special Cat" ref="category-tab" class="template-list" style="padding: 20px" title-link-class="template-list-link">
                            <special-category-form :categories="categories"></special-category-form>
                        </b-tab>
                        
                    </b-tabs>
                </div>
            </div>
        </div>
        <b-modal ref="marketRef" hide-footer :title="modalTitle" no-close-on-backdrop>
            <form @submit.prevent="settleSpecial">
                <table class="table" v-if="markets">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Odds</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tr v-for="(market, index) in formData" :key="index">
                        <td>{{ market.odd_name}}</td>
                        <td>{{ market.odds}}</td>
                        <td>
                            <select name="" class="form-control" v-model="market.result">
                                <option value="1">Won</option>
                                <option value="2">Lost</option>
                                <option value="3">Void</option>
                            </select>
                            <input type="hidden" :value="market.market_id">
                        </td>
                    </tr>
                </table>
                <div class="row marginTop">
                    <div class="col-6 col-md-6">
                        <button type="button"
                            @click="closeModal"
                            class="btn btn-default text_white btn-block text-white btn-md btn-responsive"
                            tabindex="7">Cancel</button>
                    </div>
                    <div class="col-6 col-md-6">
                        <input type="submit" id="btncheck" value="Settle Bets"
                                class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                                tabindex="7">
                    </div>
                </div>
            </form>

        </b-modal>

    </div>
</template>
<script>
    import SpecialForm from "../../components/specials/special-form.vue"
    import SpecialCategoryForm from "../../components/specials/special-category-form.vue"
    import CMS from '../../services/cms.js'
    export default {
        name:'enhanced_multiples',
        layout: 'main',
        scrollToTop: true,
        components:{
           'special-form':  SpecialForm,
           'special-category-form':  SpecialCategoryForm
        },
        data(){
            return{
                title: 'Soccer Specials',
                specials: [],
                modalTitle:'',
                markets: [],
                formData:[],
                event_id: '',
                loading: true,
                selected_index: '',
                categories: []
            }
        },
        methods:{
            closeModal(){
                this.$refs.marketRef.hide();
            },
            trimName(str, len = 25){
                return str.length > len ? str.substring(0, len - 3) + "..." : str;
            },
            showModal(special){
                $.each(special.markets, (i, val)=>{
                    let data = {
                        odd_name : val.name,
                        odds: val.odds,
                        odd_id: val.id,
                        market_id: val.soccer_special_id,
                        result: 2,
                    }
                    this.formData.push(data)
                });
                this.event_id = special.event_id
                this.modalTitle = special.name;
                this.$refs.marketRef.show();
            },
            settleSpecial(){
                CMS.settleSpecial(this.formData, this.event_id).then((res) => {
                    if(res.success){
                        self.$swal('Success!', 'Bet Settlement for '+this.modalTitle+' has been processed', 'success');
                    }else{
                        self.$swal('Error!', msg, 'error');                            
                    }
                }); 
            },
            setSpecials(category){
                this.specials = category.specials;
            },
            edit(special, index){
                this.selected_index      = index;
                this.$nuxt.$emit('EDIT_SPECIAL', special);
                // this.$refs['special-tab'].click();
            },
            deleteSpecial(e, id, i){
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
                        CMS.deleteSpecial(id).then((res) => {
                            if(res.success){
                                this.specials.splice(i, 1)
                                self.$swal('Deleted!', 'Item has been removed', 'success');
                            }else{
                                self.$swal('Error!', msg, 'error');                            
                            }
                        }); 
                    }else{

                    }
                })
            }
        },
        
        mounted: function() {
            // this.listMultiples();
            this.$axios.get('/admin/content-management/specials/get-categories').then(res => {
                this.categories = res.data
            })
            this.$nuxt.$on('CATEGORY_SAVED', (data) => {
                this.categories.push(data)
            })
            this.$nuxt.$on('CATEGORY_REMOVED', (index) => {
                this.categories.splice(index, 1)
            })
            this.$nuxt.$on('UPDATED_SPECIAL', (data) => {
                this.$nuxt.$set(this.specials, this.selected_index, data)
            })
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Soccer Specials');
        },
    }
</script>
<style>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}

</style>
