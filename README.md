# Vue 2 + TypeScript + Vuetify + Mock API example

Simple Typescript Vue application utilizing full functionaly of Vuetify v-data-table component.

App also includes simple examples of Vue Router and Vuex.

## Requirements

1. [vue-cli-service](https://cli.vuejs.org/guide/cli-service.html#using-the-binary)

## Prepare project

1. Clone project `git clone git@github.com:Seva98/movies-db.git media-db`
2. Change directory `cd media-db`
3. Install dependencies `npm install`

## Run project

1. Start mock API `npm run mock`
2. Start app on localhost `npm run start`

## Possible future improvements

1. Change depency injection to [InversifyJS](http://inversify.io) instead of using built in Vue's inject function which doesn't work well with TypeScript
2. Refactor MediaTable to multiple components
3. Modify the mock API so it returns more descriptive error messages
