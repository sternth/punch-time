<template>
  <div>
    <label v-bind:class="[updater.status]">
      <span>Date</span>
      <input v-model.lazy.trim="date"
             :disabled="isUpdating()"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <br />
    <label v-bind:class="[updater.status]">
      <span>Time</span>
      <input v-model.lazy.trim="time"
             :disabled="isUpdating()"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <br />
    <label v-bind:class="[updater.status]">
      <span>Text</span>
      <input v-model.lazy.trim="text"
             :disabled="isUpdating()"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <br />
    <label v-bind:class="[updater.status]">
      <span>Type</span>
      <input v-model.lazy.trim="type"
             :disabled="isUpdating()"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <pre>
      status: {{ updater.status }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

enum STATUS {
  NONE = '',
  ACTIVE = 'active',
  FAILED = 'failed',
  SUCCESS = 'success'
}

export default defineComponent({
  name: 'TaskListItem',
  props: ['task'],
  data () {
    return {
      focus: false,
      updater: {
        timeout: 2500,
        timeoutId: 0,
        status: STATUS.NONE,
      },
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
      clearTimeout(this.updater.timeoutId);
      this.updater.status = STATUS.NONE;
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
      clearTimeout(this.updater.timeoutId);
      this.updater.status = STATUS.ACTIVE;
      this.task.update().then(() => {
        this.updater.status = STATUS.SUCCESS;
      }).catch(() => {
        this.updater.status = STATUS.FAILED;
      }).finally(() => {
        this.updater.timeoutId = setTimeout(() => {
          this.updater.status = STATUS.NONE;
        }, this.updater.timeout) as unknown as number;
      });
    },
    isUpdating: function () {
      return this.updater.status === STATUS.ACTIVE;
    },
  },
});
</script>

<style scoped>
label {
  background: white;
}
label.active {
  background: lightskyblue;
}
label.failed {
  background: lightcoral;
}
label.success {
  background: #42b983;
}
</style>
