<template>
    <card title="Agent Users List" class="mt-2 table-responsive">
        <table class="table table-bordered table-striped">
            <thead>
                <th>Username</th>
                <th>Name</th>
                <th>Role</th>
                <th>Availability</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th></th>
            </thead>
            <tbody>
                <tr v-if="users.length > 0 && !loading" v-for="(user, index) in users" :key="index">
                    <td>
                      <router-link :to="'/PlayerManagement/PlayerInfo/'+user.user_id" >{{user.username}}</router-link>
                    </td>
                    <td>{{ user.first_name+' '+user.last_name }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ formatNumber(user.available_balance) }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone_number }}</td>
                    <td>{{ user.address }}</td>
                    <td>
                        <div class="btn-group">
                            <a href="javascript:;" class="btn btn-info" role="button" @click="edit(user)">
                                <span class="fa fa-edit"></span>
                            </a>
                            <a href="javascript:;" class="btn btn-warning" role="button" @click="showPasswordModal(user.user_id)">
                                <span class="fa fa-lock"></span>
                            </a>
                            <div class="or"></div>
                            <a href="javascript:;" v-permission="'Delete User'" class="btn btn-danger" role="button" @click="deleteUser($event, user.user_id)">
                                <span class="fa fa-trash"></span>
                            </a>
                        </div>
                    </td>
                </tr>
                <tr v-if="users.length < 1 && !loading">
                    <td colspan="7" class="text-center">
                        <h4>No record found</h4>
                    </td>
                </tr>
                <tr v-if="loading">
                    <td colspan="7" class="text-center">
                        <i class="fa fa-4x fa-spin fa-spinner"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <change-password></change-password>
    </card>
</template>
<script>
    import ChangePassword from "../ChangePassword.vue"

    import card from '../card';
    export default {
        components :{
            card,
            ChangePassword
        },
        props:[
            'users',
            'loading',
        ],
        data(){
            return{
                appdetails: [],
                selected: false,
                statusData:{
                    comment: '',
                    status: '',
                    id: ''
                },
                commentTitle: ''
            }
        },
        methods:{
            edit(user){
                this.$nuxt.$emit('editUser', user);
            },
            deleteUser(e, id){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete!',
                    cancelButtonText: 'No, keep '
                }).then((result)=> {
                    if (result.value) {
                        self.$axios.get('/agent-management/agent/'+id+'/delete-user').then((res) => {
                            if(res.data.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'User has been deleted', 'success');
                            }else{
                                self.$swal('Error!', res.data.message, 'error');
                            }
                        });
                    }else{

                    }
                })
            },
            showPasswordModal(user){
                this.$nuxt.$emit('password_modal', user);
            },
        }
    }
</script>
