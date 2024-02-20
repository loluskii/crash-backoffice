<template>
    <form class="form-horizontal columns column is-multiline is-12" id="sport-form" role="form" @submit.prevent="saveSport">
        <div class="row form-group">
            <div class="col-md-4">
                <label for="category_id" class="control-label float-md-right txt_media1">
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
                <label for="category_id" class="control-label float-md-right txt_media1">
                    Order Position
                </label>
            </div>
            <div class="col-md-8">
                <input type="text" class="form-control" name="order" id="order" v-model="formData.order">

            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-4">
                <label for="status" class="control-label float-md-right txt_media1">
                    Status
                </label>
            </div>
            <div class="col-md-8">
                <select id="status" name="status" class="form-control" v-model="formData.status">
                    <option value="1">Active</option>
                    <option value="0">Deactivate</option>
                </select>
            </div>
        </div>
        <div class="column is-6">
            <input type="hidden" value="" name="id" v-model="formData.id">
            <div class="control text-center">
                <button class="button btn btn-primary mr-2" type="submit" id="saveBtn" name="button">Save</button>
                <button class="button btn btn-secondary" type="reset" name="button">Reset</button>
            </div>
        </div>

    </form>
</template>
<script>
import CMS from '../../services/cms.js'
    export default {
        name: 'special-category-form',
        props:{
            categories: Array
        },
        data(){
            return{
                sport: '',
                formData:{
                    name: '',
                    order: 1000,
                    status: '',
                    id: ''
                }
            }
        },
        methods:{
            resetForm(){
                $('#sport-form')[0].reset()
                this.formData.id = ''
            },
            async saveSport(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.formData.sport = this.sport.provider_id
                        $('#saveBtn').attr('disabled', true).text('Saving...');
                        CMS.saveSport(this.formData).then( res => {
                            $('#saveBtn').attr('disabled', false).text('Save');
                            if (this.formData.id !== '') {
                              if (res.success) {
                                this.notify({message: 'Saved', title: 'Success', type: 'success'});
                              } else {
                                this.notify({message: 'Something went wrong', title: 'Error', type: 'error'});
                              }
                            } else {
                              if (res.success) {
                                this.notify({message: 'Saved', title: 'Success', type: 'success'});
                                this.resetForm();
                              } else {
                                this.notify({message: 'Something went wrong', title: 'Error', type: 'error'});
                              }
                            }
                        }).catch(error => {
                            $('#saveBtn').attr('disabled', false).text('Save');
                            this.notify({message: error.message, title: 'Error', type: 'error'});
                        });
                    }
                })
            },
        },
        mounted(){
            this.$nuxt.$on('EDIT_SPORT', (sport)=>{
              console.log(sport);
                this.formData.name    = sport.name;
                this.formData.order   = sport.order;
                this.formData.status  = sport.status;
                this.formData.id      = sport.id;
            })
        },
        notifications: {
            notify: {
                title: '',
                message: '',
                type: ''
            }
        }
    }
</script>
