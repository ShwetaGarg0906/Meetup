<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn flat fab class="primary" slot="activator">Edit</v-btn>
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
            <v-card-text>
              <v-text-field name="title" label="title" id="title" v-model="editedTitle"></v-text-field>
              <v-text-field
                name="description"
                label="description"
                id="description"
                multi-line
                v-model="editedDescription"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn @click="onSave">Save</v-btn>
              <v-btn @click="editDialog=false">Cancel</v-btn>
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      editDialog: false
    };
  },
  methods: {
    onSave() {      
      if (
        this.editedTitle.trim() === "" &&
        this.editedDescription.trim() === ""
      ) {
        return;
      } else {
        this.editDialog = false;
        this.$store.dispatch("updateMeetup", {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription
        });
      }
    }
  }
};
</script>
