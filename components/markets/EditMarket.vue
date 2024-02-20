<template>
    <b-modal hide-footer id="changePassword" no-close-on-backdrop
    @ok="saveMarket" size="sm" title="Edit Market" ref="marketModal">
        <form @submit.prevent="saveMarket">
            <b-form-group id="exampleInputGroup1"
                    label="Market Name"
                    label-for="exampleInput1">
                <b-form-input id="market"
                    type="text" :class="{'input': true, 'is-danger': errors.has('market') }" 
                    v-model="marketData.name" name="market"
                    v-validate="'required'" >
                </b-form-input>
                <i v-show="errors.has('market')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('market')" class="help is-danger text-danger">
                    {{ errors.first('market') }}
                </span>
            </b-form-group>
            <b-form-group id="exampleInputGroup2"
                    label="Market Description"
                    label-for="info">
                <b-form-textarea id="info"
                    name="info" rows="3"
                    v-model="marketData.info" :class="{'input': true, 'is-danger': errors.has('info') }" 
                    v-validate="'required'">
                </b-form-textarea>
                <i v-show="errors.has('info')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('info')" class="help is-danger text-danger">
                    {{ errors.first('info') }}
                </span>
            </b-form-group>
            <input type="hidden" v-model="marketData.market_id">
            <b-button class="pull-right" id="submitBtn" variant="primary" type="submit">Save Changes</b-button>

        </form>
    </b-modal>
</template>
<script>
    export default {
        data(){
            return{
                marketData:{
                    name: '',
                    info:'',
                    market_id: ''
                }
            }
        },
        computed:{
            isValid(){

            }
        },
        methods:{
            saveMarket(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#submitBtn').attr('disabled', true);
                        this.$axios.post('admin/content-management/update-market', this.marketData).then(res=>{
                            $('#submitBtn').attr('disabled', false);

                            if(res.data.success){
                                this.closeModal()
                                this.$swal('Success!', 'Market info has been changed', 'success');
                            }else {
                                this.$swal('Error!', 'Something went wrong. Unable to save changes', 'error');
                            }
                        }).catch(err => {
                            $('#submitBtn').attr('disabled', false);
                                this.$swal('Error!', 'Something went wrong. Unable to save changes', 'error');
                                                        
                        })
                    }
                })
            },
            closeModal(){
                this.$refs.marketModal.hide();
                this.marketData={
                    name : '',
                    info: '',
                    market_id : ''
                }
            }
        },
        mounted(){
            this.$nuxt.$on('edit_market', (market) => {
                this.$refs.marketModal.show();
                this.marketData.name = market.name
                this.marketData.info = market.info
                this.marketData.market_id = market.id
            })
        }
    }
</script>