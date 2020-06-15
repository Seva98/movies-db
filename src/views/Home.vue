<template>
  <div>
    <MediaTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MediaTable from '@/components/MediaTable.vue';
@Component({
  name: 'Home',
  components: {
    MediaTable,
  },
})
export default class Home extends Vue {}
</script>
