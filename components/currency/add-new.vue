<template>
  <div>
    <b-modal hide-footer id="currency-add" title="United States Dollar">
      <form @submit.prevent="">
        <div class="row gx-2">
          <div class="col-md-6">
            <div class="form-group">
              <label for="">Name</label>
              <input type="text" value="United States Dollar" id="" class="form-control" placeholder="" aria-describedby="helpId">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="">Code</label>
              <input type="text" value="USD" id="" class="form-control" placeholder="" aria-describedby="helpId">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="">Rate</label>
              <input type="text" value="456" id="" class="form-control" placeholder="" aria-describedby="helpId">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="">Status</label>
              <input type="text" value="Active" id="" class="form-control" placeholder="" aria-describedby="helpId">
            </div>
          </div>
        </div>

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
export default {
  name: "add-currency",
  data() {
    return {
      form: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
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
