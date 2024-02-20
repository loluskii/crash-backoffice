<template>
    <b-modal hide-footer size="lg" id="cut-x-form"
    :no-close-on-backdrop="true"
    @ok="save" title="CUT X Form" ref="cutXFormModal">
        <form @submit.prevent="save">
          <b-form-row>
            <b-col>
              <b-form-group
                id="name"
                label="No of List Games"
                label-for="min_lost_games">
                  <b-form-input
                    id="min_lost_games"
                    type="number"
                    :class="{'input': true, 'is-danger': errors.has('form.no_lost_games') }"
                    v-model="form.no_lost_games" name="name"
                    v-validate="'required'" >
                  </b-form-input>
                  <i v-show="errors.has('form.no_lost_games')" class="fa fa-warning text-danger"></i>
                  <span v-show="errors.has('form.no_lost_games')" class="help is-danger text-danger">
                    {{ errors.first('form.no_lost_games') }}
                  </span>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="code"
                label="Min no. of Events per ticket"
                label-for="min_no_events">
                <b-form-input
                  id="min_no_events"
                  type="number"
                  :class="{'input': true, 'is-danger': errors.has('form.no_lost_games')}"
                  v-model="form.min_no_events" name="code"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.min_no_events')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.min_no_events')" class="help is-danger text-danger">
                    {{ errors.first('form.min_no_events') }}
                  </span>

              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="min_total_odds"
                label="Min Cumulative Odds"
                label-for="min_total_odds">
                <b-form-input
                  id="min_total_odds"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.min_total_odds')}"
                  v-model="form.min_total_odds" name="code"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.min_total_odds')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.min_total_odds')" class="help is-danger text-danger">
                    {{ errors.first('form.min_total_odds') }}
                  </span>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="code"
                label="Min. Stake Amount"
                label-for="min_stake">
                <b-form-input
                  id="min_stake"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.min_stake')}"
                  v-model="form.min_stake" name="code"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.min_stake')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.min_stake')" class="help is-danger text-danger">
                    {{ errors.first('form.min_stake') }}
                  </span>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="name"
                label="Bonus Type"
                label-for="bonus_type">
                <b-form-select
                  id="bonus_type"
                  :class="{'input': true, 'is-danger': errors.has('form.bonus_type') }"
                  v-model="form.bonus_type"
                  name="bonus_type"
                  v-validate="'required'"
                  :options="[
                    { value: 'percentage-on-winnings', text: 'Percentage on Winnings' },
                    { value: 'stake-return', text: 'Stake Return' },
                  ]"
                >
                </b-form-select>
                <i v-show="errors.has('form.bonus_type')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.bonus_type')" class="help is-danger text-danger">
                    {{ errors.first('form.bonus_type') }}
                  </span>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="value"
                label="Maximum Bonus Amount"
                label-for="max_payable">
                <b-form-input
                  id="value"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.max_payable') }"
                  v-model="form.max_payable" name="value"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.max_payable')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.max_payable')" class="help is-danger text-danger">
                    {{ errors.first('form.max_payable') }}
                  </span>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.bonus_type === 'percentage-on-winnings'">
            <b-col>
              <b-form-group
                id="value"
                label="Percentage"
                label-for="percentage">
                <b-form-input
                  id="value"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.percentage') }"
                  v-model="form.percentage" name="value"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.percentage')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.percentage')" class="help is-danger text-danger">
                    {{ errors.first('form.percentage') }}
                  </span>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-button class="pull-right" id="submitBtn" variant="success" type="submit">Save</b-button>
        </form>
    </b-modal>
</template>
<script>
  import Bonuses from "../services/bonuses";

    export default {
        data(){
            return{
                form:{
                    no_lost_games : '',
                    min_no_events : '',
                    min_total_odds: '',
                    min_stake: '',
                    max_payable: '',
                    bonus_type: '',
                    percentage: '',
                    id: ''
                },
            }
        },
        methods:{
            save(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#submitBtn').attr('disabled', true).text('Submitting...');
                        Bonuses.saveCutXBonus(this.form).then(res=>{
                          $('#submitBtn').attr('disabled', false).text('Save');
                            if(res.success){
                                this.closeModal();
                                this.$swal('Success!', res.message, 'success');
                                this.$nuxt.$emit('refresh_bonus_list');
                            }else {
                                this.$swal('Error!', res.message, 'error');
                            }
                        }).catch(err => {
                          this.$swal('Error!', 'Something went wrong: ' + err.response.data.message, 'error');
                          $('#submitBtn').attr('disabled', false).text('Save');
                        })
                    }
                })
            },
            closeModal(){
                this.$refs.cutXFormModal.hide();
                this.form={
                  no_lost_games : '',
                  min_no_events : '',
                  min_total_odds: '',
                  min_stake: '',
                  max_payable: '',
                  bonus_type: '',
                  percentage: '',
                  id: ''
                }

            }
        },
        mounted(){
            this.$nuxt.$on('show_cut_x_modal', (bonus) => {
                this.$refs.cutXFormModal.show();
                if (bonus) {
                  this.form={
                    no_lost_games : bonus.no_lost_games,
                    min_no_events : bonus.min_no_events,
                    min_stake: bonus.min_stake,
                    min_total_odds: bonus.min_total_odds,
                    max_payable: bonus.max_payable,
                    bonus_type: bonus.bonus_type,
                    percentage: bonus.percentage,
                    id: bonus.id
                  }
                }
            })
        }
    }
</script>
