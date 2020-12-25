<template>
  <div class="task-list">
    <div v-for="task in sortedList" v-bind:key="task._id">
      <TaskListItem :task="task"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import TaskListItem from '@/components/task/TaskListItem.vue';
import { Task } from '@/common/classes/Task';

export default defineComponent({
  name: 'AddTaskForm',
  components: {
    TaskListItem,
  },
  computed: {
    sortedList: function (): Task[] {
      return store.state.task.list
        .map(task => task)
        .sort((a, b) => a.start - b.start);
    },
  },
  created () {
    store.dispatch('loadTasks');
  },
});
</script>

<style scoped>

</style>
