<template>
    <div class="row">
        <div class="col-md-12">
            card    
        </div>
    </div>
</template>
<script>
    import card from '../../components/card.vue'
    export default {
        name:'network_transfer',
        layout: 'main',
        scrollToTop: true,
        data(){
            return {
                agents: [],
                agent: '',
                cashier: '',
                player: '',
                formData:{
                    from_user: '',
                    to_user: '',
                    amount: '',
                    description:'',
                    action: '', 
                    top_up: true,
                    trust: false,
                }
            }
        },
        head () {
            return {
                title: 'Fund Transfer'
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Fund Transfer');        
        },
    
    }
</script>