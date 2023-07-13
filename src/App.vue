<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>TK2P</h2>
      </div>

      <v-spacer></v-spacer>

      <v-list class="navitems">
        <v-list-item to="/">
          <v-list-item-content>
            <v-list-item-title >Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/background-library">
          <v-list-item-content>
            <v-list-item-title >Background Library</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>

</style>