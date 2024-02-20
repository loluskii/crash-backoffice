<template>
    <div class="d-block ">
        <div class="">
            <label for="">
                <input type="checkbox" v-model="selectAll"> Select All
            </label>
        </div>
        <hr>
        <div class="row ml-0" v-if="permissions.length && !loading">
            <div class="col-md-4 p-2 mb-3" v-for="(permission, index) in permissions" :key="index">
                <label for="">
                    <input type="checkbox" name="" id="" :value="permission.id" v-model="selected">
                    <a href="javascript:;">{{ permission.name }}</a>
                </label>
            </div>
        </div>
        <b-button size="lg" id="save" variant="success" @click="savePermission">
            Save
        </b-button>
    </div>
</template>
<script>
export default {
    props:[
        'permissions',
        'loading',
        'role'
    ],
    data(){
        return{
            selected: []
        }
    },
    computed: {
        selectAll: {
            get: function () {
                return this.permissions ? this.selected.length == this.permissions.length : false;
            },
            set: function (value) {
                var selected = [];
                if (value) {
                    this.permissions.forEach(function (permission) {
                        selected.push(permission.id);
                    });
                }
                this.selected = selected;
            }
        }
    },
    methods: {
        savePermission(){
            if(this.selected.length){
                $('#save').attr('disabled', true).text('Please wait...');
                this.$axios.post('/admin/settings/set-permissions', {role_id: this.role.id, permissions: this.selected})
                .then(res => {
                    $('#save').attr('disabled', false).text('Save');                    
                    if(res.data.success){
                        this.$toast.success('Permissions has been saved',{icon: 'check'})
                    }else{
                        this.$toast.error('An error occured',{icon: 'times'})                        
                    }
                }).catch(err => {
                    $('#save').attr('disabled', false).text('Save');                    
                    this.$toast.error('An error occured',{icon: 'times'})                    
                })
            }
        }
    },
    mounted() {
        if(this.role.permissions.length){
            this.role.permissions.forEach(permission => {
                this.selected.push(permission.id);
            });
        }
    },
}
</script>