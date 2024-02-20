<template>
    <div>

        <card title="List">
            <div class="table-responsive">
                <table class="table table-bordered table-striped" v-if="!loading">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>D.O.B</th>
                            <th>Location</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(result, index) in results" :key="index" v-if="results.length">
                            <td>{{ result.first_name+ ' '+result.last_name }}</td>
                            <td>{{ result.gender }}</td>
                            <td>{{ result.date_of_birth }}</td>
                            <td>
                                <strong>Shop Address:</strong> {{ result.shop_address }}<br />
                                <strong>Contact Address:</strong> {{ result.personal_address }}<br />
                                <strong>State:</strong> {{ result.state }}
                            </td>
                            <td>{{ result.email }}</td>
                            <td>{{ result.phone }}</td>
                            <td>
                                <a href="javascript:;" @click="showForm(result.id, index)">Activate</a>
                            </td>
                        </tr>
                        <tr v-if="!results.length">
                            <td colspan="10">No pending agent request</td>
                        </tr>
                        
                    </tbody>
                </table>
                <div style="width: 100%" v-if="loading" class="text-center">
                    <i class="fa fa-spin fa-spinner fa-4x"></i>
                </div>
            </div>
        </card>
        <b-modal ref="activate" hide-footer title="Activate Agent" no-close-on-backdrop>
            <div class="d-block ">
                <form id="deptEditFor" @submit.prevent="activate" class="form-horizontal" role="form" data-vv-scope="deptForm">
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="name" class="control-label float-md-right txt_media1">
                                Username
                                <span class="text-danger">*</span>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <input name="username" v-validate="'required|alpha'" 
                                    class="form-control" :class="{'input': true, 'is-danger': errors.has('username') }" 
                                    type="text" placeholder="Enter Agent Userame" v-model="data.username">
                                    <i v-show="errors.has('username')" class="fa fa-warning text-danger"></i>
                                    <span v-show="errors.has('username')" class="help is-danger text-danger">{{ errors.first('username') }}</span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="name" class="control-label float-md-right txt_media1">
                                Opening Balance
                                <span class="text-danger">*</span>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <input name="opening_balance" v-validate="'required|alpha'" 
                                    class="form-control" :class="{'input': true, 'is-danger': errors.has('opening_balance') }" 
                                    type="text" placeholder="Enter amount" v-model="data.opening_balance">
                                    <i v-show="errors.has('opening_balance')" class="fa fa-warning text-danger"></i>
                                    <span v-show="errors.has('opening_balance')" class="help is-danger text-danger">{{ errors.first('opening_balance') }}</span>
                        </div>
                    </div>
                    <div class="row marginTop">
                        <div class="col-6 col-md-6">
                            <input type="hidden" name="id" v-model="data.id">
                        </div>
                        <div class="col-6 col-md-6">
                            <input type="submit" id="editBtn" value="Save"
                                    class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                                    tabindex="7">
                        </div>
                    </div>
                </form>
            </div>

        </b-modal>
    </div>
</template>
<script>
import card from "../../components/card.vue"
import axios from '~/plugins/axios'

    export default {
        name:'pendingreq',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Pending Agent Requests',
                results: [],
                data:{
                    username:'',
                    opening_balance:'',
                    id:''
                },
                row_index:'',
                loading: true
            }
        },
        methods:{
            showForm(id, i){
                this.data.id = id
                this.row_index = i
                this.$refs.activate.show();
            },
            activate(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#saveBtn').attr('disabled', true).text('Activating...');
                        axios.post('/api/admin/agent-management/activate', this.data).then(res=>{
                            $('#saveBtn').attr('disabled', false).text('Save');
                            if(res.data.success){
                                this.results.splice(this.row_index, 1);
                                this.$toast.success(res.data.message,{icon: 'check'})
                            }else{
                                this.$toast.error('Something went wrong. Unable to activate agent!',{icon: 'check'})                
                            }
                        }).catch(err=>{
                            $('#saveBtn').attr('disabled', false).text('Save');                    
                            this.$toast.error('Internal server error!',{icon: 'times'})                                    
                        })
                    }
                })
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Pending Agent Request')
        },
        mounted(){
            axios.get('/api/admin/agent-management/pending-request').then(response =>  {
                this.results = response.data
                this.loading = false;
            }).catch(error => {
                console.log(error.data)
            });     
        }
    }
</script>