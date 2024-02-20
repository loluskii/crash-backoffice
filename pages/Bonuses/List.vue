<template>
  <div>
    <button
      @click="showModal"
      class="btn btn-success"
      style="margin-right: 10px"
    >
      <i class="fa fa-fw fa-plus"></i>
      Add New
    </button>
    <card title="List">
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="bg-grey-100">
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Target</th>
              <th>Bonus Type</th>
              <th>Trigger</th>
              <th>Value</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(bonus, index) in bonuses"
              v-if="bonuses.length > 0"
              :key="index"
            >
              <td>{{ bonus.name }}</td>
              <td>{{ bonus.code }}</td>
              <td>{{ bonus.target }}</td>
              <td>{{ bonus.bonus_type }}</td>
              <td>{{ bonus.trigger }}</td>
              <td>{{ bonus.value }}</td>
              <td>
                <a
                  href="javascript:;"
                  class="text-success"
                  @click="updateStatus(bonus.id, 1)"
                  v-if="bonus.status === 0"
                  >Activate</a
                >
                <a
                  href="javascript:;"
                  class="text-danger"
                  @click="updateStatus(bonus.id, 0)"
                  v-if="bonus.status === 1"
                  >Deactivate</a
                >
              </td>
              <td class="text-nowrap">
                <div class="ui-group-buttons">
                  <button @click="showModal(bonus)" class="btn btn-primary">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <div class="or"></div>
                  <a
                    href="#"
                    class="btn btn-danger"
                    role="button"
                    @click="deleteBonus($event, bonus.id)"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </div>
              </td>
            </tr>
            <tr v-if="!bonuses.length && !loading">
              <td colspan="8" align="center">No record found</td>
            </tr>
            <tr v-if="loading">
              <td colspan="8" class="text-center">
                <i class="fa fa-4x fa-spin fa-spinner"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card>
    <bonus-form-modal />
  </div>
</template>
<script>
import card from "../../components/card.vue";
import Bonuses from "../../services/bonuses.js";
import BonusFormModal from "../../components/BonusFormModal";
export default {
  scrollToTop: true,
  name: "pages",
  layout: "main",
  components: {
    card,
    BonusFormModal,
  },
  data() {
    return {
      title: "Bonus Manager",
      bonuses: [],
      loading: true,
    };
  },
  methods: {
    getBonuses(page) {
      Bonuses.getBonuses(page).then((res) => {
        this.bonuses = res.data.data;
        this.loading = false;
      });
    },
    updateStatus(id, status) {
      Bonuses.updateStatus(id, status).then((res) => {
        this.getBonuses(1);
      });
    },
    deleteBonus: function deleteBonus(e, id) {
      const self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You will not be able to recover this item",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete item!",
          cancelButtonText: "No, keep item",
        })
        .then(
          (result) => {
            if (result.value) {
              Bonuses.deleteBonus(id).then((res) => {
                if (res.success) {
                  $(e.target).closest("tr").remove();
                  self.$swal("Deleted!", "Item has been removed", "success");
                }
              });
            }
          },
          function (dismiss) {}
        );
    },
    showModal(bonus = null) {
      this.$nuxt.$emit("show_bonus_modal", bonus);
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Bonus Manager");
  },
  mounted() {
    this.getBonuses(1);

    this.$nuxt.$on("refresh_bonus_list", () => {
      this.getBonuses(1);
    });
  },
};
</script>
