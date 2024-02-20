<template>
  <div class="">
    <div class="row bg-light py-2">
      <div class="col-6 mx-auto">
        <div class="row justify-content-center">
          <label for="inputPassword" class="col-sm-3 col-form-label"
            >Profile Name</label
          >
          <div class="col-sm-7">
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
    <div v-if="new_form">
      <div class="row bg-light py-2 border-top border-bottom">
        <div class="col-5 mx-auto">
          <div class="row">
            <label for="inputPassword" class="col-sm-4 col-form-label"
              >Name</label
            >
            <div class="col-sm-5 pl-0">
              <input
                type="text"
                class="form-control"
                v-model="new_profile.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-5 mx-auto">
          <div class="row">
            <label for="inputPassword" class="col-sm-4 col-form-label"
              >Description</label
            >
            <div class="col-sm-5 pl-0">
              <input
                type="text"
                class="form-control"
                v-model="new_profile.description"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-6 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-sm-3 col-form-label"
              >Provider Group</label
            >
            <div class="col-sm-7">
              <select
                v-model="new_profile.provider_id"
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
                  v-if="new_profile.description !== ''"
                >
                  {{ provider.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-6 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-sm-3 col-form-label"
              >Period</label
            >
            <div class="col-sm-7">
              <select
                v-model="new_profile.period"
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
                  v-if="new_profile.provider_id !== ''"
                >
                  {{ period.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-light py-2 border-bottom">
        <div class="col-6 mx-auto">
          <div class="row justify-content-center">
            <label for="inputPassword" class="col-sm-3 col-form-label"
              >Commission Type</label
            >
            <div class="col-sm-7">
              <select
                v-model="new_profile.commission_type"
                class="form-control"
                name=""
                id=""
              >
                <option value="">Select</option>
                <option
                  v-for="(type, index) in commissionType"
                  :key="index"
                  :value="type.value"
                  v-if="new_profile.period !== ''"
                >
                  {{ type.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div v-if="new_profile.commission_type == '1'">
        <div v-if="new_profile.provider_id == '1'">
          <div class="card shadow-none my-0 border-0 border-top-none">
            <div class="card-header bg-primary rounded-0">
              <h5 class="mb-0">TURNOVER</h5>
            </div>
            <div class="card-body">
              <div
                class="d-flex align-items-center mb-2"
                v-for="(input, index) in new_profile.turnover_sport"
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
                    v-model="input.st"
                    :value="input.st"
                    id="defaultCheck1"
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    ST
                  </label>
                </div>
                <div class="d-flex" v-if="input.st">
                  <div class="d-flex align-items-center mr-4">
                    <label for="" class="mr-1 mb-0 pl-2 pr-3 py-1 border"
                      >Odds >=
                    </label>
                    <input
                      type="text"
                      style="width: 65px"
                      placeholder="0.00"
                      v-model="input.event"
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
                      v-model="input.percentage"
                      class="form-control"
                    />
                  </div>
                </div>
                <i
                  class="fa fa-plus fa-2x mx-3"
                  @click="addField(input, new_profile.turnover_sport)"
                  aria-hidden="true"
                ></i>
                <i
                  class="fa fa-minus fa-2x"
                  @click="removeField(index, new_profile.turnover_sport)"
                  v-show="new_profile.turnover_sport.length > 1"
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
                    v-model="new_profile.provider_fee_sport"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="new_profile.provider_id == '2'">
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
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
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
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
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
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
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
                    <td colspan="3">
                      <input
                        type="text"
                        value="Risk Sharing"
                        disabled
                        class="form-control"
                        placeholder=""
                      />
                    </td>
                    <td style="width: 5%"></td>
                    <td style="width: 30%">
                      <input type="checkbox" name="" id="" />
                    </td>
                    <!-- <td style="width: 5%"></td> -->
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
                    v-model="new_profile.provider_fee_casino"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="new_profile.provider_id == '3'">
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
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >€</span
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
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >€</span
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
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >€</span
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
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
                        />
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2"
                            >%</span
                          >
                        </div>
                      </div>
                    </td>
                    <!-- <td style="width: 5%"></td> -->
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
      </div>
      <div v-if="new_profile.commission_type == '2'">
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
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
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
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
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
                      />
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
                          >%</span
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
                      <input type="text" class="form-control mr-2" />
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
                <!-- <input type="text" style="width: 85px" v-model="new_profile.provider_fee_sport" class="form-control"> -->
                <div class="input-group" style="width: 100px">
                  <input
                    type="text"
                    v-model="new_profile.provider_fee_sport"
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
      new_profile: {
        name: "",
        description: "",
        provider_id: "",
        period: "",
        commission_type: "",
        turnover_sport: [
          {
            event: "",
            percentage: "",
            st: false,
            odds_greater_equal: "",
            odds_less_equal: "",
          },
        ],
        provider_fee_sport: "",
        commission_casino: "",
        provider_fee_casino: "",
      },
      providers: [
        { text: "Sport", value: "1" },
        { text: "Casino", value: "2" },
        { text: "Poker", value: "3" },
        { text: "Virtual", value: "4" },
        { text: "Casino live", value: "5" },
      ],
      periods: [],
      commissionType: [],
      profiles: [],
      new_form: false,
    };
  },
  methods: {
    addField(value, fieldType) {
      fieldType.push({ value: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
    setPeriod() {
      this.new_profile.period = "";
      this.new_profile.commission_type = "";
      switch (this.new_profile.provider_id) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          this.periods = [
            { text: "Weekly", value: "1" },
            { text: "Monthly", value: "2" },
          ];
          break;

        default:
          break;
      }
    },
    setCommissionType() {
      this.new_profile.commission_type = "";
      switch (this.new_profile.provider_id) {
        case "1":
          if (this.new_profile.period == 1) {
            this.commissionType = [
              { text: "Turnover (Weekly)", value: "1" },
              { text: "Bonus (Weekly)", value: "2" },
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

        case "2":
        case "3":
        case "5":
          if (this.new_profile.period == 1) {
            this.commissionType = [{ text: "Bonus (Weekly)", value: "1" }];
          } else {
            this.commissionType = [{ text: "Bonus (Monthly)", value: "2" }];
          }
          break;

        case "4":
          if (this.new_profile.period == 1) {
            this.commissionType = [
              { text: "Turnover (Weekly)", value: "1" },
              { text: "Bonus (Weekly)", value: "2" },
              { text: "Turnover(Weekly) + Bonus (Weekly)", value: "3" },
            ];
          } else {
            this.commissionType = [
              { text: "Bonus (Monthly)", value: "1" },
              { text: "Turnover(Weekly) + Bonus (Monthly)", value: "2" },
            ];
          }
          break;

        default:
          break;
      }
    },
    getProfile() {
      if (this.profile !== "-1") {
        this.new_form = false;
      } else {
        this.new_form = true;
      }
    },

    getProfiles() {
      Commission.getProfile().then((res) => {
        this.profiles = res.data;
      });
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
  },
};
</script>

<style></style>
