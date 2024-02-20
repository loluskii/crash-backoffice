<template>
  <b-modal id="modal-1" title="New Ticket Jackpot">
    <form @submit.prevent="saveTicketJackpot">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="">Display Name</label>
            <input
              type="text"
              name=""
              id=""
              v-model="formData1.name"
              class="form-control"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="">Currency</label>
            <input
              type="text"
              name=""
              id=""
              v-model="formData1.currency"
              class="form-control"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="">Low Limit Amount</label>
            <input
              type="text"
              name=""
              id=""
              class="form-control"
              v-model="formData1.low_limit_amount"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="">High Limit Amount</label>
            <input
              type="text"
              name=""
              id=""
              v-model="formData1.high_limit_amount"
              class="form-control"
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
              class="form-control"
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
              class="form-control"
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
              class="form-control"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="">Jackpot Display Period</label>
            <input
              type="text"
              name=""
              id=""
              v-model="formData1.display_period"
              class="form-control"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="">Draw Interval</label>
        <div class="row align-items-center">
          <div class="col-6">
            <input
              type="text"
              class="form-control"
              v-model="formData1.start_draw_interval"
              name=""
              id=""
            />
          </div>
          <span class="col-1">-</span>
          <div class="col-5">
            <input
              type="text"
              class="form-control"
              v-model="formData1.end_draw_interval"
              name=""
              id=""
            />
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
          class="form-control"
          placeholder=""
          aria-describedby="helpId"
        />
      </div>
      <div class="d-flex">
        <button type="submit" id="submitBtn" class="btn btn-success btn-block">
          Save
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import Jackpot from "../services/cms";
export default {
  name: "cash-in",
  data() {
    return {
      formData1: {
        name: "",
        currency: "",
        charge_share: "",
        low_limit_amount: "",
        high_limit_amount: "",
        min_stake_to_win: "",
        start_draw_interval: "",
        end_draw_interval: "",
        min_shown_amount: "",
        allowed_games: "",
        display_period: "",
      },
    };
  },
  methods: {
    saveTicketJackpot() {
      $("#submitBtn").attr("disabled", true).text("Submitting...");
      Jackpot.createTicketJackpots(this.formData1).then((res) => {
        console.log(res);
        if (res.success) {
          $("#submitBtn").attr("disabled", true).text("Submit");
          this.closeModal();
          this.$swal("Success!", "Jackpot saved!", "success");
          this.$nuxt.$emit("refresh_cashin");
        } else {
          this.$swal("Error!","Maximum of 3 Jackpots allowed!", "error");
        }
      });
    },
    closeModal() {
      this.$bvModal.hide("modal-1");
      this.formData1 = {
        name: "",
        currency: "",
        charge_share: "",
        low_limit_amount: "",
        high_limit_amount: "",
        min_stake_to_win: "",
        start_draw_interval: "",
        end_draw_interval: "",
        min_shown_amount: "",
        allowed_games: "",
        display_period: "",
      };
    },
  },
  mounted() {},
};
</script>

<style>
.modal-footer {
  display: none;
}
</style>
