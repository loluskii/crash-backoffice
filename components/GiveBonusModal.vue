<template>
    <b-modal hide-footer id="give_bonus"
    :no-close-on-backdrop="true"
    @ok="giveBonus" size="sm" title="Give Bonus" ref="giveBonusModal">
        <form @submit.prevent="giveBonus">
          <b-form-group id="exampleInputGroup2"
                        label="Select Bonus"
                        label-for="bonus">
            <autocomplete
              ref="autocomplete"
              :source="getUrl"
              results-property="data"
              input-class="form-control"
              @selected="selectBonus"
              results-display="name">
            </autocomplete>
          </b-form-group>
            <b-form-group id="exampleInputGroup1"
                    label="Amount"
                    label-for="exampleInput1">
                <b-form-input id="amount"
                    type="text" :class="{'input': true, 'is-danger': errors.has('form.amount') }"
                    v-model="form.amount" name="amount"
                    v-validate="'required|numeric'" >
                </b-form-input>
                <i v-show="errors.has('form.amount')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('form.amount')" class="help is-danger text-danger">
                    {{ errors.first('form.amount') }}
                </span>
            </b-form-group>

            <b-button class="pull-right" variant="success" id="submitBtn" type="submit">Submit</b-button>
        </form>
    </b-modal>
</template>
<script>
    import Bonuses from '../services/bonuses';
    export default {
        data(){
            return{
                form:{
                    amount : '',
                    bonus_id: '',
                    player_id : ''
                }
            }
        },
        computed:{
            isValid(){

            }
        },
        methods:{
            giveBonus(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#submitBtn').attr('disabled', true);
                        Bonuses.givePlayerBonus(this.form).then(res=>{
                            if(res.success){
                                this.closeModal()
                                $('#submitBtn').attr('disabled', false);
                                this.$swal('Success!', 'Bonus has been granted to player', 'success');
                            }else {
                                this.$swal('Error!', 'Something went wrong. Unable to carry out operation', 'error');
                                $('#submitBtn').attr('disabled', false);
                            }
                        })
                    }
                })
            },
            closeModal(){
                this.$refs.giveBonusModal.hide();
                this.form={
                    amount : '',
                    bonus_id : '',
                  player_id : ''
                }
            },
          getUrl(input){
            return process.env.prodURL + '/api/bonuses/find?q='+input;
          },
          selectBonus(bonus){
            this.form.bonus_id = bonus.value;
          },
        },
        mounted(){
            this.$nuxt.$on('give_bonus', (id) => {
                this.$refs.giveBonusModal.show();
                this.form.player_id = id
            })
        }
    }
</script>
