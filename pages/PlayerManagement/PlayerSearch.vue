<template>
    <div>
       <form id="single-stop" @submit.prevent="getResults(1)">
            <div class="row m-t-10">
                <div class="col-sm-3 form-inline">
                    <label for="">Smart search</label>
                    <input type="text" class="form-control" id="pref-Air" placeholder="" v-model="filterData.q">
                    <i class="fa fa-info fa-2x ml-1" id="info1"></i>
                     <b-tooltip target="info1" placement="bottom">
                        Search by Customer Code, Name or Username, Email Address, Phone number.
                    </b-tooltip>
                </div>
                <br class="d-sm-none">
            </div>

            <div class="row m-t-10">
                <div class="col-sm-6">
                    <div class="form-group icheck-element">
                        <label class="price-alert">
                            <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                        </label>
                    </div>
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

        <card title="Summary" excel="true">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Username</th>
                            <th>Full Name</th>
                            <th>Player Status</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Registered On</th>
                            <th>Country</th>
                            <th>Currency</th>
                            <th>Verification Status</th>
                            <th>Quick Actions</th>
                        </tr>
                    </thead>
                    <tbody v-if="!loading && players.length" v-for="(player, index) in players" :key="index">
                        <tr>
                            <td>
                                <i class="fa fa-caret-right mr-3" style="cursor: pointer" @click="showChild($event, index)"></i>
                                <router-link :to="'/PlayerManagement/PlayerInfo/'+player.user_id" >{{player.code}}</router-link>
                            </td>
                            <td>{{player.username}}</td>
                            <td>{{player.first_name+' '+player.last_name}}</td>
                            <td>{{(player.status) ? 'Active':'Inactive'}}</td>
                            <td>{{player.email}}</td>
                            <td>{{player.phone_number}}</td>
                            <td>{{ formatDate(player.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                            <td>{{ (player.country) ? player.country.name : ''}}</td>
                            <td>{{ (player.country) ? player.country.currency_code: '' }}</td>
                            <td>{{(player.verified) ? 'Yes':'No'}}</td>
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
                                    <b-dropdown-item v-if="player.status === 1" class="content-header" @click="updateStatus('Activate', 1, player.user_id)">
                                      Activate Account
                                    </b-dropdown-item>
                                    <b-dropdown-item v-if="player.verified !== 1" class="content-header" @click="verifyAccount(player.user_id)">
                                      Verify Account
                                    </b-dropdown-item>
                                    <b-dropdown-item  v-if="player.status === 1" class="content-header" @click="updateStatus('Freeze',2, player.user_id)">
                                        Freeze Account
                                    </b-dropdown-item>
                                    <b-dropdown-item class="content-header" @click="showModal('give_bonus', player.user_id)">
                                        Give Bonus
                                    </b-dropdown-item>
                                    <b-dropdown-item v-if="player.status === 1" class="content-header" @click="updateStatus('Terminate',3, player.user_id)">
                                        Terminate Account
                                    </b-dropdown-item>
                                </b-dd>
                            </td>
                        </tr>
                        <tr :id="index+'_child'" class='d-none'>
                            <td colspan="11">
                                <div class="row p-3">
                                    <div class="col-md-6">
                                        <div class="card">
                                            <div class="card-header bg-info">
                                                <h3 class="card-title text-white">
                                                    Short Summary
                                                </h3>
                                            </div>
                                            <div class="card-body nopadding">
                                                <table class="table table-striped table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>Username</td>
                                                            <td class="text-left">{{ player.username}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Code</td>
                                                            <td class="text-left">{{ player.code}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Full name</td>
                                                            <td class="text-left">{{player.first_name+' '+player.last_name}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Email</td>
                                                            <td class="text-left">{{player.email}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phone Number</td>
                                                            <td class="text-left">{{player.phone_number}}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Status</td>
                                                            <td class="text-left" v-html="getStatus(player)"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Verification Status</td>
                                                            <td class="text-left" v-html="getVerification(player)"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card dash-card">
                                            <div class="card-header bg-info">
                                                <h3 class="card-title text-white">
                                                    Account Data
                                                </h3>
                                            </div>
                                            <div class="card-body nopadding">
                                                <table class="table table-striped table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>Registration Date</td>
                                                            <td>{{ formatDate(player.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Last Login Date</td>
                                                            <td>{{ formatDate(player.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="card dash-card">
                                            <div class="card-header bg-info">
                                                <h3 class="card-title text-white">
                                                    Life Time Casino
                                                </h3>
                                            </div>
                                            <div class="card-body nopadding">
                                                <table class="table table-striped table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>LT Casino GGR</td>
                                                            <td>NGN 8,370.00</td>
                                                        </tr>
                                                        <tr>
                                                            <td>LT Casino Margin (%)</td>
                                                            <td>34%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="card dash-card">
                                            <div class="card-header bg-info">
                                                <h3 class="card-title text-white">
                                                    Life Time Sport
                                                </h3>
                                            </div>
                                            <div class="card-body nopadding">
                                                <table class="table table-striped table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>LT Sport GGR</td>
                                                            <td>NGN 8,370.00</td>
                                                        </tr>
                                                        <tr>
                                                            <td>LT Sport Margin (%)</td>
                                                            <td>34%</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="card dash-card">
                                            <div class="card-header bg-info">
                                                <h3 class="card-title text-white">
                                                    Balance Data
                                                </h3>
                                            </div>
                                            <div class="card-body nopadding">
                                                <table class="table table-striped table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td>Sport Balance</td>
                                                            <td>{{ formatNumber(player.available_balance) }}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Casino Balance</td>
                                                            <td>0.00</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
import GiveBonus from "../../components/GiveBonusModal"
import EditUserModal from '../../components/EditUserModal.vue'


import Players from '../../services/players.js'
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
                title: 'Player Smart Search',
                players: [],
                filterData:{
                    q: '',
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
            getStatus(player){
                return (player.status) ? '<span class="text-success">Active</span>' : '<span class="text-danger">Inactive</span>'
            },
            getVerification(player){
                return (player.verified) ? '<span class="text-success">Yes</span>' : '<span class="text-danger">No</span>'
            },
            showChild(e, index){
                let y = $(e.target).hasClass('fa-caret-right');
                if (y) {
                    $(e.target).removeClass('fa-caret-right')
                    $(e.target).addClass('fa-caret-down')
                }else{
                    $(e.target).removeClass('fa-caret-down')
                    $(e.target).addClass('fa-caret-right')
                }
                $("#"+index+"_child").toggleClass('d-none');
            },
            getResults(page){
                this.loading = true;
                Players.smartSearch(this.filterData, page).then(res => {
                    this.players = res.data;
                    this.pagination = res;
                    this.loading = false
                }).catch(err => {
                    this.loading = false;
                    this.$toast.error('Something went wrong. Unable to retrieve information!',{icon: 'times'})
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
            store.dispatch('setTitle', 'Player Smart Search')
        },
        created(){
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
