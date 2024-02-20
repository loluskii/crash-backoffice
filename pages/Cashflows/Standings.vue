<template>
  <div>
        <ul class="nav nav-tabs mt-2 mb-4" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="home-tab"
          to="/Cashflows/CashBooks"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          CashBooks
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="profile-tab"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
          to="/Cashflows/CashIn"
        >
          Cash In
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/CashOut"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Cash Out
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/Expenses"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Expenses
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          to="/Cashflows/Deductions"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Deductions
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white active"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/Standings"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Standings
        </router-link>
      </li>
      <li class="nav-item" role="presentation">
        <router-link
          class="nav-link bg-white"
          id="contact-tab"
          data-toggle="tab"
          data-target="#contact"
          to="/Cashflows/Settings"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Settings
        </router-link>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >

      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-2">
        <form>
          <div class="row mt-1">
            <div class="col-md-3 mb-3">
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
            <div class="col-md-3 mb-3">
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
            <div class="col-md-3 mb-3">
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
            <div class="col-md-2">
              <button class="btn btn-info btn-block" type="button">
                <i class="fa fa-search"></i> Apply
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-12 mt-2 table-responsive">
        <table class="table table-condensed table-hover">
          <thead>
            <tr>
              <th>Branch</th>
              <th class="text-center">Opening</th>
              <th class="text-center">Cash</th>
              <th class="text-center">Shortage</th>
              <th class="text-center">Outstanding</th>
              <th class="text-center">To</th>
              <th class="text-center">Form</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="index" v-if="!loading">
              <td>{{ result.name }}</td>
              <td>
                <input
                  id="openingBalance-82"
                  readonly="readonly"
                  name="branches[82][openingBalance]"
                  type="text"
                  :value= result.avaialable_balance
                  class="text-center"
                />
              </td>
                            <td>
                <input
                  id="cash-82"
                  onkeyup="this.value=numeral(this.value).format('0,0')"
                  onchange="handleAmountChange(82)"
                  name="branches[82][cash]"
                  type="text"
                  class="text-center"
                />
              </td>
              <td>
                <input
                  id="shortage-82"
                  onkeyup="this.value=numeral(this.value).format('0,0')"
                  readonly="readonly"
                  name="branches[82][shortage]"
                  type="text"
                  class="text-center"
                />
              </td>
              <td>
                <input
                  id="outstanding-82"
                  onkeyup="this.value=numeral(this.value).format('0,0')"
                  readonly="readonly"
                  name="branches[82][outstanding]"
                  type="text"
                  value="0"
                  class="text-center"
                />
              </td>
              <td>
                <input
                  id="cashin-82"
                  onkeyup="this.value=numeral(this.value).format('0,0')"
                  name="branches[82][cashin]"
                  type="text"
                  class="text-center"
                />
              </td>
              <td>
                <input
                  id="cashout-82"
                  onkeyup="this.value=numeral(this.value).format('0,0')"
                  name="branches[82][cashout]"
                  type="text"
                  class="text-center"
                />
              </td>
            </tr>
            <tr v-if="!results.length && !loading">
                    <td colspan="7" align="center">No record found</td>
                  </tr>
                  <tr v-if="loading">
                    <td colspan="7" class="text-center">
                      <i class="fa fa-4x fa-spin fa-spinner"></i>
                    </td>
                  </tr>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="7" class="text-right">
                <button type="submit" class="btn btn-primary px-3">
                  Request
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Cashflows from "../../services/cashflows"
export default {
  name: "standings",
  layout: "main",
  data() {
    return {
      title: "Standings",
      filterData: {
        period: "today",
        from: this.$moment().format("DD-MM-YYYY"),
        to: this.$moment().format("DD-MM-YYYY"),
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      pagination: {
        total: 0,
        per_page: 2,
        from: 1,
        to: 0,
        current_page: 1,
      },
      results: [],
      loading: false,
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
    getAgentList(page) {
      this.loading = true;
      Cashflows.getAgentList(page).then((res) => {
        this.results = res.data.data;
        this.pagination = res.data;
        this.loading = false;
      });
    },
  },
  mounted(){
    this.getAgentList(1)
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Standings");
  },
};
</script>

<style>
input {
  padding-bottom: 0px;
}
</style>
