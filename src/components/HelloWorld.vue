<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-subheader > {{ username }}</v-subheader>
      <v-divider></v-divider>
      <v-list nav>
        <v-subheader>MAIN</v-subheader>
        <v-list-item
          color="primary"
          v-for="(item, index) in navlist"
          :key="index"
          :to="item.tolink"
        >
          <v-list-item-icon
            ><v-icon>{{ item.ico }}</v-icon></v-list-item-icon
          >
          <v-list-item-content>{{ item.itemname }}</v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader>SAVED REPORT</v-subheader>
        <v-list-item
          color="primary"
          v-for="(item, index) in savereport"
          :to="item.tolink"
          :key="index + 4"
        >
          <v-list-item-icon
            ><v-icon>{{ item.ico }}</v-icon></v-list-item-icon
          >
          <v-list-item-content>{{ item.itemname }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat dense app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-scroll-x-reverse-transition>
        <v-text-field v-if="search" hide-details single-line></v-text-field>
      </v-scroll-x-reverse-transition>
      <v-icon @click="search = !search">mdi-magnify</v-icon>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    username: window.sessionStorage.getItem("userId"),
    search: null,
    drawer: null,
    navlist: [
      { tolink: "/dashboard", ico: "mdi-home", itemname: "dashboard" },
      { tolink: "/menu", ico: "mdi-food", itemname: "menu" },
      {
        tolink: "/order",
        ico: "mdi-clipboard-list-outline",
        itemname: "order",
      },
      { tolink: "/report", ico: "mdi-chart-bar", itemname: "report" },
    ],
    savereport: [
      { tolink: "/day", ico: "mdi-file", itemname: "day" },
      { tolink: "/month", ico: "mdi-file", itemname: "month" },
      { tolink: "/year", ico: "mdi-file", itemname: "year" },
    ],
  }),
  computed: {
    breadcrumbs() {
      var a = new Array();
      a.push({ text: "MAIN", disabled: true });
      a.push({
        text: this.$route.path.replace("/", ""),
        disabled: false,
        href: this.$route.path,
      });
      return a;
    },
  },
};
</script>