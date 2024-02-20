<template>
    <form class="form-horizontal columns column is-multiline is-12" role="form" @submit.prevent="saveMarket">
        <div class="form-group">
            <label for="input-text" class="control-label txt_media1">
                Sports
            <span class="text-danger">*</span>
            </label>
            <v-select
                label="name"
                v-model="sport"
                v-validate="'required'"
                v-on:input="setGroups"
                placeholder="Select Sports"
                :options="sports" name="sport">
            </v-select>
            <i v-show="errors.has('sport')" class="fa fa-warning text-danger"></i>
            <span v-show="errors.has('sport')" class="help is-danger text-danger">{{ errors.first('sport') }}</span>
        </div>
        <div class="form-group">
            <label for="input-text" class="control-label txt_media1">
                Group
                <span class="text-danger">*</span>
            </label>

            <v-select label="name" v-model="group" v-validate="'required'"
                placeholder="Select Market Group"
                :options="categories" name="group">
            </v-select>
            <i v-show="errors.has('group')" class="fa fa-warning text-danger"></i>
            <span v-show="errors.has('group')" class="help is-danger text-danger">{{ errors.first('group') }}</span>
        </div>
        <!-- <div class="form-group">
            <label for="input-text" class="control-label txt_media1">
                Market Type
                <span class="text-danger">*</span>
            </label>

            <v-select label="name"
                v-model="marketType" v-validate="'required'"
                v-on:input="setMarketName"
                placeholder="Select Market"
                :options="markets"
                name="market">
            </v-select>
            <i v-show="errors.has('market')" class="fa fa-warning text-danger"></i>
            <span v-show="errors.has('market')" class="help is-danger text-danger">{{ errors.first('market') }}</span>
        </div> -->
        <div class="form-group">
            <label for="name" class="control-label txt_media1">
                Name
                <span class="text-danger">*</span>
            </label>

            <input type="text" v-validate="'required'" class="form-control" name="name" id="name" v-model="formData.name">
            <i v-show="errors.has('name')" class="fa fa-warning text-danger"></i>
            <span v-show="errors.has('name')" class="help is-danger text-danger">Please enter the market name</span>
        </div>
        <div class="form-group">
            <label for="name" class="control-label txt_media1">
                Short Name
            </label>

            <input type="text" class="form-control" name="short_name" id="short_name" v-model="formData.short_name">
        </div>

        <div class="form-group">
            <label for="description" class="control-label txt_media1">
                Description
            </label>
            <textarea class="form-control" name="description" id="description" v-model="formData.description"></textarea>
        </div>
        <!-- <div class="form-group">
            <label for="name" class="control-label txt_media1">
                Handicap Line
            </label>
            <input type="text" class="form-control" name="handicap_line" id="handicap_line" v-model="formData.handicap_line">
        </div> -->
        <div class="form-group">
            <label for="status" class="control-label txt_media1">
                Status
            </label>

            <select class="form-control" id="status" v-model="formData.status">
                <option value="1">Enabled</option>
                <option value="0">Disabled</option>
            </select>
        </div>
        <div class="form-group">
          <label for="status" class="control-label txt_media1">
            Cashout
          </label>

          <select class="form-control" id="has_cashout" v-model="formData.has_cashout">
            <option :value="1">Enabled</option>
            <option :value="0">Disabled</option>
          </select>
        </div>
        <div class="form-group">
            <label for="name" class="control-label txt_media1">
                Mark as Default
            </label>

            <input type="checkbox" name="is_default" id="is_default" value="1" v-model="formData.is_default">
        </div>
        <div class="column is-6">
            <input type="hidden" value="" name="id" v-model="formData.id">
            <div class="control text-center">
                <button class="button btn btn-primary mr-2" type="submit" id="saveBtn" name="button">Save</button>
                <button class="button btn btn-secondary" type="reset" name="button" @click="resetForm">Reset</button>
            </div>
        </div>
    </form>
</template>
<script>
import CMS from '../../services/cms.js'
    export default {
        name: 'market-form',
        props:{
            sports: Array,
            // markets: Array
        },
        data(){
            return{
                sport: '',
                categories: [],
                group: '',
                marketType: '',
                markets: [],
                formData:{
                    sport_id: '',
                    market_group_id: '',
                    market_type_id: '',
                    name: '',
                    short_name: '',
                    description: '',
                    handicap_line: '',
                    is_default: 0,
                    status: 1,
                    has_cashout: 0,
                    id: ''
                }
            }
        },
        methods:{
            resetForm(){
                this.formData = {
                    sport_id: '',
                    market_group_id: '',
                    market_type_id: '',
                    name: '',
                    short_name: '',
                    handicap_line: '',
                    is_default: 0,
                    has_cashout: 0,
                    id: ''
                }
            },
            setGroups(e){
                this.categories = e.market_groups;
                this.markets = e.market_types;
            },
            setMarketName(e) {
                this.formData.name = e.name
            },
            async saveMarket(){

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.formData.sport_id = this.sport.id;
                        this.formData.market_group_id = this.group.id;
                        this.formData.market_type_id = this.marketType.provider_id;
                        $('#saveBtn').attr('disabled', true).text('Saving...');
                        CMS.saveMarket(this.formData).then( res => {
                            $('#saveBtn').attr('disabled', false).text('Save');
                            if(res.success){
                                this.$nuxt.$emit('MARKET_SAVED', res.sports);
                                this.$toast.success('Market has been saved successfully. Reload page to see changes.', {icon: 'check'});
                            }
                            this.resetForm();
                        }).catch(error => {
                            this.$toast.error('Something went wrong. Internal server error.', {icon:'times'});
                        });
                    }
                })
            }
        },
        mounted(){
            this.$nuxt.$on('EDITMARKET', (market, sport, group)=>{
                this.setGroups(sport);
                this.sport = sport;
                this.group = group;
                // this.marketType = marketType;
                this.formData.name = market.name;
                this.formData.short_name = market.short_name;
                // this.formData.handicap_line = market.handicap_line;
                this.formData.description = market.description;
                this.formData.id = market.id;
                this.formData.status = market.status;
                this.formData.has_cashout = market.has_cashout;
                $('#name').focus();
            })
        }
    }
</script>
