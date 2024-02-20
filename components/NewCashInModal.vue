<template>
  <b-modal id="modal-1" title="New Cash In">
    <form @submit.prevent="saveCashIn">
      <div class="container-fluid">
        <div class="form-group">
          <label for="">Date</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text bg-white"
                ><i class="fa fa-fw ti-calendar"></i
              ></span>
            </div>
            <flat-pickr
              v-model="form.date"
              :config="config"
              class="form-control"
            ></flat-pickr>
          </div>
        </div>

        <b-form-group id="input-group-3" label="Branch:" label-for="input-3">
          <b-form-select id="input-3" required v-model="form.branch_id">
            <option value="">Select ...</option>
            <option
              v-for="(agent, index) in agents"
              :key="index"
              :value="agent.id"
            >
              {{ agent.name }}
            </option>
          </b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Amount:" label-for="input-2">
          <b-form-input
            id="input-2"
            placeholder="Enter amount"
            required
            v-model="form.amount"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Comment:" label-for="input-2">
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            v-model="form.comment"
          ></b-form-textarea>
        </b-form-group>

        <div class="row">
          <div class="col-12">
            <b-button
              type="submit"
              id="submitBtn"
              class="pull-right"
              variant="primary"
              >Submit</b-button
            >
          </div>
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script>
import CashIn from "../services/cashflows";
export default {
  name: "cash-in",
  data() {
    return {
      form: {
        date: this.$moment().format("DD-MM-YYYY"),
        branch_id: "",
        amount: "",
        comment: "",
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      agents: [],
    };
  },
  methods: {
    getAgentList() {
      this.loading = true;
      CashIn.getAgentList().then((res) => {
        this.agents = res.data.data;
        this.loading = false;
      });
    },

    saveCashIn() {
      $("#submitBtn").attr("disabled", true).text("Submitting...");
      CashIn.createCashIn(this.form).then((res) => {
        if (res.success) {
          $("#submitBtn").attr("disabled", true).text("Submit");
          this.closeModal();
          this.$swal("Success!", "CashIn saved!", "success");
          this.$nuxt.$emit("refresh_cashin");
        } else {
          this.$swal("An Error occured!", "error");
        }
      });
    },
    closeModal() {
      this.$bvModal.hide("modal-1");
      this.form = {
        date: "",
        branch_id: "",
        amount: "",
        comment: "",
      };
    },
  },
  mounted() {
    this.getAgentList();
  },
};
</script>

<style>
.modal-footer {
  display: none;
}
</style>
