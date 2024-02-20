<template>
  <div>
    <b-tabs ref="tabs">
      <b-tab title="Market Grouping" ref="groupTab" active class="template-list" style="padding: 20px" title-link-class="template-list-link">
        <market-groups :sports="sports" :loading="loading"></market-groups>
      </b-tab>
      <!-- <b-tab title="Market Groups" ref="marketType" class="template-list" style="padding: 20px" title-link-class="template-list-link">
        <market-types :sports="sports" :loading="loading"></market-types>
      </b-tab> -->
      <b-tab title="Markets" ref="marketsTab" class="template-list" title-link-class="template-list-link" style="padding: 20px" >
        <markets :sports="sports" :loading="loading"></markets>
      </b-tab>
      <b-tab title="Market Setting" ref="marketsTab" class="template-list" title-link-class="template-list-link" style="padding: 20px" >
        <market-tournament></market-tournament>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Markets from "../../components/markets/Markets.vue"
import MarketGroups from "../../components/markets/MarketGroups.vue"
import MarketTournament from "../../components/markets/MarketTournament.vue"
// import MarketTypes from "../../components/markets/MarketTypes.vue"
export default {
    layout: 'main',
    components:{
      Markets,
      MarketGroups,
      // MarketTypes,
      MarketTournament
    },
    data(){
      return{
        title: 'Markets Manager',
        sports:[],
        loading: true
      }
    },
   head () {
        return {
            title: this.title
        }
    },
    mounted() {
      this.$axios.get('/admin/content-management/markets').then(res => {
        this.loading = false;
        this.sports = res.data.sports;
      });
      this.$nuxt.$on('MARKET_SAVED', (sports) => {
          // this.listSports();
          this.sports = sports
      });
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Markets Manager');
    },
}
</script>
