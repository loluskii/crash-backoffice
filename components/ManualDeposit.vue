<template>
    <b-modal hide-footer id="deposit"
    :no-close-on-backdrop="true"
    @ok="doDeposit" size="sm" title="Manual Deposit" ref="depositModal">
        <form @submit.prevent="doDeposit">
            <b-form-group id="exampleInputGroup1"
                    label="Deposit Amount"
                    label-for="exampleInput1">
                <b-form-input id="deposit_amount"
                    type="text" :class="{'input': true, 'is-danger': errors.has('form.amount') }"
                    v-model="form.amount" name="amount"
                    v-validate="'required|numeric'" >
                </b-form-input>
                <i v-show="errors.has('form.amount')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.amount')" class="help is-danger text-danger">
                    {{ errors.first('form.amount') }}
                </span>
            </b-form-group>
            <b-form-group id="exampleInputGroup2"
                    label="Note"
                    label-for="description">
                <b-form-input id="description"
                            type="text"
                            v-model="form.description"
                            >
                </b-form-input>
            </b-form-group>
            <b-button class="pull-right" variant="success" type="submit">Deposit</b-button>
        </form>
    </b-modal>
</template>
<script>
    export default {
        data(){
            return{
                form:{
                    amount : '',
                    description: '',
                    action: 'deposit',
                    user_id : ''
                }
            }
        },
        computed:{
            isValid(){

            }
        },
        methods:{
            doDeposit(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#submitBtn').attr('disabled', true);
                        this.$axios.post('admin/player-management/funds-transfer', this.form).then(res=>{
                            if(res.data.success){
                                this.closeModal()
                                $('#submitBtn').attr('disabled', false);
                                this.$swal('Success!', 'Transaction was successful', 'success');
                            }else {
                                this.$swal('Error!', 'Something went wrong. Unable to carry out operation', 'error');
                                $('#submitBtn').attr('disabled', false);
                            }
                        })
                    }
                })
            },
            closeModal(){
                this.$refs.depositModal.hide();
                this.form={
                    amount : '',
                    description : '',
                    action: 'withdrawal',
                    user_id : ''
                }
            }
        },
        mounted(){
            this.$nuxt.$on('deposit_modal', (id) => {
                this.$refs.depositModal.show();
                this.form.user_id = id
            })
        }
    }
</script>
