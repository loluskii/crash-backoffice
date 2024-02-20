<template>
  <card title="Retail" :padding="true">
    <form class="form-horizontal" @submit.prevent="saveNetwork">
      <toggle-button
        v-model="network.isDay"
        :switch-color="{checked: '#131313', unchecked: '#99c7f4'}"
        :color="{checked: '#99c7f4', unchecked: '#131313'}"
        :sync="true"
        :labels="{checked: 'Day', unchecked: 'Night'}"
        width="100"
        height="40"
        font-size="15"
      />
        <div class="form-group form-inline text-left row">
          <label class="col-md-6 form-control-label text-left">Minimum Withdrawal: </label>
          <div class="col-md-6" >
            <input type="text" class="form-control" name="min_withdrawal" autocomplete="off" v-model="network.min_withdrawal">
          </div>
        </div>
        <div class="form-group form-inline text-left row">
          <label class="col-md-6 form-control-label text-left">Maximum Withdrawal: </label>
          <div class="col-md-6" >
            <input type="text" class="form-control" name="max_withdrawal" autocomplete="off" v-model="network.max_withdrawal">
          </div>
        </div>
        <div class="form-group form-inline text-left row">
          <label class="col-md-6 form-control-label text-left">Minimum Available Credit: </label>
          <div class="col-md-6" >
            <input type="text" class="form-control" name="network_min_available_credit" autocomplete="off" v-model="network.network_min_available_credit">
            <i class="fa fa-info-circle fa-1x ml-1" id="payment_day_info"></i>
            <b-tooltip target="payment_day_info" placement="bottom">
                This is the minimum amount an agent needs to have before requesting for withdrawal
            </b-tooltip>
          </div>
        </div>
        <div class="form-group form-inline text-left row ">
            <label class="col-md-6 form-control-label text-left">Max Payout for shop: </label>
            <div class="col-md-6" >
            <input type="text" class="form-control" name="max_payout" autocomplete="off" v-model="network.max_payout">
            </div>
        </div>
        <div class="form-group text-left row ">
            <label class="col-md-6 form-control-label text-left">Max odd length: </label>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6">
                  <label>Single:</label>
                  <input type="text" class="form-control" name="single_length" autocomplete="off" v-model="network.single_odd_length"><br>
                </div>
                <div class="col-md-6">
                  <label>Combi:</label>
                  <input type="text" class="form-control" name="combi_length" autocomplete="off" v-model="network.combi_odd_length">
                </div>
              </div>
            </div>
        </div>
        <!-- <div class="form-group form-inline text-left row ">
            <label class="col-md-6 form-control-label text-left">Live ticket delay: </label>
            <div class="col-md-6">
            <label>Single:</label>
            <input type="text" class="form-control" name="single_length" autocomplete="off" v-model="network.single_delay"><br>
            <label>Combi:</label>
            <input type="text" class="form-control" name="combi_length" autocomplete="off" v-model="network.combi_delay">
            </div>
        </div> -->
        <div class="form-group row ">
            <label class="col-md-6 form-control-label text-left">Ticket stake settings: </label>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6">
                  <label>Single min:</label>
                  <input type="text" class="form-control" name="single_length" autocomplete="off" v-model="network.single_min">
                </div>
                <div class="col-md-6">
                  <label>Single max:</label>
                  <input type="text" class="form-control" name="single_length" autocomplete="off" v-model="network.single_max">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Combi min:</label>
                  <input type="text" class="form-control" name="single_length" autocomplete="off" v-model="network.combi_min">
                </div>
                <div class="col-md-6">
                  <label>Combi max:</label>
                  <input type="text" class="form-control" name="single_length" autocomplete="off" v-model="network.combi_max">
                </div>
              </div>
            </div>
        </div>
        <div class="form-group row ">
            <label class="col-md-6 form-control-label text-left">Ticket size settings: </label>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6">
                  <label>Minimum:</label>
                  <input type="text" class="form-control" name="single_length" autocomplete="off" v-model="network.size_min">
                </div>
                <div class="col-md-6">
                  <label>Maximum:</label>
                  <input type="text" class="form-control" name="combi_length" autocomplete="off" v-model="network.size_max">
                </div>
              </div>
            </div>
        </div>

        <div class="form-group form-inline text-left row ">
            <label class="col-md-6 form-control-label text-left">Max time to cancel ticket: </label>
            <div class="col-md-6" >
            <input type="text" class="form-control" name="max_payout" autocomplete="off" v-model="network.max_time_to_cancel">
            </div>
        </div>
        <div class="form-group form-inline text-left row ">
            <label class="col-md-6 form-control-label text-left">Daily ticket cancel limit: </label>
            <div class="col-md-6" >
            <input type="text" class="form-control" name="max_payout" autocomplete="off" v-model="network.daily_cancel_limit">
            </div>
        </div>
        <div class="form-group form-inline text-left row ">
            <label class="col-md-6 form-control-label text-left">Single ticket max winning: </label>
            <div class="col-md-6" >
              <input type="text" class="form-control" name="max_payout" autocomplete="off" v-model="network.single_max_winning">
            </div>
        </div>
        <div class="form-group form-inline text-left row ">
          <label class="col-md-6 form-control-label text-left">Max Allowed Duplicate ticket: </label>
          <div class="col-md-6" >
            <input type="text" class="form-control" name="max_duplicate_ticket" autocomplete="off" v-model="network.max_duplicate_ticket">
          </div>
        </div>
        <div class="form-group row ">
          <label class="col-md-6 form-control-label text-left">Accept PreMatch Bets:</label>
          <div class="col-md-6" >
            <input type="radio" id="yes" :value="1" v-model="network.accept_prematch_bets">
            <label for="yes">Yes</label>
            <input type="radio" id="no" :value="0" v-model="network.accept_prematch_bets">
            <label for="no">No</label>
          </div>
        </div>
        <div class="form-group row ">
          <label class="col-md-6 form-control-label text-left">Accept Live Bets:</label>
          <div class="col-md-6" >
            <input type="radio" id="yes_live" :value="1" v-model="network.accept_live_bets">
            <label for="yes_live">Yes</label>
            <input type="radio" id="no_live" :value="0" v-model="network.accept_live_bets">
            <label for="no_live">No</label>
          </div>
        </div>
        <div class="form-group row ">
          <label class="col-md-6 form-control-label text-left">Enable Cashout:</label>
          <div class="col-md-6" >
            <input type="radio" :value="1" v-model="network.enable_cashout">
            <label>Yes</label>
            <input type="radio" :value="0" v-model="network.enable_cashout">
            <label>No</label>
          </div>
        </div>

        <div class="form-group row ">
          <label class="col-md-6 form-control-label text-left">Enable Cut (X):</label>
          <div class="col-md-6" >
            <input type="radio" :value="1" v-model="network.enable_cut_x">
            <label>Yes</label>
            <input type="radio" :value="0" v-model="network.enable_cut_x">
            <label>No</label>
          </div>
        </div>
        <div class="form-group row ">
          <label class="col-md-6 form-control-label text-left">Enable System Bet:</label>
          <div class="col-md-6" >
            <input type="radio" :value="1" v-model="network.allow_system_bet">
            <label for="one">Yes</label>
            <input type="radio" :value="0" v-model="network.allow_system_bet">
            <label for="two">No</label>
          </div>
        </div>
        <div class="form-group row ">
          <label class="col-md-6 form-control-label text-left">Enable Split Bet:</label>
          <div class="col-md-6" >
            <input type="radio" :value="1" v-model="network.allow_split_bet">
            <label for="one">Yes</label>
            <input type="radio" :value="0" v-model="network.allow_split_bet">
            <label for="two">No</label>
          </div>
        </div>
        <div class="form-group form-inline text-left row ">
          <label class="col-md-6 form-control-label text-left">Min Bonus Odd: </label>
          <div class="col-md-6" >
            <input type="text" class="form-control" name="min_bonus_odd" autocomplete="off" v-model="network.min_bonus_odd">
            <i class="fa fa-info-circle fa-1x ml-1" id="min_bonus_odd_info"></i>
            <b-tooltip target="min_bonus_odd_info" placement="bottom">
                Enter the minimum odd for bonus calculation.
            </b-tooltip>
          </div>
        </div>
        <div class="form-group form-inline text-left row ">
          <label class="col-md-6 form-control-label text-left">Hold Bets From: </label>
          <div class="col-md-6" >
            <input type="text" class="form-control" name="hold_bets" autocomplete="off" v-model="network.hold_bets">
            <i class="fa fa-info-circle fa-1x ml-1" id="hold_bets_info"></i>
            <b-tooltip target="hold_bets_info" placement="bottom">
                Enter the minimum stake to hold bets for verification
            </b-tooltip>
          </div>
        </div>
        <div class="form-group form-inline text-left ">
          <!-- <div class="col-md-9 offset-md-3"> -->
            <button type="submit" class="btn btn-primary btn-block" id="save">Save </button>
          <!-- </div> -->
        </div>
    </form>
  </card>
</template>
<script>
export default {
  data() {
    return {
      network: {
        isDay: true,
        period: 'day',
        min_withdrawal: '10000',
        max_withdrawal: '1000000',
        network_min_available_credit: '25000',
        payment_day: '',
        max_payout: '10000000',
        single_odd_length: '1000000',
        combi_odd_length: '10000000',
        // single_delay: '7000',
        // combi_delay: '3000',
        single_min: '100',
        single_max: '1000000',
        combi_min: '100',
        combi_max: '1000000',
        size_min: '0',
        size_max: '50',
        max_time_to_cancel: '300',
        min_bonus_odd: 1.18,
        hold_bets: 10000,
        daily_cancel_limit: '',
        single_max_winning: '3000000',
        max_duplicate_ticket: 4,
        enable_cashout: 0,
        enable_cut_x: 0,
        accept_prematch_bets: 1,
        accept_live_bets: 1,
        allow_system_bet: 1,
        allow_split_bet: 1,
      },
    }
  },
  methods: {
    setNetwork(res){
      var self =this;
      $.each(res, function(key, item){
          if(item.option == 'min_withdrawal'){
              self.network.min_withdrawal = item.value
          }
          if(item.option == 'max_withdrawal'){
              self.network.max_withdrawal = item.value
          }
          if(item.option == 'network_min_available_credit'){
              self.network.network_min_available_credit = item.value
          }
          if(item.option == 'payment_day'){
              self.network.payment_day = item.value
          }
          if(item.option == 'max_payout'){
              self.network.max_payout = item.value
          }
          if(item.option == 'single_odd_length'){
              self.network.single_odd_length = item.value
          }
          if(item.option == 'combi_odd_length'){
              self.network.combi_odd_length = item.value
          }
          if(item.option == 'single_delay'){
              self.network.single_delay = item.value
          }
          if(item.option == 'combi_delay'){
              self.network.combi_delay = item.value
          }
          if(item.option == 'single_min'){
              self.network.single_min = item.value
          }
          if(item.option == 'single_max'){
              self.network.single_max = item.value
          }
          if(item.option == 'combi_min'){
              self.network.combi_min = item.value
          }
          if(item.option == 'combi_max'){
              self.network.combi_max = item.value
          }
          if(item.option == 'size_min'){
              self.network.size_min = item.value
          }
          if(item.option == 'size_max'){
              self.network.size_max = item.value
          }
          if(item.option == 'max_time_to_cancel'){
              self.network.max_time_to_cancel = item.value
          }
          if(item.option == 'daily_cancel_limit'){
              self.network.daily_cancel_limit = item.value
          }
          if(item.option == 'single_max_winning'){
              self.network.single_max_winning = item.value
          }
          if(item.option == 'max_duplicate_ticket'){
            self.network.max_duplicate_ticket = item.value
          }
          if(item.option == 'min_bonus_odd'){
              self.network.min_bonus_odd = item.value
          }
          if(item.option == 'hold_bets'){
              self.network.hold_bets = item.value
          }
          if(item.option === 'enable_cashout'){
            self.network.enable_cashout = item.value
          }
          if(item.option === 'enable_cut_x'){
            self.network.enable_cut_x = item.value
          }
          if(item.option === 'accept_prematch_bets'){
            self.network.accept_prematch_bets = item.value
          }
          if(item.option === 'accept_live_bets'){
            self.network.accept_live_bets = item.value
          }

          if(item.option === 'allow_system_bet'){
            self.network.allow_system_bet = item.value
          }
          if(item.option === 'allow_split_bet'){
          self.network.allow_split_bet = item.value
        }

      });
  },
  saveNetwork(){
      $('#save').attr('disabled', true).html('Please wait..');
      this.$axios.post('/admin/settings/network', this.network).then(res=>{
          if(res.data.success){
              this.$swal('Success!','Settings has bee saved', 'success');
              $('#save').attr('disabled', false).html('Save');
          }else{
              $('#save').attr('disabled', false).html('Save');
              this.$swal('Error!','Something went wrong', 'error');
          }
      })
  },
  getSettings(category){
    this.$axios.get('/admin/settings?category=network').then(response =>  {
      this.setNetwork(response.data);
    }).catch(error => {
      toastr['error']('An error occured.', 'Error');
    });
  },
  },
  mounted(){
    this.getSettings();
  },
}
</script>
<style scoped>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
input.form-control{
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #ced4da !important;
    /* width: 200px; */
}
.form-inline label{
    justify-content: flex-start;
}
</style>
