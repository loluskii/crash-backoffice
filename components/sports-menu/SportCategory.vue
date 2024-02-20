<template>
    <form class="form-horizontal columns column is-multiline is-12" id="category-form" role="form" @submit.prevent="saveCategory">
        <div class="row form-group">
            <div class="col-md-4">
                <label for="input-text" class="control-label float-md-right txt_media1">
                    Sports
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <v-select label="name" v-model="sport" v-validate="'required'"
                @input="setSportID" placeholder="Select Sports"
                :options="sports" name="sport"></v-select>
                <i v-show="errors.has('sport')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('sport')" class="help is-danger text-danger">{{ errors.first('sport') }}</span>
            </div>
        </div>
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
                <label for="odds" class="control-label float-md-right txt_media1">
                    Status
                </label>
            </div>
            <div class="col-md-8">
                <select name="status" class="form-control" v-model="formData.status">
                    <option value="1">Active</option>
                    <option value="0">Deactivate</option>
                </select>
            </div>
        </div>
        <div class="column is-6">
            <input type="hidden" value="" name="id" v-model="formData.id">
            <div class="control text-center">
                <button class="button btn btn-primary mr-2" type="submit" id="saveBtn" name="button">Save</button>
                <button class="button btn btn-secondary" type="button" @click="resetForm" name="button">Reset</button>
            </div>
        </div>

    </form>
</template>
<script>
import CMS from '../../services/cms.js'
    export default {
        name: 'special-category-form',
        props:{
            sports: Array
        },
        data(){
            return{
                sport: '',
                formData:{
                    name: '',
                    sport_id: '',
                    order: 1000,
                    status: '',
                    id: ''
                }
            }
        },
        methods:{
            resetForm(){
                $('#category-form')[0].reset()
                this.formData.id = ''
            },
            setSportID(e){
                this.formData.sport_id = e.provider_id;
            },
            async saveCategory(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.formData.sport = this.sport.provider_id
                        $('#saveBtn').attr('disabled', true).text('Saving...');
                        CMS.saveCategory(this.formData).then( res => {
                            $('#saveBtn').attr('disabled', false).text('Save');
                            if(res.success){
                                this.notify({message: 'Saved', title: 'Success', type: 'success'});
                            }
                            this.resetForm()
                        }).catch(error => {
                            $('#saveBtn').attr('disabled', false).text('Save');
                            this.notify({message: error.message, title: 'Error', type: 'error'});
                        });
                    }
                })
            }
        },
        mounted(){
            this.$nuxt.$on('EDIT_CATEGORY', (category, sport)=> {
                this.sport = sport;
                this.formData.id       = category.id;
                this.formData.name     = category.name;
                this.formData.sport_id = category.sport_id;
                this.formData.order    = category.order;
                this.formData.status   = category.status;
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
