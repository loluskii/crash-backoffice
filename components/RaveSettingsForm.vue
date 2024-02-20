<template>
    <form @submit.prevent="saveSettings">
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="rave_payment">
                    Enable Rave Payment
                </label>
            </div>
            <div class="col-sm-8">
                <input type="checkbox" class="square-blue" v-model="raveData.rave_payment"/>           
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="secret_key">
                    API Secret Key
                </label>
            </div>
            <div class="col-sm-8">
                <input name="rave_secret_key" v-validate="'required'" 
                    :disabled="!raveData.rave_payment"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('rave_secret_key') }" 
                    type="text" placeholder="" v-model="raveData.rave_secret_key">
                    <i v-show="errors.has('rave_secret_key')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('rave_secret_key')" class="help is-danger text-danger">{{ errors.first('rave_secret_key') }}</span>           
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="rave_public_key">
                    API Public Key
                </label>
            </div>
            <div class="col-sm-8">
                <input name="rave_public_key" v-validate="'required'" 
                :disabled="!raveData.rave_payment"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('rave_public_key') }" 
                    type="text" placeholder="" v-model="raveData.rave_public_key">
                    <i v-show="errors.has('rave_public_key')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('rave_public_key')" class="help is-danger text-danger">{{ errors.first('rave_public_key') }}</span>           
            </div>
        </div>
        
        <div class="form-group row ">
            <div class="col-md-8 offset-md-4">
                <button type="submit" class="btn btn-primary btn-block" id="saveRaveBtn" >Save </button>
            </div>
        </div>
    </form>
</template>
<script>
    export default {
        props: ['settings'],
        data(){
            return{
                raveData:{
                    rave_payment: 0,
                    rave_public_key: '',
                    rave_secret_key: ''
                }
            }
        },
        methods:{
            saveSettings(){
                $('#saveRaveBtn').attr('disabled', true).html('Please wait..');
                
                this.$axios.post('/admin/settings/payments/rave', this.raveData).then(response =>  {
                    $('#saveRaveBtn').attr('disabled', false).html('Save');
                    if(response.data.success){
                        this.$swal('Success!','Rave payment settings has been saved', 'success');
                    }else{
                        this.$swal('Error!','Something went wrong', 'error');
                    }
                }).catch(error => {
                    $('#saveRaveBtn').attr('disabled', false).html('Save');                
                    toastr['error']('An error occured.', 'Error');
                });
            },
        },
        mounted(){
            if (this.settings.length) {
                let self = this;
                $.each(this.settings, function(key, item){
                    if(item.option == 'rave_payment'){
                        self.raveData.rave_payment = item.value
                    }
                    if(item.option == 'rave_public_key'){
                        self.raveData.rave_public_key = item.value
                    }
                    if(item.option == 'rave_secret_key'){
                        self.raveData.rave_secret_key = item.value
                    }
                });
            }
        }
    }
</script>