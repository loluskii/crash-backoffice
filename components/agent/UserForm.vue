<template>
  <card :title="title" :padding="true" class="pt-3">
    <form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-sm-6">
          <!--                    <div class="form-group row">
                                  <div class="col-sm-4 text-right txt_media">
                                      <label class="form-control-label" for="country">
                                          Country
                                      </label>
                                  </div>
                                  <div class="col-sm-8">
                                      <select name="country" id="country" v-model="formData.country" class="form-control">
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
                                      <select name="country" id="country" v-model="formData.state" class="form-control">
                                          <option :value="state.id" v-for="(state, index) in states" :key="index">{{ state.name }}</option>
                                      </select>
                                  </div>
                              </div>-->
          <div class="form-group row">
            <div class="col-sm-4"></div>
            <div class="col-sm-8">
              <label class="form-control-label">
                <input type="checkbox" v-model="formData.is_exist">
                Are you moving an existing user?
              </label>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="user_type">
                Username
              </label>
            </div>
            <div class="col-sm-8">
              <autocomplete
                v-if="formData.is_exist"
                ref="autocomplete"
                :source="getUrl"
                results-property="data"
                input-class="form-control"
                @selected="addUser"
                results-display="username">
              </autocomplete>
              <div v-if="!formData.is_exist">
                <input name="username" v-validate="'required'"
                       class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }"
                       type="text" placeholder="" v-model="formData.username">
                <i v-show="errors.has('username')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('username')" class="help is-danger text-danger">{{ errors.first('username') }}</span>
              </div>
            </div>
          </div>
          <div class="form-group row" v-if="!formData.is_exist">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="first_name">
                Name
              </label>
            </div>
            <div class="col-sm-8">
              <input name="first_name" id="first_name"
                     class="form-control" :class="{'input': true, 'is-danger': errors.has('first_name') }"
                     type="text" placeholder="" v-model="formData.first_name">
              <i v-show="errors.has('first_name')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('first_name')" class="help is-danger text-danger">{{ errors.first('first_name') }}</span>
            </div>
          </div>
          <div class="form-group row" v-if="!formData.is_exist">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="last_name">
                Surname
              </label>
            </div>
            <div class="col-sm-8">
              <input name="last_name" id="last_name"
                     class="form-control" :class="{'input': true, 'is-danger': errors.has('last_name') }"
                     type="text" placeholder="" v-model="formData.last_name">
              <i v-show="errors.has('last_name')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('last_name')" class="help is-danger text-danger">{{ errors.first('last_name') }}</span>
            </div>
          </div>
          <div class="form-group row" v-if="!formData.is_exist">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="date_of_birth">
                Date of Birth
              </label>
            </div>
            <div class="col-sm-8">
              <input type="text" id="date_of_birth" v-model="formData.date_of_birth" name="date_of_birth" class="form-control" placeholder="">
            </div>
          </div>
          <div class="form-group row" v-if="!formData.is_exist">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="gender">
                Gender
              </label>
            </div>
            <div class="col-sm-8">
              <select name="gender" id="gender" v-model="formData.gender" class="form-control">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div class="form-group row" v-if="!formData.is_exist">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="address">
                Address
              </label>
            </div>
            <div class="col-sm-8">
              <input name="address" id="address" class="form-control" type="text" placeholder="" v-model="formData.address">
            </div>
          </div>
          <div class="form-group row" v-if="!formData.is_exist">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="phone_number">
                Phone Number
              </label>
            </div>
            <div class="col-sm-8">
              <input name="phone_number" class="form-control" id="phone_number"
                     type="text" placeholder="" v-model="formData.phone_number">
            </div>
          </div>
        </div>
        <div class="col-sm-6" v-if="!formData.is_exist">
          <!--                    <div class="form-group row">
                                  <div class="col-sm-4 text-right txt_media">
                                      <label class="form-control-label" for="parent_agent">
                                          Parent Agent
                                      </label>
                                  </div>
                                  <div class="col-sm-8">
                                      <select name="parent_agent" id="parent_agent" v-model="formData.parent_agent" class="form-control">
                                          <option value="">None</option>
                                          <option :value="agent.id" v-for="(agent, index) in agents" :key="index">{{ agent.username }}</option>
                                      </select>
                                  </div>
                              </div>-->
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="user_type">
                User Type
              </label>
            </div>
            <div class="col-sm-8">
              <select name="user_type" id="user_type" v-model="formData.user_type" class="form-control">
                <option value="">All</option>
                <option :value="role.id" v-for="(role, index) in roles" :key="index">{{ role.name }}</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="balance">
                Opening Balance
              </label>
            </div>
            <div class="col-sm-8">
              <input type="text" id="balance" name="balance" v-model="formData.balance" class="form-control" placeholder="">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="max_payout">
                Max Payout
              </label>
            </div>
            <div class="col-sm-8">
              <input type="text" id="max_payout" name="max_payout" v-model="formData.max_payout" class="form-control" placeholder="">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right">
              <label class="form-control-label" for="password">
                Password
              </label>
            </div>
            <div class="col-sm-8">
              <input name="password" v-validate="'required'"
                     id="password"
                     class="form-control" :class="{'input': true, 'is-danger': errors.has('password') }"
                     type="password" placeholder="" v-model="formData.password" ref="password">
              <i v-show="errors.has('password')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('password')" class="help is-danger text-danger">{{ errors.first('password') }}</span>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="password_confirmation">
                Confirm Password
              </label>
            </div>
            <div class="col-sm-8">
              <input
                name="password_confirmation"
                v-validate="'required|confirmed:password'"
                id="password_confirmation"
                class="form-control" :class="{'input': true, 'is-danger': errors.has('password_confirmation') }"
                type="password" placeholder="" data-vv-as="password">
              <i v-show="errors.has('password_confirmation')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('password_confirmation')" class="help is-danger text-danger">{{ errors.first('password_confirmation') }}</span>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="email">
                Email
              </label>
            </div>
            <div class="col-sm-8">
              <input
                name="email"
                v-validate="'email'"
                class="form-control"
                id="email"
                type="email" placeholder="" v-model="formData.email" ref="email">
            </div>
          </div>
          <div class="form-group row ">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="confirm_email">
                Confirm Email
              </label>
            </div>
            <div class="col-sm-8">
              <input
                name="confirm_email"
                v-validate="'email|confirmed:email'"
                id="confirm_email"
                class="form-control" :class="{'input': true, 'is-danger': errors.has('confirm_email') }"
                type="email" placeholder="" data-vv-as="email">
              <i v-show="errors.has('confirm_email')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('confirm_email')" class="help is-danger text-danger">{{ errors.first('confirm_email') }}</span>
            </div>
          </div>
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
    </form>
  </card>
</template>
<script>
import axios from '~/plugins/axios'

export default {
  props:[
    'roles',
    'agents',
    'states'
  ],
  data(){
    return{
      title: 'Add User',
      formData:{
        country:'160',
        state: '',
        language: 'EN',
        currency: 'NGN',
        first_name:'',
        last_name:'',
        date_of_birth:'',
        gender:'Male',
        address:'',
        phone_number:'',
        username:'',
        password:'',
        email:'',
        balance: '',
        user_type:'cashier',
        parent_agent: '',
        is_exist: false,
        max_payout: ''
      },
      agent_id: this.$store.state.pageParam,
    }
  },
  methods:{
    getUrl(input){
      return process.env.prodURL + '/api/users/find?q='+input;
    },
    addUser(user){
      this.formData.username = user.value;
    },
    validateBeforeSubmit(){
      this.$validator.validateAll().then(result => {
        if(result){
          $('#saveBtn').attr('disabled', true).text('Submit...');
          axios.post('/api/admin/agent-management/agent/'+this.agent_id+'/add-user', this.formData).then(res=>{
            $('#saveBtn').attr('disabled', false).text('Save');
            if (res.data.success) {
              this.$toast.success(res.data.message,{icon: 'check'})
              this.$nuxt.$emit('user-added')
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
    },
  },
  mounted(){
  }
}
</script>
