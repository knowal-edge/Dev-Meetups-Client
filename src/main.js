import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'
Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created (){
    firebase.initializeApp({
      apiKey: "AIzaSyAsRumCGVHJFTTgm01amgL8ipa-DHs1AnI",
      authDomain: "dev-meetups-8db90.firebaseapp.com",
      databaseURL: "https://dev-meetups-8db90.firebaseio.com",
      projectId: "dev-meetups-8db90",
      storageBucket: "gs://dev-meetups-8db90.appspot.com",
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
  
})
