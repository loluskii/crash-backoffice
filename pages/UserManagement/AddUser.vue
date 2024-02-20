<template>
    <div class="card ">
        <div class="card-header bg-primary text-white">
            <h3 class="card-title">
                <i class="fa fa-fw ti-pencil"></i> User Details
            </h3>
        </div>
        <div class="card-body">
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
                                <select name="country" id="country"

                                

                                @change="setStates()" v-model="formData.country" class="form-control">
                                    <option :value="country.id" v-for="(country, index) in countries" :key="index">{{country.name}}</option>

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
                        </div>
                        <div class="form-group row">
                           <div class="col-sm-4 text-right txt_media">
                                <label class="form-control-label" for="language">
                                    Language
                                </label>
                            </div>
                            <div class="col-sm-8">
                                <select name="language" id="language" v-model="formData.language" class="form-control">
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
                              <input type="text" v-model="formData.currency" class="form-control" name="currency" id="currency">
                                <!-- <select name="currency" id="currency" class="form-control" v-model="formData.currency">
                                    <option value="NGN">NGN</option>
                                </select> -->
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-4 text-right txt_media">
                                <label class="form-control-label" for="first_name">
                                    Name
                                </label>
                            </div>
                            <div class="col-sm-8">
                                <input name="first_name" v-validate="'required'"
                                    class="form-control" :class="{'input': true, 'is-danger': errors.has('first_name') }"
                                    type="text" placeholder="" v-model="formData.first_name">
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
                                <input name="last_name" v-validate="'required'"
                                    class="form-control" :class="{'input': true, 'is-danger': errors.has('last_name') }"
                                    type="text" placeholder="" v-model="formData.last_name">
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
                                <input type="text" id="date_of_birth" v-model="formData.date_of_birth" name="date_of_birth" class="form-control" placeholder="">
                            </div>
                        </div>
                        <div class="form-group row">
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
                        <div class="form-group row">
                            <div class="col-sm-4 text-right txt_media">
                                <label class="form-control-label" for="address">
                                    Address
                                </label>
                            </div>
                            <div class="col-sm-8">
                                <input name="address" v-validate="'required'"
                                    class="form-control" :class="{'input': true, 'is-danger': errors.has('address') }"
                                    type="text" placeholder="" v-model="formData.address">
                                    <i v-show="errors.has('address')" class="fa fa-warning text-danger"></i>
                                    <span v-show="errors.has('address')" class="help is-danger text-danger">{{ errors.first('address') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-4 text-right txt_media">
                                <label class="form-control-label" for="phone_number">
                                    Phone Number
                                </label>
                            </div>
                            <div class="col-sm-8">
                                <input name="phone_number" v-validate="'required'"
                                    class="form-control" :class="{'input': true, 'is-danger': errors.has('phone_number') }"
                                    type="text" placeholder="" v-model="formData.phone_number">
                                    <i v-show="errors.has('phone_number')" class="fa fa-warning text-danger"></i>
                                    <span v-show="errors.has('phone_number')" class="help is-danger text-danger">{{ errors.first('phone_number') }}</span>
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
                                    type="text" placeholder="" v-model="formData.username">
                                    <i v-show="errors.has('username')" class="fa fa-warning text-danger"></i>
                                    <span v-show="errors.has('username')" class="help is-danger text-danger">{{ errors.first('username') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-4 text-right txt_media">
                                <label class="form-control-label" for="user_type">
                                    User Level
                                </label>
                            </div>
                            <div class="col-sm-8">
                                <select name="user_type" id="user_type" v-model="formData.user_type" class="form-control">
                                    <option :value="role.id" v-for="(role, index) in roles" :key="index">{{ role.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-4 text-right txt_media">
                                <label class="form-control-label" for="user_type">
                                    Parent User
                                </label>
                            </div>
                            <div class="col-sm-8">
                                <autocomplete
                                    ref="autocomplete"
                                    :source="getUrl"
                                    results-property="data"
                                    input-class="form-control"
                                    @selected="addUser"
                                    results-display="username">
                                </autocomplete>
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
                            <div class="col-sm-4 text-right">
                                <label class="form-control-label" for="password">
                                    Password
                                </label>
                            </div>
                            <div class="col-sm-8">
                                <input name="password" v-validate="'required'"
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
                                <input name="password_confirmation" v-validate="'required|confirmed:password'"
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
                                <input name="email" v-validate="'required|email'"
                                    class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }"
                                    type="email" placeholder="" v-model="formData.email" ref="email">
                                    <i v-show="errors.has('email')" class="fa fa-warning text-danger"></i>
                                    <span v-show="errors.has('email')" class="help is-danger text-danger">{{ errors.first('email') }}</span>
                            </div>
                        </div>
                        <div class="form-group row ">
                            <div class="col-sm-4 text-right txt_media">
                                <label class="form-control-label" for="confirm_email">
                                    Confirm Email
                                </label>
                            </div>
                            <div class="col-sm-8">
                                <input name="confirm_email" v-validate="'required|email|confirmed:email'"
                                    class="form-control" :class="{'input': true, 'is-danger': errors.has('confirm_email') }"
                                    type="email" placeholder="" data-vv-as="email">
                                    <i v-show="errors.has('confirm_email')" class="fa fa-warning text-danger"></i>
                                    <span v-show="errors.has('confirm_email')" class="help is-danger text-danger">{{ errors.first('confirm_email') }}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6 ml-auto">
                                <nuxt-link to="/UserManagement/Users" class="btn btn-default btn-block">Cancel</nuxt-link>
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
        </div>
    </div>
</template>
<script>
import Autocomplete from 'vuejs-auto-complete'

    export default {
        name:'add-shop',
        layout: 'main',
        data(){
            return{
                title: 'Add New User',
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
                    user_type:'',
                    parent_agent: ''
                },
                roles: [],
                agents: [],
                countries: [],
                states: [],
            }
        },
        methods:{
            getUrl(input){
                return process.env.prodURL + '/api/users/find?q='+input;
            },
            addUser(user){
                this.formData.parent_agent = user.value;
            },
            validateBeforeSubmit(){
                this.$validator.validateAll().then(result => {
                    if(result){
                        $('#saveBtn').attr('disabled', true).text('Submit...');
                        this.$axios.post('/admin/settings/users', this.formData).then(res=>{
                            $('#saveBtn').attr('disabled', false).text('Save');
                            if (res.data.success) {
                                this.$toast.success(res.data.message,{icon: 'check'})
                                this.$router.push('/UserManagement/Users')
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
            setStates() {
                // find country
                const country = this.countries.find(country => country.id === parseInt(this.formData.country));
                // console.log(country);
                if (country) {
                    this.states = country.states;
                    this.formData.currency = country.currency_code;

                }
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Add New User')
        },
        mounted(){
            this.$axios.get('/admin/settings/roles').then(res => {
                this.roles =res.data;
            });

            this.$axios.get('/admin/utilities/get-country-states').then(res => {
                this.states = res.data.states;
                this.countries = res.data.countries;
            })
        }
    }
</script>
