<template>
  <v-data-table :headers="headers" :items="media" :search="search" data-app>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ appName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        <v-dialog v-model="dialog" max-width="500px" @click:outside="close">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Media</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedMedia.title" label="Media Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedMedia.type" label="Type"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedMedia.kind" label="Kind"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedMedia.number_of_discs" label="Number of Discs"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedMedia.release_year" label="Release Year"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <p v-if="error">{{ error }}</p>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { IMediaData } from '../api/types';
import { AppModule } from '../store/modules/app';

@Component({
  name: 'MoviesTable',
  inject: ['$mediaApi'],
})
export default class MediaTable extends Vue {
  search = '';
  headers = [
    {
      text: 'Title',
      value: 'title',
    },
    {
      text: 'Type',
      value: 'type',
    },
    {
      text: 'Kind',
      value: 'kind',
    },
    {
      text: '# Discs',
      value: 'number_of_discs',
    },
    {
      text: 'Release Year',
      value: 'release_year',
    },
    { text: 'Actions', value: 'actions', sortable: false },
  ];
  media: IMediaData[] = [];

  editedIndex = -1;
  editedMedia: IMediaData = {
    guid: '',
    title: '',
    type: '',
    kind: '',
    number_of_discs: 1,
    release_year: 2020,
  };
  dialog = false;
  error = '';
  appName = '';

  get formTitle() {
    return this.editedIndex === -1 ? 'New Media' : 'Edit Media';
  }

  async mounted() {
    this.appName = AppModule.name;
    this.media = await this.$mediaApi.getAllMedia();
  }

  async editItem(item: IMediaData) {
    this.editedIndex = this.media.indexOf(item);
    this.editedMedia = Object.assign({}, item);
    this.dialog = true;
  }

  async deleteItem(item: IMediaData) {
    try {
      await this.$mediaApi.deleteItem(item);
      const indexToDelete = this.media.findIndex((m) => m.guid === item.guid);
      if (indexToDelete > -1) this.media.splice(indexToDelete, 1);
    } catch (error) {
      this.error = error;
      console.error(error);
    }
  }

  close() {
    this.dialog = false;
  }

  async save() {
    try {
      if (this.editedIndex > -1) {
        const response = await this.$mediaApi.updateItem(this.editedMedia);
        this.media.splice(this.editedIndex, 1, this.editedMedia);
      } else {
        await this.$mediaApi.createItem(this.editedMedia);
        this.media.push(this.editedMedia);
      }
      this.dialog = false;
    } catch (error) {
      this.error = error;
      console.error(error);
    }
  }

  @Watch('dialog')
  onDialogChange(newDialog: Boolean) {
    if (!newDialog) this.resetDialog();
  }

  resetDialog() {
    this.editedMedia = {
      guid: '',
      title: '',
      type: '',
      kind: '',
      number_of_discs: 1,
      release_year: 2020,
    };
    this.editedIndex = -1;
    this.error = '';
  }
}
</script>
