<template>
  <div>
    <form id="single-stop">
      <div class="row m-t-10">
        <div class="col-sm-2 mb-sm-0 mb-2">
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
        <div class="col-sm-2 mb-sm-0 mb-2">
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
        <div class="col-sm-2 mb-sm-0 mb-2">
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
        <div class="col-sm-3 mb-sm-0 mb-2">
          <button
            class="btn btn-info btn-block"
            type="button"
            @click="updateReport"
          >
            Search
          </button>
        </div>
        <div class="col-sm-3">
          <a href="#">clear all filters</a>
        </div>
      </div>
    </form>
    <div class="mt-3 row">
      <div class="col-xl-8 col-12">
        <div class="row">
          <div class="col-sm-12">
            <b-card no-body class="main-chart">
              <b-tabs ref="tabs" card>
                <b-tab title="Overall Gaming" active>
                  <overall_gaming
                    :startDate="filterData.from"
                    :endDate="filterData.to"
                  ></overall_gaming>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-12">
        <right-side></right-side>
      </div>
    </div>
  </div>
</template>
<script>
import Bets from "../../services/bets";
import overall_gaming from "../../components/dashboard/overal_gaming.vue";
import sport from "../../components/dashboard/sport.vue";
import mobile from "../../components/dashboard/mobile.vue";
import agents from "../../components/dashboard/agents.vue";
import RightSide from "../../components/dashboard/right-side/RightSide.vue";
export default {
  name: "dashboard",
  layout: "main",
  components: {
    sport,
    overall_gaming,
    agents,
    mobile,
    RightSide,
  },
  data() {
    return {
      title: "Home - Dashboard",
      filterData: {
        period: "today",
        from: this.$moment().format("DD-MM-YYYY"),
        to: this.$moment().format("DD-MM-YYYY"),
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
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
    updateReport() {
      this.$nuxt.$emit("UPDATE_REPORT");
    },
  },
  mounted() {
    // console.log(this.$auth.getToken('local'))
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Home - Dashboard");
  },
};
</script>
<style src="../../assets/css/custom_css/dashboard1.css"></style>
<style scoped>
.card .table {
  margin-bottom: 0 !important;
}
.card-body {
  padding: 0px !important;
}
</style>
