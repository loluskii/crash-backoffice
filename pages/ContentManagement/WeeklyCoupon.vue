<template>
    <div>
        <card title="Weekly Coupon" >
            <form @submit.prevent="saveChanges">
                <div class="table-responsive" >
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr class="text-center">
                                <th style="width: 30%">Division</th>
                                <th style="width: 5%">S/N</th>
                                <th style="width: 5%">Event ID</th>
                                <th style="width: 35%">Event</th>
                                <th style="width: 5%">1</th>
                                <th style="width: 5%">X</th>
                                <th style="width: 5%">2</th>
                                <th style="width: 5%">Date</th>
                                <th style="width: 5%">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in formData" :key="index">
                                <td>
                                    <v-select label="name" 
                                        v-model="data.tournament"
                                        v-on:input="setEvent" 
                                        placeholder="Select Tournament"
                                        :options="tournaments" 
                                        name="tournaments">
                                    </v-select>
                                </td>
                                <td>{{ index + 1 }}</td>
                                <td>{{ data.event_id }}</td>
                                <td>
                                    <v-select label="event_name" 
                                        v-model="data.event"                                    
                                        v-on:input="setParams($event, index)" 
                                        placeholder="Select Event"
                                        :options="events" 
                                        name="events">
                                    </v-select>
                                </td>
                                <td>{{ data.odd_1 }}</td>
                                <td>{{ data.odd_2 }}</td>
                                <td>{{ data.odd_3 }}</td>
                                <td>{{ data.event_date }}</td>
                                <td>{{ data.event_time }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-md-6"></div>
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
            title: 'Weekly Coupon Management',
            tournaments: [],
            events: [],
            coupons: [], 
            formData:[
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
                {tournament: '', event: '', odd_1: '', odd_2: '', odd_3: '', event_date:'', event_id: '', event_time: ''},
            ]
        }
    },
    head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Weekly Coupon Management')
    },
    methods: {
        setEvent(tournament){
            if(tournament && tournament.id){
                this.$axios.get('/admin/content-management/weekly-coupon/get-events/'+tournament.id).then(res => {
                    this.events = res.data;
                })
            }else{
                console.log(tournament)
            }
        },
        setParams(event, index){
            if(event){
                this.formData[index].event_id = event.event_id;
                this.formData[index].event_time = event.event_time;
                this.formData[index].event_date = event.event_date;
                this.formData[index].odd_1 = this.getOdds(event.markets, 1, '1');
                this.formData[index].odd_2 = this.getOdds(event.markets, 1, 'X');
                this.formData[index].odd_3 = this.getOdds(event.markets, 1, '2');
                // this.formData[index].odd_4 = this.getOdds(event.markets, 7, 'GG');
            }
        },
        getOdds(markets, market_id, odd_name){
            let vm = this;
            let odd = ''
            $.each(markets, function(key, value){
                if(value.market_id === market_id){
                    $.each(value.odds, function(key, item){
                        if(item.name === odd_name){
                            odd = item.odds
                        }
                    });
                }
            })            
            if(odd !== ''){
                return odd;
            }else{
                return '-';
            }
        },
        formatOdd(odd){            
            if(odd % 1 === 0){
                return odd + '.00';
            }else{
                return odd.toFixed(2);
            }
        },
        saveChanges(){
            $('#saveBtn').attr('disabled', true).text('Saving...');                                        
            this.$axios.post('/admin/content-management/weekly-coupon/save-coupon', this.formData).then(res => {
                $('#saveBtn').attr('disabled', false).text('Save');                                        
                if(res.data.success){
                    this.notify({message: 'Saved', title: 'Success', type: 'success'});
                }
            }).catch(error => {
                $('#saveBtn').attr('disabled', false).text('Save');                                                                    
                this.notify({message: error.data.message, title: 'Error', type: 'error'});
            })
        }
    },
    mounted(){
        this.$axios.get('/admin/content-management/weekly-coupon/get-tournaments').then(res => {
            this.tournaments = res.data.tournaments;
            this.coupons = res.data.coupons;
            if(this.coupons.length){
                this.formData = this.coupons;
            }
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