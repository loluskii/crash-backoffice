<template>
    <div>
        <router-link to="/ContentManagement/Pages/AddNew" class="btn btn-success" style="margin-right: 10px">
            <i class="fa fa-fw fa-plus"></i>
            Add New Page
        </router-link>
        <card title="List">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Target</th>
                            <th>Created By</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(page, index) in pages" :key="index">
                            <td>{{ page.title }}</td>
                            <td>/cms/{{ page.slug }}</td>
                            <td>{{ page.target }}</td>
                            <td>{{ (page.user) ? page.user.name : '' }}</td>
                            <td>
                                <router-link :to="'/ContentManagement/Pages/'+page.id">Edit</router-link> | 
                                <a href="javascript:;" @click="destroy($event, page.id)">Delete</a>
                            </td>
                        </tr>
                        <tr v-if="pages.length < 1" v-show="!loading">
                            <td colspan="5" class="text-center">
                                <h4>No record found</h4>
                            </td>
                        </tr>
                        <tr v-if="loading">
                            <td colspan="5" class="text-center">
                                Loading Please wait....<i class="fa fa-4x fa-spin fa-spinner"></i>
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
import axios from '~/plugins/axios'
import CMS from '../../../services/cms.js'

    export default {
        name:'pages',
        layout: 'main',
        components:{
            card
        },
        data(){
            return{
                title: 'Pages',
                pages: [],
                row_index:'',
                loading: true
            }
        },
        methods:{
            destroy(e, id){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    // text: 'You will not be able to recove',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete page!',
                    cancelButtonText: 'No, keep page'
                }).then((result)=> {
                    if (result.value) {
                        CMS.deletePage(id).then((res) => {
                            if(res.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Page has been removed', 'success');
                            }
                        });
                    }else{

                    }
                })
            },
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Pages')
        },
        mounted(){
            axios.get('/api/admin/content-management/pages').then(response =>  {
                this.pages = response.data
                this.loading = false;
            }).catch(error => {
                this.loading = false;
                console.log(error.data)
            });     
        }
    }
</script>