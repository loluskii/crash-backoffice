<template>
    <form class="form-horizontal columns column is-multiline is-12" id="form" role="form" @submit.prevent="saveEnhancedMultiples">
        <div class="row form-group">
            <div class="col-md-4">
                <label for="category_id" class="control-label float-md-right txt_media1">
                    Category
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <select name="category_id" v-validate="'required'" class="form-control" id="category_id" v-model="formData.category_id">
                    <option :value="category.id" v-for="(category, index) in categories" :key="index">{{ category.name }}</option>
                </select>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-4">
                <label for="start_date" class="control-label float-md-right txt_media1">
                    Start Date
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <flat-pickr v-model="formData.start_date" v-validate="'required'" name="start_date" :config="config" class="form-control"></flat-pickr>
                <i v-show="errors.has('start_date')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('start_date')" class="help is-danger text-danger">Please enter a start date for the event</span>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-4">
                <label for="title" class="control-label float-md-right txt_media1">
                    Title
                    <span class="text-danger">*</span>
                </label>
            </div>
            <div class="col-md-8">
                <input type="text" v-validate="'required'" class="form-control" name="title" id="title" v-model="formData.title">
                <i v-show="errors.has('title')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('title')" class="help is-danger text-danger">Please enter a title</span>
            </div>
        </div>
        <div class="row form-group">
            <div class="col-md-4">
                <label for="odds" class="control-label float-md-right txt_media1">
                    Description
                </label>
            </div>
            <div class="col-md-8">
                <textarea name="description" v-model="formData.description" cols="30" class="form-control" rows="5" placeholder="Enter description for this special offer"></textarea>
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
        <h5>Markets</h5>
        <hr>
        <div class="form-inline mb-2" v-for="(market, index) in formData.markets" :key="index">
            <div class="form-group col-md-7">
                <label class="form-control-label col-md-3" for="inputInlineUsername">Name: </label>
                <div class="col-md-9">
                    <input type="text" class="form-control" autocomplete="off" v-model="market.name">
                </div>
            </div>
            <div class="form-group col-md-4">
                <label class="form-control-label col-md-3" for="inputInlinePassword">Odds:</label>
                <div class="col-md-9">
                    <input type="text" class="form-control" style="width: 80%" autocomplete="off" v-model="market.odds">
                </div>
            </div>
            <div class="form-group col-md-1">
                <a href="javascript:;" v-if="index > 0" class="pull-left">
                    <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeRow(index)"></i>
                </a>
            </div>
        </div>
        <br>
        <a href="javascript:;" class="text-success" @click="addMarket"><i class="fa fa-plus"></i> Add More</a>
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
        name: 'special-form',
        props:{
            categories: Array
        },
        data(){
            return{
                formData:{
                    category_id : '',
                    start_date: '',
                    title: '',
                    description: '',
                    status: 1,
                    id: '',
                    markets:[{
                        name:'',
                        odds:''
                    }]
                },
                config: this.$store.state.flatpickrConfig

            }
        },
        methods:{
            addMarket(){
                this.formData.markets.push({
                    name: '',
                    odds: ''
                })
            },
            async saveEnhancedMultiples(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#saveBtn').attr('disabled', true).text('Saving...');                
                        CMS.saveMultiples(this.formData).then( res => {
                            $('#saveBtn').attr('disabled', false).text('Save'); 
                            if(this.formData.id === ''){
                                $('#form')[0].reset();                         
                                this.$nuxt.$emit('ADDED_SPECIAL', res.specials)
                                this.notify({message: 'Saved', title: 'Success!', type: 'success'});
                            }else{
                                this.$nuxt.$emit('UPDATED_SPECIAL', res.specials)
                                this.notify({message: 'Saved', title: 'Success!', type: 'success'});
                            }
                            

                        }).catch(error => {
                            console.log(error);
                        });
                    }
                })
            },
            removeRow(index){
                this.formData.markets.splice(index,1)
            },
        },
        mounted(){
            this.config.dateFormat = 'Y-m-d H:i';

            this.$nuxt.$on('EDIT_SPECIAL', (special)=>{
                this.formData.category_id = special.soccer_special_category_id;
                this.formData.start_date = special.start_date;
                this.formData.title = special.name;
                this.formData.description = special.description;
                this.formData.status = special.status;
                this.formData.id =  special.id
                this.formData.markets = special.markets;
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