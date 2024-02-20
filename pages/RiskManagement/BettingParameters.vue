<template>
  <div class="row">
    <div class="col-md-6">
      <OnlineRiskForm />
    </div>
    <div class="col-md-6">
      <NetworkRiskForm />
    </div>
  </div>
</template>

<script>
import OnlineRiskForm from '../../components/OnlineRiskForm.vue';
import NetworkRiskForm from '../../components/NetworkRiskForm.vue';
export default {
    name:'sports_menu',
    layout: 'main',
    scrollToTop: true,
    components: {
      OnlineRiskForm,
      NetworkRiskForm
    },
    data(){
        return {
            title: 'Betting Parameters',
            loading: true
        }
    },
    head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Betting Parameters');
    },

}
</script>
