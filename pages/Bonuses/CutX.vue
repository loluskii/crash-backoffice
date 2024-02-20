<template>
  <div>
    <button @click="showModal" class="btn btn-success" style="margin-right: 10px">
      <i class="fa fa-fw fa-plus"></i>
      Add New
    </button>
    <card title="Cut (X) Bonus List">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="bg-grey-100">
          <tr>
            <th>No of Lost Games</th>
            <th>Min. Events</th>
            <th>Min Cum. Odds</th>
            <th>Bonus Type</th>
            <th>Value</th>
            <th>Max Payable</th>
            <th>Min Stake</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(bonus, index) in bonuses" v-if="bonuses.length > 0" :key="index">
            <td>{{bonus.no_lost_games}}</td>
            <td>{{bonus.min_no_events}}</td>
            <td>{{bonus.min_total_odds}}</td>
            <td>{{bonus.bonus_type === 'stake-return' ? 'Stake Return' : '% of Pot. Winning'}}</td>
            <td>{{ bonus.percentage }}%</td>
            <td>{{ bonus.max_payable }}</td>
            <td>{{ bonus.min_stake }}</td>
            <td class="text-nowrap">
              <div class="ui-group-buttons">
                <button @click="showModal(bonus)" class="btn btn-primary">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <div class="or"></div>
                <a href="#" class="btn btn-danger" role="button" @click="deleteBonus($event, bonus.id)">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </a>
              </div>
            </td>
          </tr>
          <tr v-if="!bonuses.length && !loading">
            <td colspan="8" align="center">No record found</td>
          </tr>
          <tr v-if="loading">
            <td colspan="8" class="text-center">
              <i class="fa fa-4x fa-spin fa-spinner"></i>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </card>
    <cut-x-form-modal />
  </div>
</template>
<script>
import card from "../../components/card.vue"
import Bonuses from '../../services/bonuses.js'
import CutXFormModal from "../../components/CutXFormModal";
export default {

    scrollToTop: true,
    name:'pages',
    layout: 'main',
    components:{
      card,
      CutXFormModal
    },
    data(){
      return{
        title: 'CUT (X) Bonus Manager',
        bonuses: [],
        loading: true
      }
    },
    methods:{
      getBonuses() {
        Bonuses.getCutXBonuses().then(res=>{
          this.bonuses = res.data;
          this.loading = false;
        });
      },
      deleteBonus: function deleteBonus(e, id) {
        const self = this;
        self.$swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this item',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete item!',
          cancelButtonText: 'No, keep item'
        }).then(result => {
          if(result.value){
            Bonuses.deleteCutXBonus(id).then((res) => {
              if(res.success){
                $(e.target).closest('tr').remove();
                self.$swal('Deleted!', 'Item has been removed', 'success');
              }
            });
          }
        }, function(dismiss) {

        });
      },
      showModal(bonus = null) {
        this.$nuxt.$emit('show_cut_x_modal', bonus);
      }
    },
    head() {
      return {
        title: this.title
      }
    },
    asyncData ({ store }) {
      store.dispatch('setTitle', 'CUT (X) Bonuses')
    },
    mounted(){
      this.getBonuses()

      this.$nuxt.$on('refresh_bonus_list', () => {
        this.getBonuses();
      })
    }
}
</script>
