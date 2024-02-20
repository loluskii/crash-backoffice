<template>
    <b-modal hide-footer size="lg" id="bonus-form"
    :no-close-on-backdrop="true"
    @ok="saveBonus" title="Bonus Form" ref="bonusFormModal">
        <form @submit.prevent="saveBonus">
          <b-form-row>
            <b-col>
              <b-form-group
                id="name"
                label="Bonus Name"
                label-for="name">
                  <b-form-input
                    id="name"
                    type="text"
                    :class="{'input': true, 'is-danger': errors.has('form.name') }"
                    v-model="form.name" name="name"
                    v-validate="'required'" >
                  </b-form-input>
                  <i v-show="errors.has('form.name')" class="fa fa-warning text-danger"></i>
                  <span v-show="errors.has('form.name')" class="help is-danger text-danger">
                    {{ errors.first('form.name') }}
                  </span>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="code"
                label="Bonus Code"
                label-for="amount">
                <b-form-input
                  id="code"
                  type="text"
                  :class="{'input': true }"
                  v-model="form.code" name="code" >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="name"
                label="Target"
                label-for="name">
                <b-form-select
                  id="target"
                  :class="{'input': true, 'is-danger': errors.has('form.target') }"
                  v-model="form.target"
                  name="target"
                  v-validate="'required'"
                  :options="[
                    { value: 'all', text: 'All' },
                    { value: 'desktop', text: 'Desktop' },
                    { value: 'mobile', text: 'Mobile' },
                    { value: 'app', text: 'App' },
                  ]"
                >
                </b-form-select>
                <i v-show="errors.has('form.target')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.target')" class="help is-danger text-danger">
                    {{ errors.first('form.target') }}
                  </span>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="code"
                label="Trigger"
                label-for="trigger">
                <b-form-select
                  id="trigger"
                  :class="{'input': true, 'is-danger': errors.has('form.trigger') }"
                  v-model="form.trigger"
                  name="trigger"
                  v-validate="'required'"
                  :options="[
                    { value: 'first-deposit', text: 'First Deposit' },
                    { value: 'registration', text: 'Registration' },
                    { value: 'any-deposit', text: 'Any Deposit' },
                    { value: 'weekly', text: 'Weekly' },
                    { value: 'any', text: 'Any' },
                  ]"
                >
                </b-form-select>
                <i v-show="errors.has('form.trigger')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.trigger')" class="help is-danger text-danger">
                    {{ errors.first('form.trigger') }}
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
                  @change="setPercentages()"
                  name="bonus_type"
                  v-validate="'required'"
                  :options="[
                    { value: 'all', text: 'All' },
                    { value: 'sport', text: 'Sport' },
                    { value: 'virtual', text: 'Virtual' },
                    { value: 'casino', text: 'Casino' },
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
                id="name"
                label="Credit Type"
                label-for="credit_type">
                <b-form-select
                  id="credit_type"
                  :class="{'input': true, 'is-danger': errors.has('form.credit_type') }"
                  v-model="form.credit_type"
                  name="credit_type"
                  v-validate="'required'"
                  :options="[
                    { value: 'stake-return', text: 'Stake Return' },
                    { value: 'fixed-amount', text: 'Fixed Amount' },
                    { value: 'percentage-on-stake', text: 'Percentage on Stake' },
                    { value: 'percentage-on-deposit', text: 'Percentage on Deposit' },
                    { value: 'percentage-on-winnings', text: 'Percentage on Winnings' },
                  ]"
                >
                </b-form-select>
                <i v-show="errors.has('form.credit_type')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.credit_type')" class="help is-danger text-danger">
                    {{ errors.first('form.credit_type') }}
                  </span>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="value"
                label="Value"
                label-for="value">
                <b-form-input
                  id="value"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.value') }"
                  v-model="form.value" name="value"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.value')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.value')" class="help is-danger text-danger">
                    {{ errors.first('form.value') }}
                  </span>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="code"
                label="Maximum Value"
                label-for="max_value">
                <b-form-input
                  id="max_value"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.max_value') }"
                  v-model="form.max_value" name="max_value"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.max_value')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.max_value')" class="help is-danger text-danger">
                    {{ errors.first('form.max_value') }}
                  </span>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row v-if="form.bonus_type === 'all'">
            <b-col>
              <b-form-group
                id="sport_percent"
                label="Sport (%)"
                label-for="sport_percent">
                <b-form-input
                  id="sport_percent"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.sport_percent') }"
                  v-model="form.sport_percent" name="sport_percent"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.sport_percent')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.sport_percent')" class="help is-danger text-danger">
                    {{ errors.first('form.sport_percent') }}
                  </span>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="casino_percent"
                label="Casino (%)"
                label-for="casino_percent">
                <b-form-input
                  id="casino_percent"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.casino_percent') }"
                  v-model="form.casino_percent" name="casino_percent"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.casino_percent')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.casino_percent')" class="help is-danger text-danger">
                    {{ errors.first('form.casino_percent') }}
                  </span>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="virtual_percent"
                label="Virtual (%)"
                label-for="virtual_percent">
                <b-form-input
                  id="virtual_percent"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.virtual_percent') }"
                  v-model="form.virtual_percent" name="virtual_percent"
                  v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('form.virtual_percent')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.virtual_percent')" class="help is-danger text-danger">
                    {{ errors.first('form.virtual_percent') }}
                  </span>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col v-if="form.bonus_type === 'all' || form.bonus_type === 'sport'">
              <b-form-group
                id="sport_rollover"
                label="No of Rollover (Sport)"
                label-for="sport_rollover">
                <b-form-input
                  id="sport_rollover"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.sport_rollover') }"
                  v-model="form.sport_rollover" name="sport_rollover" >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col v-if="form.bonus_type === 'all' || form.bonus_type === 'casino'">
              <b-form-group
                id="casino_rollover"
                label="No of Rollover (Casino)"
                label-for="sport_rollover">
                <b-form-input
                  id="casino_rollover"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.casino_rollover') }"
                  v-model="form.casino_rollover" name="casino_rollover" >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col v-if="form.bonus_type === 'all' || form.bonus_type === 'virtual'">
              <b-form-group
                id="virtual_rollover"
                label="No of Rollover (Virtual)"
                label-for="virtual_rollover">
                <b-form-input
                  id="virtual_rollover"
                  type="text"
                  :class="{'input': true, 'is-danger': errors.has('form.virtual_rollover') }"
                  v-model="form.virtual_rollover" name="virtual_rollover" >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="name"
                label="Duration (in days)"
                label-for="duration">
                <b-form-input
                  id="duration"
                  type="text"
                  placeholder="5"
                  :class="{'input': true, 'is-danger': errors.has('form.duration') }"
                  v-model="form.duration" name="duration" >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="expiry_date"
                label="Can be reactivated by user?"
                label-for="can_activate">
                <b-form-select
                  id="can_activate"
                  :class="{'input': true }"
                  v-model="form.can_activate"
                  name="can_activate"
                  :options="[
                    { value: 0, text: 'No' },
                    { value: 1, text: 'Yes' },
                  ]"
                ></b-form-select>

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
                    name : '',
                    code : '',
                    target: '',
                    bonus_type: '',
                    credit_type: '',
                    trigger: '',
                    value: '',
                    max_value: '',
                    duration: '',
                    sport_percent: '',
                    casino_percent: '',
                    virtual_percent: '',
                    can_activate: 0,
                    rollover: '',
                    id: ''
                },
                config: this.$store.state.flatpickrConfig,
            }
        },
        methods:{
            saveBonus(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#submitBtn').attr('disabled', true).text('Submitting...');
                        Bonuses.saveBonus(this.form).then(res=>{
                          $('#submitBtn').attr('disabled', false).text('Save');
                            if(res.success){
                                this.closeModal();
                                this.$swal('Success!', 'Transaction was successful', 'success');
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
                this.$refs.bonusFormModal.hide();
                this.form={
                  name : '',
                  code : '',
                  target: '',
                  bonus_type: '',
                  credit_type: '',
                  trigger: '',
                  value: '',
                  max_value: '',
                  sport_percent: '',
                  casino_percent: '',
                  virtual_percent: '',
                  duration: '',
                  can_activate: 0,
                  rollever: '',
                  id: ''
                }
            },
            setPercentages() {
              switch (this.form.bonus_type) {
                case 'sport':
                  this.form.sport_percent = 100
                  break;
                case 'casino':
                  this.form.casino_percent = 100
                  break;
                case 'virtual':
                  this.form.virtual_percent = 100
                  break;
                default:
                  this.form.sport_percent = '';
                  this.form.casino_percent = '';
                  this.form.virtua_percent = '';
                  break;
              }
            }
        },
        mounted(){
            this.$nuxt.$on('show_bonus_modal', (bonus) => {
                this.$refs.bonusFormModal.show();
                if (bonus) {
                  this.form={
                    name : bonus.name,
                    code : bonus.code,
                    target: bonus.target,
                    bonus_type: bonus.bonus_type,
                    credit_type: bonus.credit_type,
                    trigger: bonus.trigger,
                    value: bonus.value,
                    max_value: bonus.max_value,
                    duration: bonus.duration,
                    sport_percent: bonus.sport_percent,
                    casino_percent: bonus.casino_percent,
                    virtual_percent: bonus.virtual_percent,
                    can_activate: bonus.can_activate,
                    id: bonus.id
                  }
                }
            })
        }
    }
</script>
