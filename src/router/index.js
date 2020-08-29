import Router from "vue-router";
import Vue from "vue";
import Home from "@/components/Home";
import Profile from "@/components/User/Profile";
import SignIn from "@/components/User/SignIn";
import SignUp from "@/components/User/SignUp";
import CreateMeetup from "@/components/Meetup/CreateMeetup";
import Meetups from "@/components/Meetup/Meetups";
import Meetup from "@/components/Meetup/Meetup";
import AuthGuard from "./auth-guard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/profile",
      component: Profile
    },
    {
      path: "/meetup/new",
      component: CreateMeetup
      //beforeEnter: AuthGuard
    },
    {
      path: "/meetup/:id",
      component: Meetup,
      name: "meetup",
      props: true
    },
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/signin",
      component: SignIn
    },
    {
      path: "/meetups",
      component: Meetups
    }
  ],
  mode: "history"
});
