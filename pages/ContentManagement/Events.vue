<template>
  <div class="page">
  <div class="page-content">
    <div class="panel" id="exampleReport">
        <div class="panel-body">
<!--          <form @submit.prevent="findEvent" method="post" style="margin-bottom: 10px">
            <div class="row">
              <div class="form-group col-md-2">
                <label for="status">Sport</label>
                <select class="form-control" name="status" id="status" v-model="filterData.sport_id" @change="setCategories">
                  <option value="all">All Sports</option>
                  <option v-for="sport in sports" :value="sport.provider_id" :key="sport.provider_id" :data-categories="JSON.stringify(sport.categories)">{{sport.name}}</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="status">Category</label>
                <select class="form-control" name="status" id="status" v-model="filterData.sport_category_id" @change="setTournaments">
                  <option value="all">All Categories</option>
                  <option v-for="category in categories"
                  :value="category.provider_id"
                  :key="category.provider_id"
                  :data-tournaments="JSON.stringify(category.tournaments)"
                  >{{category.name}}</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label for="status">Tournament</label>
                <select class="form-control" name="status" id="status" v-model="filterData.sport_tournament_id">
                  <option value="all">All Tournaments</option>
                  <option v-for="tournament in tournaments" :value="tournament.provider_id" :key="tournament.provider_id">{{tournament.name}}</option>
                </select>
              </div>
              <div class="form-group col-md-4">
                <label for="betslip_id">Event Name</label>
                <input type="text" name="betslip_id" id="betslip_id" class="form-control" v-model="filterData.event_name">
              </div>
              <div class="form-group col-md-1" style="padding-top:29px">
                <button type="button" class="btn btn-primary" @click="findEvent()">Search</button>
              </div>
            </div>
          </form>-->
          <div class="row">
            <b-col cols="4">

                  <div class="dd" id="sports_menu">
                    <div class="text-center" v-if="loading">
                      Loading Please wait....<i class="fa fa-4x fa-spin fa-spinner"></i>
                    </div>
                    <ol class="dd-list" v-if="!loading">
                      <li class="dd-item dd-collapsed" v-for="(sport, s) in sports" :key="s">
                        <button class="dd-expand" type="button">Expand</button>
<!--                        <button class="dd-collapse" type="button" />-->
                        <div class="dd-handle" @click="showChild($event)"><h5>{{ sport.name}}</h5></div>
                        <ol class="dd-list">
                          <li class="dd-item dd-collapsed" v-for="(category, c) in sport.categories" :key="c">
                            <button class="dd-expand" type="button">Expand</button>
                            <div class="dd-handle" @click="showChild($event)">{{category.name}}</div>
                            <ol class="dd-list">
                              <li class="dd-item"
                                  v-for="(tournament, t) in category.tournaments" :key="t"
                              >
                                <span class="float-right px-2 py-2">
                                  <a href="javascript:;" @click="openTournamentModal(tournament)">
                                    <i class="fa fa-cog" />
                                  </a>
                                </span>
                                <div class="dd-handle" @click="getFixtures(tournament.sport_tournament_id, sport.sport_id)">
                                  {{ tournament.name }} ({{tournament.total}})
                                </div>
                              </li>
                            </ol>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
            </b-col>
            <b-col>
              <div class="example-wrap">
                <div class="example">
                  <div class="table-responsive">
                    <table class="table table-hover table-expandable table-striped">
                      <thead class="bg-grey-100">
                        <tr>
                          <th>Event </th>
                          <th>Event ID</th>
                          <th>Start Time</th>
                          <th class="text-center">Highlighted</th>
                          <th class="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody v-show="eventLoader">
                        <tr>
                          <td colspan="5" align="center"><i class="fa fa-spinner fa-spin" style="font-size:20px"></i></td>
                        </tr>
                      </tbody>
                      <tbody v-if="events.length > 0" v-show="!eventLoader">
                        <tr style="width:100% !important" v-for="(evt, index) in events" :key="index">
                          <td>
                            {{ evt.event_name }}<br>
                          </td>
                          <td>{{evt.event_id}}</td>
                          <td>{{ evt.schedule }}</td>
                          <td align="center" class="text-center">
                            <input type="checkbox" :checked="evt.highlighted" @change="updateEvent(evt, 'highlight', $event.target.checked, 'highlighted')" />
                          </td>
                          <td>
                            <div class="btn-group btn-sm">
                              <button v-if="!evt.status" type="button"
                                class="btn btn-sm btn-icon btn-flat btn-info text-white"
                                style="color: #000"
                                @click="updateEvent(evt, 'status', true, 'activated')">
                                Activate
                              </button>
                              <button v-if="evt.status" type="button"
                                class="btn btn-sm btn-icon btn-flat btn-danger text-white"
                                style="color: #000"
                                @click="updateEvent(evt, 'status', false, 'deactivated')">
                                Deactivate
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="events.length < 1">
                          <td colspan="8">No event found</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </b-col>
          </div>
        </div>
      </div>
  </div>
    <tournament-modal />
</div>
</template>
<style media="screen">
  .hide{
    display: none
  }
</style>
<script>
import CMS from '../../services/cms'
import TournamentModal from "../../components/EditTournamentModal"

export default {
  layout: 'main',
  components: {TournamentModal},
  data(){
    return {
      filterData:{
          event_name: '',
          sport_id: 'all',
          sport_category_id: 'all',
          sport_tournament_id: 'all',
      },
      events: '',
      sports: '',
      categories: '',
      tournaments:'',
      loading: true,
      eventLoader: false,
      config: {
          dateFormat: 'd-m-Y'
      }
    }
  },
      methods:{
        displayDate(str, format) {
            var t = new Date(str*1000);
            let tm = t + (60*60);
            return this.$moment(tm).format(format);
        },
        showChild(e){
          const parent = e.currentTarget.parentElement
          parent.classList.toggle('dd-collapsed');
          parent.children[0].classList.toggle('dd-collapse');
        },
        setTournaments(e){
            this.tournaments = $(e.target).find(':selected').data('tournaments');
        },
        openTournamentModal(tournament){
          this.$nuxt.$emit('tournament_modal', tournament);
        },
        getFixtures (tid, sid) {
          this.eventLoader = true;
          CMS.getFixtures(tid, sid).then(res => {
            this.eventLoader = false;
            this.events = res.fixtures;
          }).catch(e => {
            this.eventLoader = false;
          });
        },
        updateEvent (fixture, action, value, text) {
          var self = this;
          switch (action) {
            case 'deactivate':
              self.$swal({
                title: 'Are you sure?',
                text: 'This event will not be available for play',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
              }).then(function(res) {
                if (res.value){
                  const data = {
                    value,
                    action
                  }
                  CMS.updateEvent(fixture.id, data).then(res => {
                    if(res.success){
                      self.$swal('Updated!', 'Item has been deactivated', 'success');
                      this.getFixtures(fixture.sport_tournament_id, fixture.sport_id)
                    }
                  }).catch(e => {
                    // this.eventLoader = false;
                  });
                }
              }, function(dismiss) {
                console.log(dismiss);
              })
              break;
            default:
              const data = {
                value,
                action
              }
              CMS.updateEvent(fixture.id, data).then(res => {
                if(res.success){
                  // self.$swal('Updated!', 'Item has been ' + text, 'success');
                  this.getFixtures(fixture.sport_tournament_id, fixture.sport_id)
                }
              }).catch(e => {
                // this.eventLoader = false;

              });
              break;
          }
        },
        findEvent(){
          this.loading = true
          CMS.findEvent(this.filterData).then(res=>{
              this.loading = false;
              this.events = res;
          }).catch(err=>{
              this.loading = false;
          })
        }
    },
    mounted: function mounted() {
      this.$axios.get('/sports/get-menu?period=all').then(response =>  {
          this.sports = response.data.menu
          this.loading = false;
      }).catch(error => {
          this.loading = false;
          console.log(error.data)
      });

    },
    head () {
      return {
        title: 'Events Manager'
      }
    },
    asyncData ({ store }) {
      store.dispatch('setTitle', 'Events Manager')
    },
}
</script>
<!--<style src="../../assets/css/nestable.css"></style>-->
<style scoped>
.dd-collapsed .dd-list {
  display: none;
}
.dd-item > input{
  display: block;
  position: relative;
  cursor: pointer;
  float: left;
  width: 25px;
  height: 20px;
  margin: 7px 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  border: 0;
  background: transparent;
  font-weight: bold;
}
.dd-item>button {
  display: block;
}
.dd-handle:hover {
  cursor: pointer;
}
</style>
