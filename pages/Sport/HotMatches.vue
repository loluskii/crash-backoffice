<template>
    <div>
        <card title="Hot Matches Selection" >
            <form @submit.prevent="saveChanges">
                <div class="table-responsive" >
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr class="text-center">
                                <th style="width: 15%">Event ID</th>
                                <th style="width: 35%">Event</th>
                                <th style="width: 5%">Time</th>
                                <th style="width: 5%">Active Option</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in hotMatches" :key="index">
                                <td>
                                   <input type="text" class="form-control" @blur="getEvent(item, index)" placeholder="enter event id" v-model="item.event_id">
                                </td>
                                <td>{{ item.event_name }}</td>
                                <td>{{ item.event_date, 'DD/MM/YYYY HH:MM' }}</td>
                                <td>
                                    <select name="option_id" class="form-control" id="option_id" v-model="item.option_id">
                                        <option value="">Select Option</option>
                                        <option value="1">1</option>
                                        <option value="2">X</option>
                                        <option value="3">2</option>
                                    </select>
                                </td>
                                <td>
                                    <a href="javascript:;" v-if="index !== 0">
                                        <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeRow(index)"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row p-2">
                    <div class="col-md-6">
                        <a href="javascript:;" class="text-success" @click="addEvent"><i class="fa fa-plus"></i> Add More</a>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-success btn-block" id="saveBtn" type="submit">Save Changes</button>
                    </div>
                </div>
            </form>
        </card>
    </div>
</template>
<script>
import card from "../../components/card.vue"
export default {
    name: "weekly_coupon",
    layout: 'main',
    components:{
        card
    },
    data(){
        return {
            title: 'Hot Matches Setup',
            hotMatches:[
                {
                    event_id: '', 
                    option_id: '',
                    event_name: '',
                    event_date: ''
                }
            ]
        }
    },
    head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Hot Matches Setup')
    },
    methods: {
        displayDate(str, format) {
            if(str != '')
                return this.$moment(str).format(format);
        },
        addEvent(){
            this.hotMatches.push({
                event_id: '',
                option_id: '',
            });
        },
        saveChanges(){
            $('#saveBtn').attr('disabled', true).text('Saving...');                                        
            this.$axios.post('/admin/sport/hotmatches/store', this.hotMatches).then(res => {
                $('#saveBtn').attr('disabled', false).text('Save');                                        
                if(res.data.success){
                    this.notify({message: res.data.message, title: 'Success', type: 'success'});
                }
            }).catch(error => {
                $('#saveBtn').attr('disabled', false).text('Save');                                                                    
                this.notify({message: error.data.message, title: 'Error', type: 'error'});
            })
        },
        removeRow(index){
            this.hotMatches.splice(index,1)
        },
        getEvent(item, index){
            if(item.event_id.length > 3)
                this.$axios.get('/admin/content-management/find-fixture/'+item.event_id).then(res => {
                    console.log(res);
                    this.hotMatches[index].event_name = res.data.event_name;
                    this.hotMatches[index].event_date = res.data.schedule;
                });
        }
    },
    mounted(){
        this.$axios.get('/admin/sport/hotmatches/list').then(res => {
            // if(!res.data.length){
                this.hotMatches = res.data;
            // }
        })
    },
    notifications: {
        notify: { 
            title: '',
            message: '',
            type: '' 
        }
    }
}
</script>