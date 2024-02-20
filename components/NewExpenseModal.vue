<template>
  <b-modal hide-footer id="expenseModal" title="New Expense">
    <form @submit.prevent="saveExpense">
      <b-form-group id="input-group-3" label="Expense:" label-for="expense">
        <b-form-select id="expense" v-model="formData.expense_type_id" required>
          <option value="">Select ...</option>
            <option v-for="(expense, index) in expenses" :key="index" :value="expense.id">{{ expense.title }}</option>
        </b-form-select>
      </b-form-group>

      <!-- <div class="form-group">
          <label for="">Date</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text bg-white"
                ><i class="fa fa-fw ti-calendar"></i
              ></span>
            </div>
            <flat-pickr
              v-model="formData.date"
              :config="config"
              class="form-control"
            ></flat-pickr>
          </div>
        </div> -->

      <b-form-group id="input-group-3" label="Branch:" label-for="expense">
        <b-form-select id="expense" v-model="formData.branch_id" required>
            <option value="">Select ...</option>
            <option v-for="(agent, index) in agents" :key="index" :value="agent.id">{{ agent.name }}</option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="input-group-1" label="Amount" label-for="amount">
        <b-form-input
          id="amount"
          type="text"
          placeholder="Enter amount"
          required
          v-model="formData.amount"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Comment:" label-for="input-2">
        <b-form-textarea
          id="textarea"
          v-model="formData.comment"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <div class="row">
        <div class="col-12">
          <b-button type="submit" id="submitBtn" class="pull-right" variant="primary"
            >Submit</b-button
          >
        </div>
      </div>
    </form>
  </b-modal>
</template>

<script>
import Expenses from "../services/cashflows";
export default {
  name: "expense-modal",
  data(){
    return {
      formData: {
        expense_type_id:'',
        // date:this.$moment().format("DD-MM-YYYY"),
        branch_id: '',
        amount: '',
        comment: '',
      },
      config: {
        wrap: true,
        dateFormat: "d-m-Y",
      },
      agents:[],
      expenses: [],
    }
  },
  methods:{
    getAgentList() {
      this.loading = true;
      Expenses.getAgentList().then((res) => {
        this.agents = res.data.data;
        this.loading = false;
      });
    },
    getExpenseType(){
      this.loading = true;
      Expenses.getExpenseType().then((res)=>{
        this.expenses = res.data;
        this.loading = false;
      })
    },
    saveExpense(){
      this.loading = true;
      $('#submitBtn').attr('disabled', true).text('Submitting...');
      Expenses.createExpense(this.formData).then((res)=>{
        $('#submitBtn').attr('disabled', false).text('Submit');
        if(res.success){
          this.closeModal();
          this.$swal('Success!', 'Transaction was successful', 'success');
          this.$nuxt.$emit('refresh_expenses');
        }
      })
    },
    closeModal() {
      this.$bvModal.hide("expenseModal");
      this.formData = {
        expenseType_id:'',
        date:'',
        branch_id: '',
        amount: '',
        comment: '',
      };
    },
  },
  mounted(){
    this.getExpenseType();
    this.getAgentList();
  }
};
</script>

<style></style>
