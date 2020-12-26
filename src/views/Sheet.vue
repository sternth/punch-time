<template>
  <div class="sheet">
    <TimeSheet/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TimeSheet from '@/components/sheet/TimeSheet.vue';

export default defineComponent({
  name: 'Sheet',
  components: {
    TimeSheet,
  },
});
</script>

<style scoped>

</style>
