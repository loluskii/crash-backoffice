<template>
    <card :title="'BET SLIP INFO '+ bet.betslip_id" v-if="bet" style="width: 51%">
        <table class="table table-striped table-bordered">
            <tr>
                <td width="30%">Customer Code</td>
                <td>{{bet.user ? bet.user.code : 'N/A'}}</td>
            </tr>
            <tr>
                <td width="30%">Username</td>
                <td>{{bet.user ? bet.user.username: 'N/A'}}</td>
            </tr>
            <tr>
                <td width="30%">Bet ID</td>
                <td>{{bet.betslip_id || bet.coupon_no}}</td>
            </tr>
            <tr>
                <td width="30%">Bet Type</td>
                <td>
                  {{bet.bet_type_desc || 'Coupon'}}
                  ({{ bet.event_type === 'pre' ? 'P' : 'L' }})
                </td>
            </tr>
            <tr>
                <td width="30%">Purchase Date</td>
                <td>{{ formatDate(bet.created_at, 'DD/MM/YYYY HH:mm:ss') }}</td>
            </tr>
            <tr>
                <td width="30%">Sports</td>
                <td>{{bet.sports || 1 + ' Sports'}}</td>
            </tr>
            <tr>
                <td width="30%">Leagues</td>
                <td>{{bet.tournaments + ' Leagues'}}</td>
            </tr>
            <tr>
                <td width="30%">Events</td>
                <td>{{bet.events + ' Events'}}</td>
            </tr>
            <tr>
                <td width="30%">Markets</td>
                <td>{{bet.markets + ' Markets'}}</td>
            </tr>
            <tr>
                <td width="30%">Your Bets</td>
                <td>{{bet.no_of_selections + ' Selections'}}</td>
            </tr>
            <tr>
                <td width="30%">Odds</td>
                <td>{{bet.odds}}</td>
            </tr>
            <tr>
                <td width="30%">Stake</td>
                <td>{{formatNumber(bet.stake)}}</td>
            </tr>
            <tr>
                <td width="30%">Bonus</td>
                <td>{{formatNumber(bet.bonus)}}</td>
            </tr>
            <tr v-if="bet.status === 0">
                <td width="30%">Potential Payout</td>
                <td>{{ formatNumber(bet.pot_winnings) }}</td>
            </tr>
            <tr v-if="bet.status === 1">
                <td width="30%">Winnings</td>
                <td>{{ formatNumber(bet.winnings) }}</td>
            </tr>
            <tr v-if="bet.status !== 1">
                <td width="30%">Win/Loss</td>
                <td>{{ (bet.status === 2)? bet.stake : '-'+bet.winnings}}</td>
            </tr>
            <tr>
                <td width="30%">Status</td>
                <td :class="setClass(bet.status)">{{ getStatus(bet.status) }}</td>
            </tr>
            <tr v-if="bet.status !== 0">
                <td width="30%">Bet Settled Date</td>
                <td>{{bet.settled_at}}</td>
            </tr>
            <tr>
                <td width="30%">Client Type</td>
                <td>{{bet.channel}}</td>
            </tr>
        </table>
        <card title="Bet Lines">
            <table class="table table-condensed table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Sports</th>
                        <th>League</th>
                        <th>Event Date & Time</th>
                        <th>Event</th>
                        <th>Market</th>
                        <th>Your Bet</th>
                        <th>Odds</th>
                        <th>Score</th>
                        <th>Settled At</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in bet.selections" :key="item.id">
                        <td>{{ item.sport || 'Soccer'}}</td>
                        <td>{{ item.tournament}}</td>
                        <td>{{ displayDate(item.start_date, 'DD/MM/YYYY HH:mm') }}</td>
                        <td>{{ item.event || item.event_name}}</td>
                        <td>{{ item.market_name || '1X2'}}</td>
                        <td>{{ item.odd_name || 'X'}}</td>
                        <td>{{ item.odds }}</td>
                        <td>{{ item.score }}</td>
                        <td>{{ (item.status !== 0) ? item.settled_at : 'Not Settled' }}</td>
                        <td :class="setClass(item.status)">{{ getStatus(item.status) }}</td>
                        <td class="text-nowrap" >
                                  <button type="button" v-permission="'Mark as won'"
                                    class="btn btn-sm btn-icon btn-flat btn-success text-white"
                                   style="color: #000" v-if="item.status !== 1" @click="updateTicketStatus(item.id, 'won')">
                                    <i class="fa fa-check" aria-hidden="true"></i>
                                  </button>
                                  <button type="button"
                                    class="btn btn-sm btn-icon btn-flat btn-warning text-white"
                                   style="color: #000" v-if="item.status !== 0" @click="updateTicketStatus(item.id, 'pending')">
                                    <i class="fa fa-play" aria-hidden="true"></i>
                                  </button>
                                  <button type="button" v-permission="'Cancel Ticket'"
                                    class="btn btn-sm btn-icon btn-flat btn-danger text-white"
                                    style="color: #000" v-if="item.status !== 2" @click="updateTicketStatus(item.id, 'lost')">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                  </button>
                                  <button type="button" v-permission="'Void Ticket'"
                                    class="btn btn-sm btn-icon btn-flat btn-danger text-white"
                                    style="color: #000" v-if="item.status !== 3" @click="updateTicketStatus(item.id, 'void')">
                                    <i class="fa fa-ban" aria-hidden="true"></i>
                                  </button>
                                </td>
                    </tr>
                </tbody>
            </table>
        </card>
    </card>
</template>

<script>
import Bets from '../services/bets.js'
    import card from './card.vue';
    export default {
        name: 'bet_view',
        components:{
            card
        },
        props:[
            'bet'
        ],
        methods:{
            updateTicketStatus(id, action){
                var self = this;
                self.$swal({
                    title: 'Are you sure?',
                    // text: 'You will not be able to recover this item',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes!',
                    cancelButtonText: 'No'
                }).then(function() {
                    Bets.updateTicketItem(id, action).then(res=>{
                    self.items = res.ticket.ticket_items;
                    })
                }, function(dismiss) {

                })
            },
            getStatus(status){
                if(status == 1){
                    this.statusClass = 'text-danger'
                    return 'Won';
                }else if(status == 2){
                    this.statusClass = 'text-success'
                    return 'Lost';
                }else if(status == 3){
                    this.statusClass = 'text-secondary'
                    return 'Void';
                }else if(status == 4){
                    this.statusClass = 'text-secondary'
                    return 'Canceled';
                }else if(status == 5){
                    this.statusClass = 'text-success'
                    return 'CUT1 (5%)';
                }else if(status == 6){
                    this.statusClass = 'text-secondary'
                    return 'Canceled';
                }else{
                    this.statusClass = 'text-warning'
                    return 'Running';
                }
            },
            displayDate(str, format) {
                return this.$moment(str).format(format);
            },
        }
    }
</script>
