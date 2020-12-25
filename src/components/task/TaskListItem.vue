<template>
  <div>
    <label class="week-day">
      <input disabled
             :class="fullWeekDay"
             :value="weekDay">
    </label>
    <label class="date">
      <input maxlength="10"
             v-model.lazy.trim="date"
             :disabled="updating"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <label class="time">
      <input maxlength="9"
             v-model.lazy.trim="time"
             :disabled="updating"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <label class="text">
      <input v-model.lazy.trim="text"
             :disabled="updating"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <label class="type">
      <input v-model.lazy.trim="type"
             :disabled="updating"
             @focus="onFocus()"
             @blur="onBlur()">
    </label>
    <button title="Remove this entry."
            @click="remove">&#x2716;</button>
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
    weekDay: function (): string {
      return this.task.getDate('ddd');
    },
    fullWeekDay: function (): string {
      return this.task.getDate('dddd').toLowerCase();
    },
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
label input, button {
  font-family: monospace;
  margin: 2px;
}
.week-day input {
  font-weight: bold;
  text-align: center;
  width: 30px;
}
.week-day input.monday {
  color: black;
  background: orangered;
}
.week-day input.tuesday {
  color: black;
  background: orange;
}
.week-day input.wednesday {
  color: black;
  background: yellow;
}
.week-day input.thursday {
  color: black;
  background: limegreen;
}
.week-day input.friday {
  color: black;
  background: deepskyblue;
}
.week-day input.saturday {
  color: white;
  background: royalblue;
}
.week-day input.sunday {
  color: white;
  background: purple;
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
  width: 400px;
}
.type input {
  text-align: left;
  width: 80px;
}
</style>
