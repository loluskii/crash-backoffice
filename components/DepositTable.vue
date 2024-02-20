<template>
    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>Created Date</th>
                <th>Last Updated Date</th>
                <th>TransactionID</th>
                <th>Payment Method</th>
                <th>Bank</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Amount</th>
                <th>Transaction Note</th>
                <th>Status</th>
                <th>Client Type</th>
                <th>Handled by</th>
                <th>Action</th>
                <th>Approve</th>
                <th>Decline Reason</th>
                <th>Review Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(deposit, index) in deposits" :key="index" v-if="deposits.length > 0"
                :class="{'bg-success':deposit.status=='Confirmed', 'bg-danger':deposit.status=='Declined'}">
                <td>{{ formatDate(deposit.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                <td>{{deposit.updated_at }}</td>
                <td>{{deposit.reference_no }}</td>
                <td>{{deposit.payment_method }}</td>
                <td></td>
                <td>
                    <a href="#" style="color:#000; text-decoration:underline;font-weight:bold">{{deposit.to_user }}</a>
                </td>
                <td></td>
                <td>{{ formatNumber(deposit.amount) }}</td>
                <td></td>
                <td>{{ deposit.status }}</td>
                <td>{{ deposit.channel }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        props:[
            'deposits',
        ],
        data(){
            return{
                currency: this.$store.state.currencySymbol,
            }
        },
        methods:{
            formatNumber(number){
                return this.numberFormat(this.currency, number)
            },
        }
    }
</script>
