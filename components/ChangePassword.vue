<template>
    <b-modal hide-footer id="changePassword"
    :no-close-on-backdrop="true"
    @ok="changePassword" size="sm" title="Change Password" ref="changePassword">
        <form @submit.prevent="changePassword">
            <b-form-group id="exampleInputGroup1"
                    label="New Password"
                    label-for="exampleInput1">
                <b-form-input id="new_password"
                    type="password" :class="{'input': true, 'is-danger': errors.has('form.new_password') }"
                    v-model="form.new_password" name="new_password"
                    v-validate="'required|min:6'" ref="password" >
                </b-form-input>
                <i v-show="errors.has('form.new_password')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.new_password')" class="help is-danger text-danger">
                    {{ errors.first('form.new_password') }}
                </span>
            </b-form-group>
            <b-form-group id="exampleInputGroup2"
                    label="Confirm Password"
                    label-for="conf_password">
                <b-form-input id="conf_password"
                    type="password" name="conf_password"
                    v-model="form.conf_password" :class="{'input': true, 'is-danger': errors.has('form.conf_password') }"
                    v-validate="'required|min:6|confirmed:password'">
                </b-form-input>
                <i v-show="errors.has('form.conf_password')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.conf_password')" class="help is-danger text-danger">
                    {{ errors.first('form.conf_password') }}
                </span>
            </b-form-group>
            <b-button class="pull-right" id="submitBtn" variant="primary" type="submit">Change Password</b-button>
        </form>
    </b-modal>
</template>
<script>
    export default {
        data(){
            return{
                form:{
                    new_password : '',
                    conf_password: '',
                    user_id : ''
                }
            }
        },
        computed:{
            isValid(){

            }
        },
        methods:{
            changePassword(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#submitBtn').attr('disabled', true);
                        this.$axios.post('admin/settings/users/change-password', this.form).then(res=>{
                            if(res.data.success){
                                this.closePasswordForm()
                                $('#submitBtn').attr('disabled', false);
                                this.$swal('Success!', 'password has been changed', 'success');
                            }else {
                                this.$swal('Error!', 'Something went wrong. Unable to change password', 'error');
                                $('#submitBtn').attr('disabled', false);
                            }
                        })
                    } else {
                      console.log(result)
                    }
                })
            },
            closePasswordForm(){
                this.$refs.changePassword.hide();
                this.form={
                    new_password : '',
                    conf_password: '',
                    user_id : ''
                }
            }
        },
        mounted(){
            this.$nuxt.$on('password_modal', (id) => {
                this.$refs.changePassword.show();
                this.form.user_id = id
            })
        }
    }
</script>
