<template>
    <form @submit.prevent="saveSettings">
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="monnify_payment">
                    Enable Monnify Payment
                </label>
            </div>
            <div class="col-sm-8">
                <input type="checkbox" class="square-blue" v-model="monnifyData.monnify_payment"/>           
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="secret_key">
                    API Secret Key
                </label>
            </div>
            <div class="col-sm-8">
                <input name="monnify_secret_key" v-validate="'required'" 
                    :disabled="!monnifyData.monnify_payment"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('monnify_secret_key') }" 
                    type="text" placeholder="" v-model="monnifyData.monnify_secret_key">
                    <i v-show="errors.has('monnify_secret_key')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('monnify_secret_key')" class="help is-danger text-danger">{{ errors.first('monnify_secret_key') }}</span>           
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="monnify_public_key">
                    API Public Key
                </label>
            </div>
            <div class="col-sm-8">
                <input name="monnify_public_key" v-validate="'required'" 
                :disabled="!monnifyData.monnify_payment"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('monnify_public_key') }" 
                    type="text" placeholder="" v-model="monnifyData.monnify_public_key">
                    <i v-show="errors.has('monnify_public_key')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('monnify_public_key')" class="help is-danger text-danger">{{ errors.first('monnify_public_key') }}</span>           
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="contract_code">
                    Contract Code
                </label>
            </div>
            <div class="col-sm-8">
                <input name="monnify_contract_code" v-validate="'required'" 
                :disabled="!monnifyData.monnify_payment"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('monnify_contract_code') }" 
                    type="text" placeholder="" v-model="monnifyData.monnify_contract_code">
                    <i v-show="errors.has('monnify_contract_code')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('monnify_contract_code')" class="help is-danger text-danger">{{ errors.first('monnify_contract_code') }}</span>           
            </div>
        </div>
        
        <div class="form-group row ">
            <div class="col-md-8 offset-md-4">
                <button type="submit" class="btn btn-primary btn-block" id="saveMonnifyBtn" >Save </button>
            </div>
        </div>
    </form>
</template>
<script>
    export default {
        props: ['settings'],
        data(){
            return{
                monnifyData:{
                    monnify_payment: 0,
                    monnify_public_key: '',
                    monnify_secret_key: '',
                    monnify_contract_code: ''
                }
            }
        },
        methods:{
            saveSettings(){
                this.$validator.validateAll().then(result => {
                    if(result){
                        $('#saveMonnifyBtn').attr('disabled', true).html('Saving...');
                        
                        this.$axios.post('/admin/settings/payments/monnify', this.monnifyData).then(response =>  {
                            $('#saveMonnifyBtn').attr('disabled', false).html('Save');
                            if(response.data.success){
                                this.$swal('Success!','Monnify payment settings has been saved', 'success');
                            }else{
                                this.$swal('Error!','Something went wrong', 'error');
                            }
                        }).catch(error => {
                            $('#saveMonnifyBtn').attr('disabled', false).html('Save');                
                            toastr['error']('An error occured.', 'Error');
                        });
                    }
                });
            },
        },
        mounted(){
            if (this.settings.length) {
                let self = this;
                $.each(this.settings, function(key, item){
                    if(item.option == 'monnify_payment'){
                        self.monnifyData.monnify_payment = item.value
                    }
                    if(item.option == 'monnify_public_key'){
                        self.monnifyData.monnify_public_key = item.value
                    }
                    if(item.option == 'monnify_secret_key'){
                        self.monnifyData.monnify_secret_key = item.value
                    }
                    if(item.option == 'monnify_contract_code'){
                        self.monnifyData.monnify_contract_code = item.value
                    }
                });
            }
        }
    }
</script>