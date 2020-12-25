<template>
  <div class="task">
    <TaskList/>
    <hr />
    <AddTaskForm/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from '@/components/task/TaskList.vue';
import AddTaskForm from '@/components/task/AddTaskForm.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TaskList,
    AddTaskForm,
  },
});
</script>
