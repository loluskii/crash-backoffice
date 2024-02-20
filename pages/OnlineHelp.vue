<template>
    <div class="text-center">
       <h3>Comming Soon</h3>
       <!-- <h4>Status: <span class="text-danger">Not active</span></h4> -->
    </div>
</template>
<script>
    
    export default {
        name:'bets-monitor',
        layout: 'main',
        data(){
            return{
                title: 'Online Help'
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Online Help')
        }
    }
</script>
<style scoped>
    
</style>
