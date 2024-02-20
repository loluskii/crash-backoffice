<template>
    <div id="tab-general" class="tab-pane animated fadeInRight  active">
        <card title="<i class='ti-user'></i> General Details">
            <table class="table table-bordered">
                <tr>
                    <td>{{user_data.user.username}}</td>
                    <td><i class="fa fa-map-marker"></i> {{ displayLocation(user_data)}}</td>
                    <td><i class="fa fa-birthday-cake"></i> {{ (user_data.date_of_birth) ? formatDate(user_data.date_of_birth, 'DD/MM/YYYY') +' '+displayDate(user_data.date_of_birth, 'years')+ ' years old' : ''}}</td>
                </tr>
                <tr>
                    <td><i class="fa fa-phone"></i>{{ user_data.phone_number }}</td>
                    <td>{{ user_data.gender }}</td>
                </tr>
            </table>
        </card>
        <card title="<i class='fa fa-address-book'></i> Activity">
            <table class="table table-bordered mt-3" style="width: 70%">
                <tr>
                    <td>Registration Date:</td>
                    <td>{{ formatDate(user_data.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                    <td>{{ displayDate(user_data.user.created_at, 'days') +' days since registration' }}</td>
                </tr>
                 <tr>
                    <td>Last Login Date:</td>
                    <td>{{ (login) ? formatDate(login.created_at, 'DD/MM/YYYY HH:mm:ss') : '-'}}</td>
                    <td>({{ (login) ? login.login_ip : '-' }})</td>
                </tr>
                <tr>
                    <td>Last Deposit:</td>
                    <td>{{ (deposit) ? formatDate(deposit.created_at, 'DD/MM/YYYY HH:mm:ss') : ' - ' }}</td>
                    <td>({{ (deposit) ? formatNumber(deposit.amount) : ''}})</td>
                </tr>
                <tr>
                    <td>Last Withdrawal:</td>
                    <td>{{ (withdrawal) ? formatDate(withdrawal.created_at, 'DD/MM/YYYY HH:mm:ss') : '-' }}</td>
                    <td>{{ (withdrawal) ? formatNumber(withdrawal.amount) : '-' }}</td>
                </tr>
                <tr>
                    <td>Last Bonus:</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
            </table>
            <table class="table table-bordered mt-3">
                <thead>
                    <th></th>
                    <th>Sport</th>
                </thead>
                <tbody>
                    <tr>
                        <td>First Activity Date</td>
                        <td>{{ (first_activity) ? formatDate(first_activity.created_at, 'DD/MM/YYYY HH:mm:ss')+' ('+ displayDate(first_activity.created_at, 'days') + ' days ago)' : ' - '}}</td>
                    </tr>
                    <tr>
                        <td>Last Activity Date</td>
                        <td>{{ (last_activity) ? formatDate(last_activity.created_a, 'DD/MM/YYYY HH:mm:ss')+' ('+ displayDate(last_activity.created_at, 'days') + ' days ago)' : '-'}}</td>
                    </tr>
                </tbody>
            </table>
        </card>
        <card title="<i class='ti-wallet'></i> Financial" >
            <div class="table-responsive">
                <table class="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Deposit</th>
                            <th>Withdrawals</th>
                            <th>Pending Withdrawals</th>
                            <th>Netcash</th>
                            <th>%Netcash/Deposit</th>
                            <th>%Bonus/Deposit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ total_deposit}}</td>
                            <td>{{ total_withdrawal}}</td>
                            <td>{{ pending_withdrawal}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th># of Deposits</th>
                            <th># of Withdrawals</th>
                            <th>AVG Withdrawal Amount</th>
                            <th># of Bonus Given</th>
                            <th>AVG Bonus Given Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ deposits }}</td>
                            <td>{{ withdrawals }}</td>
                            <td>{{ avg_withdrawal }}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>
</template>
<script>
    import Card from '../card.vue'
    export default {
        components:{
            Card
        },
        props:[
            'user_data',
            'login',
            'deposit',
            'total_deposit',
            'total_withdrawal',
            'pending_withdrawal',
            'withdrawal',
            'first_activity',
            'last_activity',
            'deposits',
            'withdrawals',
            'avg_withdrawal'
        ],
        data(){
            return{
                currency: this.$store.state.currencySymbol,

            }
        },
        methods:{
            formatNumber(number){
                return this.currency+''+parseFloat(number).toLocaleString()
            },
            formatDate(date, format){
                return this.$moment(date).format(format);
            },
            displayDate(dob, type){
                return this.$moment().diff(dob,type)
            },
            displayLocation(data){
                let state = (data.state) ? data.state.name : '';
                let country = (data.country) ? data.country.name : '';
                return data.address+', '+state+', '+country
            }
        }
    }
</script>
