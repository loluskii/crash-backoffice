<template>
    <b-modal hide-footer id="jackpot-winnings"
    :no-close-on-backdrop="true"
    @ok="saveWinnings" size="sm" title="Jackpot Winnings" ref="jackpotWinModal">
        <form @submit.prevent="saveWinnings">
            <b-form-group id="jackpotGroup"
                    label="Enter Amount"
                    label-for="amount">
                <b-form-input id="amount"
                    type="number" :class="{'input': true, 'is-danger': errors.has('form.amount') }"
                    v-model="form.amount" name="amount"
                    v-validate="'required|numeric'" >
                </b-form-input>
                <i v-show="errors.has('form.amount')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.amount')" class="help is-danger text-danger">
                    {{ errors.first('form.amount') }}
                </span>
            </b-form-group>

            <b-button class="pull-right" variant="success" type="submit">Save</b-button>
        </form>
    </b-modal>
</template>
<script>
  import Bets from "../services/bets";

    export default {
        data(){
            return{
                form:{
                    amount : '',
                    user_id : '',
                    ticket_id: ''
                }
            }
        },
        methods:{
            saveWinnings(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#submitBtn').attr('disabled', true).text('Submitting...');
                        Bets.saveJackpotWinnings(this.form).then(res=>{
                            if(res.success){
                                this.closeModal()
                                $('#submitBtn').attr('disabled', false).text('Save');
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
                this.$refs.jackpotWinModal.hide();
                this.form={
                    amount : '',
                    user_id : '',
                    ticket_id : ''
                }
            }
        },
        mounted(){
            this.$nuxt.$on('show_winning_modal', (ticket) => {
                this.$refs.jackpotWinModal.show();
                this.form.user_id = ticket.user_id;
                this.form.ticket_id = ticket.id;
            })
        }
    }
</script>
