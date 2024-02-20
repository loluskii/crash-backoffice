<template>
    <div>
       <form id="single-stop" @submit.prevent="getResults(1)">

            <div class="row m-t-10">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Country</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">State</option>
                    </select>
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <input type="text" class="form-control" id="pref-Air" placeholder="Username">
                </div>
                <br class="d-sm-none">
                <div class="col-sm-2">
                    <select name="class" id="class-type" class="form-control">
                        <option value="">Client Type</option>
                    </select>
                </div>
                <div class="col-sm-1">
                    <button class="btn btn-info btn-block">Search</button>
                </div>
                <div class="col-sm-3">
                    <a href="#">clear all filters</a>
                </div>
            </div>
        </form>
        <hr style="border: 2px solid #eee">

        <card title="Results" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Date Joined</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Balance</th>
                            <th>Bonuses</th>
                            <th>Lifetime Deposits</th>
                            <th>Lifetime Withdrawals</th>
                            <th>Open Bets</th>
                            <th>Verified</th>
                            <th>Status</th>
                            <th>Quick Actions</th>
                        </tr>
                    </thead>
                    <tbody v-if="!loading && players.length" v-for="(player, index) in players" :key="index">
                        <tr>
                            <td>
                                <i class="fa fa-caret-right mr-3" style="cursor: pointer"></i>
                                <router-link :to="'/PlayerManagement/PlayerInfo/'+player.user_id" >{{player.username}}</router-link>
                            </td>
                            <td>{{ formatDate(player.created_at, 'DD/MM/YYYY')}}</td>
                            <td>{{ player.email}}</td>
                            <td>{{ player.phone_number }}</td>
                            <td>{{ formatNumber(player.available_balance) }}</td>
                            <td>{{ formatNumber(player.bonus_balance) }}</td>
                            <td>0.00</td>
                            <td>0.00</td>
                            <td>0</td>
                            <td>
                              <span v-if="player.verified === 0" class="text-danger">No</span>
                              <span v-if="player.verified === 1" class="text-success">Yes</span>
                            </td>
                            <td>
                              <span v-if="player.status === 0" class="text-warning">Pending</span>
                              <span v-if="player.status === 1" class="text-success">Active</span>
                              <span v-if="player.status === 2" class="text-info">Frozen</span>
                              <span v-if="player.status === 3" class="text-danger">Terminated</span>
                            </td>
                            <td>
                                <b-dd class="btn" variant="primary">
                                    <template slot="button-content"><i class="ti-settings"></i>
                                    </template>
                                    <b-dropdown-item class="content-header" @click="showModal('password_modal', player.user_id)">
                                        Change Password
                                    </b-dropdown-item>
                                    <b-dropdown-item class="content-header" @click="showModal('deposit_modal', player.user_id)">
                                        Manual Deposit
                                    </b-dropdown-item>
                                    <b-dropdown-item class="content-header" @click="showModal('withdrawal_modal', player.user_id)">
                                        Manual Withdrawal
                                    </b-dropdown-item>
                                    <b-dropdown-item class="content-header" @click="showModal('edit_user_modal', player)">
                                        Edit Information
                                    </b-dropdown-item>
                                    <b-dropdown-item v-if="player.status !== 1" class="content-header" @click="updateStatus('Activate', 1, player.user_id)">
                                      Activate Account
                                    </b-dropdown-item>
                                    <b-dropdown-item v-if="player.verified !== 1" class="content-header" @click="verifyAccount(player.user_id)">
                                      Verify Account
                                    </b-dropdown-item>
                                    <b-dropdown-item  v-if="player.status == 1" class="content-header" @click="updateStatus('Freeze',2, player.user_id)">
                                        Freeze Account
                                    </b-dropdown-item>
                                    <b-dropdown-item class="content-header" @click="showModal('give_bonus', player.user_id)">
                                        Give Bonus
                                    </b-dropdown-item>
                                    <b-dropdown-item v-if="player.status == 1" class="content-header" @click="updateStatus('Terminate',3, player.user_id)">
                                        Terminate Account
                                    </b-dropdown-item>

                                </b-dd>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div v-if="!loading && !players.length" class="text-center nodata">
                    <h5>No data</h5>
                </div>
                <div style="width: 100%" v-if="loading" class="text-center">
                    <i class="fa fa-spin fa-spinner fa-4x"></i>
                </div>
            </div>
            <div class="row mt-3">
                <!-- <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">Showing 1 to 10 of 40 entries</div>
                </div> -->
                <div class="col-sm-12 col-md-7">

                    <div class="dataTables_paginate paging_simple_numbers pull-right" id="sample_1_paginate">
                        <paginate
                            v-bind:pagination="pagination"
                            v-on:click.native="getResults(pagination.current_page)"
                            :offset="4">
                        </paginate>

                    </div>
                </div>
            </div>
        </card>
        <change-password></change-password>
        <manual-deposit></manual-deposit>
        <manual-withdrawal></manual-withdrawal>
        <give-bonus />
        <edit-user-modal />

    </div>
</template>
<script>
import card from "../../components/card.vue"
import ChangePassword from "../../components/ChangePassword"
import ManualDeposit from "../../components/ManualDeposit"
import ManualWithdrawal from "../../components/ManualWithdrawal"
import Players from '../../services/players.js'
import GiveBonus from "../../components/GiveBonusModal"
import EditUserModal from '../../components/EditUserModal.vue'

    export default {
        name:'playersearch',
        layout: 'main',
        components:{
            card,
            ChangePassword,
            ManualDeposit,
            ManualWithdrawal,
            GiveBonus,
            EditUserModal
        },
        data(){
            return{
                title: 'Online Players Report',
                players: [],
                filterData:{
                    country_id: '',
                    state_id: '',
                    username: '',
                    client_type:  '',
                    // to:  this.$moment().format('DD-MM-YYYY 00:00'),
                    status: 'all',
                    group_by: 'player'
                },
                loading: false,
                currency: this.$store.state.currencySymbol,
                pagination: {
                    total: 0,
                    per_page: 2,
                    from: 1,
                    to: 0,
                    current_page: 1
                },
            }
        },
        methods:{

          getResults(page){
              this.loading = true;
              Players.playersReport(this.filterData, page).then(res => {
                  this.players = res.data;
                  this.pagination = res;
                  this.loading = false;
              })
          },
          updateStatus(title, status, id) {
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
                  Players.updatePlayerStatus(id, status).then(res => {
                    if (res.success) {
                      self.getResults(self.pagination.current_page);
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
          },
          verifyAccount(id) {
            var self = this;
            self.$swal({
                // title: 'Are you sure?',
                text: `Are you sure you want to verify this account?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes!',
                cancelButtonText: 'No'
            }).then((result)=> {
                if (result.value) {
                  self.loading = true;
                  Players.verifyAccount(id).then(res => {
                    if (res.success) {
                      self.getResults(self.pagination.current_page);
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
          },
          showModal(modal, data){
            if (modal === 'edit_user_modal') {
              data.user = {
                email: data.email,
                username: data.username,
                role_id: data.role_id
              };
            }
            this.$nuxt.$emit(modal, data);
          }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Online Players Report')
        },
        mounted(){
            this.getResults(1);
            $('.dropdown').on('show.bs.dropdown', function () {
                console.log('visible')
                $('body').append($('.dropdown').css({
                    position:'absolute',
                    left:$('.dropdown').offset().left,
                    top:$('.dropdown').offset().top
                }).detach());
            });

            $('.dropdown').on('hidden.bs.dropdown', function () {
                $('.bs-example').append($('.dropdown').css({
                    position:false, left:false, top:false
                }).detach());
            });
        }
    }
</script>
<style scoped>
    .card-header{
        padding: 5px 10px;
    }
</style>

<style>
.nodata{
    width: 100%;
    height: 50px;
}
</style>
