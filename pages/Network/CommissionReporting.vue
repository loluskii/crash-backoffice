<template>
  <div>
    <div class="row">
      <div class="col-md-3 col-sm-12 mb-sm-0 mb-2">
        <select name="" class="form-control" v-model="channel">
          <option value="">All</option>
          <option :value="i.id" v-for="(i, index) in commission_types" :key="index">{{ i.name }}</option>
        </select>
      </div>
      <!-- <div class="col-md-3 col-sm-12 mb-sm-0 mb-2">
          <select
            name="class"
            id="class-type"
            class="form-control"
            v-model="filterData.period"
            @change="setDateRange"
          >
            <option value="manual">Manual</option>
            <option value="last_week">Last Week</option>
          </select>
        </div> -->
      <div class="col-md-3 col-sm-12 mb-sm-0 mb-2">
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
      <div class="col-md-3 col-sm-12 mb-sm-0 mb-2">
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
      <div class="col-md-3 col-sm-12 mb-sm-0 mb-2">
        <button type="button" @click.prevent="getReports" name="" id="" class="btn btn-primary">Filter</button>
      </div>
    </div>
    <card title="Results">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <!-- <th v-for="(th,index) in theads" :key="index">{{ th }}</th> -->
              <th>Channel Name</th>
              <th>Settled Date</th>
              <th>Coupon Count</th>
              <th>No of Selections</th>
              <th>Stake</th>
              <th>Commission Band</th>
              <th>Commission Estimate</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="row in data" >
              <tr v-if="!loading" @click="row.contentVisible = !row.contentVisible">
                <td class="text-capitalize"> {{ row.channel }} </td>
                <td>{{ formatDate(row.created_at, "DD/MM/YYYY") }}</td>
                <td>{{ row.total_tickets }}</td>
                <td>-</td>
                <td>{{ row.total_sales }}</td>
                <td>{{ row.commission_band }}</td>
                <td>{{ row.commission }}</td>
              </tr>
              <tr v-if="row.contentVisible" style="min-width: 100%">
                <td colspan="7">
                  <div class="accordian-body w-100 bg-light">
                    <table class="w-100 table table- table-striped">
                      <tr v-for="(s,index) in row.bet_info" :key="index">
                        <td>{{ s.type }}</td>
                        <td> {{ formatDate(s.start_date,  "DD/MM/YYYY") }} </td>
                        <td> {{ s.total_tickets }} </td>
                        <td>{{ s.selections_count }} </td>
                        <td> {{ s.stake }} </td>
                        <td> {{ s.commission_band }}% </td>
                        <td> {{ s.commission }}</td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="row mt-3">
        <div class="col-sm-12 col-md-7">
          <div
            class="dataTables_paginate paging_simple_numbers pull-right"
            id="sample_1_paginate"
          >
          </div>
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import card from "../../components/card.vue";
import Agents from "../../services/agents";

export default {
  name: "commission-report",
  layout: "main",
  components: {
    card,
  },
  data() {
    return {
      channel: "sports",
      loading: true,
      title: "Commission Reporting",
      filterData: {
        period: "manual",
        from: this.$moment().format("DD-MM-YYYY"),
        to: this.$moment().format("DD-MM-YYYY"),
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      commission_types: [
        {
          name:'Sports',
          id:'sports'
        },
        {
          name:'Virtual',
          id: 'virtual',
        },
        {
          name:'Casino',
          id:'casino'
        }
      ],
      allOpenRows: [],
      data: [],
    };
  },
  computed: {
    theads() {
      switch (this.channel) {
        case "Sports":
          return [
            "Channel Name",
            "Settled Date",
            "Coupon count",
            "Number of Selections",
            "Stake",
            "Commission Band",
            "Commission Estimate",
          ];
        default:
          break;
      }
    },
  },
  methods: {
    getReports() {
      this.loading = true
      this.$axios
        .get("https://ourbet.net/api/commissions/reports?from="+this.filterData.from+"&to="+this.filterData.to+'&type='+this.channel)
        .then((res) => {
          const data = res.data.data;
          const newData = data.map(v => Object.assign(v, {contentVisible: false}))
          this.data = newData
          this.loading = false
        });
    },
    setDateRange() {
      switch (this.filterData.period) {
        case "manual":
          this.config.clickOpens = true;
          this.filterData.from = this.$moment().format("DD-MM-YYYY");
          this.filterData.to = this.$moment().format("DD-MM-YYYY");
          this.getReports()
          break;
        case "last_week":
          this.filterData.from = this.$moment()
            .subtract(1, "week")
            .startOf("isoWeek")
            .format("DD-MM-YYYY");
          this.filterData.to = this.$moment()
            .subtract(1, "week")
            .endOf("isoWeek")
            .format("DD-MM-YYYY");

          this.getReports()
          break;
        default:
          this.filterData.from = this.$moment().format("DD-MM-YYYY");
          this.filterData.to = this.$moment().format("DD-MM-YYYY");
      }
    },

  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Commission Reporting");
  },
  mounted() {
    this.getReports();
  },
};
</script>
