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
                              </div>-->
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="first_name">
                Name
              </label>
            </div>
            <div class="col-sm-8">
              <input name="first_name" id="first_name"
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
              <input name="last_name" id="last_name"
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
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="gender">
                Gender
              </label>
            </div>
            <div class="col-sm-8">
              <select name="gender" id="gender" v-model="data.gender" class="form-control">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="address">
                Address
              </label>
            </div>
            <div class="col-sm-8">
              <input name="address" id="address" class="form-control" type="text" placeholder="" v-model="data.address">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="phone_number">
                Phone Number
              </label>
            </div>
            <div class="col-sm-8">
              <input name="phone_number" id="phone_number" class="form-control"
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
              <input name="username" id="username" v-validate="'required'"
                     class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }"
                     type="text" placeholder="" v-model="data.username">
              <i v-show="errors.has('username')" class="fa fa-warning text-danger"></i>
              <span v-show="errors.has('username')" class="help is-danger text-danger">{{ errors.first('username') }}</span>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="user_type">
                User Type
              </label>
            </div>
            <div class="col-sm-8">
              <select name="user_type" id="user_type" v-model="data.role_id" class="form-control">
                <option value="">All</option>
                <option :value="role.id" v-for="(role, index) in roles" :key="index">{{ role.name }}</option>
              </select>
            </div>
          </div>
          <!--                    <div class="form-group row">
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
                              </div>-->

          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="email">
                Email
              </label>
            </div>
            <div class="col-sm-8">
              <input name="email" id="email" v-validate="'email'"
                     class="form-control"
                     type="email" placeholder="" v-model="data.email" ref="email">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-4 text-right txt_media">
              <label class="form-control-label" for="max_payout">
                Max Payout
              </label>
            </div>
            <div class="col-sm-8">
              <input type="number" id="max_payout" name="max_payout" v-model="data.max_payout" class="form-control" placeholder="">
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

export default {
  props:[
    'data',
    'roles',
    'agents',
    'states'
  ],
  data(){
    return{
      title: 'Edit User',
      agent_id: this.$store.state.pageParam
    }
  },
  methods:{
    validateBeforeSubmit(){
      this.$validator.validateAll().then(result => {
        if(result){
          $('#saveBtn').attr('disabled', true).text('Submit...');
          this.$axios.post('/admin/agent-management/agent/'+this.agent_id+'/update-user', this.data).then(res=>{
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
  }
}
</script>
