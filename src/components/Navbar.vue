<template>
  <div>
    <v-tabs>
      <v-tab to="/">
        Home
      </v-tab>
      <v-tab to="/settings">
        Settings
      </v-tab>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Navbar',
})
export default class Navbar extends Vue {}
</script>
