<template>
    <div>
        <div class="row mt-2">

            <div class="col-lg-8 masonry-item">
                <card title="Menu Items" :padding="false">
                    <div class="table-responsive">
                      <table class="table table-striped">
                        <thead>
                            <th>Amount</th>
                            <th>Done By</th>
                            <th>Prev Balance</th>
                            <th>Balance</th>
                            <th>Date</th>
                        </thead>
                        <tbody>
                            <tr v-for="(transaction, index) in transactions" :key="index" v-if="transactions.length">
                                <td>{{ formatNumber(transaction.amount) }}</td>
                                <td>{{ transaction.doneby.username }}</td>
                                <td>{{ formatNumber(transaction.prev_balance) }}</td>
                                <td>{{ formatNumber(transaction.balance) }}</td>
                                <td>{{ formatDate(transaction.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                            </tr>
                            <tr v-if="!transactions.length" v-show="!loading">
                                <td colspan="5" class="text-center">
                                    <h4>No record found</h4>
                                </td>
                            </tr>
                            <tr v-if="loading">
                                <td colspan="5" class="text-center">
                                    Loading Please wait....<i class="fa fa-4x fa-spin fa-spinner"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </card>
            </div>
            <!-- End Panel Tickets -->
            <div class="col-lg-4 masonry-item">
            <!-- Panel Subscribe -->
              <card title="Update Balance" :padding="true">
                <form @submit.prevent="doTransfer" id="form">

                    <div class="form-group form-material">
                        <input type="text" name="amount"
                            v-validate="'required'" class="form-control" v-model="transferForm.amount"
                            :class="{'input': true, 'is-danger': errors.has('amount') }"
                            autocomplete="off" placeholder="Amount">
                        <i v-show="errors.has('amount')" class="fa fa-warning text-danger"></i>
                        <span v-show="errors.has('amount')" class="help is-danger text-danger">{{ errors.first('amount') }}</span>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary mr-2" id="transfer">Save</button>
                        <button type="submit" class="btn btn-default" @click="resetTransferForm">Cancel</button>
                    </div>
                  </form>
              </card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'site_menu',
    layout: 'main',
    scrollToTop: true,

    data(){
        return{
            scrollToTop: true,
            transactions:[],
            transferForm: {
                amount: ''
            },
            loading: true,
            currentTab: 'accountForm'
        }
    },
    methods: {
        doTransfer: function doTransfer() {
            this.$validator.validateAll().then((result) => {
                if (result) {

                    $('#transfer').attr('disabled', true);
                    this.$axios.post('/admin/settings/update-balance', this.transferForm).then(res=>{
                        if(res.data.success){
                            $('#transfer').attr('disabled', false);
                            this.$toast.success(res.data.message, {icon: 'check'});
                            this.transactions.push(res.data.data);
                        }else{
                            $('#transfer').attr('disabled', false);
                            this.$toast.error(res.data.message, {icon: 'times'})
                        }
                        this.resetTransferForm();
                    }).catch(err => {
                        $('#transfer').attr('disabled', false);
                        this.$toast.error('An error occured',{icon: 'times'})
                    });
                }
            }).catch(err => {
                $('#transfer').attr('disabled', false);
                this.$toast.error('An error occured',{icon: 'times'})
            });
        },
        resetTransferForm(){
            this.transferForm = {
                amount: ''
            }
        }
    },
    mounted: function mounted() {
        this.$axios.get('/admin/settings/get-balance-report').then(res => {
            this.loading = false;
            this.transactions = res.data.data.data;
        });
    },
    head () {
        return {
            title: 'Operations Account & Transfers'
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Operations Account & Transfers')
    },
}
</script>

<style lang="css">
</style>
