<template>
    <form action="" class="row p-3" @submit.prevent="saveCashOut">
        <div class="col-md-6">
            <div class="form-group">
                <label>
                    <input type="checkbox" class="square-blue" v-model="formData.enable_cashout"/>
                </label>
                <label class="ml-3">
                    Enable Web Cashout
                </label>
            </div>

            <div class="form-group row">
                <label class="col-md-6 form-control-label text-left">Cashout Stake Percentage: </label>
                <div class="col-md-6 form-inline">
                    <input type="text" class="form-control" name="stake_percentage" v-model="formData.stake_percentage" autocomplete="off" style="width:100px">%
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-6 form-control-label text-left">Min Payout Amount: </label>
                <div class="col-md-6 form-inline">
                  {{ currency }}<input type="text" class="form-control" v-model="formData.cashout_min_payout" name="stake_percentage" style="width: 100px" autocomplete="off">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-6 form-control-label text-left">Max Payout Amount: </label>
                <div class="col-md-6 form-inline">
                  {{ currency }}<input type="text" class="form-control" v-model="formData.cashout_max_payout" name="stake_percentage" style="width: 100px" autocomplete="off">
                </div>
            </div>
            <div class="form-group row ">
                <div class="col-md-9 offset-md-3">
                    <button type="submit" class="btn btn-primary btn-block" id="saveBtn">Save </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <table class="table table-condensed">
                <thead>
                    <tr>
                        <th>Min Odds</th>
                        <th>Reduction Percent</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in formData.items" :key="index">
                        <td>
                            <div class="form-group form-inline">
                                <label class="form-control-label" for="inputInlineUsername"><= </label>
                                <input type="number" step="0.01" class="form-control" v-model="item.min_odds" autocomplete="off" style="width: 70px;">
                            </div>
                        </td>
                        <td>
                            <div class="form-group form-inline">
                                <input type="number" step="0.01" class="form-control" autocomplete="off" style="width: 70px" v-model="item.reduction_perc">
                                <label class="form-control-label" for="inputInlineUsername" >%</label>
                            </div>
                        </td>
                        <td>
                            <a href="javascript:;">
                                <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeRow(index)"></i>
                            </a>
                        </td>
                    </tr>

                </tbody>
            </table>
            <br>
            <a href="javascript:;" class="text-success pull-right" @click="addTicketBonus"><i class="fa fa-plus"></i> Add More</a>
        </div>
    </form>
</template>

<script>

import Settings from '../../services/settings.js'

export default {
    name: 'web_settings',
    data(){
        return {
          currency: this.$store.state.currencySymbol,
            formData: {
                enable_cashout: false,
                stake_percentage: '',
                cashout_min_payout: '',
                cashout_max_payout: '',
                items: [],
                level: 'web_cashout'
            }
        }
    },
    methods:{
        addTicketBonus(){
            this.formData.items.push({
                min_odds: '3.1',
                reduction_perc: '10',
                level: 'web_cashout'
            })
        },
        removeRow(index){
            this.formData.items.splice(index,1)
        },
        getCashOut(){
            Settings.getCashOut('web_cashout').then(res => {
                this.formData.items = res.items;
                var self =this;
                $.each(res.settings, function(key, item){
                    if(item.option == 'enable_cashout'){
                        self.formData.enable_cashout = item.value
                    }
                    if(item.option == 'stake_percentage'){
                        self.formData.stake_percentage = item.value
                    }
                    if(item.option == 'cashout_min_payout'){
                        self.formData.cashout_min_payout = item.value
                    }
                    if(item.option == 'cashout_max_payout'){
                        self.formData.cashout_max_payout = item.value
                    }
                });
            })
        },
        saveCashOut(){
            $('#saveBtn').attr('disabled', true).html('Saveing...');
            Settings.saveCashOut(this.formData).then(res => {
                if(res.success){
                    this.$swal('Success!','CashOut Settings has bee saved', 'success');
                    $('#saveBtn').attr('disabled', false).html('Save');
                }else{
                    $('#saveBtn').attr('disabled', false).html('Save');
                    this.$swal('Error!','Something went wrong', 'error');
                }
            });
        }
    },
    mounted() {
        this.getCashOut()
    },
}
</script>
