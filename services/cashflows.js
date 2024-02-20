import axios from "~/plugins/axios";

export default {

  getAgentList(){
    return axios
      .get("/api/admin/list/agents")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  getCashbookList(data){
    return axios
      .post("/api/admin/list/newagentlist", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },




  // ==== EXPENSE CATEGORY ====
  // CREATE
  createExpenseCategory(data) {
    return axios
      .post("/api/expenses/categories/store", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //LIST CATEGORIES
  getExpenseCategory() {
    return axios
      .get("/api/expenses/categories")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //CATEGORY BY ID
  getExpenseCategoryId(id) {
    return axios
      .get("/api/expenses/categories/show/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //UPDATE CATEGORY
  updateExpenseCategory(id, data) {
    return axios
      .get("/api/expenses/categories/update/" + id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //DELETE CATEGORY
  deleteExpenseCategory(id) {
    return axios
      .get("/api/expenses/categories/delete/" + id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  //  ==== EXPENSE TYPE ====
  //CREATE TYPE
  createExpenseType(data) {
    return axios
      .post("/api/expenses/types/store", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //LIST TYPES
  getExpenseType() {
    return axios
      .get("/api/expenses/types")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //TYPE BY ID
  getExpenseTypeId(id) {
    return axios
      .get("/api/show/expenses/types/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //UPDATE BY ID
  updateExpenseType(id, data) {
    return axios
      .get("/api/expenses/types/update" + id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  // ==== EXPENSE ====
  //CREATE EXPENSES
  createExpense(data) {
    return axios
      .post("/api/expenses/store", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //LIST EXPENSES
  getExpense() {
    return axios
      .get("/api/expenses")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //GET EXPENSE BY ID
  getExpenseId(id) {
    return axios
      .get("/api/expenses/show/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //UPDATE EXPENSE BY ID
  updateExpense(id, data) {
    return axios
      .put("/api/expenses/update/" + id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },

  updateExpenseStatus(id, status){
    return axios
      .post("api/expenses/update/"+id+"/"+status)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //DELETE EXPENSE BY ID
  deleteExpense(id) {
    return axios
      .delete("/api/expenses/delete/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },

  // ==== DEDUCTIONS ====
  //CREATE DEDUCTION
  createDeductions(data) {
    return axios
      .post("/api/admin/create/deduction", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.data;
      });
  },
  //GET DEDUCTION
  getDeductions(page) {
    return axios
      .get("/api/admin/list/deduction?page="+page)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //GET DEDUCTION BY ID
  getDeductionsId(id) {
    return axios
      .get("/api/admin/show/deduction/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //GET DEDUCTION BY FILTER
  getDeductionsFilter(filterData, page) {
    return axios
      .post("/api/admin/filter/deduction", filterData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        toastr["error"]("Somthing went wrong", "Error");
        return response.data;
      });
  },
  //UPDATE DEDUCTION BY ID
  updateDeduction(id, data) {
    return axios
      .get("/api/admin/show/deduction/" + id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },

  //  ==== CASHOUT ====
  createCashOut(data) {
    return axios
      .post("/api/cash-out/store", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //LIST CASHIN
  getCashOut(){
    return axios
      .get("/api/cash-out")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //GET CASHIN BY ID
  getCashOutId(id){
    return axios
      .get("api/admin/show/cashout/"+id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },

  //UPDATE CASHIN BY ID
  updateCashOutStatus(id, status){
    return axios
      .post("api/cash-out/update/"+id+"/"+status)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },

  //DELETE
  deleteCashOutId(id){
    return axios
      .delete("api/cash-out/delete/"+id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },


  //FILTER
  getCashOutFilter(filterData, page){
    return axios
      .post("api/admin/filter/cashout?page="+page, filterData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },

  //  ==== CASHIN =====
  // CREATE CASHIN
  createCashIn(data) {
    return axios
      .post("/api/cash-in/store", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //LIST CASHIN
  getCashIn(){
    return axios
      .get("/api/cash-in")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //GET CASHIN BY ID
  getCashInId(id){
    return axios
      .get("api/cash-in/show/"+id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //UPDATE CASHIN BY ID
  updateCashIn(data, id){
    return axios
      .get("api/cash-in/update/"+id, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  // UPDATE CASHIN  STATUS
  updateCashinStatus(id, status, data){
    console.log(id)
    return axios
      .post(`api/cash-in/update/${id}/${status}`, data)
      .then((response) => {
        return response.data;
      })
      // .catch((error) => {
      //   console.log("Error", error);
      //   toastr["error"]("An error occured.", "Error");
      // });
  },
  //DELETE
  deleteCashInId(id){
    return axios
      .delete("api/cash-in/delete/"+id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  },
  //FILTER
  getCashInFilter(filterData, page){
    return axios
      .post("api/admin/filter/cashin?page="+page, filterData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error", error.data.message);
        toastr["error"]("An error occured.", "Error");
      });
  }

};
