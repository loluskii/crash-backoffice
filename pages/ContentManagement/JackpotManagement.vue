<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title"><i class='ti-list-ol'></i> Jackpot Details</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="storeJackpotData" style="padding: 10px">
                            <div class="form-group">
                                <label for="">
                                    Title
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="text" class="form-control" name="title" v-validate="'required'" v-model="jackpotData.title">
                                <i v-show="errors.has('title')" class="fa fa-warning text-danger"></i>
                                <span v-show="errors.has('title')" class="help is-danger text-danger">{{ errors.first('title') }}</span>
                            </div>
                            <div class="form-group">
                                <label for="">Description
                                    <span class="text-danger">*</span>
                                </label>
                                <textarea rows="10" name="description" class="form-control" v-validate="'required'" v-model="jackpotData.description"></textarea>
                                <i v-show="errors.has('description')" class="fa fa-warning text-danger"></i>
                                <span v-show="errors.has('description')" class="help is-danger text-danger">{{ errors.first('description') }}</span>
                            </div>
                            <div class="form-group">
                                <label for="">
                                    Stake Amount
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="text" class="form-control" name="stake" v-validate="'required'" v-model="jackpotData.stake">
                                <i v-show="errors.has('stake')" class="fa fa-warning text-danger"></i>
                                <span v-show="errors.has('stake')" class="help is-danger text-danger">{{ errors.first('stake') }}</span>
                            </div>
                            <div class="form-group">
                                <label for="start_date">
                                    Expiry Date
                                    <span class="text-danger">*</span>
                                </label>
                                <flat-pickr v-model="jackpotData.end_date" v-validate="'required'" name="start_date" :config="config" class="form-control"></flat-pickr>
                                <i v-show="errors.has('start_date')" class="fa fa-warning text-danger"></i>
                                <span v-show="errors.has('start_date')" class="help is-danger text-danger">Please enter an expiry date</span>
                            </div>
                            <div class="form-group">
                                <label for="">Status</label>
                                <select class="form-control" v-model="jackpotData.status">
                                <option value="1">Enable</option>
                                <option value="0">Disable</option>
                                </select>
                            </div>
                            <div class="row marginTop">
                                <div class="col-12 col-md-12">
                                    <input type="hidden" name="id" >
                                    <button type="submit" id="saveData"
                                        class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                                        tabindex="7">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h3 class="card-title"><i class='ti-list-ol'></i> Manage Fixtures</h3>
                    </div>
                    <div class="card-body">
                        <v-autocomplete :items="fixtures" :get-label="getLabel" 
                        :component-item="template" 
                        @item-clicked="setFixture"
                        :input-attrs="{placeholder: 'Type event name to add to list'}"
                        @update-items="getEvents">
                        </v-autocomplete>
                        <br>
                        <table class="table table-striped table-condensed" v-if="fixturesData.length">
                            <tr v-for="(fixture, index) in fixturesData" :key="index">
                                <td>{{ fixture.event_name }}</td>
                                <td>
                                    <i aria-hidden="true" class="fa fa-times-circle text-danger" @click="removeRow(index)"></i>
                                </td>
                            </tr>
                        </table>
                        <div class="row marginTop" v-if="fixturesData.length">
                            <div class="col-12 col-md-12">
                                <input type="hidden" name="id" >
                                <button type="submit" id="saveFixtures" @click="storeJackpotFixtures"
                                    class="btn btn-success text_white btn-block text-white btn-md btn-responsive"
                                    tabindex="7">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import ItemTemplate from '../../components/ItemTemplate.vue'

    export default {
        name:'jackpot_management',
        layout: 'main',
        scrollToTop: true,
        data(){
            return{
                title: 'Jackpot Management',
                jackpot:'',
                jackpot_fixtures: [],
                jackpotData: {
                    title: '',
                    description: '',
                    stake: '',
                    end_date:'',
                    status: 1
                },
                fixturesData:[],
                config: this.$store.state.flatpickrConfig,
                fixtures: [],
                template: ItemTemplate
            }
        },
        methods:{
            getLabel (item) {
                return item.event_id+' '+item.team_1 + ' vs ' + item.team_2
            },
            getEvents(str){
                this.$axios.get('/admin/content-management/find-fixtures?q='+str).then(res => {
                    this.fixtures = res.data;
                })
            },
            setFixture(item){
                this.fixturesData.push({event_id: item.event_id, event_name: item.team_1+' - '+item.team_2})
            },
            removeRow(index){
                this.fixturesData.splice(index,1)
            },
            storeJackpotData(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#saveData').attr('disabled', true).text('Saving...');                
                        this.$axios.post('/admin/content-management/save-jackpot-data', this.jackpotData).then(res => {
                            if(res.data.success)
                                this.notify({message: 'Saved', title: 'Success!', type: 'success'});

                            $('#saveData').attr('disabled', false).text('Save');                
                                
                        })
                    }
                });
            },
            storeJackpotFixtures(){
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        $('#saveFixtures').attr('disabled', true).text('Saving...');                
                        this.$axios.post('/admin/content-management/save-jackpot-fixtures', this.fixturesData).then(res => {
                            if(res.data.success)
                                this.notify({message: 'Saved', title: 'Success!', type: 'success'});

                            $('#saveFixtures').attr('disabled', false).text('Save');                
                                
                        })
                    }
                });
            }
        },
        mounted: function() {
            this.config.dateFormat = 'Y-m-d H:i';            
            // this.listMultiples();
            this.$axios.get('/admin/content-management/jackpot-data').then(res => {
                this.jackpotData = {
                    title: res.data.jackpotData.title,
                    description: res.data.jackpotData.description,
                    stake: res.data.jackpotData.stake,
                    end_date: res.data.jackpotData.end_date,
                    status: res.data.jackpotData.status
                }
                this.fixturesData = res.data.jackpotFixtures
            })
        },
        head () {
            return {
                title: this.title
            }
        },
        asyncData ({ store }) {
            store.dispatch('setTitle', 'Jackpot Management');
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
<style>
.tab-content{
    border-left: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
}
.v-autocomplete
  .v-autocomplete-input-group
    .v-autocomplete-input{
      font-size: 1.5em;
      padding: 10px 15px;
      box-shadow: none;
      border: 1px solid #157977;
      width: calc(100% - 32px);
      outline: none;
      background-color: #eee
    }
    .v-autocomplete-selected
      .v-autocomplete-input{
        color: green;
        background-color: #f2fff2
    }
  .v-autocomplete-list{
    width: 100%;
    text-align: left;
    border: none;
    border-top: none;
    max-height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #157977;
  }
    .v-autocomplete-list-item{
      cursor: pointer;
      background-color: #fff;
      padding: 10px;
      border-bottom: 1px solid #157977;
      border-left: 1px solid #157977;
      border-right: 1px solid #157977;
    }
    .v-autocomplete-list-item:last-child{
        border-bottom: none
      }
      .v-autocomplete-list-item:hover{
        background-color: #eee
      }
      abbr{
        opacity: 0.8;
        font-size: 0.8em;
        display: block;
        font-family: sans-serif
    }

</style>
