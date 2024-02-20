<template>
  <div id="tab-activity" class="tab-pane animated fadeInTop  active">
    <form id="single-stop" @submit.prevent="getResults(1)">
      <div class="row m-t-10">
          <div class="col-sm-3">
              <select name="class" id="class-type" class="form-control" v-model="filterData.period" @change="setDateRange">
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="current_week">Current Week</option>
                  <option value="last_week">Last Week</option>
                  <option value="current_month">Current Month</option>
                  <option value="last_month">Last Month</option>
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="date_range">Date Range</option>
              </select>
          </div>
          <br class="d-sm-none">
          <div class="col-sm-3">
              <div class="input-group">
                  <div class="input-group-prepend">
                      <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                  </div>
                  <flat-pickr v-model="filterData.from" :config="config" class="form-control"></flat-pickr>
              </div>
          </div>
          <br class="d-sm-none">
          <div class="col-sm-3">
              <div class="input-group">
                  <div class="input-group-prepend">
                      <span class="input-group-text bg-white"><i class="fa fa-fw ti-calendar"></i></span>
                  </div>
                  <flat-pickr v-model="filterData.to" :config="config" class="form-control"></flat-pickr>
              </div>
          </div>
          <br class="d-sm-none">
          <div class="col-sm-3">
              <select name="class" id="class-type" class="form-control" v-model="filterData.client_type">
                  <option value="">Client Type</option>
                  <option value="website">Website</option>
                  <option value="mobile">Mobile</option>
                  <option value="cashier">Cashier</option>
              </select>
          </div>
      </div>
      <div class="row m-t-10">
          <div class="col-sm-6">
              <div class="form-group icheck-element">
                  <label class="price-alert">
                      <input type="checkbox" name="c1" id="c1" value=""> Enable Paging
                  </label>
              </div>
          </div>
          <div class="col-sm-3">
              <button type="submit" class="btn btn-info btn-block">Search</button>
          </div>
          <div class="col-sm-3">
              <a href="javascript:;" @click="resetFilter">clear all filters</a>
          </div>
      </div>

    </form>
      <div class="table-responsive" v-if="!loading">
          <table class="table table-bordered" data-animate="fade" data-child="tr"
        data-selectable="selectable">
          <thead>
            <tr>
                <th>Login Time</th>
                <th>IP Address</th>
                <th>Country</th>
                <th>Cookies</th>
                <th>Client Type</th>
                <th>Device</th>
                <th>Browser Type</th>
                <th>Browser Version</th>
                <th>Operating System</th>
            </tr>
          </thead>
          <tbody>
              <tr v-if="data.length > 0" v-for="(row, i) in data" :key="i">
                  <td>{{formatDate(row.created_at, 'DD/MM/YYYY HH:mm:ss')}}</td>
                  <td>{{row.login_ip}}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{{ row.client_type }}</td>
                  <td>-</td>
                  <td>{{ row.browser_type }}</td>
                  <td>{{ row.browser_version }}</td>
                  <td>{{ row.os }}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div class="row mt-3">
              <!-- <div class="col-sm-12 col-md-5">
                  <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">Showing 1 to 10 of 40 entries</div>
              </div> -->
              <div class="col-sm-12 col-md-7">

                  <div class="dataTables_paginate paging_simple_numbers pull-right" id="sample_1_paginate">
                       <paginate
                          v-bind:pagination="pagination"
                          v-on:click.native="getTransactions(pagination.current_page)"
                          :offset="4">
                      </paginate>

                  </div>
              </div>
          </div>
      <div v-if="loading" class="text-center">
          <i class="fa fa-spin fa-spinner fa-4x"></i>
      </div>
  </div>
</template>
<script>
  import Users from '../../services/users'

  export default {
      props:[
          'user',
          'id'
      ],
      data(){
        return{
          data: [],
          loading:  false,
          filterData:{
              period: 'today',
              username: '',
              from: this.$moment().format('DD-MM-YYYY 00:00:00'),
              to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
              client_type: '',
              ip_address: ''
          },
          config: this.$store.state.flatpickrConfig,
          pagination: {
              total: 0,
              per_page: 2,
              from: 1,
              to: 0,
              current_page: 1
          },
          offset: 4
        }
      },
      methods:{
        setDateRange(){
                switch(this.filterData.period) {
                    case 'today':
                        this.config.clickOpens = false;
                        this.filterData.from = this.$moment().format('DD-MM-YYYY 00:00:00');
                        this.filterData.to = this.$moment().format('DD-MM-YYYY 23:59:59');
                        break;
                    case 'yesterday':
                        this.filterData.from = this.$moment().subtract(1, 'day').format('DD-MM-YYYY 00:00:00');
                        this.filterData.to = this.$moment().subtract(1, 'day').format('DD-MM-YYYY 23:59:59');
                        break;
                    case 'current_week':
                        this.filterData.from = this.$moment().startOf('isoWeek').format('DD-MM-YYYY 00:00:00');
                        this.filterData.to = this.$moment().endOf('isoWeek').format('DD-MM-YYYY 23:59:59');
                        break;
                    case 'last_week':
                        this.filterData.from = this.$moment().subtract(1, 'week').startOf('isoWeek').format('DD-MM-YYYY 00:00:00');
                        this.filterData.to = this.$moment().subtract(1, 'week').endOf('isoWeek').format('DD-MM-YYYY 23:59:59');
                        break;
                    case 'current_month':
                        this.filterData.from = this.$moment().startOf('month').format('DD-MM-YYYY 00:00:00');
                        this.filterData.to = this.$moment().endOf('month').format('DD-MM-YYYY 23:59:59');
                        break;
                    case 'last_month':
                        this.filterData.from = this.$moment().subtract(1, 'month').startOf('month').format('DD-MM-YYYY 00:00:00');
                        this.filterData.to = this.$moment().subtract(1, 'month').endOf('month').format('DD-MM-YYYY 23:59:59');
                        break;
                    case 'last_30_days':
                        this.filterData.from = this.$moment().subtract(30, 'days').format('DD-MM-YYYY 00:00:00');
                        this.filterData.to = this.$moment().format('DD-MM-YYYY 23:59:59');
                        break;
                    default:
                        this.filterData.from = this.$moment().format('DD-MM-YYYY 00:00:00');
                        this.filterData.to = this.$moment().format('DD-MM-YYYY 23:59:59');
                }
            },
            getResults(page){
                this.loading = true
                Users.getLoginHistory(this.filterData, page).then(res=>{
                    this.loading = false;
                    this.data = res.data;
                    this.pagination = res;
                }).catch(err => {
                    this.$toast.error('An error occured',{icon: 'times'})
                })
            },
            resetFilter(){
                this.filterData = {
                    period: 'today',
                    username: '',
                    from: this.$moment().format('DD-MM-YYYY 00:00:00'),
                    to:  this.$moment().format('DD-MM-YYYY 23:59:59'),
                    client_type: '',
                    ip_address: ''
                }
            }
      },
      mounted() {
        // console.log(this.user);
        this.filterData.username = this.user.username;
        // this.getData(1);
      },
  }
</script>
