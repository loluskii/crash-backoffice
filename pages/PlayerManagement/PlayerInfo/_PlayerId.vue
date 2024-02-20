<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card " v-if="data">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile_user">
                                    <h3 class="user_name_max">
                                        {{ data.first_name+' '+data.last_name}}
                                        <b-dd class="btn" variant="primary">
                                            <template slot="button-content"><i class="ti-settings"></i></template>
                                            <b-dropdown-item class="content-header" @click="showPasswordModal(data.user_id)">
                                                Change Password
                                            </b-dropdown-item>
                                            <b-dropdown-item
                                              v-permission="'Manual Deposit'"
                                              class="content-header" @click="showModal('deposit_modal', data.user_id)">
                                                Manual Deposit
                                            </b-dropdown-item>
                                            <b-dropdown-item
                                              v-permission="'Manual Withdrawal'"
                                              class="content-header"
                                              @click="showModal('withdrawal_modal', data.user_id)">
                                                Manual Withdrawal
                                            </b-dropdown-item>
                                            <b-dropdown-item
                                              v-permission="'Freeze Account'"
                                              class="content-header" @click="updateStatus($event,2)">
                                                Freeze Account
                                            </b-dropdown-item>
                                          <b-dropdown-item
                                            v-permission="'Give Bonus'"
                                            class="content-header" @click="showModal('give_bonus', data.user_id)">
                                                Give Bonus
                                            </b-dropdown-item>
                                          <b-dropdown-item
                                            v-permission="'Terminate Account'"
                                            class="content-header" @click="updateStatus($event,3)">
                                                Terminate Account
                                            </b-dropdown-item>
                                        </b-dd>
                                      <i class="fa fa-spinner fa-spin" v-if="loading"></i>
                                    </h3>
                                    <p v-html="(data.country) ? data.country.name : '' +' | Registered: <strong>'+ formatDate(data.user.created_at, 'DD/MM/YYYY') +'</strong> via <strong>Web</strong>'"></p>
                                    <hr>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td class="">Deposit:</td>
                                                <td class="">
                                                    <strong class="text-success">{{ formatNumber(total_deposit)}}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="">Withdrawals:</td>
                                                <td class="">
                                                    <strong class="text-danger">{{formatNumber(total_withdrawal)}}</strong>
                                                </td>
                                            </tr>
                                            <tr class="">
                                                <td class="detailsTitle cellLikeBtn">Pending Withdrawals:</td>
                                                <td class=" ">
                                                    <strong class="text-danger"> {{ formatNumber(pending_withdrawal)}}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <br/>
                                <div class="card card-widget card-default">
                                    <div class="card-header  bg-primary">
                                        <span class="card-title">  Balance </span>
                                    </div>
                                    <div class="card-body nopadding table-responsive">
                                        <table class="table table-bordered table-responsive">
                                            <thead>
                                                <tr>
                                                    <th style="width:2%">&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                    <th>Real</th>
                                                    <th>Bonus</th>
                                                    <!-- <th>Locked Balance</th> -->
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <table>
                                                <tr>
                                                    <td>Sport</td>
                                                    <td>{{ formatNumber(data.user.available_balance)}}</td>
                                                    <td>{{ formatNumber(data.user.bonus_balance)}}</td>
                                                    <!-- <td>N0.00</td> -->
                                                    <td>{{ formatNumber(parseFloat(data.user.available_balance) + parseFloat(data.user.bonus_balance || 0))}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Casino</td>
                                                    <td>N0.00</td>
                                                    <td>N0.00</td>
                                                    <!-- <td>N0.00</td> -->
                                                    <td>N0.00</td>
                                                </tr>
                                            </table>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <b-tabs ref="tabs" class="profile-tabs">
                                            <b-tab title="General" active>
                                                <general
                                                :user_data="data" :login="last_login" :deposit="deposit"
                                                :total_deposit="total_deposit" :total_withdrawal="total_withdrawal" :pending_withdrawal="pending_withdrawal"
                                                :withdrawal="withdrawal" :first_activity="first_activity" :last_activity="last_activity"
                                                :deposits="deposits" :withdrawals="withdrawals" :avg_withdrawal="avg_withdrawal"></general>
                                            </b-tab>
                                            <b-tab title="Transactions">
                                                <transactions :id="player_id" :user="data.user"></transactions>
                                            </b-tab>
                                            <b-tab title="Gaming Activity">
                                                <gaming-activity :id="player_id"></gaming-activity>
                                            </b-tab>
                                            <b-tab title="Sport">
                                                <sport :id="player_id"></sport>
                                            </b-tab>
                                            <b-tab title="Edit Details">
                                                <edit-user :data="data"></edit-user>
                                            </b-tab>
                                            <b-tab title="Logins">
                                                <logins :user="data.user"></logins>
                                            </b-tab>
                                            <b-tab title="Betting Parameters">
                                              <betting-parameters :user_id="player_id" />
                                            </b-tab>
                                        </b-tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <change-password></change-password>
        <manual-deposit></manual-deposit>
        <manual-withdrawal></manual-withdrawal>
        <give-bonus />
    </div>
</template>
<script>
    import Player from '../../../services/players'
    import Card from '../../../components/card.vue'
    import General from '../../../components/player-info/general.vue'
    import Transactions from '../../../components/player-info/transactions.vue'
    import GamingActivity from '../../../components/player-info/gaming-activity.vue'
    import Sport from '../../../components/player-info/sport.vue'
    import EditUser from '../../../components/player-info/edit.vue'
    import Logins from '../../../components/player-info/logins.vue'
    import BettingParameters from '../../../components/player-info/betting-parameters.vue'
    import ChangePassword from "../../../components/ChangePassword"
    import ManualDeposit from "../../../components/ManualDeposit"
    import ManualWithdrawal from "../../../components/ManualWithdrawal"
    import GiveBonus from "../../../components/GiveBonusModal"
export default {
    name: "user_profile",
    layout: 'main',
    components:{
        Card,
        General,
        Transactions,
        GamingActivity,
        Sport,
        EditUser,
        Logins,
        BettingParameters,
        ChangePassword,
        ManualDeposit,
        ManualWithdrawal,
        GiveBonus
    },
    data(){
        return{
            data: '',
            title: '',
            last_login: '',
            total_deposit: 0.00,
            total_withdrawal: 0.00,
            pending_withdrawal: 0.00,
            deposit: '',
            withdrawal: '',
            first_activity: '',
            last_activity: '',
            deposits: 0,
            withdrawals: 0,
            avg_withdrawal: 0,
            currency: this.$store.state.currencySymbol,
            player_id: this.$route.params.PlayerId,
            loading: false,
        }
    },
    methods: {
        formatDate(date, format){
            return this.$moment(date).format(format);
        },
        showPasswordModal(user){
            this.$nuxt.$emit('password_modal', user);
        },
        showModal(modal, user){
            this.$nuxt.$emit(modal, user);
        },
        updateStatus(title, status) {
          var self = this;
          self.$swal({
              // title: 'Are you sure?',
              text: `Are you sure you want to ${title} this account?`,
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes!',
              cancelButtonText: 'No'
          }).then((result)=> {
              if (result.value) {
                self.loading = true;
                Player.updatePlayerStatus(self.player_id, status).then(res => {
                  self.loading = false;
                  if (res.success) {
                    self.$swal('Success!', 'Successful', 'success');
                  } else {
                    self.$swal('Error!', 'Something went wrong: ' + res.message, 'error');
                  }
                }).catch(e => {
                  self.loading = false;
                  self.$swal('Error!', 'Something went wrong: ' + err.response.data.message, 'error');
                })
              }
          }, function(dismiss) {

          })
        }
    },
    mounted: function() {
        // this.player_id = this.$route.params.PlayerId;
        if (this.player_id !== undefined) {
            Player.getPlayerData(this.player_id).then(res => {
                this.data = res.user
                this.total_deposit = res.total_deposit;
                this.total_withdrawal = res.total_withdrawal;
                this.pending_withdrawal = res.pending_withdrawal;
                this.last_login = res.last_login;
                this.deposit = res.last_deposit;
                this.withdrawal = res.last_withdrawal;
                this.first_activity = res.first_activity;
                this.last_activity = res.last_activity;
                this.avg_withdrawal = res.avg_withdrawal;
                this.deposits = res.deposits;
                this.withdrawals = res.withdrawals
                this.title = res.user.first_name+ ' '+res.user.last_name;
            });
        }
    },
    head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Player Account')
    },
}
</script>
<style src="simple-line-icons/css/simple-line-icons.css"></style>
<style src="../../../assets/css/custom_css/user_profile.css" scoped></style>
<style>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
.hide {
  display: none
}
</style>
