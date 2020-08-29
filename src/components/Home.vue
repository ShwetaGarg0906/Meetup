<template>
  <v-container>
    <v-layout row wrap mb-2>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="accent">Explore meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="accent">Organise meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="text-xs-center">
        <v-progress-circular indeterminate width="7" size="100" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12 class="text-sm-center">
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imgURL"
            :key="meetup.id"
            v-on:click="loadMeetup(meetup.id)"
          >
            <div class="title text-xs-center">{{meetup.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome Meet</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      console.log("is loading ?" + this.$store.getters.loading);
      return this.$store.getters.loading;
    }
  },
  methods: {
    loadMeetup(id) {
      console.log(id);
      this.$router.push("/meetup/" + id);
    }
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
}
</style>
