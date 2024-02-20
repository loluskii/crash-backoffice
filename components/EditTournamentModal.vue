<template>
  <b-modal
    hide-footer
    id="tournamentModal"
    @ok="save"
    size="md"
    :title="tournament.name"
    ref="tournamentModal"
  >
    <form @submit.prevent="save">
      <div class="form-group row">
        <label class="col-md-6 form-control-label text-left">Margin:</label>
        <div class="col-md-6">
          <b-form-input
            id="margin"
            type="text"
            :class="{ input: true, 'is-danger': errors.has('form.margin') }"
            v-model="form.margin"
            name="margin"
            v-validate="'required|min:1'"
          />
        </div>
        <i
          v-show="errors.has('form.margin')"
          class="fa fa-warning text-danger"
        ></i>
        <span v-show="errors.has('margin')" class="help is-danger text-danger">
          {{ errors.first("form.margin") }}
        </span>
      </div>
      <div class="form-group row">
        <label class="col-md-6 form-control-label text-left"
          >Combinability:</label
        >
        <div class="col-md-6">
          <b-form-select
            id="target"
            :class="{
              input: true,
              'is-danger': errors.has('form.combinability'),
            }"
            v-model="form.combinability"
            name="combinability"
            v-validate="'required'"
            :options="[
              { value: 'single', text: 'Single' },
              { value: 'double', text: 'Double' },
              { value: 'treble', text: 'Treble' },
              { value: 'min_5', text: 'Min. 5' },
            ]"
          >
          </b-form-select>
        </div>
        <i
          v-show="errors.has('form.combinability')"
          class="fa fa-warning text-danger"
        ></i>
        <span
          v-show="errors.has('form.combinability')"
          class="help is-danger text-danger"
        >
          {{ errors.first("form.combinability") }}
        </span>
      </div>
      <div class="form-group row">
        <label class="col-md-6 form-control-label text-left">Status:</label>
        <div class="col-md-6">
          <label for="status_enable">
            <input
              id="status_enable"
              name="status"
              type="radio"
              :value="1"
              v-model="form.status"
            />
            Enable
          </label>
          <label for="status_disable">
            <input
              id="status_disable"
              name="status"
              type="radio"
              :value="0"
              v-model="form.status"
            />
            Disable
          </label>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-6 form-control-label text-left">Cash Out:</label>
        <div class="col-md-6">
          <label for="enable_cashout">
            <input
              id="enable_cashout"
              name="enable_cashout"
              type="radio"
              :value="1"
              v-model="form.enable_cashout"
            />
            Enable
          </label>
          <label for="disable_cashout">
            <input
              id="disable_cashout"
              name="enable_cashout"
              type="radio"
              :value="0"
              v-model="form.enable_cashout"
            />
            Disable
          </label>
        </div>
      </div>
      <b-button
        class="pull-right ml-2"
        type="button"
        @click="$refs.tournamentModal.hide()"
        >Close</b-button
      >
      <b-button
        class="pull-right"
        id="submitBtn"
        variant="primary"
        type="submit"
        :disabled="loading"
      >
        <i class="fa fa-spin fa-spinner" v-if="loading" /> Save </b-button
      >&nbsp;
    </form>
  </b-modal>
</template>
<script>
import API from "../services/sports";

export default {
  data() {
    return {
      form: {
        margin: "",
        enable_cashout: "",
        combinability: "",
        status: "",
      },
      tournament: {},
      loading: false,
    };
  },
  computed: {
    isValid() {},
  },
  methods: {
    save() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true;
          API.updateOddsMargin(this.form)
            .then((res) => {
              this.loading = false;
              if (res.success) {
                this.$swal(
                  "Success!",
                  "Odds has been updated for " + this.tournament.name,
                  "success"
                );
              } else {
                this.$swal("Error!", res.message, "error");
              }
            })
            .catch((err) => {
              this.loading = false;
              this.$swal("Error!", "Internal server error", "error");
            });
        }
      });
    },
  },
  mounted() {
    this.$nuxt.$on("tournament_modal", (data) => {
      this.tournament = data;
      this.$refs.tournamentModal.show();
      this.form = {
        margin: data.odds_margin,
        enable_cashout: data.enable_cashout,
        status: data.status,
        tid: data.sport_tournament_id,
        combinability: data.combinability,
      };
    });
  },
};
</script>
