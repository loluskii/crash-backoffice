<template>
    <div>

        <card title="List">
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead class="bg-grey-100">
                        <tr>
                            <th>Code</th>
                            <th>Username</th>
                            <th>Bonus</th>
                            <th>Bonus Amount</th>
                            <th>Bonus Balance</th>
                            <th>Date Given</th>
                            <th>Expiry Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(player, index) in players" v-if="players.length > 0" :key="index">
                            <td>{{player.player.code}}</td>
                            <td>{{player.player.username}}</td>
                            <td>{{player.bonus.name}}</td>
                            <td>{{ player.amount }}</td>
                            <td>{{ player.player.bonus_balance }}</td>
                            <td>{{ formatDate(player.created_at, 'DD/MM/YYYY HH:MM') }}</td>
                            <td>{{ formatDate(player.expiry_date, 'DD/MM/YYYY HH:MM') }}</td>
                            <td class="text-nowrap">
                              <a href="#" class="btn btn-danger" role="button">
                                <i class="fa fa-ban" aria-hidden="true"></i>
                              </a>
                            </td>
                        </tr>
                        <tr v-if="!players.length && !loading">
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
      <bonus-form-modal />
    </div>
</template>
<script>
    import card from "../../components/card.vue"
    import Bonuses from '../../services/bonuses.js'
    export default {
        scrollToTop: true,
        name:'pages',
        layout: 'main',
        components:{
            card,
        },
        data(){
            return{
                title: 'Player Bonus Report',
                players: [],
                loading: true
            }
        },
        methods:{
            getReports(page) {
              Bonuses.getPlayerReports(page).then(res=>{
                this.players = res.data.data;
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
                        Bonuses.deleteBonus(id).then((res) => {
                            if(res.success){
                                $(e.target).closest('tr').remove();
                                self.$swal('Deleted!', 'Item has been removed', 'success');
                            }
                        });
                    }
                }, function(dismiss) {

                });
            }
        },
        head() {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Player Bonus Report')
        },
        mounted(){
            this.getReports(1)
        }
    }
</script>
