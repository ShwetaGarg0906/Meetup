<template>
  <v-dialog persistent v-model="registerMeetup" width="400px">
    <v-btn slot="activator" v-if="!IsCreator">{{IsRegistered?"UnRegister":"Register"}}</v-btn>
    <!-- <v-btn v-else>UnRegister</v-btn> -->
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="IsRegistered">UnRegister From Meetup</v-card-title>
            <v-card-title v-else>Register For Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn @click="registerMeetup=false">Cancel</v-btn>
              <v-btn @click="onConfirm">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      registerMeetup: false
    };
  },
  computed: {
    IsRegistered() {
      // console.log(
      //   "registered meetups : " + this.$store.getters.user.registeredMeetups
      // );
      console.log("meetup Id" + this.meetup.meetupId);
      return (
        this.$store.getters.user.registeredMeetups.findIndex(m => {
          return m === this.meetup.meetupId;
        }) >= 0
      );
    },
    IsCreator() {
      //const meetupId = this.meetup.meetupId;
      const creatorId = this.meetup.creatorId;
      const currentUser = this.$store.getters.user.id;
      return creatorId === currentUser;
    }
  },
  methods: {
    onConfirm() {
      //console.log(this.meetupId);
      console.log(this.meetup.meetupId);
      if (!this.IsRegistered)
        this.$store.dispatch("registerUserMeetups", {
          meetupId: this.meetup.meetupId
        });
      else {
        this.$store.dispatch("unregisterUserMeetups", {
          meetupId: this.meetup.meetupId
        });
      }

      // this.$store.getters.user.registeredMeetups.push("asd");

      // this.$store.getters.user.registeredMeetups.push("asdsd");

      // this.$store.getters.user.registeredMeetups.push("asda");
    }
  }
};
</script>

