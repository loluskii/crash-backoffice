<template>
    <div class="mt-4">
        <b-tabs ref="tabs">
            <b-tab title="Web Settings" active class="template-list" title-link-class="template-list-link">
                <web-settings></web-settings>
            </b-tab>
            <b-tab title="Shop Settings" class="setup-form" title-link-class="setup-form-link">
                <shop-settings></shop-settings>              
            </b-tab>
            
        </b-tabs>
    </div>
</template>
<script>
import WebSettings from '../../components/cashout/web-settings'
import ShopSettings from '../../components/cashout/shop-settings'
export default {
    name:'cash_out',
    layout: 'main',
    scrollToTop: true,
    components:{
        WebSettings,
        ShopSettings
    },
    data(){
        return{
            title: 'CashOut Settings'
        }
    },
    head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'CashOut Settings');        
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
    /* width: 200px; */
}
</style>