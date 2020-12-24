<template>
  <div>
    <label>
      <span>Date</span>
      <input v-model.trim="input.date"
             :disabled="updating">
    </label>
    <br />
    <label>
      <span>Time</span>
      <input v-model.trim="input.time"
             :disabled="updating">
    </label>
    <br />
    <label>
      <span>Text</span>
      <input v-model.trim="input.text"
             :disabled="updating">
    </label>
    <br />
    <label>
      <span>Type</span>
      <input v-model.trim="input.type"
             :disabled="updating">
    </label>
    <br />
    <button @click="addNewTask"
            :disabled="!valid">Add new Task</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import { getInitialDateValue, getInitialTimeValue } from '@/components/task/utils/helpers';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'AddTaskForm',
  data () {
    return {
      updating: false,
      input: {
        date: getInitialDateValue(),
        time: getInitialTimeValue(),
        text: '',
        type: '',
      },
    };
  },
  computed: {
    valid: function (): boolean {
      const validDate = /^\d{4}-\d{2}-\d{2}$/.test(this.input.date);
      const validTime = /^\d{4}-\d{4}$/.test(this.input.time);
      const validText = this.input.text !== '';

      return validDate && validTime && validText;
    },
  },
  methods: {
    addNewTask: function () {
      const [startTime, endTime] = this.input.time.split('-');
      const start = dayjs(`${this.input.date} ${startTime}`);
      const end = dayjs(`${this.input.date} ${endTime}`);

      store.dispatch('addTask', {
        start: start.valueOf(),
        end: end.valueOf(),
        text: this.input.text,
        type: this.input.type,
      });
    },
  },
});
</script>

<style scoped>
</style>
