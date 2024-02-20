<template>
  <div class="min-vh-">
    <form
      id="single-stop"
      style="z-index: 100000"
      @submit.prevent="calculateComm(1)"
    >
      <div class="row m-t-10">
        <div class="col-md-4 col-sm-12 mb-sm-0 mb-2">
          <select
            v-model="filterData.provider"
            class="form-control"
            name="provider"
            id="provider"
          >
            <option
              v-for="(provider, index) in providers"
              :key="index"
              :value="provider.value"
              :selected="filterData.provider"
            >
              {{ provider.text }}
            </option>
          </select>
        </div>
        <div class="col-md-4 col-sm-12 mb-sm-0 mb-2">
          <select
            v-model="filterData.period"
            class="form-control"
            name="provider"
            id="provider"
          >
            <option value="">Select Period</option>
            <option
              v-for="(period, index) in periods"
              :key="index"
              :value="period.value"
              :selected="filterData.period"
            >
              {{ period.text }}
            </option>
          </select>
        </div>
        <br class="d-sm-none" />
        <div class="col-sm-4">
          <button type="submit" id="search" class="btn btn-info btn-block">
            Search
          </button>
        </div>
      </div>
    </form>

    <div style="z-index: 10">
      <hr style="border: 2px solid #eee" />
      <div class="text-center" v-if="loading">
        <i class="fa fa-spin fa-spinner fa-5x"></i>
      </div>
      <card title="Commission Overview" v-if="current_week && !loading">
        <table class="table table-bordered table-striped">
          <thead>
            <th>Time</th>
            <th>No. of Tickets</th>
            <th>Amount Played</th>
            <th>Total Won</th>
            <th>Net</th>
            <th>Commissions</th>
            <th>Profit</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>
                Week:
                {{ current_week.current_week + "/" + current_week.total_weeks }}
              </td>
              <td>{{ formatNumber(current_week.no_of_tickets, false) }}</td>
              <td>{{ formatNumber(current_week.played) }}</td>
              <td>{{ formatNumber(current_week.won) }}</td>
              <td>{{ formatNumber(current_week.net) }}</td>
              <td>{{ formatNumber(current_week.commission) }}</td>
              <td>
                {{
                  formatNumber(
                    parseFloat(current_week.net) -
                      parseFloat(current_week.commission)
                  )
                }}
              </td>
              <td>
                <button class="btn btn-primary">Pay</button>
              </td>
            </tr>
            <tr>
              <td>Month: {{ current_month.month }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </card>
      <br />
      <div class="card" v-if="agents && !loading">
        <div class="card-header bg-primary">
          <h3 class="card-title">Results</h3>
          <span class="float-right d-flex">
            <button
              type="button"
              name="button"
              @click="pay"
              class="pull-right btn btn-success fa fa-money"
            >
              Pay All Agents
            </button>
          </span>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <thead>
                <th><input type="checkbox" v-model="selectAll" /></th>
                <th>Shop Name</th>
                <th>Bonus Rate</th>
                <th>Gross Profit</th>
                <th>Monthly Bonus</th>
                <th>Power Bonus</th>
                <th>Rate</th>
                <th>Total Stake</th>
                <th>Total Stake Target</th>
                <th>Total Tickets</th>
                <th>Total Tickets Target</th>
                <th>Total Weighted Stake</th>
                <th>Total Winnings</th>
                <th>Turnover Commission</th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="(agent, index) in agents" :key="index">
                  <td>
                    <input
                      type="checkbox"
                      :value="agent.shop_id"
                      v-model="selected"
                      number
                    />
                  </td>
                  <td>
                    {{ agent.shop_name }}
                  </td>
                  <td>
                    {{ agent.bonus_rate }}
                  </td>
                  <td>{{ agent.grossProfit }}</td>
                  <td>{{ agent.monthlyBonus }}</td>
                  <td>{{ agent.powerBonus }}</td>
                  <td>{{ agent.rate }}</td>
                  <td>{{ agent.totalStake }}</td>
                  <td>{{ agent.totalStakeTarget }}</td>
                  <td>
                    <a href="javascript:;" class="href">
                      {{ formatNumber(agent.totalTickets, false) }}
                    </a>
                  </td>
                  <td>{{ agent.totalTicketsTarget }}</td>
                  <td>{{ formatNumber(agent.totalWeightedStake) }}</td>
                  <td>{{ formatNumber(agent.totalWinnings) }}</td>
                  <td>{{ formatNumber(agent.turnoverCommissions) }}</td>
                  <td>
                    <button
                      @click.prevent="paySingleAgent(agent.shop_id)"
                      class="btn btn-primary"
                    >
                      Pay
                    </button>
                    <!-- <button v-if="agent.is_paid === 1" class="btn btn-success">
                      Paid
                    </button> -->
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row mt-3">
              <div class="col-sm-12 col-md-7">
                <div
                  class="dataTables_paginate paging_simple_numbers pull-right"
                  id="sample_1_paginate"
                >
                  <paginate
                    v-bind:pagination="pagination"
                    v-on:click.native="calculateComm(pagination.current_page)"
                    :offset="4"
                  >
                  </paginate>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Reports from "../../services/reports";
import Agents from "../../services/agents";
export default {
  name: "commissions-bonus",
  layout: "main",
  data() {
    return {
      loading: false,
      filterData: {
        period: "",
        provider: "sports",
      },
      periods: [],
      config: {
        dateFormat: "d-m-Y",
      },
      providers: [
        { text: "Sport", value: "sports" },
        { text: "Casino", value: "casino" },
        { text: "Poker", value: "poker" },
        { text: "Virtual", value: "virtual" },
        { text: "Casino live", value: "casino_live" },
      ],
      current_week: "",
      current_month: "",
      agents: "",
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      },
      offset: 4,
      selected: [],
      bonusAmount: 0,
    };
  },
  computed: {
    selectAll: {
      get: function () {
        return this.agents ? this.selected.length == this.agents.length : false;
      },
      set: function (value) {
        var selected = [];
        if (value) {
          this.agents.forEach(function (agent) {
            selected.push(agent.user_id);
          });
        }
        this.selected = selected;
      },
    },
  },
  methods: {
    paySingleAgent(id) {
      let payload = JSON.parse(JSON.stringify(this.filterData));
      const dateRange = payload.period;
      const [from, to] = dateRange.split(" - ");
      let data = {
        user_ids: [id],
        from: from,
        to: to,
      };
      this.$swal({
        title: "Are you sure?",
        text: "This will credit the agent account",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Pay!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          Agents.payPowerBonus(data).then((res) => {
            if (res.success) {
              this.$swal("Success!", res.message, "success");
            } else {
              this.$swal("Error!", res.message, "error");
            }
          });
        }
      });
    },
    calculateComm(page) {
      $("#search").attr("disabled", true);
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.filterData));
      const dateRange = data.period;
      const [from, to] = dateRange.split(" - ");
      data.from = from;
      data.to = to;
      delete data.period;
      Reports.getPowerBonus(page, data).then((res) => {
        $("#search").attr("disabled", false);
        this.loading = false;
        this.agents = res.data;
      });
    },
    pay() {
      var self = this;
      let data = JSON.parse(JSON.stringify(this.filterData));
      const dateRange = data.period;
      const [from, to] = dateRange.split(" - ");
      if (self.selected.length) {
        self
          .$swal({
            title: "Are you sure?",
            text: "This will credit all agents account",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Pay!",
            cancelButtonText: "No",
          })
          .then((result) => {
            if (result.value) {
              let data = {
                user_ids: self.selected,
                from: from,
                to: to,
              };
              Agents.payPowerBonus(data).then((res) => {
                if (res.success) {
                  self.$swal("Success!", res.message, "success");
                  // self.agents = res.agents.data
                } else {
                  self.$swal("Error!", res.message, "error");
                }
              });
            }
          });
      } else {
        self.$swal("Error", "No agent was selected", "error");
      }
    },
    showCommProfile(profile_id) {
      Reports.getCommission(profile_id)
        .then((res) => {
          if (res.success) {
            this.$nuxt.$emit("commission_profile_show", res.data);
          } else {
            toastr["error"]("Unable to fetch record", "Error");
          }
        })
        .catch((err) => {
          toastr["error"]("An error occured.", "Error");
        });
    },
    getPeriods() {
      Reports.getPowerBonusDates().then((res) => {
        if (res.data.length) {
          res.data.forEach((period) => {
            this.periods.push({
              text: period.from + " - " + period.to,
              value: period.from + " - " + period.to,
            });
          });
        }
      });
    },
  },
  mounted() {
    this.getPeriods();
  },
};
</script>

<style scoped>
.tab-content {
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
}
input.form-control {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #ced4da !important;
}
</style>
