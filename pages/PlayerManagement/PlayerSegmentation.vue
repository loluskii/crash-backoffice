<template>
    <div class="row">
        <div class="col-md-8">
            <card title="Segments">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Min. Odd</th>
                                <th>Min. Selection</th>
                                <th>Created BY</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(segment, index) in segments" :key="index" v-if="segments.length">
                                <td>{{ segment.name }}</td>
                                <td>{{ segment.min_odd }}</td>
                                <td>{{ segment.min_selection }}</td>
                                <td>{{ segment.user ? segment.user.username : '' }}</td>
                                <td class="text-center">
                                    <a href="javascript:;" @click="edit(segment)">
                                        <i class="fa fa-edit"></i>
                                    </a> |
                                    <a href="javascript:;" @click="manageUsers(segment)">
                                        <i class="fa fa-group"></i>
                                    </a> |
                                    <a href="javascript:;" @click="deleteSegment($event, segment.id)">
                                        <i class="fa fa-times text-danger"></i>
                                    </a>
                                </td>
                            </tr>
                            <tr v-if="!segments.length" v-show="!loading">
                                <td colspan="6" class="text-center">
                                    <h4>No record found</h4>
                                </td>
                            </tr>
                            <tr v-if="loading">
                                <td colspan="6" class="text-center">
                                    Loading Please wait....<i class="fa fa-4x fa-spin fa-spinner"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </card>
        </div>
        <div class="col-md-4">
            <segment-form v-if="!managing"></segment-form>
            <manage-users v-if="managing" :segment="segment"></manage-users>
        </div>
    </div>
</template>
<script>
    import SegmentForm from '../../components/PlayerSegmentForm.vue'
    import ManageUsers from '../../components/PlayerSegmentAddUserPage.vue'
    export default {
        name:'playersearch',
        layout: 'main',
        components:{
            SegmentForm,
            ManageUsers
        },
        data(){
            return{
                title: 'Player Segmentation',
                segments: [],
                managing: false,
                loading: true,
                segment: null
            }
        },
        methods:{
            edit(segment){
                this.managing = false;
                this.$nuxt.$emit('EDIT_SEGMENT', segment);
            },
            manageUsers(segment){
                this.managing = true;
                this.segment = segment;
                setTimeout(() => {
                    this.$nuxt.$emit('MANAGE_USER', segment.id);
                }, 200);
            },
            deleteSegment(e, id){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    text: 'All player under this segment will bet removed',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete!',
                    cancelButtonText: 'No, keep'
                }).then((result)=> {
                    if (result.value) {
                        this.$axios.get('/admin/player-management/segment/'+id+'/delete').then((res) => {
                            if(res.data.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Segement has been removed', 'success');
                            }
                        }).catch(err => {
                        });
                    }else{

                    }
                })
            },
        },
        mounted() {
            this.$axios.get('/admin/player-management/segments').then(res => {
                this.loading = false;
                this.segments = res.data;
            });
            this.$nuxt.$on('SHOW_FORM', ()=>{
                this.managing = false;
            })
            this.$nuxt.$on('NEW_SEGMENT', (segment) => {
                this.segments.push(segment);
            });
            this.$nuxt.$on('UPDATED_SEGMENT', (segments) => {
                this.segements = segments;
            })
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Player Segmentation')
        },
    }
</script>
