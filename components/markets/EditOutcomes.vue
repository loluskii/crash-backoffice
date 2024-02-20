<template>
    <b-modal hide-footer id="editOutcomes" no-close-on-backdrop
    @ok="saveOutcomes" size="lg" title="Edit Market Outcomes" ref="outcomeModal">
        <form @submit.prevent="saveOutcomes">
            <table class="table table-stripped">
                <thead>
                    <th>Name</th>
                    <th>Provider ID</th>
                    <th >Spread</th>
                    <th>Short Code</th>
                    <th class="text-center">Status</th>
                </thead>
                <tbody>
                    <tr v-for="(outcome, index) in outcomes" :key="index">
                        <td>
                            <input type="text" v-model="outcome.name">
                        </td>
                        <td>
                            <input type="text" style="width:70%" v-model="outcome.provider_id">
                        </td>
                        <td>
                            <input type="text" style="width:70%" v-model="outcome.handicap_line">
                        </td>
                        <td>
                            <input type="text" style="width:80%" v-model="outcome.code">
                        </td>
                        <td class="text-center">
                            <input type="checkbox" v-model="outcome.status" value="1">
                        </td>
                    </tr>
                </tbody>
            </table>
            <b-button class="pull-left" id="addRow" @click="addRow" variant="info" type="button">Add New Row</b-button>
            <b-button class="pull-right" id="submitBtn" variant="primary" type="submit">Save Changes</b-button>
        </form>
    </b-modal>
</template>
<script>
    export default {
        data(){
            return{
                outcomes:{},
                market_id: null
            }
        },
        computed:{
            isValid(){

            }
        },
        methods:{
            saveOutcomes(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#submitBtn').attr('disabled', true);
                        this.$axios.post('admin/content-management/markets/outcomes/update', {outcomes: this.outcomes, market_id: this.market_id}).then(res=>{
                            $('#submitBtn').attr('disabled', false);
                            if(res.data.success){
                                this.closeModal()
                                this.$swal('Success!', 'Outcomes has been updated', 'success');
                            }else {
                                this.$swal('Error!', 'Something went wrong. Unable to save changes', 'error');
                            }
                        }).catch(err => {
                            console.log(err);
                            $('#submitBtn').attr('disabled', false);
                                this.$swal('Error!', 'Something went wrong. Unable to save changes', 'error');                    
                        })
                    }
                })
            },
            addRow(){
                this.outcomes.push({name:'', code: '', provider_id: '', handicap_line: '', status: 1});
            },
            closeModal(){
                this.$refs.outcomeModal.hide();
            }
        },
        mounted(){
            this.$nuxt.$on('edit_outcomes', (market) => {
                this.$refs.outcomeModal.show();
                this.outcomes = market.outcomes
                this.market_id = market.market_group_id;
            })
        }
    }
</script>
<style scoped>
input{
    padding: 1px;
}
</style>
