<template>
    <form @submit.prevent="savePaymentMethod">
      <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="status">
                  Use for withdrawal
                </label>
            </div>
            <div class="col-sm-8">
                <input type="checkbox" class="square-blue" v-model="formData.for_disbursement"/>
            </div>
        </div>
      <div class="form-group row">
          <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="title">
                Display Title
              </label>
          </div>
          <div class="col-sm-8">
              <input name="title" v-validate="'required'"
                  class="form-control" :class="{'input': true, 'is-danger': errors.has('title') }"
                  type="text" placeholder="" v-model="formData.title">
                  <i v-show="errors.has('title')" class="fa fa-warning text-danger"></i>
                  <span v-show="errors.has('title')" class="help is-danger text-danger">{{ errors.first('title') }}</span>
          </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="provider">
                  Provider Name
                </label>
            </div>
            <div class="col-sm-8">
                <input name="name" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('provider') }"
                    type="text" placeholder="" v-model="formData.provider">

            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="secret_key">
                    API Secret Key
                </label>
            </div>
            <div class="col-sm-8">
                <input name="secret_key" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('secret_key') }"
                    type="text" placeholder="" v-model="formData.secret_key">
                    <i v-show="errors.has('secret_key')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('secret_key')" class="help is-danger text-danger">{{ errors.first('secret_key') }}</span>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="public_key">
                    API Public Key
                </label>
            </div>
            <div class="col-sm-8">
                <input name="public_key" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('public_key') }"
                    type="text" placeholder="" v-model="formData.public_key">
                    <i v-show="errors.has('public_key')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('public_key')" class="help is-danger text-danger">{{ errors.first('public_key') }}</span>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="merchant_id">
                    Merchant ID
                </label>
            </div>
            <div class="col-sm-8">
                <input name="merchant_id" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('merchant_id') }"
                    type="text" placeholder="" v-model="formData.merchant_id">
                    <i v-show="errors.has('merchant_id')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('merchant_id')" class="help is-danger text-danger">{{ errors.first('merchant_id') }}</span>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="base_url">
                    Base URL
                </label>
            </div>
            <div class="col-sm-8">
                <input name="base_url" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('base_url') }"
                    type="text" placeholder="" v-model="formData.base_url">
                    <i v-show="errors.has('base_url')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('base_url')" class="help is-danger text-danger">{{ errors.first('base_url') }}</span>
            </div>
        </div>

        <div class="form-group row ">
            <div class="col-md-8 offset-md-4">
                <button type="submit" class="btn btn-primary btn-block" id="saveBtn" >Save </button>
            </div>
        </div>
    </form>
</template>
<script>
  import Api from '../services/settings';

  export default {
    data(){
      return{
        formData:{
          title: '',
          provider: '',
          public_key: '',
          secret_key: '',
          merchant_id: '',
          base_url: '',
          for_disbursement: 0,
        }
      }
    },
    methods:{
        savePaymentMethod(){
            $('#saveBtn').attr('disabled', true).html('Please wait..');
            Api.savePaymentMethods(this.formData)
              .then(res =>  {
                $('#saveBtn').attr('disabled', false).html('Save');
                if(res.success){
                  this.$toast.success(res.message,{icon: 'check'})
                    this.$nuxt.$emit('saved_payment_method');
                    this.formData = {
                      title: '',
                      provider: '',
                      public_key: '',
                      secret_key: '',
                      merchant_id: '',
                      base_url: '',
                      for_disbursement: 0,
                    }
                }else{
                    this.$swal('Error!',res.message, 'error');
                }
            }).catch(error => {
                $('#saveBtn').attr('disabled', false).html('Save');
                this.$toast.success('An error occured',{icon: 'times'})
            });
        },
    },
    mounted(){

    }
  }
</script>
