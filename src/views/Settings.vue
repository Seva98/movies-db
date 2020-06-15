<template>
  <v-container>
    <h1>Settings</h1>
    <v-text-field v-model="name" label="Table name"></v-text-field>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Inject, Watch } from 'vue-property-decorator';
import { AppModule } from '../store/modules/app';
@Component({})
export default class Settings extends Vue {
  name = '';

  mounted() {
    this.name = AppModule.name;
  }

  @Watch('name')
  onNameChange(newName: string) {
    AppModule.changeName(newName);
  }
}
</script>
