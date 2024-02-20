<template>
    <b-modal id="commission_profile"
    :no-close-on-backdrop="true" size="md" title="Commission Profile" ref="commissionProfile">
      <table class="table text-center" v-if="profile">
        <tbody >
          <tr>
            <td class="font-weight-bolder">Name</td>
            <td>{{ profile.name }}</td>
          </tr>
          <tr>
            <td class="font-weight-bolder">Provider Group</td>
            <td>{{ profile.provider_group }}</td>
          </tr>
          <tr>
            <td class="font-weight-bolder">Period</td>
            <td>{{ profile.period }}</td>
          </tr>
          <tr>
            <td class="font-weight-bolder">Commission Type</td>
            <td>
              <span v-if="profile.commission_type == 1"
                >Turnover ( {{ profile.period }} )</span
              >
              <span v-if="profile.commission_type == 2"
                >Turnover ( {{ profile.period }} )</span
              >
              <span v-if="profile.commission_type == 3"
                >Turnover ( {{ profile.period }} )</span
              >
            </td>
          </tr>
          <tr>
            <td class="font-weight-bolder">Type</td>
            <td>{{ profile.type }}</td>
          </tr>
          <tr v-if="profile.type == 'flat'">
            <td class="font-weight-bolder">Percentage</td>
            <td>{{ profile.percentage }}</td>
          </tr>
        </tbody>
      </table>
      <div class="card shadow-none my-0 border-0 border-top-none" v-if="profile && profile.turnovers.length">
        <div class="card-header bg-primary rounded-0">
          <h5 class="mb-0">TURNOVER</h5>
        </div>
        <div class="card-body table-responsive">
          <div
            class="d-flex align-items-center mb-2"
            v-for="(input, index) in profile.turnovers"
            :key="`input-${index}`"
          >
            <div class="d-flex align-items-center mr-4">
              <label for="" class="mr-1 mb-0 pl-2 pr-3 py-1 border"
                >Events</label
              >
              <input
                type="text"
                style="width: 65px"
                v-model="input.event"
                class="form-control"
                readonly
              />
            </div>
            <div class="d-flex align-items-center">
              <label for="" class="mr-1 mb-0 pl-2 pr-3 py-1 border"
                >Percentage</label
              >
              <input
                type="text"
                style="width: 65px"
                v-model="input.percentage"
                class="form-control"
                readonly
              />
            </div>
            <div class="d-flex" v-if="input.odd_set">
              <div class="d-flex align-items-center mr-4">
                <label for="" class="mr-1 mb-0 pl-2 pr-3 py-1 border"
                  >Odds >=
                </label>
                <input
                  type="text"
                  style="width: 65px"
                  placeholder="0.00"
                  v-model="input.min_odd"
                  class="form-control"
                />
              </div>
              <div class="d-flex align-items-center">
                <label for="" class="mr-1 mb-0 pl-2 pr-3 py-1 border"
                  >Odds <=
                </label>
                <input
                  type="text"
                  style="width: 65px"
                  placeholder="0.00"
                  v-model="input.max_odd"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
</template>
<script>

    export default {
      data(){
        return {
          profile: null
        }
      },
      methods:{
        closeModal(){
          this.$refs.commissionProfile.hide();
          this.profile = null;
        },
      },
      mounted(){
          this.$nuxt.$on('commission_profile_show', (data) => {

              this.$refs.commissionProfile.show();
              this.profile = data;
          })
      }
    }
</script>
