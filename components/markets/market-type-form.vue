<template>
    <form class="form-horizontal columns column is-multiline is-12" id="catForm" role="form" @submit.prevent="saveCategory">
        <div class="row form-group">
            <div class="col-md-4">
                <label for="input-text" class="control-label float-md-right txt_media1">
                    Sports                       
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <v-select label="name" v-model="sport" v-validate="'required'"
                placeholder="Select Sports"
                :options="sports" name="sport"></v-select>
                <i v-show="errors.has('sport')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('sport')" class="help is-danger text-danger">{{ errors.first('sport') }}</span>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-4">
                <label for="name" class="control-label float-md-right txt_media1">
                    Name
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <input type="text" v-validate="'required'" class="form-control" name="name" id="name" v-model="formData.name">
                <i v-show="errors.has('name')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('name')" class="help is-danger text-danger">Please enter a name</span>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-4">
                <label for="provider_id" class="control-label float-md-right txt_media1">
                    Provider ID
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <input type="text" v-validate="'required'" class="form-control" name="provider_id" id="provider_id" v-model="formData.provider_id">
                <i v-show="errors.has('provider_id')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('provider_id')" class="help is-danger text-danger">Please enter a provider id</span>
            </div>
        </div>
        <div class="column is-6">
            <input type="hidden" value="" name="id" v-model="formData.id">
            <div class="control text-center">
                <button class="button btn btn-primary mr-2" type="submit" id="saveCategory" name="button">Save</button>
                <button class="button btn btn-secondary" type="reset" name="button" @click="resetForm">Reset</button>
            </div>
        </div>
    </form>
</template>
<script>
    export default{
        name: 'market-category-form',
        props:{
            sports: Array
        },
        data(){
            return{
                sport: '',
                formData:{
                    sport_id: '',
                    name: '',
                    provider_id: '',                    
                    id: ''
                }
            }
        },
        methods:{
            resetForm(){
                this.formData = {
                    sport_id: '',
                    name: '',
                    provider_id: '',
                    id: ''
                }
            },
            async saveCategory(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.formData.sport_id = this.sport.id;
                        $('#saveCategory').attr('disabled', true).text('Saving...');                
                        this.$axios.post('admin/content-management/markets/types/save', this.formData).then( res => {
                            $('#saveCategory').attr('disabled', false).text('Save');                                        
                            if(res.success){
                                this.$swal('Success!', 'Market type has been saved. Reload page to see changes', 'success');
                            }
                            this.resetForm()
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                })
            }
        },
        mounted() {
            this.$nuxt.$on('EDIT_MTYPE', (market, sport) => {
                this.formData.name = market.name;
                this.formData.provider_id = market.provider_id;
                this.formData.id = market.id;
                this.formData.sport_id = market.sport_id;
                this.sport = sport;
            })
        },
    }
</script>