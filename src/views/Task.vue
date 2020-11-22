<template>
  <div class="task">
    <TaskList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '@/components/task/TaskList.vue';

export default defineComponent({
  name: 'Task',
  components: {
    TaskList,
  },
});
</script>

<style scoped>

</style>
