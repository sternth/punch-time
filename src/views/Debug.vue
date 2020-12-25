<template>
  <div class="debug">
    <DebugStoreState/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DebugStoreState from '@/components/debug/DebugStoreState.vue';

export default defineComponent({
  components: {
    DebugStoreState,
  },
});
</script>
