<template>
  <div class="task-list">
    <div v-for="task in task.list" v-bind:key="task.id">
      <TaskListItem :task="task"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import store from '@/store';
import TaskListItem from '@/components/task/TaskListItem.vue';

export default defineComponent({
  name: 'TaskList',
  components: {
    TaskListItem,
  },
  computed: {
    ...mapState([
      'task',
    ]),
  },
  created () {
    store.dispatch('loadTasks');
  },
});
</script>

<style scoped>

</style>
