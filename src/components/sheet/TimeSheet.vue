<template>
  <div class="container">
    <div v-for="(tasks, key) in groupedTasks" v-bind:key="key">
      <TimeSheetDetails :date="key" :tasks="tasks"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import { Task } from '@/common/classes/Task';
import { groupTasks } from '@/components/sheet/utils/groupTasks';
import TimeSheetDetails from '@/components/sheet/TimeSheetDetails.vue';

export default defineComponent({
  name: 'TimeSheet',
  components: {
    TimeSheetDetails,
  },
  computed: {
    groupedTasks: function (): Record<string, Task[]> {
      return groupTasks(store.state.task.list);
    },
  },
  created () {
    store.dispatch('loadTasks');
  },
});
</script>

<style scoped>
.container {
  left: 50%;
  margin-left: -400px;
  position: relative;
  width: 800px;
}
</style>
