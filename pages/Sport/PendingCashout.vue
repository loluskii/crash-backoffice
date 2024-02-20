<template>
  <div >

    <card title="Results" excel="false">
      <div class="table-responsive" >
        <table class="table table-bordered table-striped">
          <thead>
          <tr>
            <th>Betslip ID</th>
            <th>Placed By</th>
            <th>Cashout By</th>
            <th>Selection</th>
            <th>Odds</th>
            <th>Stake</th>
            <th>Pot. Wins</th>
            <th>Cashout Amount</th>
            <th>Date/Time</th>
            <th></th>
          </tr>
          </thead>
          <tbody v-for="(bet, index) in bets" :key="index" v-if="bets.length > 0 && !loading">
          <tr>
            <td>
              <a href="javascript:;" @click="showChild($event, index)">
                {{ bet.betslip_id }}
              </a>
            </td>
            <td>
              <a href="javascript:;">
                {{ bet.user.username }}
              </a>
            </td>
            <td>
              <a href="javascript:;">
                {{ bet.cashout_by.username }}
              </a>
            </td>
            <td>{{ bet.selections_count}} Selection(s)</td>
            <td>{{ bet.odds }}</td>
            <td>{{ formatNumber(bet.stake) }}</td>
            <td>{{ formatNumber(bet.pot_winnings) }}</td>
            <td>{{ formatNumber(bet.cashout_amount) }}</td>
            <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:MM') }}</td>
            <td>
              <button type="button"
                      class="btn btn-sm btn-icon btn-flat btn-danger text-white waves-effect waves-classic"
                      style="color: #757575" @click="updateTicket(bet.id, 'reject')">
                <i class="fa fa-ban" aria-hidden="true"></i>
              </button>
              <button type="button"
                      class="btn btn-sm btn-icon btn-flat btn-success text-white"
                      style="color: #757575" @click="updateTicket(bet.id, 'approve')">
                <i class="fa fa-check" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          <tr :id="index+'_child'" class='d-none'>
            <td colspan="10">
              <bet-details :bet="bet"></bet-details>
            </td>
          </tr>
          </tbody>
        </table>
        <div v-if="!loading && !bets.length" class="text-center nodata mt-2">
          There are no pending cashout bets
        </div>
        <div style="width: 100%" v-if="loading" class="text-center">
          <i class="fa fa-spin fa-spinner fa-3x"></i>
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
              v-on:click.native="loadData(pagination.current_page)"
              :offset="4">
            </paginate>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import Bets from "../../services/bets";
import card from '../../components/card'
import BetDetails from '../../components/BetDetails'
export default {
  name:'pending-cashout',
  layout: 'main',
  components:{
    card,
    BetDetails
  },
  data(){
    return{
      title: 'Pending Cashout Bets',

      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1
      },
      offset: 4,
      bets: [],
      loading: false,
      currency: this.$store.state.currencySymbol,
    }
  },
  methods:{
    loadData(page){
      this.loading = true
      Bets.getPendingCashout(page).then(res=>{
        this.loading = false;
        this.bets = res.bets.data;
        this.pagination = res.bets;
      }).catch(err => {
        this.$toast.error('An error occured',{icon: 'times'})
      })
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
    updateTicket(id, action){
      const self = this;
      self.$swal({
        title: 'Are you sure?',
        // text: 'You will not be able to recover this item',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No'
      }).then(function(result) {
        if (result.value) {
          Bets.updateCashoutStatus(id, action).then(res => {
            if (res.success) {
              self.loadData(self.pagination.current_page);
            } else {
              this.$toast.error('An error occured',{icon: 'times'})
            }
          })
        }
      }, function(dismiss) {

      })
    },
  },
  mounted() {
    this.loadData(1);
  },
  head () {
    return {
      title: this.title
    }
  },
  asyncData ({ store }) {
    store.dispatch('setTitle', 'Pending Cashout Bets')
  },
}
</script>
