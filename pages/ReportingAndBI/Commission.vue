<template>
    <div>
      <b-tabs ref="tabs">
        <b-tab title="Commissions" active class="template-list" title-link-class="template-list-link">
          <commissions-report />
        </b-tab>
        <b-tab title="Paid Commissions" class="template-list" title-link-class="template-list-link">
          <PaidCommissions />
        </b-tab>
        <b-tab title="Bonus Commissions" class="template-list" title-link-class="template-list-link">

        </b-tab>
      </b-tabs>
      <ViewCommissionProfile />
    </div>
</template>
<script>
import ViewCommissionProfile from '../../components/commissions/ViewCommissionProfile.vue'
import CommissionsReport from '../../components/commissions/CommissionReports.vue'
import PaidCommissions from '../../components/commissions/PaidCommissions.vue'
export default {
    name: 'bonuse-on-tickets',
    layout: 'main',
    components: {
      ViewCommissionProfile,
      CommissionsReport,
      PaidCommissions
    },
    data(){

    },
    head(){
        return{
            title: 'Commissions Report'
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Commissions Report');
    },
}
</script>

<style scoped>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
input.form-control{
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid #ced4da !important;
}
</style>
