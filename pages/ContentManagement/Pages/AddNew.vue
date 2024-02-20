<template>
    <div class="row">
        <div class="col-md-10">

            <card :title="title" >
                <form @submit.prevent="store" style="padding: 10px">
                    <div class="form-group">
                        <label for="name">Title
                            <span class="text-danger">*</span>
                        </label>
                        <input name="title" v-validate="'required'"
                            class="form-control" :class="{'input': true, 'is-danger': errors.has('title') }"
                            type="text" placeholder="Enter page title" v-model="formData.title">
                            <i v-show="errors.has('title')" class="fa fa-warning text-danger"></i>
                            <span v-show="errors.has('title')" class="help is-danger text-danger">{{ errors.first('title') }}</span>
                    </div>
                    <div class="form-group">
                        <label for="content">Page Content</label>
                        <wysiwyg v-model="formData.content" />
                        <i v-show="errors.has('content')" class="fa fa-warning text-danger"></i>
                        <span v-show="errors.has('content')" class="help is-danger text-danger">{{ errors.first('content') }}</span>
                    </div>
                    <div class="form-group">
                        <label for="name">Target
                        </label>
                        <select name="target" class="form-control" id="target" v-model="formData.target">
                            <option value="web">Web</option>
                            <option value="mobile">Mobile</option>
                        </select>
                    </div>
                    <div class="row marginTop">
                        <div class="col-6 col-md-6">
                            <input type="hidden" name="id" v-model="formData.id">
                            <button type="submit" id="saveBtn"
                                class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                                tabindex="7">Save</button>

                        </div>
                        <div class="col-6 col-md-6">
                            <button id="resetBtn" @click="resetForm"
                                    class="btn btn-secondary text_white btn-block text-white btn-md btn-responsive"
                                    tabindex="7">Reset</button>
                        </div>
                    </div>
                </form>
            </card>
        </div>
    </div>
</template>
<script>
    import CMS from '../../../services/cms.js'
    import card from '../../../components/card.vue';
    export default{
        name: 'add-page',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Add New',
                locations: '',
                formData:{
                    title: '',
                    content: '',
                    target: 'web'
                },
                loading: true,
                accounts: []
            }
        },
        methods:{
            store(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#saveBtn').attr('disabled', true).text('Saving...');
                        CMS.savePage(this.formData).then(res => {
                            if(res && res.success){
                                $('#saveBtn').attr('disabled', false).text('Save');
                                this.$toast.success('New page has been created successfully.', {icon: 'check'});
                                this.resetForm()
                            }else{
                                $('#saveBtn').attr('disabled', false).text('Save');
                            }
                        }).catch(err => {
                            $('#saveBtn').attr('disabled', false).text('Save');
                            this.$toast.error('An error occured',{icon: 'times'})
                        })
                    }
                });
            },
            resetForm(){
                this.formData={
                    title: '',
                    content: '',
                    target: '',
                }
            }
        },
        mounted(){

        },
        head(){
            return {
                title: 'Add New Page'
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Add New Page')
        },
    }
</script>
