<template>
    <div>
        <table class="table table-bordered table-striped">
            <thead class="bg-grey-100">
                <tr>
                    <th>Date Requested</th>
                    <th>Username</th>
                    <th class="">Name on file</th>
                    <th>Amount</th>
                    <th>Acct. No.</th>
                    <th class="">Acct. Name</th>
                    <th class="">Bank</th>
                    <th class="">Updated By</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(payout, i) in payouts" v-if="payouts.length" :key="i">
                    <td>{{ formatDate(payout.created_at, 'DD/MM/YYYY HH:mm')}}</td>
                    <td>
                    <router-link :to="'/PlayerManagement/PlayerInfo/'+payout.user_id" v-if="payout.name === 'Player'">
                        {{payout.username}}
                    </router-link>
                    <router-link :to="'/Network/Agent/'+payout.user_id" v-else>
                        {{payout.username}}
                    </router-link>
                    </td>
                    <td class="">{{ (payout.user && payout.user.details)?payout.user.details.first_name+' '+payout.user.details.last_name : '' }}</td>
                    <td><span class="ml-5">{{ formatNumber(payout.amount) }}</span></td>
                    <td>{{payout.account_number}}</td>
                    <td class="">{{payout.account_holder}}</td>
                    <td class="">{{(payout.bank) ? payout.bank.name: ' - '}}</td>
                    <td>{{ payout.updater ? payout.updater.details.first_name+' '+ payout.updater.details.last_name: '-' }}</td>
                    <td>
                    <span class="badge badge-danger" v-if="payout.status == 2">Rejected</span>
                    <span class="badge badge-success" v-if="payout.status == 1">Approved</span>
                    <span class="badge badge-warning" v-if="payout.status == 0">Pending</span>
                    </td>
                    <td class="text-nowrap">
                        <button type="button"
                        class="btn btn-sm btn-icon btn-flat btn-success waves-effect waves-classic"
                        style="color: #000"
                        data-toggle="tooltip"
                        data-original-title="Edit" v-if="payout.status === 0" @click="updateStatus(payout.id, 'approve')">
                        <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                        <button type="button" v-if="payout.status === 0"
                        class="btn btn-sm btn-icon btn-flat btn-danger waves-effect waves-classic" style="color: #000"
                        data-toggle="tooltip" data-original-title="close" @click="rejectRequest(payout.id)">
                        <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-modal title="Leave a Comment" @cancel="cancelReject" ref="rejectModal" @ok="updateStatus(id, 'reject')" :no-close-on-backdrop="true">
            <form @submit.prevent="updateStatus(id, 'reject')" id="rejectRequestForm">

                <div class="form-group">
                    <textarea name="name" v-model="comment" rows="8" style="width: 100%"></textarea>
                </div>

            </form>
        </b-modal>
    </div>

</template>
<script>
import Player from '../services/players.js'
    export default {
        props:[
            'payouts',
        ],
        data(){
            return {
                id: '',
                comment: '',
                currency: this.$store.state.currencySymbol,
            }
        },
        methods:{
            rejectRequest(id){
                this.$refs.rejectModal.show();
                this.id = id
            },
            cancelReject(){
                this.$refs.rejectModal.hide();
                this.comment = ''
            },
            updateStatus: function updateStatus(id, action) {
                var self = this;
                let data = {
                        id: id,
                        action: action,
                        comment: this.comment
                    }
                if(action == 'reject'){
                    this.cancelReject()
                }
                self.$swal({
                    title: 'Are you sure?',
                    // text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No'
                }).then((result) => {
                  if (result.value) {
                    Player.updateWithdrawalStatus(data).then(res=>{
                        if(res.success){
                            self.$swal('Success!', 'Request has been updated', 'success');
                            self.$nuxt.$emit('withdrawal_update')
                        }else{
                            self.$swal('Error!', 'Unable to carry out operation', 'error');
                        }
                    })
                  }
                }, function(dismiss) {

                })
            },
            formatNumber(number){
                return this.numberFormat(this.currency, number)
            },
        }
    }
</script>
