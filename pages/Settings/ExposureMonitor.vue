<template>
    <div class="row">
        <b-col>
            <card title="Exposure Monitor Settings" :padding="true">
                <form action="" class="p-3" @submit.prevent="saveSettings">
                    
                    <div class="form-group row">
                        <label class="col-md-6 form-control-label text-left">Display tickets with: </label>
                        <div class="col-md-6 form-inline">
                            <select name="monitor" id="monitor" v-model="formData.monitor_type" class="form-control">
                                <option value="">Stake / Pot Winnings</option>
                                <option value="stake">Stake</option>
                                <option value="pot_winnings">Pot. Winnings</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-md-6 form-control-label text-left">Amount: </label>
                        <div class="col-md-6 form-inline">
                            <input type="text" class="form-control" name="amount_range" placeholder=">= 1000000" v-model="formData.amount_range" autocomplete="off" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-6 form-control-label text-left">Send notification to: </label>
                        <div class="col-md-6 form-inline">
                            <input type="email" class="form-control" name="notification_email" v-model="formData.notification_email" autocomplete="off" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-6 form-control-label text-left">When Completion Percentage is: </label>
                        <div class="col-md-6 form-inline">
                            <input type="text" class="form-control" name="completion_percent" v-model="formData.completion_percent" autocomplete="off" >
                        </div>
                    </div>
                     <div class="form-group row">
                        <label class="col-md-6 form-control-label text-left">Max no. of tickets per page: </label>
                        <div class="col-md-6 form-inline">
                            <input type="text" class="form-control" name="page_size" v-model="formData.page_size" autocomplete="off" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-6 form-control-label text-left">Refresh list every: </label>
                        <div class="col-md-6 form-inline">
                            <select name="class" id="class-type" class="form-control" v-model="formData.refresh_time">
                                <option value="30000">5 mins</option>
                                <option value="60000">10 mins</option>
                                <option value="90000">15 mins</option>
                                <option value="120000">20 mins</option>
                            </select>
                        </div>
                    </div>
                   
                    <div class="form-group row ">
                        <div class="col-md-6 offset-md-6">
                            <button type="submit" class="btn btn-primary btn-block" id="saveBtn" >Save </button>
                        </div>
                    </div>
                </form>
            </card>
        </b-col>
        <b-col></b-col>
    </div>
</template>
<script>
export default {
    layout: 'main',
    scrollToTop: true,
    data(){
        return{
            formData:{
                monitor_type: '',
                amount_range: '',
                notification_email: '',
                completion_percent: '',
                page_size: 50,
                refresh_time: 3000
            }
        }
    },
    methods: {
        saveSettings(){
            $('#saveBtn').attr('disabled', true).html('Please wait..');
            this.$axios.post('/admin/settings/exposure-monitor', this.formData).then(response =>  {
                $('#saveBtn').attr('disabled', false).html('Save');
                if(response.data.success){
                    this.$swal('Success!','Exposure monitor settings has been saved', 'success');
                }else{
                    this.$swal('Error!','Something went wrong', 'error');
                }
            }).catch(error => {
                $('#saveBtn').attr('disabled', false).html('Save');                
                toastr['error']('An error occured.', 'Error');
            });
        }
    },
    mounted() {
        this.$axios.get('/admin/settings?category=exposure-monitor').then(res =>  {
            let self =this;
            $.each(res.data, function(key, item){
                if(item.option == 'monitor_type'){
                    self.formData.monitor_type = item.value
                }
                if(item.option == 'amount_range'){
                    self.formData.amount_range = item.value
                }
                if(item.option == 'notification_email'){
                    self.formData.notification_email = item.value
                }
                if(item.option == 'completion_percent'){
                    self.formData.completion_percent = item.value
                }
            });
        }).catch(error => {
            toastr['error']('An error occured.', 'Error');
        });
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Exposure Monitor Settings');        
    },
}
</script>