<template>
    <div class="row">
        <div class="col-md-6">
            <card title="Onliners" :padding="true">
                <form @submit.prevent="saveOnlinersBonus" v-if="!loading">
                    <div class="example">
                        <div class="form-inline mb-3" v-for="(item, index) in onlinerBonuses.items" :key="index">
                            <div class="form-group col-md-5">
                                <label class="form-control-label" for="inputInlineUsername">No. of Events: </label>
                                <input type="text" class="form-control" autocomplete="off" style="width: 50px" v-model="item.ticket_length">
                            </div>
                            <!-- <div class="form-group col-md-2">
                                <label class="form-control-label" for="inputInlinePassword">Min. Odd:</label>
                                <input type="text" class="form-control" autocomplete="off" value="0.0" style="width: 50px" v-model="item.min_odd">
                            </div> -->
                            <div class="form-group col-md-5">
                                <label class="form-control-label" for="inputInlinePassword">Bonus:</label>
                                <input type="text" class="form-control" autocomplete="off" value="0.0" style="width: 50px" v-model="item.bonus"> %
                            </div>
                            <!-- <div class="form-group col-md-2">
                                <label for="">active
                                    <input type="checkbox" v-model="item.status" >
                                </label>
                            </div> -->
                            <div class="form-group col-md-2">
                                <a href="javascript:;">
                                    <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeRow(item)"></i>
                                </a>
                            </div>
                        </div>
                        <br>
                        <a href="javascript:;" class="text-success" @click="addOnlinerRow"><i class="fa fa-plus"></i> Add More</a>
                        <div class="form-group row  row">
                            <div class="col-md-9 offset-md-3">
                            <button type="submit" class="btn btn-primary waves-effect waves-classic" id="saveOBonus">Submit </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="text-center" v-if="loading">
                    <i class="fa fa-spin fa-spinner fa-3x"></i>
                </div>
            </card>
        </div>
        <div class="col-md-6">
            <card title="Shop" :padding="true">
                <form @submit.prevent="saveShopBonuses" v-if="!loading">
                    <div class="example">
                        <div class="form-inline mb-3" v-for="(item, index) in shopBonuses.items" :key="index">
                            <div class="form-group col-md-5">
                                <label class="form-control-label" for="inputInlineUsername">No. of Events: </label>
                                <input type="text" class="form-control" autocomplete="off" style="width: 50px" v-model="item.ticket_length">
                            </div>
                            <!-- <div class="form-group col-md-2">
                                <label class="form-control-label" for="inputInlinePassword">Min. Odd:</label>
                                <input type="text" class="form-control" autocomplete="off" value="0.0" style="width: 50px" v-model="item.min_odd">
                            </div> -->
                            <div class="form-group col-md-5">
                                <label class="form-control-label" for="inputInlinePassword">Bonus:</label>
                                <input type="text" class="form-control" autocomplete="off" value="0.0" style="width: 50px" v-model="item.bonus"> %
                            </div>
                            <!-- <div class="form-group col-md-2">
                                <label for="">active
                                    <input type="checkbox" v-model="item.status" >
                                </label>
                            </div> -->
                            <div class="form-group col-md-2">
                                <a href="javascript:;">
                                    <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeRow(item)"></i>
                                </a>
                            </div>
                        </div>
                        <br>
                        <a href="javascript:;" class="text-success" @click="addShopRow"><i class="fa fa-plus"></i> Add More</a>
                        <div class="form-group row  row">
                            <div class="col-md-9 offset-md-3">
                            <button type="submit" class="btn btn-primary waves-effect waves-classic" id="saveSBonus">Submit </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="text-center" v-if="loading">
                    <i class="fa fa-spin fa-spinner fa-3x"></i>
                </div>
            </card>
        </div>
    </div>
        
</template>
<script>
import Bonuses from '../../services/bonuses'
export default {
    name: 'bonuse-on-tickets',
    layout: 'main',
    data(){
        return {
            loading: true,
            bonuses:{},
      
        }
    },
    computed: {
        onlinerBonuses(){
            let bonuses = {
                items: this.bonuses.filter(item => item.section === 'onliners')
            };
            return bonuses;
        },
        shopBonuses(){
            let bonuses = {
                items: this.bonuses.filter(item => item.section === 'shop')
            };
            return bonuses;
        }
    },
    methods: {
        addOnlinerRow(){
            this.bonuses.push({
                ticket_length: '3',
                // min_odd: '1.4',
                bonus: '5',
                section: 'onliners'
            });
            
        },
        addShopRow(){
            this.bonuses.push({
                ticket_length: '3',
                // min_odd: '1.4',
                bonus: '5',
                section: 'shop'
            });
        },
        removeRow(item){
            let index = this.bonuses.findIndex(bonus => bonus.ticket_length === item.ticket_length && bonus.section === item.section);
            this.bonuses.splice(index, 1);
        },
        removeShopRow(index){
            this.shopBonuses.items.splice(index,1)
        },
        saveOnlinersBonus(){
            $('#saveOBonus').attr('disabled', true).html('Please wait..');
            Bonuses.saveTicketBonuses(this.onlinerBonuses, 'onliners').then(res=>{
                if(res.success){
                    this.$swal('Success!','Bonuses for onliners has been saved', 'success');
                    $('#saveOBonus').attr('disabled', false).html('Save');
                }else{
                    $('#saveOBonus').attr('disabled', false).html('Save');
                    this.$swal('Error!','Something went wrong', 'error');
                }
            })
        },
        saveShopBonuses(){
            $('#saveSBonus').attr('disabled', true).html('Please wait..');
            Bonuses.saveTicketBonuses(this.shopBonuses, 'shop').then(res=>{
                if(res.success){
                    this.$swal('Success!','Bonuses for shop has been saved', 'success');
                    $('#saveSBonus').attr('disabled', false).html('Save');
                }else{
                    $('#saveSBonus').attr('disabled', false).html('Save');
                    this.$swal('Error!','Something went wrong', 'error');
                }
            })
        }
    },
    mounted(){
        Bonuses.getTicketBonuses().then(res=>{
            this.bonuses = res;
            this.loading = false;
        });
    },
    head(){
        return{
            title: 'Bonuses on Tickets'
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Bonuses on Tickets');        
    },
}
</script>

<style scoped>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
input.form-control{
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #ced4da !important;
}
</style>