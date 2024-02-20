import Vue from 'vue'
import Multiselect from 'vue-multiselect';
import VueFormWizard from 'vue-form-wizard'
import Datepicker from 'vuejs-datepicker'
import nestable from "nestable2/dist/jquery.nestable.min.js"
import vue2Dropzone from 'vue2-dropzone'
import fileinput from "bootstrap-fileinput/js/fileinput.min.js"
import themea from"bootstrap-fileinput/themes/fa/theme.min.js"
import Paginate from '../components/pagination'
import Autocomplete from 'vuejs-auto-complete'
import LaravelPermissions from 'laravel-permissions';
import Select from 'vue-select';
import wysiwyg from "vue-wysiwyg";
Vue.component('paginate', Paginate)
Vue.component('vue-dropzone', vue2Dropzone);
Vue.component('multiselect', Multiselect);
Vue.component('datepicker', Datepicker);
Vue.component('autocomplete', Autocomplete);
Vue.component('vue-select', Select);

Vue.use(VueFormWizard);
Vue.use(LaravelPermissions, { persistent: true });
Vue.use(wysiwyg, {});

import 'v-autocomplete/dist/v-autocomplete.css'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import "vue-wysiwyg/dist/vueWysiwyg.css";
