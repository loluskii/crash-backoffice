<template>
  <div>
    <form id="single-stop" @submit.prevent="getResults(1)">
      <div class="row m-t-10">
        <div class="col-sm-3">
          <select
            name="class"
            id="class-type"
            class="form-control"
            v-model="filterData.period"
            @change="setDateRange"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="current_week">Current Week</option>
            <option value="last_week">Last Week</option>
            <option value="current_month">Current Month</option>
            <option value="last_month">Last Month</option>
            <option value="last_30_days">Last 30 Days</option>
            <option value="date_range">Date Range</option>
          </select>
        </div>
        <div class="col-sm-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text bg-white"
                ><i class="fa fa-fw ti-calendar"></i
              ></span>
            </div>
            <flat-pickr
              v-model="filterData.from"
              :config="config"
              class="form-control"
            ></flat-pickr>
          </div>
        </div>
        <br class="d-sm-none" />
        <div class="col-sm-3">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text bg-white"
                ><i class="fa fa-fw ti-calendar"></i
              ></span>
            </div>
            <flat-pickr
              v-model="filterData.to"
              :config="config"
              class="form-control"
            ></flat-pickr>
          </div>
        </div>
        <br class="d-sm-none" />
        <div class="col-sm-3">
          <select
            name="class"
            id="class-type"
            class="form-control"
            v-model="filterData.bet_type"
          >
            <option value="">Bet Type</option>
            <option value="single">Single Bet</option>
            <option value="multiple">Combo Bet</option>
          </select>
        </div>
      </div>
      <div class="row m-t-10">
        <div class="col-sm-3">
          <select
            name="class"
            id="class-type"
            class="form-control"
            v-model="filterData.event_type"
          >
            <option value="">Pre Match/Live</option>
            <option value="pre_match">Pre-Match</option>
            <option value="live">Live</option>
          </select>
        </div>
        <br class="d-sm-none" />
        <div class="col-sm-3">
          <select name="class" id="class-type" class="form-control">
            <option value="">Sport</option>
          </select>
        </div>
        <br class="d-sm-none" />
        <div class="col-sm-3">
          <select name="class" id="class-type" class="form-control">
            <option value="">League</option>
          </select>
        </div>
        <br class="d-sm-none" />
        <div class="col-sm-3">
          <select name="class" id="class-type" class="form-control">
            <option value="">Markets</option>
          </select>
        </div>
      </div>
      <div class="row m-t-10">
        <div class="col-sm-3">
          <v-select
            label="username"
            v-model="username"
            @input="setUsername"
            placeholder="Username"
            :options="users"
            name="username"
          ></v-select>
        </div>
        <div class="col-sm-3">
          <select
            name="class"
            id="class-type"
            class="form-control"
            v-model="filterData.group_type"
          >
            <option value="">Stake/Winnings</option>
            <option value="stake">Stake</option>
            <option value="pot_winnings">Winnings</option>
          </select>
        </div>
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control"
            id="pref-Air"
            placeholder="=> 1000"
            v-model="filterData.amount_range"
          />
        </div>
        <br class="d-sm-none" />
        <div class="col-sm-3">
          <select
            name="class"
            id="class-type"
            class="form-control"
            v-model="filterData.status"
          >
            <option value="">Status</option>
            <option value="2">Lost</option>
            <option value="1">Won</option>
            <option value="3">Cancelled</option>
            <option value="4">CUT1 (stake)</option>
            <option value="5">CUT1 (5%)</option>
          </select>
        </div>
      </div>
      <div class="row m-t-10">
        <div class="col-sm-2">
          <div class="form-group icheck-element">
            <label class="price-alert">
              <input type="checkbox" name="c1" id="c1" value="" /> Enable Paging
            </label>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label class="price-alert"
              >No. of Tickets: {{ formatNumber(total_tickets, false) }}</label
            >
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group">
            <label class="price-alert"
              >Amount Played: {{ formatNumber(amount_played) }}</label
            >
          </div>
        </div>
        <div class="col-sm-2">
          <button type="submit" class="btn btn-info btn-block">Search</button>
        </div>
        <div class="col-sm-2">
          <a href="#">clear all filters</a>
        </div>
      </div>
    </form>
    <card title="Results" excel="true">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Betslip ID</th>
              <th>Bet Type</th>
              <th>Placed on</th>
              <th>By</th>
              <!-- <th>State</th> -->
              <!-- <th>Sports Limit</th> -->
              <th>Odds</th>
              <th>Stake</th>
              <th>Return</th>
              <th>Win/Loss</th>
              <th>Sport</th>
              <th>League</th>
              <th>Event</th>
              <th>Market</th>
              <th>Selection</th>
              <th>Client Type</th>
              <th>Bet Status</th>
              <th>Bonus</th>
              <!-- <th>Real Money%</th>
                        <th>Bonus Money%</th>
                        <th>Gain with Real Money%</th> -->
              <th>Bet Settled Date & Time</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(bet, index) in bets">
              <tr v-if="bets.length > 0 && !loading" :key="index">
                <td>
                  <a href="javascript:;" @click="showChild($event, index)">
                    {{ bet.betslip_id }}
                  </a>
                </td>
                <td>{{ bet.bet_type_desc }}</td>
                <td>{{ formatDate(bet.created_at, "DD/MM/YYYY HH:mm:ss") }}</td>
                <td>
                  <router-link
                    :to="'/PlayerManagement/PlayerInfo/' + bet.user_id"
                    target="_blank"
                    >{{ bet.user.username }}</router-link
                  >
                </td>
                <td>{{ bet.odds.toFixed(2) }}</td>
                <td>{{ currency + "" + bet.stake }}</td>
                <td>{{ formatNumber(bet.winnings) }}</td>
                <td :class="setClass(bet.status)">{{ calcWinLoss(bet) }}</td>
                <td>{{ bet.sports }}</td>
                <td>{{ bet.tournaments }}</td>
                <td>{{ bet.events }}</td>
                <td>{{ bet.markets }}</td>
                <td>{{ bet.selections_count }} Selection(s)</td>
                <td>{{ bet.channel }}</td>
                <td :class="setClass(bet.status)">
                  {{ getStatus(bet.status) }}
                </td>
                <td>{{ formatNumber(bet.bonus) }}</td>
                <!-- <td>100.00%</td> -->
                <!-- <td>{{ calcBonusPerc(bet)}}</td> -->
                <!-- <td>{{ formatNumber(bet.winnings) }}</td> -->
                <td>{{ bet.settled_at }}</td>
              </tr>
              <tr :id="index + '_child'" class="d-none" :key="bet.id">
                <td colspan="21">
                  <bet-details :bet="bet"></bet-details>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div v-if="!loading && !bets.length" class="text-center nodata">
          <h5>No data</h5>
        </div>
        <div style="width: 100%" v-if="loading" class="text-center">
          <i class="fa fa-spin fa-spinner fa-4x"></i>
        </div>
      </div>
    </card>
    <div class="row mt-3">
      <!-- <div class="col-sm-12 col-md-5">
                    <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">Showing 1 to 10 of 40 entries</div>
                </div> -->
      <div class="col-sm-12 col-md-7">
        <div
          class="dataTables_paginate paging_simple_numbers pull-right"
          id="sample_1_paginate"
        >
          <paginate
            v-bind:pagination="pagination"
            v-on:click.native="getResults(pagination.current_page)"
            :offset="4"
          >
          </paginate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bets from "../../services/agents";
import card from "../../components/card";
import BetDetails from "../BetDetails";

export default {
  name: "bethistory",
  components: {
    card,
    BetDetails,
  },
  props: ["users"],
  data() {
    return {
      title: "Bet History",
      filterData: {
        period: "today",
        username: "",
        from: this.$moment().format("DD-MM-YYYY 00:00:00"),
        to: this.$moment().format("DD-MM-YYYY 23:59:59"),
        bet_type: "",
        event_type: "",
        sport: "",
        league: "",
        market: "",
        state: "",
        group_type: "",
        amount_range: "",
        status: "",
      },
      username: "",
      bets: "",
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      },
      offset: 4,
      loading: false,
      amount_played: 0,
      total_tickets: 0,
      config: this.$store.state.flatpickrConfig,
      currency: this.$store.state.currencySymbol,
    };
  },
  methods: {
    setUsername(e) {
      this.filterData.username = e.username;
    },
    setDateRange() {
      switch (this.filterData.period) {
        case "today":
          this.config.clickOpens = false;
          this.filterData.from = this.$moment().format("DD-MM-YYYY 00:00:00");
          this.filterData.to = this.$moment().format("DD-MM-YYYY 23:59:59");
          break;
        case "yesterday":
          this.filterData.from = this.$moment()
            .subtract(1, "day")
            .format("DD-MM-YYYY 00:00:00");
          this.filterData.to = this.$moment()
            .subtract(1, "day")
            .format("DD-MM-YYYY 23:59:59");
          break;
        case "current_week":
          this.filterData.from = this.$moment()
            .startOf("isoWeek")
            .format("DD-MM-YYYY 00:00:00");
          this.filterData.to = this.$moment()
            .endOf("isoWeek")
            .format("DD-MM-YYYY 23:59:59");
          break;
        case "last_week":
          this.filterData.from = this.$moment()
            .subtract(1, "week")
            .startOf("isoWeek")
            .format("DD-MM-YYYY 00:00:00");
          this.filterData.to = this.$moment()
            .subtract(1, "week")
            .endOf("isoWeek")
            .format("DD-MM-YYYY 23:59:59");
          break;
        case "current_month":
          this.filterData.from = this.$moment()
            .startOf("month")
            .format("DD-MM-YYYY 00:00:00");
          this.filterData.to = this.$moment()
            .endOf("month")
            .format("DD-MM-YYYY 23:59:59");
          break;
        case "last_month":
          this.filterData.from = this.$moment()
            .subtract(1, "month")
            .startOf("month")
            .format("DD-MM-YYYY 00:00:00");
          this.filterData.to = this.$moment()
            .subtract(1, "month")
            .endOf("month")
            .format("DD-MM-YYYY 23:59:59");
          break;
        case "last_30_days":
          this.filterData.from = this.$moment()
            .subtract(30, "days")
            .format("DD-MM-YYYY 00:00:00");
          this.filterData.to = this.$moment().format("DD-MM-YYYY 23:59:59");
          break;
        default:
          this.filterData.from = this.$moment().format("DD-MM-YYYY 00:00:00");
          this.filterData.to = this.$moment().format("DD-MM-YYYY 23:59:59");
      }
    },
    getResults(page) {
      this.loading = true;
      Bets.getBetHistory(this.$store.state.pageParam, this.filterData, page)
        .then((res) => {
          this.loading = false;
          this.bets = res.bets.data;
          this.pagination = res.bets;
          this.amount_played = res.totalSales;
          this.total_tickets = res.totalTickets;
        })
        .catch((err) => {
          this.$toast.error("An error occured", { icon: "times" });
        });
    },
    showChild(e, index) {
      let y = $(e.target).hasClass("fa-caret-right");
      if (y) {
        $(e.target).removeClass("fa-caret-right");
        $(e.target).addClass("fa-caret-down");
      } else {
        $(e.target).removeClass("fa-caret-down");
        $(e.target).addClass("fa-caret-right");
      }
      $("#" + index + "_child").toggleClass("d-none");
    },
    calcBonusPerc(bet) {
      let perc = (100 * bet.bonus) / parseFloat(bet.pot_winnings);
      return perc.toFixed(2).toLocaleString() + "%";
    },
    calcWinLoss(bet) {
      if (bet.status === 1 || bet.status === 4) {
        let winloss = parseFloat(bet.winnings) - parseFloat(bet.stake);
        return "-" + this.formatNumber(winloss.toFixed(2));
      } else if (bet.status === 2) {
        return this.formatNumber(bet.stake);
      } else {
        return 0;
      }
    },
  },
  mounted() {
    // this.listBets(this.pagination.current_page);
  },
};
</script>
