import Vue from 'vue'
import App from './App.vue'

import appBar from 'muse-components/appBar';
import iconButton from 'muse-components/iconButton';
import textField from 'muse-components/textField';
import icon from 'muse-components/icon';

Vue.component(appBar.name, appBar);
Vue.component(iconButton.name, iconButton);
Vue.component(textField.name, textField);
Vue.component(icon.name, icon);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App, appBar, iconButton, textField, icon }
})
