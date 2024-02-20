<template>
    <form @submit.prevent="updatePaymentMethod">
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="status">
                    Enable {{ settings.provider }}
                </label>
            </div>
            <div class="col-sm-1">
                <input type="checkbox" class="square-blue" v-model="settings.status"/>
            </div>
            <div class="col-sm-5 text-right txt_media">
                <label class="form-control-label" for="status">
                  Default withdrawal
                </label>
            </div>
            <div class="col-sm-1">
              <input type="checkbox" class="square-blue" v-model="settings.for_disbursement"/>
            </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="title">
                  Display Title
              </label>
          </div>
          <div class="col-sm-8">
              <input name="name" v-validate="'required'"
                  class="form-control" :class="{'input': true, 'is-danger': errors.has('title') }"
                  type="text" placeholder="" v-model="settings.title">
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
                  type="text" placeholder="" v-model="settings.provider">
                  <i v-show="errors.has('provider')" class="fa fa-warning text-danger"></i>
                  <span v-show="errors.has('provider')" class="help is-danger text-danger">{{ errors.first('provider') }}</span>
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
                    :disabled="!settings.status"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('secret_key') }"
                    type="text" placeholder="" v-model="settings.secret_key">
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
                :disabled="!settings.status"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('public_key') }"
                    type="text" placeholder="" v-model="settings.public_key">
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
                    type="text" placeholder="" v-model="settings.merchant_id">
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
                    type="text" placeholder="" v-model="settings.base_url">
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
        props: ['settings'],
        methods:{
            updatePaymentMethod(){
                $('#saveBtn').attr('disabled', true).html('Please wait..');

                Api.updatePaymentMethod(this.settings.id, this.settings)
                .then(response =>  {
                    $('#saveBtn').attr('disabled', false).html('Save');
                    if(response.success){
                        this.$swal('Success!','Payment method has been saved', 'success');
                    }else{
                        this.$swal('Error!','Something went wrong', 'error');
                    }
                }).catch(error => {
                    $('#saveBtn').attr('disabled', false).html('Save');
                    this.$toast.error('Something went wrong. Unable to update payment method!',{icon: 'times'})
                });
            },
        },
    }
</script>
