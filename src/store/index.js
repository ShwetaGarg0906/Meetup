import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        id: "sahg12esdwxsa",
        imgURL:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
        title: "Meetup in Paris",
        date: new Date(),
        location: "paris"
      },
      {
        id: "sahg12easdwxsa",
        imgURL:
          "https://images.unsplash.com/photo-1549144511-f099e773c147?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        title: "Meetup in France",
        date: new Date(),
        location: "france"
      }
    ],
    user: null,
    loading: false,
    authError: false
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setMeetups(state, payload) {
      state.loadedMeetups = payload;
      console.log("payload" + payload);
      console.log(state.loadedMeetups);
    },
    updateMeetup(state, payload) {
      let meetup = state.loadedMeetups.find(m => {
        return m.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
    setUser(state, payload) {
      state.user = payload;
      console.log("Mutator" + state.user);
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setAuthError(state, payload) {
      state.authError = payload;
    },
    clearError(state) {
      state.authError = null;
    },
    registerUserMeetups(state, payload) {
      state.user.registeredMeetups.push(payload);
      console.log("mutation" + state.user.registeredMeetups);
    },
    unregisterUserMeetups(state, payload) {
      const index = state.user.registeredMeetups.indexOf(payload);
      if (index > -1) {
        state.user.registeredMeetups.splice(index, 1);
        console.log(state.user.registeredMeetups);
      }
    },
    updateUserDetails(state, payload) {
      console.log("updating the details");
      state.user.registeredMeetups = payload;
      console.log(" update details : " + state.user.registeredMeetups);
    }
  },

  actions: {
    loadMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .orderByKey()
        .once("value", function(snapshot) {
          const meetups = [];
          const obj = snapshot.val();
          for (let key in obj) {
            console.log("load meetups" + obj[key]);
            meetups.push({
              id: key,
              title: obj[key].title,
              imgURL: obj[key].imgURL,
              description: obj[key].description,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            });
          }
          commit("setMeetups", meetups);
          commit("setLoading", false);
        })
        .catch(error => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    createMeetup({ commit }, payload) {
      //if(!formIsValid)
      let key = "";
      let imageURL = "";
      const meetup = {
        title: payload.title,
        description: payload.description,
        location: payload.location,
        date: payload.date.toISOString(),
        //imgURL: payload.imgURL
        creatorId: payload.creatorId
      };
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          key = data.key;
          console.log(data);
          //commit("createMeetup", { ...meetup, id: key });
          return key;
        })
        .then(key => {
          return firebase
            .storage()
            .ref("meetups/" + key + " " + payload.image.name)
            .put(payload.image);
        })
        .then(fileData => {
          console.log(fileData);
          const fullPath = fileData.metadata.fullPath;
          return firebase
            .storage()
            .ref(fullPath)
            .getDownloadURL();
        })
        .then(URL => {
          imageURL = URL;
          return firebase
            .database()
            .ref("meetups")
            .child(key)
            .update({ imgURL: imageURL });
        })
        .then(() => {
          commit("createMeetup", { ...meetup, id: key, imgURL: imageURL });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMeetup({ commit }, payload) {
      commit("setLoading", true);
      let updatedMeetup = {};
      if (payload.title) {
        updatedMeetup.title = payload.title;
      }
      if (payload.description) {
        updatedMeetup.description = payload.description;
      }
      if (payload.date) {
        updatedMeetup.date = payload.date;
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updatedMeetup)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetup", payload);
        })
        .catch(error => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    SignupUser({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(u => {
          commit("setLoading", false);
          console.log(u);
          const user = {
            id: u.user.uid,
            registeredMeetups: []
          };
          //console.log(user.id);
          commit("setUser", user);
        })
        .catch(error => {
          commit("clearError");
          commit("setLoading", false);
          commit("setAuthError", error);
          console.log("error block " + error.message);
        });
    },
    SigninUser({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(u => {
          commit("setLoading", false);
          const user = {
            id: u.user.id,
            registeredMeetups: []
          };
          commit("setUser", user);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("clearError");
          commit("setAuthError", error);
          console.log(error);
        });
    },
    autoSignin({ commit }, payload) {
      commit("setUser", payload);
    },
    logoutUser({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(data => {
          commit("setLoadedMeetups", []);
          commit("setUser", null);
        })
        .catch(error => {
          console.log("error signing out!" + error);
        });
    },
    clearError({ commit }) {
      commit("clearError");
    },
    registerUserMeetups({ commit, getters }, payload) {
      commit("setLoading", true);
      console.log(payload);
      console.log(getters.user);
      return firebase
        .database()
        .ref("users/" + getters.user.id)
        .child("registrations/" + payload.meetupId)
        .set(true, function(error) {
          commit("setLoading", false);
          if (error) {
            console.log(error);
          } else {
            console.log("success");
            commit("registerUserMeetups", payload.meetupId);
          }
        });
    },
    unregisterUserMeetups({ commit, getters }, payload) {
      commit("setLoading", true);
      console.log(payload);
      console.log(getters.user);
      return firebase
        .database()
        .ref("users/" + getters.user.id)
        .child("registrations/" + payload.meetupId)
        .set(null, function(error) {
          commit("setLoading", false);
          if (error) {
            console.log(error);
          } else {
            commit("unregisterUserMeetups", payload.meetupId);
            console.log("success");
          }
        });
    },
    fetchUserData({ commit, getters }) {
      const registrations = [];
      console.log("fetchUserData" + getters.user.registerdUserMeetups);
      firebase
        .database()
        .ref("users/" + getters.user.id + "/registrations")
        .once("value", snapshot => {
          const obj = snapshot.val();
          for (let key in obj) {
            console.log("key is " + key);
            registrations.push(key);
          }
          console.log(registrations);
          commit("updateUserDetails", registrations);
          return registrations;
        })
        // .then(registrations => {
        //   console.log(registrations);
        //   //
        //   // getters.user.registerdMeetups.array.forEach(element => {
        //   //   console.log(element);
        //   // });
        //   // console.log(
        //   //   "updateUserDetails" + getters.user.registerdUserMeetups[0]
        //   // );
        // })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    loadedMeetups(state) {
      //return state.loadedMeetups;
      console.log("getters:" + state.loadedMeetups);
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date < meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      console.log("getters loaded meetups" + state.loadedMeetups);
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    error(state) {
      console.log(" getters" + state.authError);
      return state.authError;
    },
    loading(state) {
      return state.loading;
    }
  }
});
