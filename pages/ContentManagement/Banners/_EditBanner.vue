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
                        <label for="">Banner Type</label>
                        <select class="form-control" v-model="formData.banner_type">
                        <option value="sport">Sport</option>
                        <option value="casino">Casino</option>
                          <option value="registration">Registration</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Target</label>
                        <select class="form-control" v-model="formData.target">
                        <option value="web">Web</option>
                        <option value="mobile">Mobile</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Position</label>
                        <select class="form-control" v-model="formData.position">
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="background">Background</option>
                        <option value="slider">Slider</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="">Link</label>
                        <input type="text" class="form-control" v-model="formData.link" value="">
                    </div>
                    <div class="form-group">
                        <label for="">Content</label>
                        <wysiwyg v-model="formData.text" />
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
                    <div class="example-wrap">
                        <h4 class="example-title">Add Competition</h4>
                        <div class="example">
                            <div class="form-group">
                                <label for="">Sport</label>
                                <v-select label="sport_name"
                                @input="showCategory" placeholder="Select Sport"
                                :options="sports" name="username"></v-select>
                            </div>
                            <div class="form-group">
                                <label for="">Category</label>
                                <v-select label="category_name"
                                @input="showTournament" placeholder="Select Category"
                                :options="categories" name="category"></v-select>
                            </div>
                            <div class="form-group">
                                <label for="">Tournament</label>
                                <v-select label="tournament_name"
                                @input="showEvent" placeholder="Select Tournament"
                                :options="tournaments" name="tournament"></v-select>
                            </div>
                            <div class="form-group">
                                <label for="">Event</label>
                                <select class="form-control" v-model="formData.competiton">
                                <option value="">Select Event</option>
                                <option :key="ev" v-for="(evt, ev) in events" :value="evt.id">{{evt.team_1 + ' - '+evt.team_2}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row marginTop">
                        <div class="col-6 col-md-6">
                            <input type="hidden" name="id" v-model="formData.id">
                            <button type="submit" id="saveBtn"
                                class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                                tabindex="7">Save</button>
                        </div>
                        <div class="col-6 col-md-6">
                            <router-link to="/ContentManagement/Banners/List" class="btn btn-default btn-block btn-md btn-responsive">
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
        name: 'add-page',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Add New Banner',
                sports: [],
                categories: [],
                tournaments: [],
                events: [],
                formData:{
                    title: '',
                    target: 'web',
                    banner_type: 'sport',
                    position: 'slider',
                    link: '',
                    text: '',
                    banner: '',
                    sport: '',
                    category: '',
                    tournament: '',
                    competiton: '',
                }
            }
        },
        methods:{
            submitBanner(){
                CMS.storeBanner(this.formData).then(res => {
                    if(res.success){
                        this.$toast.success('Banner has been saved!',{icon: 'times'})
                        this.$router.push('/ContentManagement/Banners/List');
                    }else{
                        this.$toast.error('An error occured',{icon: 'times'})
                    }
                })
            },
            showCategory: function showCategory(e) {
                this.categories = e.categories
                this.formData.sport = e.sport_id
            },
            showTournament: function showTournament(e) {
                this.tournaments = e.tournaments
                this.formData.category = e.sport_category_id
            },
            showEvent: function showEvent(e) {
                this.formData.tournament = e.sport_tournament_id
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
            axios.get('/api/admin/content-management/sports-menu').then(response =>  {
                this.sports = response.data
            }).catch(error => {

                console.log(error.data)
            });
            let id = this.$route.params.EditBanner
            if(id){
                CMS.getBanner(id).then(res => {
                    this.formData.title = res.title
                    this.formData.target = res.target
                    this.formData.position = res.position
                    this.formData.link = res.link
                    this.formData.text = res.text
                    this.formData.banner = res.image_path
                    this.formData.sport = res.sport
                    this.formData.category = res.category
                    this.formData.tournament = res.tournament
                    this.formData.competition = res.competition
                    this.formData.id = res.id
                })
            }
        },
        head(){
            return {
                title: 'Edit Banner'
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Edit Banner')
        },
    }
</script>
