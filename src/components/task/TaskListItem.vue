<template>
  <div>
    <label>
      <span>Date</span>
      <input v-model.lazy.trim="date"
             :disabled="updating"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <br />
    <label>
      <span>Time</span>
      <input v-model.lazy.trim="time"
             :disabled="updating"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <br />
    <label>
      <span>Text</span>
      <input v-model.lazy.trim="text"
             :disabled="updating"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <br />
    <label>
      <span>Type</span>
      <input v-model.lazy.trim="type"
             :disabled="updating"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <br />
    <button @click="remove">DELETE</button>
    <pre>
      updating: {{ updating }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'TaskListItem',
  props: ['task'],
  data () {
    return {
      focus: false,
      updating: false,
    };
  },
  computed: {
    date: {
      get: function (): string {
        return this.task.getFormattedDate();
      },
      set: function (newValue: string): void {
        this.task.changeDate(newValue);
      },
    },
    time: {
      get: function (): string {
        return this.task.getFormattedTime();
      },
      set: function (newValue: string): void {
        this.task.changeTime(newValue);
      },
    },
    text: {
      get: function (): string {
        return this.task.text;
      },
      set: function (newValue: string): void {
        this.task.setText(newValue);
      },
    },
    type: {
      get: function (): string {
        return this.task.type;
      },
      set: function (newValue: string): void {
        this.task.setType(newValue);
      },
    },
  },
  methods: {
    onFocus: function () {
      this.focus = true;
    },
    onBlur: function () {
      this.focus = false;
      setTimeout(() => {
        if (!this.focus) {
          this.update();
        }
      });
    },
    update: function () {
      this.updating = true;
      store.dispatch('editTask', this.task).finally(() => {
        this.updating = false;
      });
    },
    remove: function () {
      store.dispatch('removeTask', this.task);
    }
  },
});
</script>

<style scoped>
</style>
