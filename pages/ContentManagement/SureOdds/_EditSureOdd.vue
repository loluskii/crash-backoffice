<template>
    <div class="row">
        <div class="col-md-10">
            <card :title="title" >
                <form @submit.prevent="submitBanner" style="padding: 10px">
                    <div class="form-group">
                        <label for="">Title</label>
                        <input type="text" class="form-control" name="" v-model="formData.title">
                    </div>

                    <div class="form-group">
                        <label for="">Amount</label>
                        <input type="text" class="form-control" v-model="formData.amount" value="">
                    </div>
                    <div class="form-group">
                      <label for="">Content</label>
                      <wysiwyg v-model="formData.description" />
                    </div>
                    <div class="form-group">
                        <label for="">Select Image</label>
                        <div class="row">
                            <div class="col-md-4">
                                <img :src="formData.banner" class="img-responsive" height="100">
                            </div>
                        </div>
                        <input type="file" v-on:change="onFileChange" id='fileInput' style="display: none">
                        <button type="reset" class="btn btn-effect-ripple btn-default reset_btn" align="center" @click="selectFile">
                            Choose File
                        </button>
                    </div>

                    <div class="row marginTop">
                        <div class="col-6 col-md-6">
                            <input type="hidden" name="id" v-model="formData.id">
                            <button type="submit" id="saveBtn"
                                class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                                tabindex="7">Save</button>
                        </div>
                        <div class="col-6 col-md-6">
                            <router-link to="/ContentManagement/SureOdds" class="btn btn-default btn-block btn-md btn-responsive">
                                Cancel
                            </router-link>
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
    import axios from '~/plugins/axios'

    export default{
        scrollToTop: true,
        name: 'edit-sureodds',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Edit Sure Odds',
                formData:{
                    title: '',
                    amount: '',
                    description: '',
                    banner: '',
                }
            }
        },
        methods:{
            submitBanner(){
                CMS.storeSureOdds(this.formData).then(res => {
                    if(res.success){
                        this.$toast.success('Sure odds has been saved!',{icon: 'times'})
                        this.$router.push('/ContentManagement/SureOdds');
                    }else{
                        this.$toast.error('An error occured',{icon: 'times'})
                    }
                })
            },

            selectFile(e){
                e.preventDefault();
                $('#fileInput').trigger('click');
            },
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.formData.banner = e.target.result;
                };
                reader.readAsDataURL(file);
            },
        },
        mounted(){

            let id = this.$route.params.EditSureOdd
            if(id){
                CMS.getSureOdd(id).then(res => {
                    this.formData.title = res.title
                    this.formData.amount = res.amount
                    this.formData.description = res.description
                    this.formData.banner = res.image_path
                    this.formData.id = res.id
                })
            }
        },
        head(){
            return {
                title: 'Edit Sure Odd'
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Edit Sure Odd')
        },
    }
</script>
