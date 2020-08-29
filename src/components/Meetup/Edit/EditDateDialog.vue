<template>
  <v-dialog persistent width="350px" v-model="editDialog">
    <v-btn class="primary" slot="activator">Edit Date</v-btn>
    <v-card>
      <v-card-title>Edit Meetup</v-card-title>
      <v-divider></v-divider>
      <v-layout>
        <v-date-picker v-model="editableDate">
          <template :scope="{save,cancel}">
            <v-btn v-on:click="onSave">save</v-btn>
            <v-btn v-on:click="editDialog=false">cancel</v-btn>
          </template>
        </v-date-picker>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editDialog: false,
      editableDate: null
    };
  },
  methods: {
    onSave() {
      const newDate = new Date(this.meetup.date);
      console.log(typeof newDate);
      let editableDay = new Date(this.editableDate).getUTCDate();
      let editableMonth = new Date(this.editableDate).getUTCMonth();
      let editableYears = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(editableDay);
      newDate.setUTCMonth(editableMonth);
      newDate.setUTCFullYear(editableYears);
      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        date: newDate
      });
    }
  },
  created() {
    console.log(this.meetup.date);
    this.editableDate = new Date(this.meetup.date).toISOString().slice(0, 10); //this.meetup.date;
  }
};
</script>
