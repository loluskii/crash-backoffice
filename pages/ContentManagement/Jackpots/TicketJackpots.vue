<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <button
          v-if="results.length < 3"
          class="btn btn-primary"
          @click="showJackpotModal"
        >
          Add New Jackpot
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div
            class="card-header d-flex align-items-center justify-content-between bg-primary"
          >
            <h5 class="mb-0">Jackpot Setting 1</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateJackpot1">
              <input type="hidden" name="id" v-model="formData1.id" />
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Display Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData1.name"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <!-- <label for="">Currency</label> -->
                    <div class="mb-3">
                      <label for="">Currency</label>
                      <select
                        class="form-control form-control-sm"
                        v-model="formData1.currency"
                        name=""
                        id=""
                      >
                        <option
                          v-for="(item, index) in currency"
                          :key="index"
                          :value="item.currency_code"
                        >
                          {{ item.currency_code }}
                        </option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData1.currency"
                      class="form-control d-none"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Charge Share</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData1.charge_share"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Low Limit Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control form-control-sm"
                      v-model="formData1.low_limit_amount"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">High Limit Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData1.high_limit_amount"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Min Shown Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData1.min_shown_amount"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Min Stake to Win</label>
                    <input
                      type="text"
                      name=""
                      v-model="formData1.min_stake_to_win"
                      id=""
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for=""> Display Period</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData1.display_period"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="">Draw Interval</label>
                <div class="row">
                  <div class="col-5 pr-0">
                    <input type="time" step="1" v-model="formData1.start_draw_interval" class="form-control form-control-sm" id="">
                  </div>
                  <span class="col-auto">-</span>
                  <div class="col-5 pl-0">
                    <input type="time" step="1" v-model="formData1.end_draw_interval" class="form-control form-control-sm" id="">
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="">Allowed Games</label>
                <v-select
                  multiple
                  :options="['Sport', 'Casino', 'Virtual']"
                  :value="formData1.allowed_games"
                />
              </div>

              <div class="form-group">
                <label for="">Cashbox Amount</label>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control form-control-sm"
                  placeholder=""
                  aria-describedby="helpId"
                />
              </div>

              <div class="d-flex">
                <button
                  type="submit"
                  id="submitBtn1"
                  class="btn btn-success btn-sm btn-block"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div
            class="card-header d-flex align-items-center justify-content-between bg-primary"
          >
            <h5 class="mb-0">Jackpot Setting 2</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateJackpot2">
              <input type="hidden" name="id" v-model="formData2.id" />
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Display Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData2.name"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Currency</label>
                    <select
                        class="form-control form-control-sm"
                        v-model="formData2.currency"
                        name=""
                        id=""
                      >
                        <option
                          v-for="(item, index) in currency"
                          :key="index"
                          :value="item.currency_code"
                        >
                          {{ item.currency_code }}
                        </option>
                      </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Charge Share</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData2.charge_share"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Low Limit Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control form-control-sm"
                      v-model="formData2.low_limit_amount"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">High Limit Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData2.high_limit_amount"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Min Shown Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData2.min_shown_amount"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Min Stake to Win</label>
                    <input
                      type="text"
                      name=""
                      v-model="formData2.min_stake_to_win"
                      id=""
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for=""> Display Period</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData2.display_period"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="">Draw Interval</label>
                <div class="row">
                  <div class="col-5 pr-0">
                    <input type="time" step="1" v-model="formData2.start_draw_interval" class="form-control form-control-sm" id="">
                  </div>
                  <span class="col-auto">-</span>
                  <div class="col-5 pl-0">
                    <input type="time" step="1" v-model="formData2.end_draw_interval" class="form-control form-control-sm" id="">
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="">Allowed Games</label>
                <v-select
                  multiple
                  :options="['Sport', 'Casino', 'Virtual']"
                  :value="formData2.allowed_games"
                />
              </div>

              <div class="form-group">
                <label for="">Cashbox Amount</label>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control form-control-sm"
                  placeholder=""
                  aria-describedby="helpId"
                />
              </div>

              <div class="d-flex">
                <button
                  type="submit"
                  id="submitBtn2"
                  class="btn btn-success btn-block"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div
            class="card-header d-flex align-items-center justify-content-between bg-primary"
          >
            <h5 class="mb-0">Jackpot Setting 3</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateJackpot3">
              <input type="hidden" name="id" v-model="formData3.id" />
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Display Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData3.name"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Currency</label>
                    <select
                        class="form-control form-control-sm"
                        v-model="formData3.currency"
                        name=""
                        id=""
                      >
                        <option
                          v-for="(item, index) in currency"
                          :key="index"
                          :value="item.currency_code"
                        >
                          {{ item.currency_code }}
                        </option>
                      </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Charge Share</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData3.charge_share"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Low Limit Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      class="form-control form-control-sm"
                      v-model="formData3.low_limit_amount"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">High Limit Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData3.high_limit_amount"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Min Shown Amount</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData3.min_shown_amount"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <label for="">Min Stake to Win</label>
                    <input
                      type="text"
                      name=""
                      v-model="formData3.min_stake_to_win"
                      id=""
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label for=""> Display Period</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      v-model="formData3.display_period"
                      class="form-control form-control-sm"
                      placeholder=""
                      aria-describedby="helpId"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="">Draw Interval</label>
                <div class="row">
                  <div class="col-5 pr-0">
                    <input type="time" step="1" v-model="formData3.start_draw_interval" class="form-control form-control-sm" id="">
                  </div>
                  <span class="col-auto">-</span>
                  <div class="col-5 pl-0">
                    <input type="time" step="1" v-model="formData3.end_draw_interval" class="form-control form-control-sm" id="">
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="">Allowed Games</label>
                <v-select
                  multiple
                  :options="['Sport', 'Casino', 'Virtual']"
                  :value="formData3.allowed_games"
                />
              </div>

              <div class="form-group">
                <label for="">Cashbox Amount</label>
                <input
                  type="text"
                  name=""
                  id=""
                  class="form-control form-control-sm"
                  placeholder=""
                  aria-describedby="helpId"
                />
              </div>

              <div class="d-flex">
                <button
                  type="submit"
                  id="submitBtn3"
                  class="btn btn-success btn-block"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <new-jackpot-modal></new-jackpot-modal>
  </div>
</template>
<script>
import Jackpots from "../../../services/cms";
import NewJackpotModal from "../../../components/NewJackpotModal.vue";
export default {
  scrollToTop: true,
  name: "ticket-jacpots",
  layout: "main",
  components: { NewJackpotModal },
  data() {
    return {
      title: "Ticket Jackpots",
      formData1: {
        id: "",
        name: "",
        currency: "",
        charge_share: "",
        low_limit_amount: "",
        high_limit_amount: "",
        min_stake_to_win: "",
        start_draw_interval: "00:00",
        end_draw_interval: "23:59",
        min_shown_amount: "",
        allowed_games: "",
        display_period: "",
      },
      formData2: {
        id: "",
        name: "",
        currency: "",
        charge_share: "",
        low_limit_amount: "",
        high_limit_amount: "",
        min_stake_to_win: "",
        start_draw_interval: "00:00",
        end_draw_interval: "23:59",
        min_shown_amount: "",
        allowed_games: "",
        display_period: "",
      },
      formData3: {
        id: "",
        name: "",
        currency: "",
        charge_share: "",
        low_limit_amount: "",
        high_limit_amount: "",
        min_stake_to_win: "",
        start_draw_interval: "00:00",
        end_draw_interval: "23:59",
        min_shown_amount: "",
        allowed_games: "",
        display_period: "",
      },
      loading: true,
      edit: false,
      results: [],
      currency: [],
    };
  },
  methods: {
    showJackpotModal() {
      this.$bvModal.show("modal-1");
    },
    getCurrency() {
      Jackpots.getCurrency().then((res) => {
        this.currency = res;
      });
    },
    updateJackpot1() {
      console.log(this.formData1);
      this.loading = true;
      $("#submitBtn1").attr("disabled", true).text("Submitting...");
      Jackpots.updateTicketJackpot(this.formData1.id, this.formData1).then(
        (res) => {
          if (res.success) {
            $("#submitBtn1").attr("disabled", false).text("Save");
            this.$swal("Success!", "Jackpot Setting 1 updated!", "success");
          } else {
            $("#submitBtn1").attr("disabled", false).text("Save");
            this.$swal("Error!", "An error occurred!", "error");
          }
        }
      );
    },
    updateJackpot2() {
      console.log(this.formData2);
      this.loading = true;
      $("#submitBtn2").attr("disabled", true).text("Submitting...");
      Jackpots.updateTicketJackpot(this.formData2.id, this.formData2).then(
        (res) => {
          if (res.success) {
            $("#submitBtn2").attr("disabled", false).text("Save");
            this.$swal("Success!", "Jackpot Setting 2 updated!", "success");
          } else {
            $("#submitBtn2").attr("disabled", false).text("Save");
            this.$swal("Error!", "An error occurred!", "error");
          }
        }
      );
    },
    updateJackpot3() {
      console.log(this.formData3);
      this.loading = true;
      $("#submitBtn3").attr("disabled", true).text("Submitting...");
      Jackpots.updateTicketJackpot(this.formData3.id, this.formData3).then(
        (res) => {
          if (res.success) {
            $("#submitBtn3").attr("disabled", false).text("Save");
            this.$swal("Success!", "Jackpot setting 3 updated!", "success");
          } else {
            $("#submitBtn3").attr("disabled", false).text("Save");
            this.$swal("Error!", "An error occurred!", "error");
          }
        }
      );
    },
    getJackpots() {
      Jackpots.getTicketJackpots().then((res) => {
        this.results = res;
      });
    },
    getJackpot1() {
      Jackpots.getTicketJackpots().then((res) => {
        this.results1 = res.data;
        this.formData1.id = res.data[0].id;
        this.formData1.name = res.data[0].name;
        this.formData1.currency = res.data[0].currency;
        this.formData1.charge_share = res.data[0].charge_share;
        this.formData1.low_limit_amount = res.data[0].low_limit_amount;
        this.formData1.high_limit_amount = res.data[0].high_limit_amount;
        this.formData1.min_stake_to_win = res.data[0].min_stake_to_win;
        this.formData1.start_draw_interval = res.data[0].start_draw_interval;
        this.formData1.end_draw_interval = res.data[0].end_draw_interval;
        this.formData1.min_shown_amount = res.data[0].min_shown_amount;
        this.formData1.allowed_games = res.data[0].allowed_games;
        this.formData1.display_period = res.data[0].display_period;
      });
    },
    getJackpot2() {
      Jackpots.getTicketJackpots().then((res) => {
        this.formData2.id = res.data[1].id;
        this.formData2.name = res.data[1].name;
        this.formData2.currency = res.data[1].currency;
        this.formData2.charge_share = res.data[1].charge_share;
        this.formData2.low_limit_amount = res.data[1].low_limit_amount;
        this.formData2.high_limit_amount = res.data[1].high_limit_amount;
        this.formData2.min_stake_to_win = res.data[1].min_stake_to_win;
        this.formData2.start_draw_interval = res.data[1].start_draw_interval;
        this.formData2.end_draw_interval = res.data[1].end_draw_interval;
        this.formData2.min_shown_amount = res.data[1].min_shown_amount;
        this.formData2.allowed_games = res.data[1].allowed_games;
        this.formData2.display_period = res.data[1].display_period;
      });
    },
    getJackpot3() {
      Jackpots.getTicketJackpots().then((res) => {
        this.formData3.id = res.data[2].id;
        this.formData3.name = res.data[2].name;
        this.formData3.currency = res.data[2].currency;
        this.formData3.charge_share = res.data[2].charge_share;
        this.formData3.low_limit_amount = res.data[2].low_limit_amount;
        this.formData3.high_limit_amount = res.data[2].high_limit_amount;
        this.formData3.min_stake_to_win = res.data[2].min_stake_to_win;
        this.formData3.start_draw_interval = res.data[2].start_draw_interval;
        this.formData3.end_draw_interval = res.data[2].end_draw_interval;
        this.formData3.min_shown_amount = res.data[2].min_shown_amount;
        this.formData3.allowed_games = res.data[2].allowed_games;
        this.formData3.display_period = res.data[2].display_period;
      });
    },
  },
  mounted() {
    // Jackpots.getTicketJackpots().then((res)=>{
    //     if (res.length) {
    //       this.formData1.name = res[0];
    //     } else {
    //       this.$swal("Error!", "An error occurred!", "error");
    //     }
    // })
    this.getCurrency();
    this.getJackpots();
    this.getJackpot1();
    this.getJackpot2();
    this.getJackpot3();
  },
  head() {
    return {
      title: "Ticket Jackpots",
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Ticket Jackpots");
  },
};
</script>
