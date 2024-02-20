<template>
    <card title="Add/Edit Player Segment" :padding="true">
        <form @submit.prevent="saveSegment" id="form">
            <div class="form-group form-material">
                <input type="text" name="name" 
                v-validate="'required'" class="form-control" v-model="formData.name" 
                :class="{'input': true, 'is-danger': errors.has('name') }"
                autocomplete="off" placeholder="Title">
                <i v-show="errors.has('name')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('name')" class="help is-danger text-danger">{{ errors.first('name') }}</span>
            </div>
            <div class="form-group form-material">
                <input type="text" name="min_odd" 
                v-validate="'required'" class="form-control" v-model="formData.min_odd" 
                :class="{'input': true, 'is-danger': errors.has('min_odd') }"
                autocomplete="off" placeholder="Min odd per game">
                <i v-show="errors.has('min_odd')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('min_odd')" class="help is-danger text-danger">{{ errors.first('min_odd') }}</span>
            </div>
            <div class="form-group form-material">
                <input type="text" name="min_selection" 
                v-validate="'required'" class="form-control" v-model="formData.min_selection" 
                :class="{'input': true, 'is-danger': errors.has('min_selection') }"
                autocomplete="off" placeholder="Min selection per ticekt">
                <i v-show="errors.has('min_selection')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('min_selection')" class="help is-danger text-danger">{{ errors.first('min_selection') }}</span>
            </div>
            <div class="form-group form-material">
                <textarea type="text" name="message" class="form-control" 
                :class="{'input': true, 'is-danger': errors.has('min_selection') }" 
                v-validate="'required'"
                v-model="formData.message" autocomplete="off" placeholder="Error Message"></textarea>
                <i v-show="errors.has('message')" class="fa fa-warning text-danger"></i>
                <span v-show="errors.has('message')" class="help is-danger text-danger">{{ errors.first('message') }}</span>
            </div>
            <div class="form-group">
                <input type="hidden" v-model="formData.id" value="">
                <button type="submit" class="btn btn-primary mr-2" id="save">Save</button>
                <button type="button" class="btn btn-default" @click="resetForm">Cancel</button>
            </div>
        </form>
    </card>
</template>

<script>
export default {
   
    data(){
        return{
            formData:{
                name: '',
                min_odd: '',
                min_selection: '',
                message: '',
                id: ''
            },
        }
    },
    methods: {
        saveSegment: function saveSegment() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    $('#save').attr('disabled', true);
                    this.$axios.post('/admin/player-management/segments', this.formData).then(res=>{
                        if(res.data.success){
                            $('#save').attr('disabled', false);
                            if(this.formData.id == ''){
                                this.$toast.success('New segment has been created successfully.', {icon: 'check'});
                                $('#form')[0].reset();
                                this.$nuxt.$emit('NEW_SEGMENT', res.data.segment)
                            }else{
                                this.$toast.success('Segement info has been updated.', {icon: 'check'});
                                this.$nuxt.$emit('UPDATED_SEGMENT', res.data.segments)
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
        resetForm(){
            this.formData = {
                name: '',
                display_name: '',
                discription: '',
                is_admin: false,
                id: ''
            }
        }
    },
    mounted: function mounted() {
        
        this.$nuxt.$on('EDIT_SEGMENT', (segment) => {
            this.formData.name          = segment.name;
            this.formData.min_odd       = segment.min_odd;
            this.formData.min_selection = segment.min_selection;
            this.formData.message       = segment.message
            this.formData.id            = segment.id;
        })
    },
}
</script>

<style lang="css">
</style>
