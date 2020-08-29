<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Create New Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <form @submit.prevent="createMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="title" name="title" label="Title" id="title" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                required
                v-model="location"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <!-- <v-text-field name="img-url" label="Image URL" id="img-url" required v-model="imgURL"></v-text-field> -->
              <v-btn class="primary" @click="onPickFile">Upload File</v-btn>
              <input
                type="file"
                name="image"
                id="image"
                style="display:none;"
                ref="fileUpload"
                @change="onFilePicked"
              >
            </v-flex>
          </v-layout>
          <v-layout row v-if="imgURL!=''">
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imgURL" height="300px" conatins alt="Please specify valid image path">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                multi-line
                name="description"
                label="Description"
                id="description"
                required
                v-model="description"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs10 sm4 md3 offset-sm3 offset-xs-1 offset-md-1>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
            <v-flex xs10 sm4 md3 offset-sm-1 offset-xs-1 offset-md-1>
              <v-time-picker v-model="time"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" type="submit" :disabled="!formIsValid">Create Meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      imgURL: "",
      location: "",
      date: new Date().toISOString().slice(0, 10),
      time: new Date(),
      image: null
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.description !== "" &&
        this.location !== "" &&
        this.imgURL !== ""
        // this.date !== "" &&
        // this.time !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    }
  },
  methods: {
    createMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      console.log("User Id" + this.$store.getters.user.id);

      const meetup = {
        title: this.title,
        location: this.location,
        imgURL: this.imgURL,
        description: this.description,
        // date: this.date,
        // time: this.time
        date: this.submittableDateTime,
        image: this.image,
        creatorId: this.$store.getters.user.id
      };
      console.log();
      this.$router.push("/meetups");
      return this.$store.dispatch("createMeetup", meetup);
    },
    onPickFile() {
      console.log("file pick event");
      this.$refs.fileUpload.click();
    },
    onFilePicked(event) {
      //FileReader fr = new FileReader();
      const files = event.target.files;
      let fileName = files[0].name;
      console.log(fileName);
      if (fileName.lastIndexOf(".") <= 0) {
        alert("Please upload the correct file format!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imgURL = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
      const TextFr = new FileReader();
      TextFr.addEventListener("load", () => {
        console.log(String(TextFr.result));
      });
      TextFr.readAsText(this.image);
    }
  }
};
</script>
