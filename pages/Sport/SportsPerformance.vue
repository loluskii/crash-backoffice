<template>
    <div class="text-center">
       <h3>Undergoing Development</h3>
    </div>
</template>
<script>
    
    export default {
        name:'bets-monitor',
        layout: 'main',
        data(){
            return{
                title: 'Exposure Monitor'
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Exposure Monitor')
        }
    }
</script>
<style scoped>
    
</style>
