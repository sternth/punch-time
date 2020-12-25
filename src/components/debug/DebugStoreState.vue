<template>
  <div>
    <pre>user: {{ user }}</pre>
    <pre>task: {{ task }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import store from '@/store';

export default defineComponent({
  name: 'DebugStoreState',
  computed: {
    ...mapState([
      'user',
      'task',
    ]),
  },
  created () {
    store.dispatch('loadTasks');
  },
});
</script>

<style scoped>
pre {
  border: lightgray solid 1px;
  margin: 10px auto;
  padding: 8px;
  text-align: left;
  width: 50%;
}
</style>
