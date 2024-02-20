<template>
    <b-modal title="Edit Ticket" ref="ticketModal" @ok="editTicket" :no-close-on-backdrop="true">

      <form @submit.prevent="editTicket" id="editTicket">
        
            <div class="form-group">
              <label for="">Stake</label>
              <input type="text" class="form-control" v-model="formData.total_stake" @blur="updateWinnings" v-validate data-vv-rules="required" required/>
            </div>
            <div class="form-group">
              <label for="">Total Odds</label>
              <input type="text" class="form-control" v-model="formData.total_odds" @blur="updateWinnings" v-validate data-vv-rules="required" required/>
            </div>
            <div class="form-group">
              <label for="">Bonus</label>
              <input type="text" class="form-control" v-model="formData.bonus" placeholder="Bonus" @blur="updateWinnings" v-validate data-vv-rules="required" required/>
            </div>
            <div class="form-group">
              <label for="">Potential Winnings</label>
              <input type="text" class="form-control" v-model="formData.pot_winnings" placeholder="" v-validate data-vv-rules="required" required/>
            </div>  
            <div class="form-group">
              <label for="">Amount Won</label>
              <input type="text" class="form-control" v-model="formData.winnings" placeholder="Winnings" v-validate data-vv-rules="required" required/>
            </div>          
      </form>
    </b-modal>
</template>
<script>
    import Bets from "../services/bets";

    export default {
        data(){
            return{
                formData:{
                    total_stake: '',
                    total_odds: '',
                    winnings: '',
                    pot_winnings: '',
                    bonus: '',
                    id: ''
                },
            }
        },
        methods:{
            editTicket(){
                // e.preventDefault();
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // $('#saveBtn').attr('disabled', true).html('Please wait..');
                        Bets.editTicket(this.formData).then((res) => {
                            if(res.success){
                                // $('#ticketForm').modal('hide');
                                // this.tickets = res.tickets.data;
                                // this.pagination = res.tickets;
                                this.$swal('Success!','Ticket has been updated', 'success');
                                // $('#saveBtn').attr('disabled', false).html('Save');
                                setTimeout(function(){
                                    window.location.reload()
                                }, 3000);
                            }else{
                                // $('#saveBtn').attr('disabled', false).html('Save');
                                this.$swal('Error!','Something went wrong', 'error');
                            }
                        })
                    }
                })
            },
            closeTicketForm(){
                // $('#editTicket')[0].reset();
                this.formData.total_stake = '';
                this.formData.total_odds = '';
                this.formData.bonus = '';
                this.formData.winnings = '';
                this.formData.pot_winnings = '';
                this.formData.id = '';
                this.$refs.ticketModal.hide();
            },
            updateWinnings(){
                let winnings = parseFloat(this.formData.total_odds) * parseFloat(this.formData.total_stake)
                this.formData.pot_winnings = winnings  + parseFloat(this.formData.bonus);
                this.formData.winnings = winnings  + parseFloat(this.formData.bonus);
            },
        },
        mounted(){
            this.$nuxt.$on('edit_ticket', (ticket) => {
                this.formData.total_stake = ticket.stake;
                this.formData.total_odds = ticket.odds;
                this.formData.bonus = ticket.bonus;
                this.formData.winnings = ticket.winnings;
                this.formData.pot_winnings = ticket.pot_winnings;
                this.formData.id = ticket.id;
                this.$refs.ticketModal.show();
            })
        }
    }
</script>
