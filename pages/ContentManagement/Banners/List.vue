<template>
    <div>
        <router-link to="/ContentManagement/Banners/AddNew" class="btn btn-success" style="margin-right: 10px">
            <i class="fa fa-fw fa-plus"></i>
            Add New Banner
        </router-link>
        <card title="List">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead class="bg-grey-100">
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Target</th>
                            <th>Position</th>
                            <th>Link</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(banner, index) in banners" v-if="banners.length > 0" :key="index">
                            <td>
                                <a href="javascript:void(0)">
                                    <img :src="banner.image_path" alt="" height="100" style="max-width: 250px">
                                </a>
                            </td>
                            <td><router-link :to="'/ContentManagement/Banners/'+banner.id">{{ banner.title}}</router-link></td>
                            <td>{{banner.target.toUpperCase()}}</td>
                            <td>{{banner.position.toUpperCase()}}</td>
                            <td>{{banner.link}}</td>
                            <td class="text-nowrap">
                                <div class="ui-group-buttons">
                                    <router-link :to="'/ContentManagement/Banners/'+banner.id" class="btn btn-primary">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </router-link>
                                    <div class="or"></div>
                                    <a href="#" class="btn btn-danger" role="button" @click="deleteBanner($event,banner.id)">
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="!banners.length && !loading">
                            <td colspan="6" align="center">No banners have been created</td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="6" class="text-center">
                                <i class="fa fa-4x fa-spin fa-spinner"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>
<script>
    import card from "../../../components/card.vue"
    import CMS from '../../../services/cms.js'
    import axios from '~/plugins/axios'

    export default {
        scrollToTop: true,
        name:'pages',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Site Banners',
                banners: [],
                loading: true
            }
        },
        methods:{
            deleteBanner: function deleteBanner(e, id) {
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete item!',
                    cancelButtonText: 'No, keep item'
                }).then(result => {
                    if(result.value){
                        CMS.deleteBanner(id).then((res) => {
                            if(res.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Item has been removed', 'success');
                            }
                        });
                    }
                }, function(dismiss) {
                    
                });
            }
        },
        head() {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Site Banners')
        },
        mounted(){
            CMS.listBanners().then(res=>{
                this.banners = res;
                this.loading = false;
            })   
        }
    }
</script>