<template>
  <div class="">
    <div class="row bg-light py-2">
      <div class="col-md-6 col-10 mx-auto">
        <div class="row justify-content-center">
          <label for="inputPassword" class="col-6 col-form-label"
            >Profile Name</label
          >
          <div class="col-6">
            <select
              v-model="profile"
              @change="getProfile()"
              class="form-control"
              name=""
              id=""
            >
              <option value="">Select a profile</option>
              <option value="-1">New</option>
              <option
                v-for="(profile, index) in profiles"
                :key="index"
                :value="profile.id"
              >
                {{ profile.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ profile }} -->

    <div v-if="showForm">
      <div class="row bg-light py-2 border-top border-bottom">
        <div class="col-md-6 col-10 mx-auto">
          <div class="row">
            <label for="inputPassword" class="col-6 col-form-label"
              >Name</label
            >
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                v-model="formData.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-md-6 col-10 mx-auto">
          <div class="row">
            <label for="inputPassword" class="col-6 col-form-label"
              >Description</label
            >
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                v-model="formData.description"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-md-6 col-10 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-6 col-form-label"
              >Provider Group</label
            >
            <div class="col-6">
              <select
                v-model="formData.provider_group"
                class="form-control"
                @change="setPeriod"
                name=""
                id=""
              >
                <option value="">Select</option>
                <option
                  v-for="(provider, index) in providers"
                  :key="index"
                  :value="provider.value"
                  :selected="formData.provider_group"
                  v-if="formData.description !== ''"
                >
                  {{ provider.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-md-6 col-10 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-6 col-form-label"
              >Period</label
            >
            <div class="col-6">
              <select
                v-model="formData.period"
                @change="setCommissionType"
                class="form-control"
                name=""
                id=""
              >
                <option value="">Select</option>
                <option
                  v-for="(period, index) in periods"
                  :key="index"
                  :value="period.value"
                  :selected="formData.period"
                  v-if="formData.provider_group !== ''"
                >
                  {{ period.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-md-6 col-10 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-6 col-form-label"
              >Commission Type</label
            >
            <div class="col-6">
              <select
                v-model="formData.commission_type"
                class="form-control"
                name=""
                id=""
              >
                <option value="">Select</option>
                <option
                  v-for="(type, index) in commissionType"
                  :key="index"
                  :value="type.value"
                  :selected="formData.commission_type"
                  v-if="formData.period !== ''"
                >
                  {{ type.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-md-6 col-10 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-6 col-form-label"
              >Type</label
            >
            <div class="col-6">
              <select
                v-model="formData.type"
                class="form-control"
                name=""
                id=""
              >
                <option value="flat">Flat</option>
                <option value="multiple">Multiple</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom" v-if="formData.type == 'flat'">
        <div class="col-md-6 col-10 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-6 col-form-label"
              >Percentage</label
            >
            <div class="col-6">
              <input
                type="text"
                class="form-control"
                v-model="formData.percentage"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-md-6 col-10 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-6 col-form-label"
              >Set as default</label
            >
            <div class="col-6">
              <input
                type="checkbox"
                name="is_default"
                v-model="formData.is_default"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="formData.commission_type == 1 && formData.type == 'multiple'">
        <div v-if="formData.provider_group == 'sports'">
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">TURNOVER</h5>
            </div>
            <div class="card-body">
              <div
                class="d-flex align-items-center mb-2"
                v-for="(input, index) in turnovers"
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
                  />
                </div>
                <div class="form-check mx-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="input.odd_set"
                    id="defaultCheck1"
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    ST
                  </label>
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
                <i
                  class="fa fa-plus fa-2x mx-3"
                  @click="addField(input,turnovers)"
                  aria-hidden="true"
                ></i>
                <i
                  class="fa fa-minus fa-2x"
                  @click="removeField(index,turnovers)"
                  v-show="turnovers.length > 1"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">PROVIDER FEE SPORT</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <div class="d-flex align-items-center mr-4">
                  <label for="" class="mr-1 mb-0 pl-2 pr-4 py-1 border"
                    >Provider %</label
                  >
                  <input
                    type="text"
                    style="width: 85px"
                    v-model="formData.provider_fee_sport"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="formData.provider_group == 'casino'">
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">Casino Bonus</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <table>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 1"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_one_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_one_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 2"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_two_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_two_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 3"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_three_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_three_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 4"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_four_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Min Monthly Tickets"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          v-model="bonus.min_monthly_ticket"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >N</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">PROVIDER FEE CASINO</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <div class="d-flex align-items-center mr-4">
                  <label for="" class="mr-1 mb-0 pl-2 pr-4 py-1 border"
                    >Provider %</label
                  >
                  <input
                    type="text"
                    style="width: 85px"
                    v-model="formData.provider_fee_casino"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="formData.provider_group == 'poker'">
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">Poker Commission</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <table>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 1"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_one_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_one_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 2"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_two_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_two_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 3"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_three_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_three_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 4"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_four_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Min Monthly Tickets"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          v-model="bonus.min_monthly_ticket"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >N</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">PROVIDER FEE POKER</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <div class="d-flex align-items-center mr-4">
                  <label for="" class="mr-1 mb-0 pl-2 pr-4 py-1 border"
                    >Provider %</label
                  >
                  <input type="text" style="width: 85px" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="formData.provider_group == 'virtual'">
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">TURNOVER</h5>
            </div>
            <div class="card-body">
              <div
                class="d-flex align-items-center mb-2"
                v-for="(input, index) in turnovers"
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
                  />
                </div>
                <div class="form-check mx-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="input.max_odd"
                    :value="input.st"
                    id="defaultCheck1"
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    ST
                  </label>
                </div>
                <div class="d-flex" v-if="input.max_odd">
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
                <i
                  class="fa fa-plus fa-2x mx-3"
                  @click="addField(input, turnovers)"
                  aria-hidden="true"
                ></i>
                <i
                  class="fa fa-minus fa-2x"
                  @click="removeField(index, turnovers)"
                  v-show="turnovers.length > 1"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          </div>
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">PROVIDER FEE SPORT</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <div class="d-flex align-items-center mr-4">
                  <label for="" class="mr-1 mb-0 pl-2 pr-4 py-1 border"
                    >Provider %</label
                  >
                  <input
                    type="text"
                    style="width: 85px"
                    v-model="formData.provider_fee_sport"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="formData.provider_group == 'casino_live'">
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">Casino Live Commission</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <table>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 1"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_one_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_one_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 2"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_two_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_two_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 3"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_three_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_three_sales"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >$</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Step 4"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          aria-describedby="basic-addon2"
                          v-model="bonus.step_four_percent"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <input
                        type="text"
                        value="Min Monthly Tickets"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control mr-2"
                          v-model="bonus.min_monthly_ticket"
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >N</span
                          >
                        </div>
                      </div>
                    </td>
                    <td style="width: 5%"></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">PROVIDER FEE CASINO LIVE</h5>
            </div>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2">
                <div class="d-flex align-items-center mr-4">
                  <label for="" class="mr-1 mb-0 pl-2 pr-4 py-1 border"
                    >Provider %</label
                  >
                  <input type="text" style="width: 85px" class="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="formData.commission_type == 2">
        <div class="card shadow-none my-0 border-0 border-top-none">
          <div class="card-header bg-primary rounded-0">
            <h5 class="mb-0">Commission</h5>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center mb-2">
              <table>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Step 1"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_one_percent"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_one_sales"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >$</span
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Step 2"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_two_percent"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_two_sales"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >$</span
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Step 3"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_three_percent"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_three_sales"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >$</span
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Step 4"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_four_percent"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Min Monthly Tickets"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        v-model="bonus.min_monthly_ticket"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >N</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="card shadow-none my-0 border-0 border-top-none">
          <div class="card-header bg-primary rounded-0">
            <h5 class="mb-0">PROVIDER FEE SPORT</h5>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center mb-2">
              <div class="d-flex align-items-center mr-4">
                <label for="" class="mr-1 mb-0 pl-2 pr-4 py-1 border"
                  >Provider %</label
                >
                <!-- <input type="text" style="width: 85px" v-model="formData.provider_fee_sport" class="form-control"> -->
                <div class="input-group" style="width: 100px">
                  <input
                    type="text"
                    v-model="formData.provider_fee_sport"
                    class="form-control mr-2"
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="formData.commission_type == 3">
        <!-- <div v-if="formData.provider_group === 'sports'"> -->
        <div class="card shadow-none my-0 border-0 border-top-none">
          <div class="card-header bg-primary rounded-0">
            <h5 class="mb-0">TURNOVER</h5>
          </div>
          <div class="card-body">
            <div
              class="d-flex align-items-center mb-2"
              v-for="(input, index) in turnovers"
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
                />
              </div>
              <div class="form-check mx-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="input.odd_set"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1"> ST </label>
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
              <i
                class="fa fa-plus fa-2x mx-3"
                @click="addField(input, turnovers)"
                aria-hidden="true"
              ></i>
              <i
                class="fa fa-minus fa-2x"
                @click="removeField(index, turnovers)"
                v-show="turnovers.length > 1"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
        <div class="card shadow-none my-0 border-0 border-top-none">
          <div class="card-header bg-primary rounded-0">
            <h5 class="mb-0">Commission</h5>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center mb-2">
              <table>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Step 1"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_one_percent"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_one_sales"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >$</span
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Step 2"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_two_percent"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_two_sales"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >$</span
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Step 3"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_three_percent"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_three_sales"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >$</span
                        >
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Step 4"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        aria-describedby="basic-addon2"
                        v-model="bonus.step_four_percent"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <input
                      type="text"
                      value="Min Monthly Tickets"
                      disabled
                      class="form-control"
                      placeholder=""
                    />
                  </td>
                  <td style="width: 5%"></td>
                  <td style="width: 30%">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control mr-2"
                        v-model="bonus.min_monthly_ticket"
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >N</span
                        >
                      </div>
                    </div>
                  </td>
                  <td style="width: 5%"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="card shadow-none my-0 border-0 border-top-none">
          <div class="card-header bg-primary rounded-0">
            <h5 class="mb-0">PROVIDER FEE SPORT</h5>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center mb-2">
              <div class="d-flex align-items-center mr-4">
                <label for="" class="mr-1 mb-0 pl-2 pr-4 py-1 border"
                  >Provider %</label
                >
                <!-- <input type="text" style="width: 85px" v-model="formData.provider_fee_sport" class="form-control"> -->
                <div class="input-group" style="width: 100px">
                  <input
                    type="text"
                    class="form-control mr-2"
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>

      <div class="row justify-content-end">
        <div class="col-auto">
          <button v-if="profile_data" class="btn btn-secondary btn-lg" @click="deleteProfile(id)">
            DELETE
          </button>
          <button class="btn btn-success btn-lg" @click="save">SAVE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Commission from "../../services/commission";
export default {
  name: "",
  layout: "main",
  components: {},
  data() {
    return {
      title: "Commission Setting",
      loading: false,
      profile: "",
      showForm: false,
      profile_data: false,
      id: "",
      // st: true,
      formData: {
        name: "",
        description: "",
        provider_group: "",
        period: "",
        commission_type: "",
        turnovers: null,
        bonus: null,
        type:"flat",
        percentage: null
      },
      turnovers: [
        { event: "", odd_set: 0, percentage: "", min_odd: "", max_odd: "" },
      ],
      bonus: {
        step_one_percent: null,
        step_one_sales: null,
        step_two_percent: null,
        step_two_sales: null,
        step_three_percent: null,
        step_three_sales: null,
        step_four_percent: null,
        min_monthly_ticket: null,
      },
      providers: [
        { text: "Sport", value: "sports" },
        { text: "Casino", value: "casino" },
        { text: "Poker", value: "poker" },
        { text: "Virtual", value: "virtual" },
        { text: "Casino live", value: "casino_live" },
      ],
      periods: [
        { text: "Weekly", value: "weekly" },
        { text: "Monthly", value: "monthly" },
      ],
      commissionType: [
        { text: "Turnover (Weekly)", value: "1" },
        { text: "Bonus ( weekly )", value: "2" },
        { text: "Turnover(Weekly) + Bonus (Weekly)", value: "3" },
      ],
      profiles: [],
      results: [],
    };
  },
  methods: {
    getProfiles() {
      Commission.getProfile().then((res) => {
        this.profiles = res.data;
      });
    },
    save() {
      if (this.id) {
        this.updateProfile();
      } else {
        this.saveProfile();
      }
    },
    addField(value, fieldType) {
      fieldType.push({
        event: "",
        odd_set: 0,
        percentage: "",
        min_odd: "",
        max_odd: "",
      });
      console.log(fieldType);
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
    setPeriod() {
      this.formData.period = "";
      this.formData.commission_type = "";
      switch (this.formData.provider_group) {
        case "sports":
        case "casino":
        case "poker":
        case "virtual":
        case "casino_live":
          this.periods = [
            { text: "Weekly", value: "weekly" },
            { text: "Monthly", value: "monthly" },
          ];
          break;

        default:
          break;
      }
    },
    setCommissionType() {
      this.formData.commission_type = "";
      switch (this.formData.provider_group) {
        case "sports":
        case "virtual":
          if (this.formData.period == "weekly") {
            this.commissionType = [
              { text: "Turnover (Weekly)", value: "1" },
              { text: "Bonus ( weekly )", value: "2" },
              { text: "Turnover(Weekly) + Bonus (Weekly)", value: "3" },
            ];
          } else {
            this.commissionType = [
              { text: "Turnover (Monthly)", value: "1" },
              { text: "Bonus (Monthly)", value: "2" },
              { text: "Turnover(Weekly) + Bonus (Monthly)", value: "3" },
            ];
          }
          break;

        case "casino":
        case "poker":
        case "casino_live":
          if (this.formData.period == "weekly") {
            this.commissionType = [{ text: "Bonus (Weekly)", value: "1" }];
          } else {
            this.commissionType = [{ text: "Bonus (Monthly)", value: "1" }];
          }
          break;

        default:
          this.commissionType = [
            { text: "Turnover (Weekly)", value: "1" },
            { text: "Bonus ( weekly )", value: "2" },
            { text: "Turnover(Weekly) + Bonus (Weekly)", value: "3" },
          ];
          break;
      }
    },
    // change(index, e) {
    //   this.formData.turnovers[index].checked = e.target.checked;
    // },
    getProfile() {
      this.showForm = true;
      if (this.profile == "-1" || this.profile === "") {
        this.profile_data = false;
        this.formData.name = "";
        this.formData.description = "";
        this.formData.provider_group = "";
        this.formData.period = "";
        this.formData.commission_type = "";
        this.formData.turnovers = [];
        this.formData.bonus = null;
        this.turnovers = [
            { event: "", odd_set: 0, percentage: "", min_odd: "", max_odd: "" },
        ];
        this.bonus = {
          step_one_percent: null,
          step_one_sales: null,
          step_two_percent: null,
          step_two_sales: null,
          step_three_percent: null,
          step_three_sales: null,
          step_four_percent: null,
          min_monthly_ticket: null,
        };
      } else {
        this.profile_data = true;
        Commission.getProfileById(this.profile).then((res) => {
          this.results = res.data;
          this.id = res.data.id;
          this.formData.name = res.data.name;
          this.formData.description = res.data.description;
          this.formData.provider_group = res.data.provider_group;
          this.formData.period = res.data.period;
          this.formData.type = res.data.type;
          this.formData.commission_type = res.data.commission_type;
          this.formData.is_default = res.data.default;
          this.turnovers = res.data.turnovers;
          if (res.data.bonus) {
            this.bonus.step_one_percent = res.data.bonus.step_one_percent;
            this.bonus.step_two_percent = res.data.bonus.step_two_percent;
            this.bonus.step_three_percent = res.data.bonus.step_three_percent;
            this.bonus.step_four_percent = res.data.bonus.step_four_percent;
            this.bonus.step_one_sales = res.data.bonus.step_one_sales;
            this.bonus.step_two_sales = res.data.bonus.step_two_sales;
            this.bonus.step_three_sales = res.data.bonus.step_three_sales;
            this.bonus.step_four_percent = res.data.bonus.step_four_percent;
            this.bonus.min_monthly_ticket = res.data.bonus.min_monthly_ticket;
          }
        });
      }
    },

    saveProfile() {
      if (this.formData.commission_type == 1 && this.formData.type == 'multiple') {
        if(this.formData.provider_group == "sports" || this.formData.provider_group == "virtual"){
          if(this.formData.type == 'multiple'){
            this.formData.turnovers = this.turnovers;
          }else{
            this.formData.turnovers = null;
          }
        }else if(this.formData.provider_group == "casino" || this.formData.provider_group == "poker" || this.formData.provider_group == "casino_live"){
          this.formData.bonus = this.bonus;
        }
      } else if (this.formData.commission_type == 2) {
        this.formData.bonus = this.bonus;
      } else if(this.formData.commission_type == 3 && this.formData.type == 'multiple'){
        this.formData.turnovers = this.turnovers;
        this.formData.bonus = this.bonus;
      }
      // console.log(this.formData);
      Commission.createProfile(this.formData).then((res) => {
        // console.log(res);
        if (res.success) {
          this.$swal("Success", "Profile saved!", "success");
          this.profile = ""
          this.formData = {
            name: "",
            description: "",
            provider_group: "",
            period: "",
            commission_type: "",
            turnovers: [],
            bonus: null,
          };
          this.turnover = [
            { event: "", odd_set: 0, percentage: "", min_odd: "", max_odd: "" },
          ],
          this.bonus = {
            step_one_percent: null,
            step_one_sales: null,
            step_two_percent: null,
            step_two_sales: null,
            step_three_percent: null,
            step_three_sales: null,
            step_four_percent: null,
            min_monthly_ticket: null,
          },
          this.getProfiles();
        } else {
          // this.getProfiles();
          this.$swal("Error", "An error occurred!", "error");
        }
      });
    },
    updateProfile() {
      if (this.formData.commission_type == 1) {
        if(this.formData.provider_group == "sports" || this.formData.provider_group == "virtual"){
          this.formData.turnovers = this.turnovers;
        }else if(this.formData.provider_group == "casino" || this.formData.provider_group == "poker" || this.formData.provider_group == "casino_live"){
          this.formData.bonus = this.bonus;
        }
      } else if (this.formData.commission_type == 2) {
        this.formData.bonus = this.bonus;
      } else if(this.formData.commission_type == 3){
        this.formData.turnovers = this.turnovers;
        this.formData.bonus = this.bonus;
      }
      Commission.updateProfile(this.id, this.formData).then((res) => {
        console.log(res);
        if (res.success) {
          this.$swal("Success", "Profile updated!", "success");
          // this.formData = {
          //   name: "",
          //   description: "",
          //   provider_group: "",
          //   period: "",
          //   commission_type: "",
          //   turnovers: [],
          //   bonus: null,
          // };
          // this.turnover = [
          //   { event: "", odd_set: 0, percentage: "", min_odd: "", max_odd: "" },
          // ],
          // this.bonus = {
          //   step_one_percent: null,
          //   step_one_sales: null,
          //   step_two_percent: null,
          //   step_two_sales: null,
          //   step_three_percent: null,
          //   step_three_sales: null,
          //   step_four_percent: null,
          //   min_monthly_ticket: null,
          // }
          // this.getProfiles();
        } else {
          this.$swal("Error", "An error occurred!", "error");
        }
      });
    },

    deleteProfile(id) {
      // console.log(id);
      var self = this;
      self
        .$swal({
          title: "Are you sure?",
          text: "You will not be able to recover this item",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete profile!",
          cancelButtonText: "No, keep profile",
        })
        .then(
          (result) => {
            if (result.value) {
              Commission.deleteProfile(id).then((res) => {
                if (res.success) {
                  // $(e.target).closest("tr").remove();
                  self.$swal("Deleted!", "Profile has been removed", "success");
                  // this.getProfiles();
                  this.$nuxt.$emit("refresh_profiles");
                } else {
                  this.$swal("Error", "An error occurred!", "error");
                }
              });
            }
          },
          function (dismiss) {}
        );
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  asyncData({ store }) {
    store.dispatch("setTitle", "Commission Setting");
  },
  mounted() {
    this.getProfiles();
    this.$nuxt.$on("refresh_profiles", () => {
      window.location.reload();
    });
  },
};
</script>

<style></style>
