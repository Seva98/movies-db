<template>
  <div class="home">
    <Logo />
    <MediaTable />
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/Logo';
import MediaTable from '@/components/MediaTable.vue';

export default {
  name: 'Home',
  components: {
    Logo,
    MediaTable,
  },
};
</script>
