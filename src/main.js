// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

// for vutify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

//for routes
import router from "./router";
import { store } from "./store";
import DateFilter from "./filters/date";
import * as firebase from "firebase";
import AlertComp from "./components/Shared/Alert";
import EditDialogue from "./components/Meetup/Edit/EditMeetupDialogue";
import EditDateDialog from "./components/Meetup/Edit/EditDateDialog";
import EditTimeDialog from "./components/Meetup/Edit/EditTimeDialog";
import RegisterMeetup from "./components/Meetup/Register/RegisterMeetup";

Vue.use(Vuetify);
Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertComp);
Vue.component("app-edit-dialogue", EditDialogue);
Vue.component("app-edit-date-dialog", EditDateDialog);
Vue.component("app-time-dialog", EditTimeDialog);
Vue.component("app-register-meetup", RegisterMeetup);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  router,
  store,
  template: "<App/>",
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAIVGRJaFGi6UFPGaYNTSk8HIb1w08UJVY",
      authDomain: "meetup-project-afb04.firebaseapp.com",
      databaseURL: "https://meetup-project-afb04.firebaseio.com",
      projectId: "meetup-project-afb04",
      storageBucket: "meetup-project-afb04.appspot.com"
    });
    this.$store.dispatch("loadMeetups");
    firebase.auth().onAuthStateChanged(user => {
      console.log(user.uid);
      if (user) {
        this.$store.dispatch("autoSignin", {
          id: user.uid,
          registeredMeetups: []
        });
        this.$store.dispatch("fetchUserData");
      }
    });
  }
});
