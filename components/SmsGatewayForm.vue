<template>
    <form @submit.prevent="save">
      <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="status">
                  Enable
                </label>
            </div>
            <div class="col-sm-8">
                <input type="checkbox" class="square-blue" v-model="formData.status"/>
            </div>
        </div>
      <div class="form-group row">
          <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="title">
                Display Name
              </label>
          </div>
          <div class="col-sm-8">
              <input name="display_name" v-validate="'required'"
                  class="form-control" :class="{'input': true, 'is-danger': errors.has('display_name') }"
                  type="text" placeholder="" v-model="formData.display_name">
                  <i v-show="errors.has('display_name')" class="fa fa-warning text-danger"></i>
                  <span v-show="errors.has('display_name')" class="help is-danger text-danger">{{ errors.first('display_name') }}</span>
          </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="provider">
                  Gateway Name/ID
                </label>
            </div>
            <div class="col-sm-8">
                <input name="name" v-validate="'required'"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('name') }"
                    type="text" placeholder="" v-model="formData.name">

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
                    type="text" placeholder="" v-model="formData.sender_id">

            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="secret_key">
                    API Key
                </label>
            </div>
            <div class="col-sm-8">
                <input name="api_key"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('api_key') }"
                    type="text" placeholder="" v-model="formData.api_key">
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
                <input name="username"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }"
                    type="text" placeholder="" v-model="formData.username">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
                <label class="form-control-label" for="merchant_id">
                    Password
                </label>
            </div>
            <div class="col-sm-8">
                <input name="password"
                    class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }"
                    type="text" placeholder="" v-model="formData.password">
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
    data(){
      return{
        formData:{
          display_name: '',
          name: '',
          username: '',
          password: '',
          api_key: '',
          sender_id: '',
          status: 0,
        }
      }
    },
    methods:{
        save(){
            $('#saveBtn').attr('disabled', true).html('Please wait..');
            Api.saveSMSGateways(this.formData)
              .then(res =>  {
                $('#saveBtn').attr('disabled', false).html('Save');
                if(res.success){
                  this.$toast.success(res.message,{icon: 'check'})
                    this.$nuxt.$emit('saved_sms_gateway');
                    this.formData = {
                      display_name: '',
                      name: '',
                      username: '',
                      password: '',
                      api_key: '',
                      status: 0,
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
