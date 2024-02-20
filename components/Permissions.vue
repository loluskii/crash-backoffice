<template>
    <div class="row mt-2">
        <div class="col-lg-8 masonry-item">
            <button class="btn btn-danger"> <i class="fa fa-trash-o fa-fw"></i> Delete</button>
            <hr style="border: 2px solid">
            <div class="row ml-0" v-if="permissions.length && !loading">
                <div class="col-md-4 p-2 mb-3" style="border: 1px solid #ccc" v-for="(permission, index) in permissions" :key="index">
                    <label for="">
                        <input type="checkbox" name="" id="">
                    <a href="javascript:;">{{ permission.name }}</a>
                    </label>
                    <span class="pull-right">
                        <a href="javascript:;" @click="edit(permission)"><i class="fa fa-pencil fa-fw"></i></a>
                        <a href="javascript:;" class="text-danger" @click="deletePermission($event, permission.id)"><i class="fa fa-trash-o fa-fw"></i></a>
                    </span>
                </div>
            </div>
            <div class="text-center" v-if="!permissions.length && !loading">
                <h4>No data found</h4>
            </div>
            <div class="text-center" v-if="loading">
                Loading Please wait....<i class="fa fa-4x fa-spin fa-spinner"></i>
            </div>
        </div>
          <!-- End Panel Tickets -->
        <div class="col-lg-4 masonry-item">
          <!-- Panel Subscribe -->
            <card title="Add/Edit Permission" :padding="true">
                <form @submit.prevent="save" id="form">
                    <div class="form-group form-material">
                        <input type="text" name="name" 
                        v-validate="'required'" class="form-control" v-model="formData.name" 
                        :class="{'input': true, 'is-danger': errors.has('name') }"
                        autocomplete="off" placeholder="Name">
                        <i v-show="errors.has('name')" class="fa fa-warning text-danger"></i>
                        <span v-show="errors.has('name')" class="help is-danger text-danger">{{ errors.first('name') }}</span>
                    </div>
                    <div class="form-group">
                        <input type="hidden" v-model="formData.id" value="">
                        <button type="submit" class="btn btn-primary mr-2" id="save">Save</button>
                        <button type="reset" class="btn btn-default" @click="resetForm">Cancel</button>
                    </div>
                </form>
            </card>
        </div>
    </div>
</template>

<script>
export default {
    name:'site_menu',
    layout: 'main',
    scrollToTop: true,    
    props:[
        'permissions',
        'loading'
    ],
    data(){
        return{
            scrollToTop: true,
            formData:{
                name: '',
                id: ''
            }
        }
    },
    methods: {
        save: function save() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    $('#save').attr('disabled', true);
                    this.$axios.post('/admin/settings/permissions', this.formData).then(res=>{
                        if(res.data.success){
                            $('#save').attr('disabled', false);
                            if(this.formData.id == ''){
                                this.$toast.success('New permission has been added successfully.', {icon: 'check'});
                                this.permissions.push(res.data.role);
                                this.resetForm();
                            }else{
                                this.$toast.success('Permission has been updated.', {icon: 'check'});
                                this.permissions = res.data.permissions;
                            }
                        }else{
                            $('#save').attr('disabled', false);
                            this.$toast.error('An error occured',{icon: 'times'})
                        }
                    }).catch(err => {
                        $('#save').attr('disabled', false);
                        this.$toast.error('An error occured',{icon: 'times'})
                    });
                }
            }).catch(err => {
                $('#save').attr('disabled', false);
                this.$toast.error('An error occured',{icon: 'times'})
            });
        },
        edit(role){
            this.formData.name          = role.name;
            this.formData.id            = role.id;
        },
        deletePermission(e, id){
            var self = this;
            self.$swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover this item',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete role!',
                cancelButtonText: 'No, keep role'
            }).then((result)=> {
                if (result.value) {
                    this.$axios.get('/admin/settings/permissions/delete/'+id).then((res) => {
                        if(res.data.success){
                            $(e.target).closest('div').remove();
                            self.$swal('Deleted!', 'Permissions has been removed', 'success');
                        }
                    });
                }else{

                }
            })
        },
        resetForm(){
            this.formData = {
                name: '',
                id: ''
            }
        }
    }
}
</script>

<style lang="css">
</style>
