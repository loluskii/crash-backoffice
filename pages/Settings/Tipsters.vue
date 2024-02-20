<template>
    <div class="col-md-12">
        <card title="Settings" :padding="true">
            <form @submit.prevent="saveSettings" v-if="!loading">
                <div class="example">
                    <div class="form-inline mb-3" v-for="(item, index) in tipsterSettings.items" :key="index">
                        <div class="form-group col-md-3">
                            <label class="form-control-label" for="inputInlineUsername">Min. Amount: </label>
                            <input type="text" class="form-control" autocomplete="off" style="width: 100px" v-model="item.min_amount">
                        </div>
                        <div class="form-group col-md-3">
                            <label class="form-control-label" for="inputInlinePassword">Max. Amount:</label>
                            <input type="text" class="form-control" autocomplete="off" value="0.0" style="width: 100px" v-model="item.max_amount">
                        </div>
                        <div class="form-group col-md-4">
                            <label class="form-control-label" for="inputInlinePassword">No of allowed Rebet:</label>
                            <input type="text" class="form-control" autocomplete="off" value="0.0" style="width: 50px" v-model="item.rebet_count">
                        </div>
                        <div class="form-group col-md-2">
                            <a href="javascript:;">
                                <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeRow(index)"></i>
                            </a>
                        </div>
                    </div>
                    <br>
                    <a href="javascript:;" class="text-success" @click="addRow"><i class="fa fa-plus"></i> Add More</a>
                    <div class="form-group row  row">
                        <div class="col-md-9 offset-md-3">
                        <button type="submit" class="btn btn-primary waves-effect waves-classic" id="saveBtn">Submit </button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="text-center" v-if="loading">
                <i class="fa fa-spin fa-spinner fa-3x"></i>
            </div>
        </card>
    </div>
</template>
<script>
export default {
    name: 'tipsters',
    layout: 'main',
    data(){
        return {
            loading: true,
            tipsterSettings:{
                items: []
            },
      
        }
    },
    methods: {
        addRow(){
            this.tipsterSettings.items.push({
                min_amount: 0.00,
                max_amount: 0.00,
                rebet_count: 0
            })
        },
        removeRow(index){
            this.tipsterSettings.items.splice(index,1)
        },
        saveSettings(){
            $('#saveBtn').attr('disabled', true).html('Please wait..');
            this.$axios.post('/admin/settings/tipsters', this.tipsterSettings).then(res=>{
                if(res.data.success){
                    this.$swal('Success!','Settings has been saved', 'success');
                    $('#saveBtn').attr('disabled', false).html('Save');
                }else{
                    $('#saveBtn').attr('disabled', false).html('Save');
                    this.$swal('Error!','Something went wrong', 'error');
                }
            }).catch(error => {
                $('#saveBtn').attr('disabled', false).html('Save');                                
                toastr['error']('An error occured.', 'Error');
            });
        },
    },
    mounted(){
        this.$axios.get('/admin/settings/tipsters').then(res=>{
            if(res.data.length)
                this.tipsterSettings.items = res.data;
            this.loading = false;
        });
    },
    head(){
        return{
            title: 'Tipsters Settings'
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Tipsters Settings');        
    },
}
</script>

<style scoped>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
input.form-control{
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #ced4da !important;
}
</style>