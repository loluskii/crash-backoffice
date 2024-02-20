<template>
    <card :title="'Manage Players for '+segment.name " :padding="true">
        <autocomplete
            ref="autocomplete"
            :source="getUrl"
            results-property="data"
            input-class="form-control"
            @selected="addUser"
            results-display="username">
        </autocomplete>
        <div class="m-t-10">
            <table class="table table-bordered" v-if="userSegments.length && !loading">
                <tr v-for="(userSegment, index) in userSegments" :key="index">
                    <td>{{ userSegment.user ? userSegment.user.username : '-' }}</td>
                    <td class="text-center">
                        <a href="javascript:;" @click="deleteUser($event, userSegment.id)">
                            <i class="fa fa-times text-danger"></i>
                        </a>
                    </td>
                </tr>
            </table>
            <div class="p-4 text-center" v-if="!userSegments.length && !loading">
                <h3>No player has been added to {{ segment.name }}</h3>
            </div>
            <div class="p-4 text-center" v-if="loading">
                <i class="fa fa-4x fa-spin fa-spinner"></i>
            </div>
            <div class="text-center m-t-10">
                <button class="btn btn-default" @click="showSegmentForm">Add Segment</button>
            </div>
        </div>
    </card>
</template>

<script>
export default {
    props:[
       'segment'
    ],
    data(){
        return{
            loading: false,
            user: null,
            userSegments: []
        }
    },
    methods: {
         showSegmentForm(){
            this.$nuxt.$emit('SHOW_FORM');
        },
        getUrl(input){
          return process.env.prodURL + '/api/users/find?q='+input;
        },
        addUser(user){
            var self = this;
            self.$swal({
                title: 'Are you sure?',
                text: 'Are you sure you want to add '+user.display+' to '+self.segment.name+'?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No'
            }).then((result)=> {
                if (result.value) {
                    this.$axios.post('/admin/player-management/segments/add-user', {player_segment_id: self.segment.id, user_id: user.value}).then((res) => {
                        if(res.data.success){
                            this.userSegments.push(res.data.userSegment);
                            self.$swal('Success!', 'Player has been added to '+self.segment.name, 'success');
                        }
                    }).catch(err => {
                    });
                }else{

                }
            });
            // access the autocomplete component methods from the parent
            this.$refs.autocomplete.clear()
        },
        deleteUser(e, id){
            var self = this;
            self.$swal({
                title: 'Are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No'
            }).then((result)=> {
                if (result.value) {
                    this.$axios.get('/admin/player-management/segments/remove-user/'+id).then((res) => {
                        if(res.data.success){
                            $(e.target).closest('tr').remove();
                            self.$swal('Success!', 'User has been removed from '+self.segment.name, 'success');
                        }
                    }).catch(err => {
                    });
                }else{

                }
            })
        },
    },
    mounted: function mounted() {
        this.$nuxt.$on('MANAGE_USER', (segment_id) => {
            this.loading = true;
            this.$axios.get('/admin/player-management/segment/'+segment_id+'/get-users').then(res => {
                this.userSegments = res.data;
                this.loading = false;
            }).catch(err => {

            })
        })
    },
}
</script>

<style lang="css">
</style>
