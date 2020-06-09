<template>
  <v-card>
    <v-card-title>
      Movies
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="movies" :search="search"></v-data-table>
  </v-card>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class MoviesTable extends Vue {
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
  ];
  movies = [
    {
      title: 'Doom: Eternal',
      type: 'BlueRay',
      kind: 'Game',
      number_of_discs: 1,
      release_year: 2020,
    },
    {
      title: 'Mario',
      type: 'NS',
      kind: 'Game',
      number_of_discs: 3,
      release_year: 1990,
    },
    {
      title: 'BOTW',
      type: 'Card',
      kind: 'Game',
      number_of_discs: 1,
      release_year: 2018,
    },
    {
      title: 'Titanic',
      type: 'DVD',
      kind: 'Movie',
      number_of_discs: 3,
      release_year: 1999,
    },
  ];
}
</script>
