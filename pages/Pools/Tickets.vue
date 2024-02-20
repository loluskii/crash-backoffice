<template>
    <div>
      <div class="table-responsive" >
        <table class="table table-bordered table-striped">
          <thead>
          <tr>
            <th>Coupon No</th>
            <th>Placed on</th>
            <th>By</th>
            <th>Stake</th>
            <th>Games</th>
            <th>Game Type</th>
            <th>Status</th>
            <th>Bet Settled Date & Time</th>
            <th></th>
          </tr>
          </thead>
          <tbody v-for="(bet, index) in bets" :key="index" v-if="bets.length > 0">
          <tr>
            <td>
              <a href="javascript:;">
                {{ bet.coupon_no }}
              </a>
            </td>
            <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
            <td>
              <span v-if="bet.user">
                <nuxt-link :to="'/PlayerManagement/PlayerInfo/'+bet.user.id" v-if="bet.user.role_id !== 4">
                  {{bet.user.username}}
                </nuxt-link>
                <nuxt-link :to="'/Network/Agent/'+bet.user.id" v-if="bet.user.role_id === 4">
                  {{bet.user.username}}
                </nuxt-link>
              </span>
              <span v-else>{{bet.user_id}}</span>
            </td>
            <td>{{ formatNumber(bet.stake) }}</td>
            <td>{{ bet.games }}</td>
            <td>{{ bet.game_type }}</td>
            <td :class="setClass(bet.status)">{{ getStatus(bet.status) }}</td>
            <td>{{ bet.settled_at }}</td>
            <td>
              <button
                type="button" v-permission="'Cancel Ticket'"
                class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                style="color: #757575" v-if="bet.status !== 2" @click="updateTicket(bet.id, 'lost')"
              >
                <i class="fa fa-times" aria-hidden="true"></i>
              </button>
              <button
                type="button" v-permission="'Void Ticket'"
                class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                style="color: #757575" v-if="bet.status !== 3" @click="updateTicket(bet.id, 'void')"
              >
                <i class="fa fa-ban" aria-hidden="true"></i>
              </button>
              <button
                type="button" v-permission="'Mark as won'"
                class="btn btn-sm btn-icon btn-flat btn-success text-white"
                style="color: #757575" v-if="bet.status !== 1" @click="showWinningModal(bet)"
              >
                <i class="fa fa-check" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="!bets.length" class="text-center nodata">
          <h5>No data</h5>
        </div>
      </div>
      <div class="row mt-3">
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
    </div>
</template>
<script>
import Bets from "../../services/bets";

    export default {
        name:'pool-tickets',
        props: ['bets', 'pagination'],
        methods:{
            getResults(page) {
              this.$nuxt.$emit('pool-tickets', page);
            },
            getStatus(status){
                if(status === 1){
                    return 'Won';
                }else if(status === 2){
                    return 'Lost';
                }else if(status === 3){
                    return 'Cancelled';
                }else {
                  return 'Pending'
                }
            },

            updateTicket(id, action){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    // text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No'
                }).then(function() {
                    Bets.updateTicket(id, action).then(res=>{
                    window.location.reload()
                    })
                }, function(dismiss) {

                })
            },

            deleteTicket(e, id){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete item!',
                    cancelButtonText: 'No, keep item'
                }).then((result)=> {
                    if (result.value) {
                        Bets.delete(id).then(res=>{
                            if(res.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Item has been removed', 'success');
                            }
                        });
                    }
                }, function(dismiss) {

                })
            }
        }
    }
</script>


