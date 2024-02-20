<template>
  <card title="Edit User Info" :padding="true">
    <form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="country">
                Country
              </label>
            </div>
            <div class="col-sm-8">
              <select name="country" id="country" v-model="data.country_id" class="form-control">
                <option value="160">Nigeria</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="country">
                State
              </label>
            </div>
            <div class="col-sm-8">
              <select name="country" id="country" v-model="data.state_id" class="form-control">
                <option :value="state.id" v-for="(state, index) in states" :key="index">{{ state.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="language">
                Language
              </label>
            </div>
            <div class="col-sm-8">
              <select name="language" id="language" v-model="data.language" class="form-control">
                <option value="EN">English</option>
                <option value="FR">French</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="currency">
                Currency
              </label>
            </div>
            <div class="col-sm-8">
              <select name="currency" id="currency" class="form-control" v-model="data.currency">
                <option value="NGN">NGN</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="first_name">
                Name
              </label>
            </div>
            <div class="col-sm-8">
              <input name="first_name"
                     class="form-control" :class="{'input': true, 'is-danger': errors.has('first_name') }"
                     type="text" placeholder="" v-model="data.first_name">
              <i v-show="errors.has('first_name')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('first_name')" class="help is-danger text-danger">{{ errors.first('first_name') }}</span>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="last_name">
                Surname
              </label>
            </div>
            <div class="col-sm-8">
              <input name="last_name"
                     class="form-control" :class="{'input': true, 'is-danger': errors.has('last_name') }"
                     type="text" placeholder="" v-model="data.last_name">
              <i v-show="errors.has('last_name')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('last_name')" class="help is-danger text-danger">{{ errors.first('last_name') }}</span>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="date_of_birth">
                Date of Birth
              </label>
            </div>
            <div class="col-sm-8">
              <input type="text" id="date_of_birth" v-model="data.date_of_birth" name="date_of_birth" class="form-control" placeholder="">
            </div>
          </div>
          <!--                    <div class="form-group row">-->
          <!--                        <div class="col-sm-4 text-right txt_media">-->
          <!--                            <label class="form-control-label" for="gender">-->
          <!--                                Gender-->
          <!--                            </label>-->
          <!--                        </div>-->
          <!--                        <div class="col-sm-8">-->
          <!--                            <select name="gender" id="gender" v-model="data.gender" class="form-control">-->
          <!--                                <option value="Male">Male</option>-->
          <!--                                <option value="Female">Female</option>-->
          <!--                            </select>-->
          <!--                        </div>-->
          <!--                    </div>-->
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="address">
                Address
              </label>
            </div>
            <div class="col-sm-8">
              <input name="address" class="form-control" type="text" placeholder="" v-model="data.address">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="phone_number">
                Phone Number
              </label>
            </div>
            <div class="col-sm-8">
              <input name="phone_number" class="form-control"
                     type="text" placeholder="" v-model="data.phone_number">
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="username">
                Username
              </label>
            </div>
            <div class="col-sm-8">
              <input name="username" v-validate="'required'"
                     class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }"
                     type="text" placeholder="" v-model="data.user.username">
              <i v-show="errors.has('username')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('username')" class="help is-danger text-danger">{{ errors.first('username') }}</span>
            </div>
          </div>

          <!--                    <div class="form-group row">
                                  <div class="col-sm-4 text-right txt_media">
                                      <label class="form-control-label" for="user_type">
                                          User Type
                                      </label>
                                  </div>
                                  <div class="col-sm-8">
                                      <select name="user_type" id="user_type" v-model="data.user.role_id" class="form-control">
                                          <option value="">All</option>
                                          <option :value="role.id" v-for="(role, index) in roles" :key="index">{{ role.display_name }}</option>
                                      </select>
                                  </div>
                              </div>-->
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="parent_agent">
                Parent Agent
              </label>
            </div>
            <div class="col-sm-8">
              <select name="parent_agent" id="parent_agent" v-model="data.parent_agent" class="form-control">
                <option value="">None</option>
                <option :value="agent.id" v-for="(agent, index) in agents" :key="index">{{ agent.username }}</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="email">
                Email
              </label>
            </div>
            <div class="col-sm-8">
              <input name="email" id="email" v-validate="'email'"
                     class="form-control"
                     type="email" placeholder="" v-model="data.user.email" ref="email">
            </div>
          </div>
          <div class="form-group row ">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="confirm_email">
                Confirm Email
              </label>
            </div>
            <div class="col-sm-8">
              <input name="confirm_email" v-validate="'email|confirmed:email'"
                     class="form-control" :class="{'input': true, 'is-danger': errors.has('confirm_email') }"
                     type="email" placeholder="" data-vv-as="email">
              <i v-show="errors.has('confirm_email')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('confirm_email')" class="help is-danger text-danger">{{ errors.first('confirm_email') }}</span>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-6 ml-auto">
              <button type="button" class="btn btn-default btn-block" @click="cancelForm">Cancel</button>
            </div>
            <div class="col-sm-6">
              <button type="submit" class="btn btn-primary btn-block" id="saveBtn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </card>
</template>
<script>
import axios from '~/plugins/axios'

export default {
  props:[
    'data',
  ],
  data(){
    return{
      roles: [],
      agents: [],
      states: [],
    }
  },
  methods:{
    validateBeforeSubmit(){
      this.$validator.validateAll().then(result => {
        if(result){
          $('#saveBtn').attr('disabled', true).text('Submit...');
          axios.post('/api/admin/player-management/update-user', this.data).then(res=>{
            $('#saveBtn').attr('disabled', false).text('Save');
            if (res.data.success) {
              this.$toast.success(res.data.message,{icon: 'check'})
              this.$nuxt.$emit('user-updated')
            } else {
              this.$toast.error('Something went wrong. Unable to create new shop!',{icon: 'times'})
            }
          }).catch(err => {
            $('#saveBtn').attr('disabled', false).text('Save');
            this.$toast.error('Internal server error!',{icon: 'times'})
          })
        }else{
          // this.$toast.error('Internal server error!',{icon: 'times'})

        }
      })
    },
    cancelForm(){
      this.$nuxt.$emit('cancelForm')
    }
  },
  mounted(){
    this.$axios.get('/admin/settings/user-roles').then(response =>  {
      this.roles = response.data
    }).catch(error => {
      toastr['error']('An error occured.', 'Error');
    });
    this.$axios.get('/admin/agent-management/get-agency').then(res => {
      this.agents = res.data;
    })

    this.$axios.get('/admin/utilities/get-country-states').then(res => {
      this.states = res.data.states;
    })

  }
}
</script>
