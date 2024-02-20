<template>
    <form @submit.prevent="update">
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="status">
                    Enable
                </label>
            </div>
            <div class="col-sm-1">
                <input type="checkbox" class="square-blue" v-model="settings.status"/>
            </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="title">
                  Display Name
              </label>
          </div>
          <div class="col-sm-8">
              <input name="name" v-validate="'required'"
                  class="form-control" :class="{'input': true, 'is-danger': errors.has('display_name') }"
                  type="text" placeholder="" v-model="settings.display_name">
                  <i v-show="errors.has('display_name')" class="fa fa-warning text-danger"></i>
                  <span v-show="errors.has('display_name')" class="help is-danger text-danger">{{ errors.first('display_name') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="name">
                  Gateway Name:/ID
              </label>
          </div>
          <div class="col-sm-8">
              <input name="name" v-validate="'required'"
                  class="form-control" :class="{'input': true, 'is-danger': errors.has('name') }"
                  type="text" placeholder="" v-model="settings.name">
                  <i v-show="errors.has('name')" class="fa fa-warning text-danger"></i>
                  <span v-show="errors.has('name')" class="help is-danger text-danger">{{ errors.first('name') }}</span>
          </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="sender_id">
                  Sender ID
                </label>
            </div>
            <div class="col-sm-8">
                <input name="sender_id" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('sender_id') }"
                    type="text" placeholder="" v-model="settings.sender_id">

            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="secret_key">
                    API Key
                </label>
            </div>
            <div class="col-sm-8">
                <input name="api_key" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('api_key') }"
                    type="text" placeholder="" v-model="settings.api_key">
                    <i v-show="errors.has('api_key')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('api_key')" class="help is-danger text-danger">{{ errors.first('api_key') }}</span>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="username">
                    Username
                </label>
            </div>
            <div class="col-sm-8">
                <input name="username" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }"
                    type="text" placeholder="" v-model="settings.username">
                    <i v-show="errors.has('username')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('username')" class="help is-danger text-danger">{{ errors.first('username') }}</span>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="merchant_id">
                    Password
                </label>
            </div>
            <div class="col-sm-8">
                <input name="password" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }"
                    type="text" placeholder="" v-model="settings.password">
                    <i v-show="errors.has('password')" class="fa fa-warning text-danger"></i>
                    <span v-show="errors.has('password')" class="help is-danger text-danger">{{ errors.first('password') }}</span>
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
            update(){
                $('#saveBtn').attr('disabled', true).html('Please wait..');

                Api.updateSMSGateway(this.settings.id, this.settings)
                .then(response =>  {
                    $('#saveBtn').attr('disabled', false).html('Save');
                    if(response.success){
                        this.$swal('Success!','Sms Gateway has been saved', 'success');
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
