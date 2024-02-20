<template>
    <div>
      <div class="card">
        <div class="card-header bg-primary">
          <h3 class="card-title">Fixtures</h3>
          <span class="float-right d-flex">
            <div class="mr-2">
            <select class="form-control" v-model="currentWeek" @change="changeWeek($event)">
              <option value="2023-05-21">Week 46</option>
              <option value="2023-05-28">Week 47</option>
              <option value="2023-06-03">Week 48</option>
              <option value="2023-06-10">Week 49</option>
              <option value="2023-06-17">Week 50</option>
              <option value="2023-06-24">Week 51</option>
              <option value="2023-07-01">Week 52</option>
              <option value="2023-07-08">Week 53</option>
              <option value="2023-07-15">Week 54</option>
            </select>
            </div>
            <div class="mr-2">
              <button class="btn btn-default">
                  <img src="~/assets/img/excel.png" height="16" alt="">
              </button>
            </div>
            <div>
            <b-btn v-b-modal.uploadResults class="btn btn-secondary btn-block">
              Upload Result
            </b-btn>
            </div>
          </span>
        </div>
        <div class="card-body nopadding">
            <form @submit.prevent="saveChanges">
                <div class="table-responsive" >
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr class="text-center">
                                <th style="width: 2%">S/N</th>
                                <th style="width: 15%">Home Team</th>
                                <th style="width: 15%">Away Team</th>
                                <th style="width: 5%">Odds</th>
                                <th style="width: 5%">Scores</th>
                                <th style="width: 10%">Results</th>
                                <th style="width: 10%">Status</th>
                                <th style="width: 10%">Date</th>
                                <th style="width: 5%">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in formData.fixtures" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <input type="text" v-model="data.home_team" class="form-control">
                                </td>
                                <td>
                                  <input type="text" v-model="data.away_team" class="form-control">
                                </td>
                              <td>
                                <input type="text" v-model="data.odds" class="form-control">
                              </td>
                                <td class="text-center">{{ data.score ? data.score : '-:-'}}</td>
                                <td class="text-center">{{ data.result ? data.result : ''}}</td>
                                <td class="text-center">{{ data.status ? data.status : ''}}</td>
                                <td>
                                  <input type="text" v-model="data.event_date" class="form-control" :placeholder="currentDate">
                                </td>
                                <td>
                                  <input type="text" v-model="data.event_time" class="form-control" :placeholder="currentTime">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-md-6 text-right">
                      <a href="javascript:;" v-if="formData.fixtures.length < 49" class="text-success" @click="addMore">
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
      <upload-fixture-results :week="currentWeek" />
    </div>
</template>
<script>
import card from "../../components/card.vue"
import UploadFixtureResults from "../../components/UploadFixtureResults";
export default {
    name: "weekly_coupon",
    layout: 'main',
    components:{
      UploadFixtureResults,
        card
    },
    data(){
        return {
            currentDate: this.$moment().format('YYYY-MM-DD'),
            currentTime: this.$moment().format('HH:MM'),
            title: 'Pool Fixtures',
            tournaments: [],
            events: [],
            coupons: [],
            dateOptions: [],
            currentWeek: this.$moment().day('Saturday').format('YYYY-MM-DD'),
            formData: {
              fixtures: [
                {
                  home_team: '',
                  away_team: '',
                  odds: '',
                  event_date: this.$moment().day('Saturday').format('YYYY-MM-DD'),
                  event_time: '',
                  score: '',
                  result: '',
                  status: ''
                }
              ],
              week: ''
            }
        }
    },
    head () {
        return {
            title: this.title
        }
    },
    asyncData ({ store }) {
        store.dispatch('setTitle', 'Pool Fixtures')
    },
    methods: {
        setEvent(tournament, index){
            const found = this.tournaments.find(item => item.id === tournament.id);
            if (found) {
              this.formData[index].sport_tournament_name = found.tournament;
              this.formData[index].sport_category_name = found.category;
            }
        },
        addMore() {
          this.formData.fixtures.push(
            {
              home_team: '',
              away_team: '',
              event_date: this.currentWeek,
              event_time: '',
              score: '',
              result: '',
              status: ''
            }
          )
        },
        saveChanges(){
          // console.log(this.formData);
            if (this.formData.fixtures.length !== 49) {
              this.notify({message: 'Fixtures must be up to 49 before saving.', title: 'Error', type: 'error'});
              return;
            }
          $('#saveBtn').attr('disabled', true).text('Saving...');
            this.$axios.post('/admin/pools/fixtures/save', this.formData).then(res => {
                $('#saveBtn').attr('disabled', false).text('Save');
                if(res.data.success){
                    this.notify({message: 'Saved', title: 'Success', type: 'success'});
                }
            }).catch(error => {
                $('#saveBtn').attr('disabled', false).text('Save');
                this.notify({message: error.data.message, title: 'Error', type: 'error'});
            })
        },
      getFixtures() {
        this.$axios.get(`/admin/pools/fixtures?week=${this.currentWeek}`).then(res => {
          this.coupons = res.data;
          // console.log(this.coupons);
          if(this.coupons.length){
            this.formData.fixtures = this.coupons;
          } else {
            this.formData.fixtures = [];
          }
        })
      },
      changeWeek(e) {
          this.currentWeek = e.target.value;
          this.getFixtures();
      }
    },
    mounted(){
        this.getFixtures();
        this.formData.week = this.currentWeek;
        this.$nuxt.$on('uploaded-results', () => {
          this.getFixtures();
        });
        // for (let i = 0; i <= 4; i++) {
        //   this.dateOptions.push({
        //     value:
        //   })

        // }

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
