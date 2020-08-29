<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed()" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup()">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      required
                      :rules="checkPassword"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit">Sign Up</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    checkPassword() {
      console.log(this.confirmPassword);
      return this.password !== this.confirmPassword
        ? "passwords do not match"
        : true;
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    onSignup() {
      //Vuex
      console.log(
        "email : " +
          this.email +
          "\n password: " +
          this.password +
          "\n Confirma Password: " +
          this.confirmPassword
      );
      this.$store.dispatch("SignupUser", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      console.log("dismissed !");
      this.$store.dispatch("clearError");
      console.log(this.error);
    }
  }
};
</script>
