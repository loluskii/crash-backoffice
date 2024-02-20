<template>
  <div class="row">
        <div class="col-md-12">
            <card title="General Settings" :padding="true">
                <form class="form-horizontal" @submit.prevent="saveGeneral">
                    <div class="form-group row">
                      <div class="col-md-3" >
                        <label for="">Main Logo</label>
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="general.logo" class="img-responsive" height="50">
                            </div>
                        </div>
                        <input type="file" v-on:change="onFileChange($event, 'logo')" id='logoInput' style="display: none">
                        <button type="reset" class="btn btn-effect-ripple btn-default reset_btn" align="center" @click="selectFile($event, 'logoInput')">
                            Choose File
                        </button>
                      </div>
                      <div class="col-md-3" >
                        <label for="">Print Logo</label>
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="general.print_logo" class="img-responsive" height="50">
                            </div>
                        </div>
                        <input type="file" v-on:change="onFileChange($event, 'print_logo')" id='printLogo' style="display: none">
                        <button type="reset" class="btn btn-effect-ripple btn-default reset_btn" align="center" @click="selectFile($event, 'printLogo')">
                            Choose File
                        </button>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group form-inline text-left row">
                          <div class="col-md-6 txt_media">
                              <label class="form-control-label" for="country">
                                Country of Operation
                              </label>
                          </div>
                          <div class="col-md-5">
                            <select name="country" id="country"
                              v-model="general.country" class="form-control"
                              @change="setCurrency()"
                            >
                              <option :value="country.name" v-for="(country, index) in countries" :key="index">{{country.name}}</option>
                            </select>
                          </div>
                        </div>
                        <div class="form-group form-inline text-left row">
                          <label class="col-md-6 form-control-label text-left">Currency Symbol: </label>
                          <div class="col-md-6" >
                            <input type="text" readonly class="form-control" name="currency_symbol" v-model="general.currency_symbol">
                          </div>
                        </div>
                        <div class="form-group form-inline text-left row">
                          <label class="col-md-6 form-control-label text-left">Dial Code: </label>
                          <div class="col-md-6" >
                            <input type="text" class="form-control" readonly name="dial_code"  v-model="general.dial_code">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group form-inline text-left row">
                      <label class="col-md-3 form-control-label text-left">Minimum Withdrawal: </label>
                      <div class="col-md-3" >
                        <input type="text" class="form-control" name="max_payout" autocomplete="off" v-model="general.min_withdrawal">
                      </div>
                      <label class="col-md-3 form-control-label text-left">Maximum Withdrawal: </label>
                      <div class="col-md-3" >
                        <input type="text" class="form-control" name="max_payout" autocomplete="off" v-model="general.max_withdrawal">
                      </div>
                    </div>
                    <div class="form-group form-inline text-left row">
                      <label class="col-md-3 form-control-label text-left">Minimum Deposit: </label>
                      <div class="col-md-3" >
                        <input type="text" class="form-control" name="max_payout" autocomplete="off" v-model="general.min_deposit">
                      </div>
                      <label class="col-md-3 form-control-label text-left">Max Upcoming Events Display: </label>
                      <div class="col-md-3" >
                        <input type="text" class="form-control" name="max_event_weeks" autocomplete="off" v-model="general.max_event_weeks">
                        <i class="fa fa-info-circle fa-1x ml-1" id="max_event_weeks_info"></i>
                        <b-tooltip target="max_event_weeks_info" placement="bottom">
                            Enter the number of weeks you want to display for upcoming events
                        </b-tooltip>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 form-control-label text-left">Allow Registraion:</label>
                      <div class="col-md-3" >
                        <input type="radio" value="Yes" v-model="general.allow_registration">
                        <label for="one">Yes</label>
                        <input type="radio" value="No" v-model="general.allow_registration">
                        <label for="two">No</label>
                      </div>
                      <label class="col-md-3 form-control-label text-left">Enable Elbet User:</label>
                      <div class="col-md-3" >
                        <input type="radio" :value="1" v-model="general.enable_elbet_user">
                        <label>Yes</label>
                        <input type="radio" :value="0" v-model="general.enable_elbet_user">
                        <label>No</label>
                      </div>
                    </div>
                    <div class="form-group row ">
                      <label class="col-md-3 form-control-label text-left">Enable Bank Account:</label>
                      <div class="col-md-3" >
                        <input type="radio" :value="1" v-model="general.enable_bank_account">
                        <label for="one">Yes</label>
                        <input type="radio" :value="0" v-model="general.enable_bank_account">
                        <label for="two">No</label>
                      </div>
                      <label class="col-md-3 form-control-label text-left">Enable auto-disbursement:</label>
                      <div class="col-md-3">
                        <input type="radio" :value="1" v-model="general.auto_disbursement">
                        <label>Yes</label>
                        <input type="radio" :value="0" v-model="general.auto_disbursement">
                        <label>No</label>
                      </div>
                    </div>

                  <div class="form-group row ">
                    <label class="col-md-3 form-control-label text-left">Enable Power Bonus:</label>
                    <div class="col-md-3" >
                      <input type="radio" :value="1" v-model="general.enable_power_bonus">
                      <label>Yes</label>
                      <input type="radio" :value="0" v-model="general.enable_power_bonus">
                      <label>No</label>
                    </div>
                    <label class="col-md-3 form-control-label text-left">Power Bonus Start day: </label>
                    <div class="input-group col-md-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                        </div>
                        <flat-pickr v-model="general.power_bonus_start_day" :config="{dateFormat: 'Y-m-d'}" class="form-control"></flat-pickr>
                    </div>
                  </div>

                    <div class="form-group form-inline text-left row ">
                      <label class="col-md-3 form-control-label text-left">Commission Pay day: </label>
                      <div class="col-md-3" >
                        <select class="form-control" name="payment_day" v-model="general.payment_day">
                          <option value="monday">Monday</option>
                          <option value="tuesday">Tuesday</option>
                          <option value="wednesday">Wednesday</option>
                          <option value="thursday">Thursday</option>
                          <option value="friday">Friday</option>
                          <option value="saturday">Saturday</option>
                          <option value="sunday">Sunday</option>
                        </select>
                        <i class="fa fa-info-circle fa-1x ml-1" id="ticket_type_info"></i>
                        <b-tooltip target="ticket_type_info" placement="bottom">
                          Select coupon ticket layout
                        </b-tooltip>
                      </div>
                      <label class="col-md-3 form-control-label text-left">Print Ticket Style: </label>
                      <div class="col-md-3" >
                        <select class="form-control" name="ticket_type" v-model="general.ticket_type">
                          <option value="1">Type 1</option>
                          <option value="2">Type 2</option>
                          <option value="3">Type 3</option>
                        </select>
                        <i class="fa fa-info-circle fa-1x ml-1" id="ticket_type_info"></i>
                        <b-tooltip target="ticket_type_info" placement="bottom">
                          Select coupon ticket layout
                        </b-tooltip>
                      </div>
                    </div>
<!--                    <div class="form-group row ">
                      <label class="col-md-6 form-control-label text-left">Enable weekly 10% bonus:</label>
                      <div class="col-md-6" >
                        <input type="radio" value="Yes" v-model="general.weekly_bonus">
                        <label for="one">Yes</label>
                        <input type="radio" value="No" v-model="general.weekly_bonus">
                        <label for="two">No</label>
                      </div>
                    </div>
                  -->

                    <!--
                    <div class="form-group form-inline text-left row ">
                      <label class="col-md-6 form-control-label text-left">Announcement: </label>
                      <div class="col-md-6" >
                        <input type="text" class="form-control" name="announcement" autocomplete="off" v-model="general.announcement">
                      </div>
                    </div>-->
                    <div class="form-group form-inline text-left row ">
                      <label class="col-md-3 form-control-label text-left">Booking Code Duration: </label>
                      <div class="col-md-3" >
                        <input type="text" class="form-control" name="booking_duration" autocomplete="off" v-model="general.booking_duration">
                        <i class="fa fa-info-circle fa-1x ml-1" id="booking_duration_info"></i>
                        <b-tooltip target="booking_duration_info" placement="bottom">
                            Enter the number of days a booking code should be vaild.
                        </b-tooltip>
                      </div>
                      <label class="col-md-3 form-control-label text-left">Liability Threshold: </label>
                      <div class="col-md-3" >
                        <input type="text" class="form-control" name="booking_duration" autocomplete="off" v-model="general.liability_threshold">
                      </div>
                    </div>

                    <div class="form-group form-inline text-left row ">
                      <label class="col-md-3 form-control-label text-left">Tipster Ticket Eligibilty: </label>
                      <div class="col-md-3" >
                        <input type="text" class="form-control" name="hold_bets" autocomplete="off" v-model="general.min_tipster_length">
                        <i class="fa fa-info-circle fa-1x ml-1" id="min_tipster_length_info"></i>
                        <b-tooltip target="min_tipster_length_info" placement="bottom">
                          whEnter the minimum no of events a ticket should have before
                        </b-tooltip>
                      </div>
                      <label class="col-md-3 form-control-label text-left">Slider Speed: </label>
                      <div class="col-md-3">
                        <input type="text" class="form-control" name="slider_speed" autocomplete="off" v-model="general.slider_speed">
                        <i class="fa fa-info-circle fa-1x ml-1" id="slider_speed_info"></i>
                        <b-tooltip target="slider_speed_info" placement="bottom">
                          Front end slider speed settings. Enter the delay duration in milliseconds for the frontend banner.
                        </b-tooltip>
                      </div>

                    </div>
                    <div class="form-group row ">
                      <label class="col-md-3 form-control-label text-left">Allow Deposit Commission:</label>
                      <div class="col-md-3" >
                        <input type="radio" :value="1" v-model="general.allow_deposit_commission">
                        <label>Yes</label>
                        <input type="radio" :value="0" v-model="general.allow_deposit_commission">
                        <label>No</label>
                      </div>
                      <label class="col-md-3 form-control-label text-left">Allow Withdrawal Commission:</label>
                      <div class="col-md-3" >
                        <input type="radio" :value="1" v-model="general.allow_withdrawal_commission">
                        <label>Yes</label>
                        <input type="radio" :value="0" v-model="general.allow_withdrawal_commission">
                        <label>No</label>
                      </div>
                    </div>
                    <div class="form-group form-inline text-left row ">
                      <label class="col-md-3 form-control-label text-left" v-if="general.allow_deposit_commission === 1">Deposit Commission: </label>
                      <div class="col-md-3" v-if="general.allow_deposit_commission === 1">
                        <input type="text" class="form-control" name="deposit_commission_percent" autocomplete="off" v-model="general.deposit_commission_percent">
                        <i class="fa fa-info-circle fa-1x ml-1" id="deposit_commission_percent_info"></i>
                        <b-tooltip target="deposit_commission_percent_info" placement="bottom">
                          Enter amount in percentage for deposit commission
                        </b-tooltip>
                      </div>
                      <label class="col-md-3 form-control-label text-left" v-if="general.allow_withdrawal_commission === 1">Withdrawal Commission: </label>
                      <div class="col-md-3" v-if="general.allow_withdrawal_commission === 1">
                        <input type="text" class="form-control" name="withdrawal_commission_percent" autocomplete="off" v-model="general.withdrawal_commission_percent">
                        <i class="fa fa-info-circle fa-1x ml-1" id="withdrawal_commission_percent_info"></i>
                        <b-tooltip target="withdrawal_commission_percent_info" placement="bottom">
                          Enter amount in percentage for withrawal commission
                        </b-tooltip>
                      </div>
                    </div>

                    <div class="form-group form-inline text-left ">
                        <button type="submit" class="btn btn-primary btn-block" id="save">Save </button>
                    </div>
                </form>
            </card>
        </div>

    </div>
</template>

<script>
export default {
    name:'sports_menu',
    layout: 'main',
    scrollToTop: true,
  data(){
    return {
        title: 'Site Configuration',
        countries:[],
        general: {
          logo: '',
          print_logo: '',
          min_withdrawal: '5000',
          max_withdrawal: '1000000',
          slider_speed: '3000',
          allow_registration: 'Yes',
          weekly_bonus: 'Yes',
          announcement: '',
          booking_duration: 3,
          max_event_weeks: 2,
          min_tipster_length: 5,
          currency_symbol: this.$store.state.currencySymbol,
          min_deposit: 100,
          payment_day: "tuesday",
          ticket_type: '1',
          enable_bank_account: 1,
          auto_disbursement: 1,
          uses_accts: 1,
          liability_threshold: 0,
          enable_elbet_user: 0,
          allow_deposit_commission: 0,
          allow_withdrawal_commission: 0,
          deposit_commission_percent: 0,
          withdrawal_commission_percent: 0,
          country: '',
          currency_code: '',
          currency_symbol: '',
          dial_code: '',
          enable_power_bonus: 0,
          power_bonus_start_day: ''
        },
    }
  },
  methods: {
      setGeneral(res){
          var self =this;
          $.each(res, function(key, item){
              if(item.option == 'min_withdrawal'){
                  self.general.min_withdrawal = item.value
              }
              if(item.option == 'max_withdrawal'){
                  self.general.max_withdrawal = item.value
              }
              if(item.option == 'allow_registration'){
                  self.general.allow_registration = item.value
              }
              if(item.option == 'announcement'){
                  self.general.announcement = item.value
              }
              if(item.option == 'weekly_bonus'){
                  self.general.weekly_bonus = item.value
              }
              if(item.option == 'slider_speed'){
                  self.general.slider_speed = item.value
              }
              if(item.option == 'payment_day'){
                  self.general.payment_day = item.value
              }
              if(item.option == 'max_event_weeks'){
                  self.general.max_event_weeks = item.value
              }
              if(item.option == 'min_tipster_length'){
                  self.general.min_tipster_length = item.value
              }
              if(item.option == 'booking_duration'){
                  self.general.booking_duration = item.value
              }
              if(item.option == 'currency_symbol'){
                  self.general.curreny_symbol = item.value
              }
            if(item.option == 'min_deposit'){
                self.general.min_deposit = item.value
            }

            if(item.option === 'uses_accts'){
              self.general.uses_accts = item.value
            }

            if(item.option === 'enable_bank_account'){
              self.general.enable_bank_account = item.value
            }
            if(item.option === 'auto_disbursement'){
              self.general.auto_disbursement = item.value
            }
            if(item.option === 'logo'){
              self.general.logo = item.value
            }
            if(item.option === 'print_logo'){
              self.general.print_logo = item.value
            }
            if(item.option === 'ticket_type'){
              self.general.ticket_type = item.value
            }
            if(item.option === 'enable_elbet_user'){
              self.general.enable_elbet_user = item.value
            }
            if(item.option === 'allow_deposit_commission'){
              self.general.allow_deposit_commission = item.value
            }
            if(item.option === 'deposit_commission_percent'){
              self.general.deposit_commission_percent = item.value
            }
            if(item.option === 'allow_withdrawal_commission'){
              self.general.allow_withdrawal_commission = item.value
            }
            if(item.option === 'withdrawal_commission_percent'){
              self.general.withdrawal_commission_percent = item.value
            }
            if(item.option === 'country'){
              self.general.country = item.value
            }
            if(item.option === 'currency_code'){
              self.general.currency_code = item.value
            }
            if(item.option === 'currency_symbol'){
              self.general.currency_symbol = item.value
            }
            if(item.option === 'dial_code'){
              self.general.dial_code = item.value
            }
            if(item.option === 'power_bonus_start_day'){
              self.general.power_bonus_start_day = item.value
            }
            if(item.option === 'enable_power_bonus'){
              self.general.enable_power_bonus = item.value
            }
          });
      },

      saveGeneral(){
          $('#save').attr('disabled', true).html('Please wait..');
          this.$axios.post('/admin/settings/general', this.general).then(res=>{
              $('#save').attr('disabled', false).html('Save');
              if(res.data.success){
                  this.$swal('Success!','Settings has been saved', 'success');
                  this.$store.dispatch('setCurrency', this.general.currency_symbol);
              }else{
                  this.$swal('Error!','Something went wrong', 'error');
              }
          }).catch(error => {
              $('#save').attr('disabled', false).html('Save');
              toastr['error']('An error occured.', 'Error');
          });
      },
      selectFile(e, inputField){
          e.preventDefault();
          $(`#${inputField}`).trigger('click');
      },
      onFileChange(e, type) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
              return;
          this.createImage(files[0], type);
      },
      createImage(file, type) {
        let reader = new FileReader();

        reader.onload = (e) => {
            this.general[type] = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      setCurrency() {
        // find country
        const country = this.countries.find(country => country.name === this.general.country);
        // console.log(country);
        if (country) {
            this.general.currency_code = country.currency_code;
            this.general.currency_symbol = country.currency_symbol;
            this.general.dial_code = country.dial_code;
        }
      },

      getSettings(category){
        this.$axios.get('/admin/settings?category='+category).then(response =>  {
          this.setGeneral(response.data);
        }).catch(error => {
            console.log('Error', error.data.message);
            toastr['error']('An error occured.', 'Error');
        });
      },
    },
    mounted(){
      this.getSettings('general');
      this.getSettings('risks');

      this.$axios.get('/admin/utilities/get-country-states').then(res => {
        this.countries = res.data.countries;
      })
    },
   head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Site Configuration');
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
