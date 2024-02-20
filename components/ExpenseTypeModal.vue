<template>
  <div>
    <b-modal hide-footer id="expense-type" title="New Expense Type">
      <form @submit.prevent="saveType">
        <div class="form-group">
          <label for="">Title</label>
          <input type="text" name="title" v-model="form.title" id="" class="form-control" placeholder="" aria-describedby="helpId">
        </div>

        <div class="form-group">
          <label for="">Category</label>
          <select name="category_id" id="user_type" v-model="form.category_id" class="form-control">
          <option value=""></option>
          <option :value="category.id" v-for="(category, index) in categories" :key="index">{{ category.title }}</option>
        </select>
        </div>

        <div class="form-group">
          <label for="">Amount</label>
          <input type="number" name="amount" v-model="form.amount" id="" class="form-control" placeholder="" aria-describedby="helpId">
        </div>

        <b-form-checkbox id="checkbox-1" name="checkbox-1">
          Fixed
        </b-form-checkbox>
        <b-button class="pull-right" variant="success" id="submitBtn" type="submit">Submit</b-button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Category from "../services/cashflows";
export default {
  name: "expense-type",
  data() {
    return {
      title: "Settings",
      categories: [],
      form: {
        title: '',
        category_id: '',
        amount: '',
      }
    };
  },
  methods: {
    getCategory() {
      Category.getExpenseCategory().then((res) => {
        this.categories = res.data;
      });
    },
    saveType(){
      $('#submitBtn').attr('disabled', true).text('Submitting...');
      Category.createExpenseType(this.form).then((res) => {
        console.log(res);
        $('#submitBtn').attr('disabled', false).text('Submit');
        if (res.success) {
          this.closeModal()
          this.$swal('Success!', 'Expense Type added!', 'success');
          this.$nuxt.$emit('refresh_type');
        } else {
          this.closeModal()
          this.$swal('Error!', 'Something went wrong. Unable to carry out operation', 'error');
        }
      });
    },
    closeModal(){
      this.$bvModal.hide("expense-type");
      this.form = {
        title: '',
        category_id: '',
        amount: '',
      }
    }
  },
  mounted() {
    this.getCategory();
  },
};
</script>

<style></style>
