<template>
  <div class="about">
    <DebugStoreState/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DebugStoreState from '@/components/debug/DebugStoreState';

export default defineComponent({
  components: {
    DebugStoreState,
  },
});
</script>
