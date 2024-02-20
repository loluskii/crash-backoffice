<template>
  <form>
    <div class="container-fluid">
      <b-form-group id="input-group-1" label="Date" label-for="date">
        <b-form-input
          id="date"
          type="date"
          placeholder="Enter date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Branch:" label-for="input-3">
        <b-form-select id="input-3" required></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Amount:" label-for="input-2">
        <b-form-input
          id="input-2"
          placeholder="Enter amount"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Comment:" label-for="input-2">
        <b-form-textarea
          id="textarea"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <div class="row">
        <div class="col-12">
          <b-button type="submit" class="pull-right" variant="primary"
            >Submit</b-button
          >
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "CashflowForm",
};
</script>

<style></style>
