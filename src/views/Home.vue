<template>
  <div class="home">
    <Logo />
    <MoviesTable />
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/Logo';
import MoviesTable from '@/components/MoviesTable.vue';

export default {
  name: 'Home',
  components: {
    Logo,
    MoviesTable,
  },
};
</script>
