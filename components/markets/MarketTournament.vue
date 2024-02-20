<template>
  <div class="min-vh-100">
    <div class="row">
      <div class="col-md-4">
        <v-select
          label="name"
          placeholder="Select Sports"
          v-on:input="setCategory"
          v-model="sport"
          :clearable="false"
          :options="sports"
          name="sport"
        >
        </v-select>
      </div>
      <div class="col-md-4">
        <v-select
          label="name"
          placeholder="Select Category"
          v-on:input="setTournament"
          :clearable="false"
          :options="categories.categories"
          name="group"
        >
        </v-select>
      </div>
      <div class="col-md-4">
        <v-select
          label="name"
          placeholder="Select Tournament"
          v-on:input="getMarkets"
          :options="tournaments"
          :clearable="false"
          name="group"
        >
        </v-select>
      </div>
    </div>
    <!-- {{ market_ids }} -->
    <div class="row mt-2">
      <div class="col-md-5">
        <card :title="'Available Markets'" :padding="true">
          <div class="float-right mb-1">
            <button @click="addMarket" class="btn btn-sm btn-success">
              Add Markets
            </button>
          </div>
          <table class="table table-bordered table-striped table-ellipsis">
            <thead>
              <tr>
                <th style="width: 100%">Name</th>
                <!-- <th style="width: 50%">Action</th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="markets.length > 0"
                v-for="market in markets"
                :key="market.sno"
              >
                <td>
                  <input
                    type="checkbox"
                    :value="market.id"
                    v-model="market_ids"
                    id=""
                  />
                  {{ market.name }}
                </td>
                <!-- <td>
                  <a href="javascript:;" @click="addMarket(market.id)"
                    >Add Market</a
                  >
                </td> -->
              </tr>
              <tr align="center" v-if="!markets.length">
                <td colspan="3">Please select a sport to display markets</td>
              </tr>
            </tbody>
          </table>
        </card>
      </div>
      <div class="col-md-7">
        <card title="Tournament Markets" :padding="true">
          <table class="table table-bordered table-striped table-ellipsis">
            <thead>
              <tr>
                <th style="width: 40%">Name</th>
                <th style="width: 40%">Action</th>
                <th style="width: 20%">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-if="!loading"
                v-for="market in tournament_markets"
                :key="market.sno"
              >
                <td>{{ market.name }}</td>
                <td>
                  <a
                    href="javascript:;"
                    @click="removeMarkets($event, market.id)"
                    >Remove Market</a
                  >
                  |
                  <a
                    href="javascript:;"
                    :class="
                      market.pivot.cash_out_status == 1
                        ? 'text-danger'
                        : 'text-success'
                    "
                    @click="toggleCashout(market.id)"
                    >{{
                      market.pivot.cash_out_status == 1
                        ? "Disable Cashout"
                        : "Enable Cashout"
                    }}</a
                  >
                </td>
                <td>
                  <input
                    type="checkbox"
                    :checked="market.pivot.status"
                    @click="toggleStatus(market.id)"
                    id=""
                  />
                </td>
              </tr>
              <tr align="center" v-if="!tournament_markets.length && !loading">
                <td colspan="3">No Markets</td>
              </tr>
              <tr align="center" v-if="loading">
                <td colspan="3">Please wait...</td>
              </tr>
            </tbody>
          </table>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import MarketForm from "./market-form";
export default {
  name: "market-setting",
  components: { MarketForm },
  data() {
    return {
      sports: [],
      tournaments: [],
      categories: [],
      tournament: {},
      category: {},
      sport: {},
      markets: [],
      market_ids: [],
      tournament_markets: [],
      loading: false,
      tournament_market_setting: {
        market_ids: [],
      },
      tournament_cashout_setting: {
        sports_tournament_id: "",
        market_id: "",
      },
      tournament_status_setting: {
        sports_tournament_id: "",
        market_id: "",
      },
    };
  },
  methods: {
    listSports() {
      this.$axios
        .get("admin/content-management/markets")
        .then((response) => {
          this.sports = response.data.sports;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          // console.log(error.data)
        });
    },
    setCategory(e) {
      this.markets = e.markets;
      this.$axios
        .get("admin/content-management/sports-menu")
        .then((response) => {
          this.categories = response.data.find((c) => c.id === e.id);
        })
        .catch((error) => {
          this.loading = false;
          // console.log(error.data)
        });
    },

    setTournament(e) {
      this.tournaments = e.tournaments;
      // this.tournament = e.;
    },
    getMarkets(e) {
      this.loading = true;
      this.market_ids = [];
      this.$axios
        .get("markets/markets-list/" + e.id)
        .then((response) => {
          this.tournament_markets = response.data.data;
          this.tournament = e.id;
          this.loading = false;
          if (this.tournament_markets) {
            this.tournament_markets.forEach((market) => {
              this.market_ids.push(market.id);
            });
            // if()
          }
        })
        .catch((error) => {
          this.loading = false;
          // console.log(error.data)
        });
    },
    removeMarkets(e, id) {
      this.tournament_market_setting.market_ids.push(id);
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You will not be able to recover this market",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, remove item!",
          cancelButtonText: "No, keep item",
        })
        .then((result) => {
          if (result.value) {
            this.$axios
              .post(
                "markets/remove/" + this.tournament + "/tournament",
                this.tournament_market_setting
              )
              .then((res) => {
                // console.log(res);
                if (res.data.success) {
                  this.tournament_market_setting.market_ids = [];
                  this.market_ids = [];
                  $(e.target).closest("tr").remove();
                  this.$axios
                    .get("markets/markets-list/" + this.tournament)
                    .then((response) => {
                      this.tournament_markets = response.data.data;
                      this.loading = false;
                      if (this.tournament_markets) {
                        this.tournament_markets.forEach((market) => {
                          this.market_ids.push(market.id);
                        });
                      }
                    })
                    .catch((error) => {
                      this.loading = false;
                      // console.log(error.data)
                    });
                  self.$swal("Deleted!", "Market has been removed", "success");
                } else {
                  self.$swal("Error!", "error");
                }
              });
          } else {
          }
        });
    },

    addMarket() {
      this.tournament_market_setting.market_ids = this.market_ids;
      // console.log(this.tournament_market_setting);
      this.$axios
        .post(
          "markets/add/" + this.tournament + "/tournament",
          this.tournament_market_setting
        )
        .then((res) => {
          this.tournament_market_setting.market_ids = [];
          this.tournament_markets = [];
          this.loading = true;
          this.$axios
            .get("markets/markets-list/" + this.tournament)
            .then((response) => {
              this.tournament_markets = response.data.data;
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
              // console.log(error.data)
            });
        });
    },

    toggleCashout(id) {
      // console.log(id);
      this.tournament_cashout_setting = {
        sports_tournament_id: this.tournament,
        market_id: id,
      };
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You want to toggle cashout for this market",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes!",
          cancelButtonText: "No",
        })
        .then((result) => {
          if (result.value) {
            this.$axios
              .post("markets/toggle/cash-out", this.tournament_cashout_setting)

              .then((res) => {
                // console.log(res);
                if (res.data.success) {
                  this.market_ids = [];
                  this.$axios
                    .get("markets/markets-list/" + this.tournament)
                    .then((response) => {
                      this.tournament_markets = response.data.data;
                      this.loading = false;
                      if (this.tournament_markets) {
                        this.tournament_markets.forEach((market) => {
                          this.market_ids.push(market.id);
                        });
                      }
                    })
                    .catch((error) => {
                      this.loading = false;
                      // console.log(error.data)
                    });
                  self.$swal(
                    "Successful!",
                    "Cashout has been toggled",
                    "success"
                  );
                } else {
                  self.$swal("Error!", "error");
                }
              });
          } else {
          }
        });
    },

    toggleStatus(id) {
      this.tournament_status_setting = {
        sports_tournament_id: this.tournament,
        market_id: id,
      };
      this.$axios
        .post("markets/toggle/status", this.tournament_status_setting)

        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.tournament_status_setting = {
              sports_tournament_id: "",
              market_id: "",
            };
            this.market_ids = [];
            this.$axios
              .get("markets/markets-list/" + this.tournament)
              .then((response) => {
                this.tournament_markets = response.data.data;
                this.loading = false;
                if (this.tournament_markets) {
                  this.tournament_markets.forEach((market) => {
                    this.market_ids.push(market.id);
                  });
                }
              })
              .catch((error) => {
                this.loading = false;
                // console.log(error.data)
              });
            // self.$swal("Successful!", "Status has been toggled", "success");
          } else {
            // self.$swal("Error!", "error");
          }
        });
    },
  },
  mounted() {
    this.listSports();
  },
};
</script>

<style></style>
