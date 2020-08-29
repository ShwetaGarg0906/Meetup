<template>
  <v-container>
    <v-layout>
      <v-flex class="text-xs-center">
        <v-progress-circular indeterminate :width="7" :size="100" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-title>
            <h5>{{meetup.title}}</h5>
            <v-spacer></v-spacer>
            <app-edit-dialogue v-if="IsCreator" :meetup="meetup"></app-edit-dialogue>
          </v-card-title>
          <v-card-media :src="meetup.imgURL" height="300px"></v-card-media>
          <v-card-text>
            <div>
              <b>{{meetup.date | date}}{{ " - " +meetup.location}}</b>
              <div>
                <app-edit-date-dialog v-bind:meetup="meetup"></app-edit-date-dialog>
                <app-time-dialog v-bind:meetup="meetup"></app-time-dialog>
              </div>
            </div>
            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
          </v-card-text>
          <v-card-actions>
            <!-- <v-btn flat class="info">Register</v-btn> -->
            <app-register-meetup v-bind:meetup="{meetupId:id,creatorId:meetup.creatorId}"></app-register-meetup>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    IsCreator() {
      console.log(this.meetup.creatorId + "  " + this.$store.getters.user.id);
      if (this.meetup.creatorId === this.$store.getters.user.id) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
