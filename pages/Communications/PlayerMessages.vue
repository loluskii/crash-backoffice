<template>
    <div class="text-center">
       <!-- <h3>Monitor incoming bets in real time</h3> -->
       <h4>Status: <span class="text-danger">Not active</span></h4>
    </div>
</template>
<script>
    
    export default {
        name:'bets-monitor',
        layout: 'main',
        data(){
            return{
                title: 'Player Messages'
            }
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Player Messages')
        }
    }
</script>
<style scoped>
    
</style>
