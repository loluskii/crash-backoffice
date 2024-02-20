<template>
  <div>
    <form class="" id="single-stop" @submit.prevent="getResults(1)">
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
        <br class="d-sm-none" />
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
          <button type="submit" class="btn btn-info btn-block">Search</button>
        </div>
      </div>

      <div class="row m-t-10"></div>
    </form>
    <card title="Results" excel="true">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Online sales</th>
              <th>Total Online sales</th>
              <th>Online Withdrawal</th>
              <th>Total Online Withdrawals</th>
              <th>Online Balance</th>
              <th>Available Balance</th>
            </tr>
          </thead>
          <tbody
            v-if="bets.length > 0"
            :key="index"
            v-show="!loading"
            v-for="(bet, index) in bets"
          >
            <tr>
              <td>
                <i
                  class="fa fa-caret-right mr-3"
                  style="cursor: pointer"
                  @click="showChild($event, index, bet.agent_id)"
                ></i>
                <nuxt-link :to="'/Network/Agent/' + bet.agent_id">
                  {{ bet.agent_username }}
                </nuxt-link>
              </td>
              <td>{{ bet.report.online_sales }}</td>
              <td>{{ bet.report.total_online_sales }}</td>
              <td>{{ bet.report.online_withdrawal }}</td>
              <td>{{ bet.report.total_online_withdrawal }}</td>
              <td>
                <span
                  :class="
                    bet.report.online_sales - bet.report.online_withdrawal < 0
                      ? 'text-danger'
                      : ''
                  "
                  >{{
                    bet.report.online_sales - bet.report.online_withdrawal
                  }}</span
                >
              </td>
              <td>{{ bet.report.available_balance }}</td>
            </tr>
            <tr :id="index + '_child'" class="d-none">
              <td colspan="7">
                <div class="row py-3">
                  <div class="col-md-11 mx-auto">
                    <table class="table table-border">
                      <thead>
                        <tr>
                          <th class="text-center">Name</th>
                          <th>Online sales</th>
                          <th>Total Online sales</th>
                          <th>Online Withdrawal</th>
                          <th>Total Online Withdrawals</th>
                          <th>Available Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-if="cashiers.length > 0"
                          v-for="(cashier, c) in cashiers"
                          :key="c"
                        >
                          <td>{{ cashier.report.agent_username }}</td>
                          <td>{{ cashier.report.online_sales }}</td>
                          <td>{{ cashier.report.total_online_sales }}</td>
                          <td>{{ cashier.report.online_withdrawal }}</td>
                          <td>{{ cashier.report.total_online_withdrawal }}</td>
                          <td>
                            <span
                              :class="
                                cashier.report.online_sales -
                                  cashier.report.online_withdrawal <
                                0
                                  ? 'text-danger'
                                  : ''
                              "
                              >{{
                                cashier.report.online_sales -
                                cashier.report.online_withdrawal
                              }}</span
                            >
                          </td>
                          <td>{{ cashier.report.available_balance }}</td>
                        </tr>
                        <!-- <tr v-if="cashier_loading">
                          <td colspan="7" class="text-center">
                            <i class="fa fa-2x fa-spin fa-spinner"></i>
                          </td>
                        </tr> -->
                        <tr v-if="cashiers.length < 1">
                          <td colspan="6" class="text-center">
                            No data available
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tr v-if="bets.length < 1" v-show="!loading">
            <td colspan="6" class="text-center">
              <h4>No record found</h4>
            </td>
          </tr>
          <tr v-if="loading">
            <td colspan="6" class="text-center">
              <i class="fa fa-4x fa-spin fa-spinner"></i>
            </td>
          </tr>
          <!-- <tfoot>
            <tr>
              <th>Total</th>
              <th>{{ totalTickets, false) }}</th>
              <th>{{ totalStake) }}</th>
              <th>{{ totalWinnings) }}</th>
            </tr>
          </tfoot> -->
        </table>
      </div>
    </card>
  </div>
</template>
<script>
export default {
  name: "network_sales",
  layout: "main",

  data() {
    return {
      title: "Online Sales Report",
      filterData: {
        period: "today",
        from: this.$moment().format("DD-MM-YYYY"),
        to: this.$moment().format("DD-MM-YYYY"),
      },
      bets: [],
      cashiers: [],

      group_by: "day",
      config: {
        wrap: true,
        enableTime: false,
        dateFormat: "d-m-Y",
      },
      loading: false,
      cashier_loading: false,
      offset: 4,
    };
  },
  methods: {
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
      this.$axios
        .get(
          "/shop/cashbook/report?from=" +
            this.filterData.from +
            "&to=" +
            this.filterData.to
        )
        .then((res) => {
          this.loading = false;
          this.bets = res.data.data;
        })
        .catch((err) => {
          this.$toast.error("An error occured", { icon: "times" });
          this.loading = false;
        });
    },
    resetFilter() {
      this.filterData = {
        period: "today",
        from: this.$moment().format("DD-MM-YYYY"),
        to: this.$moment().format("DD-MM-YYYY"),
      };
    },
    showChild(e, index, agent_id) {
      this.cashier_loading = true;
      this.$axios
        .get(
          "/shop/cashbook/" +
            agent_id +
            "/cashiers/report?from=" +
            this.filterData.from +
            "&to=" +
            this.filterData.to
        )
        .then((res) => {
          this.cashiers = res.data.data;
          this.cashier_loading = false;
        });
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
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Network Sales Report");
  },
  mounted() {
    // this.listBets(this.pagination.current_page);
  },
};
</script>
