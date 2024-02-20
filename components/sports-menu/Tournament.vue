<template>
    <form class="form-horizontal columns column is-multiline is-12" id="tournament-form" role="form" @submit.prevent="saveTournament">
        <div class="row form-group">
            <div class="col-md-4">
                <label for="input-text" class="control-label float-md-right txt_media1">
                    Sports
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <v-select label="name" v-model="sport" v-validate="'required'"
                @input="setCategories" placeholder="Select Sports"
                :options="sports" name="sport"></v-select>
                <i v-show="errors.has('sport')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('sport')" class="help is-danger text-danger">{{ errors.first('sport') }}</span>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-4">
                <label for="input-text" class="control-label float-md-right txt_media1">
                    Categories
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <v-select label="name" v-model="category" v-validate="'required'"
                @input="setCategoryID" placeholder="Select Category"
                :options="categories" name="category"></v-select>
                <i v-show="errors.has('category')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('category')" class="help is-danger text-danger">{{ errors.first('category') }}</span>
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
                category: '',
                categories: [],
                formData:{
                    name: '',
                    sport_category_id: '',
                    order: 1000,
                    status: '',
                    id: ''
                }
            }
        },
        methods:{
            resetForm(){
                $('#tournament-form')[0].reset()
                this.formData.id = ''
            },
            setCategories(e){
                this.categories = e.categories
            },
            setCategoryID(e){
                this.formData.sport_category_id = e.provider_id;
            },
            async saveTournament(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.formData.sport = this.sport.provider_id
                        $('#saveBtn').attr('disabled', true).text('Saving...');
                        CMS.saveTournament(this.formData).then( res => {
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
            this.$nuxt.$on('EDIT_TOURNAMENT', (category, sport, tournament)=> {
                this.sport = sport;
                this.category = category;
                this.formData.id       = tournament.id;
                this.formData.name     = tournament.name;
                this.formData.sport_category_id = tournament.sport_category_id;
                this.formData.order    = tournament.order;
                this.formData.status   = tournament.status;
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
