<template>
    <div>
      <div class="card">
        <div class="card-header bg-primary">
          <h3 class="card-title">Bonuse Groups</h3>

        </div>
        <div class="card-body nopadding">
            <form @submit.prevent="saveChanges">
                <div class="table-responsive" >
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr class="text-center">
                                <th style="width: 10%">Group</th>
                                <th style="width: 10%">Avg. Min Sel</th>
                                <th style="width: 10%">Avg. Max Sel</th>
                                <th style="width: 10%">GGR Margin < 80%</th>
                                <th style="width: 10%">GGR Margin >= 80%</th>
                                <th style="width: 10%">Bonus Rate</th>
                                <th style="width: 10%">Target Stake</th>
                                <th style="width: 10%">Target Coupon</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in formData" :key="index">
                              <td>Group {{ data.group }}</td>
                              <td>
                                  <input type="text" v-model="data.min_sel" class="form-control">
                              </td>
                              <td>
                                <input type="text" v-model="data.max_sel" class="form-control">
                              </td>
                              <td>
                                <div class="form-group form-inline">
                                  <input type="text" style="width: 100px" v-model="data.rate_is_less" class="form-control">
                                  <span>%</span>
                                </div>
                              </td>
                              <td>
                                <div class="form-group form-inline">
                                  <input type="text" style="width: 100px" v-model="data.rate_is_more" class="form-control">
                                  <span>%</span>
                                </div>
                              </td>
                              <td>
                                <div class="form-group form-inline">
                                  <input type="text" style="width: 100px" v-model="data.rate" class="form-control">
                                  <span>%</span>
                                </div>
                              </td>
                              <td>
                                <input type="text" v-model="data.target_stake" class="form-control">
                              </td>
                              <td>
                                <input type="text" v-model="data.target_coupon" class="form-control">
                              </td>
                              <td>
                                <a href="javascript:;" v-if="index > 4" class="text-danger" @click="removeRow(index)">
                                  <i class="fa fa-minus"></i> Remove
                                </a>
                              </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-md-6 text-right">
                      <a href="javascript:;" class="text-success" @click="addMore">
                        <i class="fa fa-plus"></i> Add More
                      </a>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-success btn-block" id="saveBtn" type="submit">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
</template>
<script>
import card from "../../components/card.vue"
export default {
    name: "bonus_group",
    layout: 'main',
    components:{
      card
    },
    data(){
        return {
          title: 'Manage Commission Bonus Groups',
          formData:  [
            {
              min_sel: '',
              max_sel: '',
              rate_is_less: '',
              rate_is_more: '',
              target_stake: '',
              target_coupon: '',
              rate: '',
              group: 'A'
            }
          ],
        }
    },
    head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Manage Commission Bonus Groups')
    },
    methods: {
      addMore() {
        const lastGroup = this.formData[this.formData.length - 1];
        this.formData.push(
          {
            min_sel: '',
            max_sel: '',
            rate_is_less: '',
            rate_is_more: '',
            target_stake: '',
            target_coupon: '',
            rate: '',
            group: String.fromCharCode(lastGroup.group.charCodeAt() + 1)
          }
        )
      },
      removeRow(index){
          this.formData.splice(index, 1);
      },
      saveChanges(){
        // console.log(this.formData);
          if (this.formData.length < 4) {
            this.notify({message: 'Bonus groups must not be less than 4', title: 'Error', type: 'error'});
            return;
          }
        $('#saveBtn').attr('disabled', true).text('Saving...');
          this.$axios.post('/commissions/bonus-groups', this.formData).then(res => {
              $('#saveBtn').attr('disabled', false).text('Save');
              if(res.data.success){
                  this.notify({message: 'Saved', title: 'Success', type: 'success'});
              } else {
                this.notify({message: res.data.message, title: 'Error', type: 'error'});
              }
          }).catch(error => {
              $('#saveBtn').attr('disabled', false).text('Save');
              this.notify({message: error.data.message, title: 'Error', type: 'error'});
          })
      },
      getBonusGroups() {
        this.$axios.get(`/commissions/bonus-groups`).then(res => {
          if(res.data.data.length) {
            let lastGroup = 'A';
            this.formData = [];
            for (const group of res.data.data) {
              this.formData.push(
                {
                  min_sel: group.min_sel,
                  max_sel: group.max_sel,
                  rate_is_less: group.rate_is_less,
                  rate_is_more: group.rate_is_more,
                  rate: group.rate,
                  target_coupon: group.target_coupon,
                  target_stake: group.target_stake,
                  group: lastGroup
                }
              )
              lastGroup = String.fromCharCode(lastGroup.charCodeAt() + 1)
            }
          }
        })
      },
    },
    mounted(){
        this.getBonusGroups();
    },
    notifications: {
        notify: {
            title: '',
            message: '',
            type: ''
        }
    }
}
</script>
