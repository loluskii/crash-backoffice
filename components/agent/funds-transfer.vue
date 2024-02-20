<template>
    <div class="row m-3">
        <div class="col-md-6">
            <card title="Transfer Form" :padding="true">
                <form class="form-horizontal columns column is-multiline is-12" role="form" @submit.prevent="send">
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="input-text" class="control-label float-md-right txt_media1">
                                From
                                <span class="text-danger">*</span>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <v-select disabled label="username" v-model="from_user" v-validate="'required'"
                            @input="setFromUser" placeholder="Select User"
                            :options="computedUsers" name="from_user"></v-select>
                            <i v-show="errors.has('from_user')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('from_user')" class="help is-danger text-danger">The field is required</span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="input-text" class="control-label float-md-right txt_media1">
                                To
                                <span class="text-danger">*</span>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <v-select disabled label="username" v-model="to_user" v-validate="'required'"
                            @input="setToUser" placeholder="Select User"
                            :options="computedUsers" name="to_user"></v-select>
                            <i v-show="errors.has('to_user')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('to_user')" class="help is-danger text-danger">{{ errors.first('to_user') }}</span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="amount" class="control-label float-md-right txt_media1">
                                Amount
                                <span class="text-danger">*</span>
                            </label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" v-validate="'required'" class="form-control" name="amount" id="amount" v-model="formData.amount">
                            <i v-show="errors.has('amount')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('amount')" class="help is-danger text-danger">Please enter an amount</span>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-4">
                            <label for="description" class="control-label float-md-right txt_media1">
                                Note
                            </label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="form-control" name="description" id="description" v-model="formData.description">

                        </div>
                    </div>
                     <div class="row form-group">
                        <div class="col-md-4">
                            <label for="transfer_type" class="control-label float-md-right txt_media1">
                                Transfer Type:
                            </label>
                        </div>
                        <div class="col-md-8">
                            <label for="top_up">
                            <input type="radio" id="top_up" name="transfer_type" value="top_up" v-model="formData.transfer_type">
                                Top Up
                            </label>
                            <label for="trust">
                                <input type="radio" id="trust" name="transfer_type" value="trust" v-model="formData.transfer_type">
                                Trust (Bailout)
                            </label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-6">
                            <button class="button btn btn-success btn-block text-capitalize" id="deposit" type="submit"
                            name="button"
                            @click="formData.action = 'deposit'"
                            >Deposit</button>
                        </div>
                        <div class="control col-md-6">
                            <button class="button btn btn-danger btn-block text-capitalize" id="withdraw"
                            type="submit" @click="formData.action = 'withdraw'"
                            name="button"
                            >Withdraw</button>
                        </div>
                    </div>
                </form>
            </card>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header bg-primary">
                    <h3 class="card-title">
                         Transfer Details
                    </h3>
                </div>
                <div class="card-body">
                    <form action="#">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group row">
                                        <div class="col-sm-4 text-right txt_media">
                                        <label class="form-control-label">
                                            Withdraw From :
                                        </label></div>
                                        <div class="col-sm-8">
                                            <span class="form-control-plaintext">
                                                {{ (from_user)?from_user.username +' ('+from_user.first_name+' '+from_user.last_name +')' : ''}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group row">
                                        <div class="col-sm-4 text-right txt_media">
                                        <label for="inputEmail" class="form-control-label">Send To:</label>
                                        </div>
                                        <div class="col-sm-8">
                                            <span class="form-control-plaintext">
                                                {{ (to_user)?to_user.username +' ('+to_user.first_name+' '+to_user.last_name+')' : ''}}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-sm-6 col-sm-12">
                                    <div class="form-group row">
                                        <div class="col-sm-4 text-right txt_media">
                                        <label class="form-control-label">Amount :
                                        </label></div>
                                        <div class="col-sm-8">
                                            <span class="form-control-plaintext">{{ formData.amount }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 col-sm-12">
                                    <div class="form-group row">
                                        <div class="col-sm-4 text-right txt_media">
                                        <label class="form-control-label">Note :
                                        </label></div>
                                        <div class="col-sm-8">
                                            <span class="form-control-plaintext"> {{ (formData.description)?formData.description : ''}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Card from '../card'
    import Agent from '../../services/agents'
    export default {
        components:{
            Card
        },
        props:[
            'users'
        ],
        data(){
            return{
                from_user:'',
                to_user:'',
                formData: {
                    from_user:'System',
                    to_user:'',
                    amount: '',
                    description: '',
                    action: '',
                    transfer_type:'top_up',
                    agent_id: this.$store.state.pageParam,
                }
            }
        },
        computed:{
            computedUsers(){
                let newUsers = [{username:'System'}]
                Array.prototype.push.apply(newUsers,this.users);

                // console.log(newUsers);
                return newUsers
            }
        },
        methods:{
            setFromUser(e){
              this.formData.from_user = e.username
            },
            setToUser(e){
              this.formData.to_user = e.username
              if(e.username !== 'System'){
                this.formData.description = e.code+ ' '+e.username
              }else{
                this.formData.description = 'withdraw to ' + e.username
              }
            },
            send(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // this.formData.from_user = this.from_user.username;
                        // this.formData.to_user = this.to_user.username;
                        $('#'+this.formData.action).attr('disabled', true).text('Processing...');
                        Agent.transfer(this.formData).then( res => {
                            $('#'+this.formData.action).attr('disabled', false).text(this.formData.action);
                            if(res.success){
                              this.$toast.success('Transaction was successful',{icon: 'check'});
                              this.resetForm();

                            }else{
                                this.$toast.error(res.message, {icon:'times'})
                            }
                        }).catch(error => {
                            $('#'+this.formData.action).attr('disabled', false).text(this.formData.action);
                            console.log(error);
                        });
                    }
                });
            },
            resetForm(){
                this.formData = {
                    from_user:'',
                    to_user:'',
                    amount: '',
                    description: '',
                    action: '',
                    agent_id: this.$store.state.pageParam,
                }
            }
        },
        updated () {
          if (this.computedUsers.length > 0) {
            const agentName = this.users.find(item => item.user_id == this.$store.state.pageParam);
            if (agentName) {
              this.to_user = agentName.username;
              this.formData.to_user = agentName.username;

              this.formData.from_user = 'System';
              this.from_user = 'System';
              this.formData.description = agentName.code+ ' '+agentName.username

            }
          }
        },
        mounted() {

        },
    }
</script>
