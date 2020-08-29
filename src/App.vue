<template>
  <v-app>
    <v-navigation-drawer temporary v-if="sideNav" v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" flat>
      <v-toolbar-side-icon @click="sideNav=!sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link tag="span" to="/" style="cursor:pointer">Dev Meetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          v-for="item in menuItems"
          class="ml-1 primary"
          flat
          :key="item.title"
          router
          :to="item.link"
        >{{item.title}}</v-btn>
        <v-btn class="ml-1 primary" @click="onLogout()" flat v-if="userIsAuthenticated">Log Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "", title: "SignUp", link: "/signup" },
        { icon: "", title: "Sign In", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "", title: "View Meetups", link: "/meetups" },
          { icon: "", title: "Organize Meetups", link: "/meetup/new" },
          { icon: "", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/signin");
    }
  }
};
</script>