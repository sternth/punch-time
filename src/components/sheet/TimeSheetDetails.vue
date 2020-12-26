<template>
  <div class="container">
    <h3>{{ date }} {{ printAdd() }} ({{ tasks.length }})</h3>
    <p>{{ range }} <span v-if="pause"><b>&emsp;Pause:</b> {{ pause }} minutes</span></p>
    <table>
      <thead>
      <tr>
        <th>Description</th>
        <th>Hours</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="combinedTask in combinedTasks" v-bind:key="combinedTask.text">
        <td>{{ combinedTask.text }}</td>
        <td>{{ formatHours(combinedTask.hours) }}</td>
      </tr>
      <tr class="total">
        <td><b>Total</b></td>
        <td><b>{{ totalHours }}</b></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  calcRange,
  sumPauseTime,
  getToday,
  getYesterday,
} from '@/components/sheet/utils/helpers';
import {
  CombinedTask,
  combineTasks,
} from '@/components/sheet/utils/combineTasks';

const SPACE = ' ';

export default defineComponent({
  name: 'TimeSheetDetails',
  props: ['date', 'tasks'],
  computed: {
    range: function (): string {
      return calcRange(this.tasks);
    },
    pause: function (): number {
      return sumPauseTime(this.tasks);
    },
    combinedTasks: function (): CombinedTask[] {
      return combineTasks(this.tasks);
    },
    totalHours: function (): string {
      const total = this.combinedTasks.reduce((result, task) => {
        return result + task.hours;
      }, 0);

      return this.formatHours(total);
    },
  },
  methods: {
    printAdd: function (): string {
      if (this.date === getToday()) {
        return '- today ';
      }
      if (this.date === getYesterday()) {
        return '- yesterday';
      }
      return '';
    },
    formatHours: function (hours: number): string {
      const requireSpace = hours < 10;
      const fixedHours = hours.toFixed(2);

      return (requireSpace ? SPACE : '') + fixedHours;
    },
  },
});
</script>

<style scoped>
.container {
  text-align: left;
}
p {
  font-family: monospace;
  font-size: larger;
}
table {
  border: 1px solid #2c3e50;
  border-collapse: collapse;
  font-family: monospace;
  font-size: larger;
}
table th {
  background: #fce1e5;
}
table th, table td {
  border: 1px solid #2c3e50;
  padding: 2px 4px;
}
table td:nth-child(1) {
  min-width: 420px;
}
table tr.total td {
  background: #42b983;
}
</style>
