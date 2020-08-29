<template>
  <v-container>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs10 sm8 offset-sm2 offset-xs1>
        <v-card class="info">
          <v-layout row>
            <v-flex xs5 sm4 md3>
              <v-card-media :src="meetup.imgURL" height="125px"></v-card-media>
            </v-flex>
            <v-flex xs5 sm8 md9>
              <v-card-title>
                <div>
                  <h3 class="white---text">{{meetup.title}}</h3>
                  <div>{{meetup.date | date}}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn :to="'/meetup/' + meetup.id">Show Details</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      //this.$store.dispatch("loadMeetups");
      console.log(this.$store.getters.loadedMeetups);
      return this.$store.getters.loadedMeetups;
    }
  }
};
</script>
