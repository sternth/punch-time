<template>
  <div>
    <label class="date">
      <span>Date: </span>
      <input v-model.trim="input.date"
             v-on:keyup="addOnEnter"
             :disabled="updating">
    </label>
    <label class="time">
      <span>&emsp;Time: </span>
      <input v-model.trim="input.time"
             v-on:keyup="addOnEnter"
             :disabled="updating">
    </label>
    <label class="text">
      <span>&emsp;Text: </span>
      <input v-model.trim="input.text"
             v-on:keyup="addOnEnter"
             :disabled="updating">
    </label>
    <label class="type">
      <span>&emsp;Type: </span>
      <input v-model.trim="input.type"
             v-on:keyup="addOnEnter"
             :disabled="updating">
    </label>
    <span>&emsp;</span>
    <button @click="addNewTask"
            :disabled="!valid">&#x2795;</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import { getInitialDateValue, getInitialTimeValue } from '@/components/task/utils/helpers';
import dayjs from 'dayjs';
import { keys } from '@/components/task/utils/keys';

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

      this.updating = true;
      store.dispatch('addTask', {
        start: start.valueOf(),
        end: end.valueOf(),
        text: this.input.text,
        type: this.input.type,
      }).finally(() => {
        this.updating = false;
      });
    },
    addOnEnter: function(event: KeyboardEvent) {
      if (event.key === keys.Enter) {
        this.addNewTask();
      }
    }
  },
});
</script>

<style scoped>
label input, button {
  font-family: monospace;
  margin: 2px;
}
.date input {
  text-align: center;
  width: 80px;
}
.time input {
  text-align: center;
  width: 70px;
}
.text input {
  text-align: left;
  width: 300px;
}
.type input {
  text-align: left;
  width: 80px;
}
</style>
