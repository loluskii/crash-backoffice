<template>
  <div>
    <b-modal hide-footer id="expense-category" title="New Expense Category">
      <form @submit.prevent="saveCategory">
        <b-form-group id="title" label="Title" label-for="title">
          <b-form-input
            id="title"
            placeholder="Enter title"
            required
            v-model="form.title"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-textarea
            id="textarea"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
            v-model="form.description"
          ></b-form-textarea>
        </b-form-group>
        <b-button
          class="pull-right"
          variant="success"
          id="submitBtn"
          type="submit"
          >Submit</b-button
        >
      </form>
    </b-modal>
  </div>
</template>

<script>
import Category from "../services/cashflows";
export default {
  name: "expense-category",
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    saveCategory() {
      $("#submitBtn").attr("disabled", true).text("Submitting...");
      Category.createExpenseCategory(this.form).then((res) => {
        $("#submitBtn").attr("disabled", false).text("Submit");
        if (res.success) {
          this.closeModal();
          this.$swal("Success!", "Category added!", "success");
          this.$nuxt.$emit("refresh_category");
        } else {
          this.closeModal();
          this.$swal(
            "Error!",
            "Something went wrong. Unable to carry out operation",
            "error"
          );
        }
      });
    },
    closeModal() {
      this.$bvModal.hide("expense-category");
      this.form = {
        title: "",
        description: "",
      };
    },
  },
};
</script>

<style></style>
