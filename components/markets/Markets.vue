<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <v-select
            label="name"
            v-model="sport"
            v-on:input="setGroups"
            placeholder="Select Sports"
            :options="sports" name="sport">
        </v-select>
      </div>
        <div class="col-md-6">
          <v-select
            label="name"
            v-model="group"
            v-on:input="setMarkets"
            placeholder="Select Market Group"
            :options="groups" name="group">
        </v-select>
        </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-8">
        <card :title="'Available Markets in ' + group.name" excel="true">

          <table class="table table-bordered table-striped table-ellipsis">
            <thead class="bg-grey-100">
              <tr>
                <th width="20%">Name</th>
                <th>Description</th>
                <th width="20%"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if=" markets.length > 0 && !loading" v-for="market in markets" :key="market.sno">
                <td width="20%">{{market.name}}</td>
                <td>{{market.description}}</td>
                <td width="20%">
                  <a href="javascript:;" @click="editMarket(market)">Edit</a> | <a href="javascript:;" @click="editOutcomes(market)">Manage Outcomes</a>
                </td>
              </tr>
              <tr align="center" v-if="!markets.length">
                <td colspan="3">Please select a sport to display markets</td>
              </tr>
            </tbody>
          </table>
      </card>
      </div>
      <div class="col-md-4">
       <card title="Add/Edit Market" :padding="true">
        <market-form :sports="sports"></market-form>
       </card>
      </div>
    </div>
    <edit-outcomes></edit-outcomes>
  </div>
</template>

<script>
import MarketForm from "./market-form.vue"
import EditOutcomes from "./EditOutcomes.vue"
import CMS from '../../services/cms.js'

export default {
    components:{
      EditOutcomes,
      MarketForm
    },
    props:[
        'sports',
        'loading'
    ],
  data(){
    return {
      markets: [],
      groups: [],
      sport: {},
      group: {}
    }
  },
  methods: {
      editMarket(market){
        const group = this.groups.filter(group => group.id === market.market_group_id)
        // const marketType = this.sport.market_types.filter(type => type.provider_id === market.market_type_id)
        this.$nuxt.$emit('EDITMARKET', market, this.sport, group[0]);
      },
      deleteMarket(e, id){
          var self = this;
          self.$swal({
              title: 'Are you sure?',
              text: 'You will not be able to recover this market',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, delete item!',
              cancelButtonText: 'No, keep item'
          }).then((result)=> {
              if (result.value) {
                  CMS.deleteMarket(id).then((res) => {
                      if(res.success){
                          $(e.target).closest('li').remove();
                          self.$swal('Deleted!', 'Market has been removed', 'success');
                      }else{
                          self.$swal('Error!', msg, 'error');
                      }
                  });
              }else{

              }
          })
      },
      editOutcomes(market){
        this.$nuxt.$emit('edit_outcomes', market);
      },
      setGroups(e){
        this.groups = e.market_groups
        this.markets = e.markets
        this.sport = e;
      },
      setMarkets(e){
        console.log(e);
        if(e.markets) {
          this.markets = e.markets
          this.group = e;
        } else {
          this.markets = this.sport.markets;
        }
      }
  },
}
</script>
<style>
table.table-ellipsis {
  table-layout: fixed;
}
.table-ellipsis td  {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: auto;
}
</style>
