<template>
  <v-dialog width="400px" persistent v-model="editDialog">
    <v-btn class="primary" slot="activator">Edit Time</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker width="100%" v-model="editableTime">
              <template scope="{close,save}">
                <v-btn id="close" v-on:click="editDialog=false">Close</v-btn>
                <v-btn id="save" @click="onSave">save</v-btn>
              </template>
            </v-time-picker>
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
      editDialog: false,
      editableTime: null
    };
  },
  methods: {
    onSave() {
      this.editDialog = false;
      console.log(typeof this.editableTime);
      const newTime = new Date(this.meetup.date);
      console.log(newTime);
      const updatedHours = this.editableTime.match(/^(\d+)/)[1];
      const updatedMinutes = this.editableTime.match(/:(\d+)/)[1];
      newTime.setHours(updatedHours);
      newTime.setMinutes(updatedMinutes);
      console.log(updatedHours);
      console.log(updatedMinutes);
      console.log(newTime);
      //const upadtedTime = updatedHours + ":" + updatedMinutes;
      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        date: newTime
      });
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date);
    console.log(this.editableTime);
  }
};
</script>
