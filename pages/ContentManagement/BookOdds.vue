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
            <b-col cols="3">

                  <div class="dd" id="sports_menu">
                    <div class="text-center" v-if="loading">
                      Loading Please wait....<i class="fa fa-4x fa-spin fa-spinner"></i>
                    </div>
                    <ol class="dd-list" v-if="!loading">
                      <li class="dd-item dd-collapsed" v-for="(sport, s) in sports" :key="s">
                        <button class="dd-expand" type="button" >Expand</button>
<!--                        <button class="dd-collapse" type="button" />-->
                        <div class="dd-handle" @click="showChild($event)"><h5>{{ sport.name}}</h5></div>
                        <ol class="dd-list">
                          <li class="dd-item dd-collapsed" v-for="(category, c) in sport.categories" :key="c" >
                            <button class="dd-expand" type="button" >Expand</button>
                            <div class="dd-handle" @click="showChild($event)">{{ category.name }}</div>
                            <ol class="dd-list">
                              <li class="dd-item"
                                  v-for="(tournament, t) in category.tournaments" :key="t"
                                  @click="getFixtures(tournament.sport_tournament_id, sport.sport_id)"
                              >
                                <input type="checkbox" />
                                <div class="dd-handle">{{ tournament.name }} ({{tournament.total}})</div>
                              </li>
                            </ol>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>

            </b-col>
            <b-col class="bootstrap">
              <div class="divBtn" v-if="tournament">
                <div v-for="(market, index) in tournament.markets" :key="market.id"
                     class="OddsDetailsMenuItem current-macrogroup clearfix"
                     @click="getMarkets(tournament.sport_tournament_id, tournament.sport_id, market.id)"
                >
                  <a class="btn btn-default" title="Main">
                    <span>{{ market.name }}</span>
                  </a>
                </div>
              </div>
              <div class="divQt" v-if="tournament">
                <div><b>Main</b></div>
                <div id="events-odds-cont">
                  <input type="hidden" value="" id="disabled_groups">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                    <tr class="dgHeader">
                      <td colspan="4"></td>
                      <td :colspan="predictions.length">
                      <table class="OddsQuotaHeaderStyle" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr>
                          <td :colspan="market.outcomes.length" v-for="(market, i) in market_def" :key="market.name" class="qtTbl_1" style="text-align:center;">
                            {{ market.name }} <br>
                          </td>
                        </tr>
                        <tr>
                          <td v-for="(prediction, i) in predictions" :key="prediction.odd_name" class="qtTbl_1" style="text-align:center;">{{prediction.odd_name}}</td>

                        </tr>
                        </tbody>
                      </table>
                    </td>
                    </tr>
                    <tr class="dgAItem" v-for="(match, i) in fixtures" :key="i">
                      <td></td>
                      <td class="dtInc">{{ match.event_date }} <span class="highlighted-text"> {{match.event_time}} </span></td>
                      <td class="nmInc">
                        <div style="position:relative;">
                          <span style="float:left;">{{ match.event_name }}</span>
                        </div>
                      </td>
                      <td></td>
                      <td class="OddsDetailsQuote" v-for="market in market_def" :key="market.id">
                        <table class="dgQuote" style="border-width:0px;border-style:None;border-collapse:collapse;" border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                          <tr class="OddsQuotaItemStyle">
                            <td class="group-cell-FN1X2" v-for="(prediction, i) in getPredictions(market)" :key="prediction.odd_id">
                              <div style="text-align:center"><b></b></div>
                              <div class="oddsQ clearfix">
                                <input
                                  type="text"
                                  :id="'sign_'+match.id+'_'+prediction.odd_id+'_'+slugify(prediction.odd_name)"
                                  class="edit-quote pull-left"
                                  title="" :value="getOdds(prediction, match.odds)"
                                  @blur="saveOdds($event, prediction.odd_id, market.id, match.id)"
                                  :disabled="(getOdds(prediction, match.odds) === '-' || getOdds(prediction, match.odds) == null || getOdds(prediction, match.odds) === '0.00')"
                                />
                                <div class="odd-spinner pull-right">
                                  <div class="odd-up btn btn-default" @click="alterOdds('sign_'+match.id+'_'+prediction.odd_id+'_'+slugify(prediction.odd_name), 0.01, prediction.odd_id, market.id, match.id)">
                                    <i class="fa fa-caret-up"></i>
                                  </div>
                                  <div class="odd-down btn btn-default" @click="alterOdds('sign_'+match.id+'_'+prediction.odd_id+'_'+slugify(prediction.odd_name), -0.01,  prediction.odd_id, market.id, match.id)">
                                    <i class="fa fa-caret-down"></i>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr></tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </b-col>
          </div>
        </div>
      </div>
  </div>
</div>
</template>
<style media="screen">
  .hide{
    display: none
  }
</style>
<script>
import CMS from '../../services/cms'
import Sport from '../../services/sports'
export default {
    layout: 'main',
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
            tournament: null,
            loading: true,
            eventLoader: false,
            predictions: [],
            fixtures: [],
            market_def: [],
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
        slugify(text) {
          if(!text)
            return false;

          return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
        },
        getFixtures (tid, sid) {
          this.eventLoader = true;
          this.tournament = null;
          CMS.getFixtures(tid, sid).then(res => {
            this.eventLoader = false;
            this.predictions  = res.predictions;
            this.fixtures     = res.fixtures;
            this.market_def   = res.market_def;
            this.tournament   = res;
          }).catch(e => {
            this.eventLoader = false;

          });
        },
      getMarkets(tid, sid, market_id) {
        CMS.getMarkets(tid, sid, market_id).then(res => {
          this.predictions  = res.predictions;
          this.fixtures     = res.fixtures;
          this.market_def   = res.market_def;
        }).catch(err => {

        });
      },
      getPredictions(market) {
        return this.predictions.filter(prediction => prediction.market_id === market.id)
      },
        deleteEvent(e, id){
            var self = this;
            self.$swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover this item',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete item!',
                cancelButtonText: 'No, keep item'
            }).then(function() {
                CMS.deleteEvent(id).then(res=>{
                if(res.success){
                    $(e.target).closest('tr').remove();
                    self.$swal('Deleted!', 'Item has been removed', 'success');
                }
                });
            }, function(dismiss) {

            })
        },
        findEvent(){
            this.loading = true
            CMS.findEvent(this.filterData).then(res=>{
                this.loading = false;
                this.events = res;
            }).catch(err=>{
                this.loading = false;
            })
        },
      alterOdds(eleID, amount, odd_id, market_id, fixture_id) {
        const ele = document.getElementById(eleID);
        ele.value = (parseFloat(ele.value) + amount).toFixed(2);
        const odds = ele.value;
        Sport.updateOdds({market_id, fixture_id, odd_id, odds}).then(res => {
          // console.log(res);
        })
      },
      saveOdds(e, odd_id, market_id, fixture_id) {
        const odds = e.target.value;
        Sport.updateOdds({market_id, fixture_id, odd_id, odds}).then(res => {
          // console.log(res);
        })
      },
      getOdds(prediction, outcomes) {
        let odd = '';
        outcomes.forEach((outcome) => {
          if(outcome.id === prediction.odd_id && outcome.name === prediction.odd_name){
            odd = outcome.odds
          }
        })
        if(odd !== ''){
          return odd;
        }else{
          return '-';
        }
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
.dd-handle {
  font-size: 10px;
}
.dd-handle h5 {
  font-size: 1rem;
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
.divBtn {
  width: auto;
  margin: 0px;
  padding-left: 0px;
  position: relative;
  z-index: 1;
}
.OddsDetailsMenuItem {
  float: left;
  margin: 0px 0px 3px 3px;
  width: 115px;
  height: 30px;
  line-height: 18px;
  font-size: 11px;
  font-weight: normal;
  text-align: center;
  padding: 0px;
}
.OddsDetailsMenuItem a {
  color: #363A41;
  padding: 2px 4px !important;
  height: 30px;
  text-decoration: none;
  display: block;
  width: 100%;
}
.OddsDetailsMenuItem a:hover {
  background-color: #00aff0;
  color: #ffffff;
}
.OddsDetailsMenuItem a span {
  float: left;
  margin-top: 3px;
  font-size: 11px;
}
.divQt {
  width: 100%;
}
.dgHeader {
  vertical-align: top;
  height: 23px;
  font-size: 10px;
  font-weight: bold;
}
td, th {
  padding: 0;
}
.qtTbl_0, .qtTbl_1 {
  width: 55px;
}
.dtInc {
  white-space: nowrap;
  text-align: right;
  width: 25px;
  padding: 0px 5px;
}
.highlighted-text {
  color: #0077A4;
}
.nmInc {
  padding-left: 3px;
  width: 100%;
  padding-bottom: 0px;
  line-height: 11px;
}
.OddsDetailsQuote {
  text-align: right;
}
.dgQuote, .dgQuoteDett {
  width: 100%;
  height: 100%;
}
.OddsQuotaItemStyle TD {
  border-top: medium none;
  border-bottom: medium none;
  text-align: right;
  height: 22px;
  font-size: 11px;
}
.OddsQuotaItemStyle .oddsQ {
  width: 55px;
  padding: 0px 1px 1px 0px;
  position: relative;
  top: 0px;
}
.edit-quote {
  padding: 3px !important;
  text-align: left;
  font-size: 11px !important;
}
.odd-spinner {
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
}
.odd-up, .odd-down {
  font-size: 12px;
  padding: 0px !important;
  display: block !important;
  width: 15px;
  height: 15px;
}
.odd-up {
  margin-bottom: 0px !important;
}
.bootstrap .form-control,
.bootstrap input[type="text"],
.bootstrap input[type="search"],
.bootstrap input[type="password"],
.bootstrap textarea,
.bootstrap select {
  display: block;
  width: 100%;
  height: 31px;
  padding: 6px 8px;
  font-size: 12px;
  line-height: 1.42857;
  color: #555;
  background-color: #F5F8F9;
  background-image: none;
  border: 1px solid #C7D6DB;
  border-radius: 3px;
  -webkit-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s,box-shadow ease-in-out 0.15s;
}
</style>
