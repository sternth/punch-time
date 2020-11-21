<template>
  <div class="app-login">
    <h2>Punch-Time Login</h2>
    <div>
      <label for="app-login-name">Name:</label>
      <input type="text" id="app-login-name" name="app-login-name" v-model.trim="name">
    </div>
    <br>
    <button @click="login()" :disabled="name === ''">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'AppLogin',
  data () {
    return {
      name: '',
    };
  },
  methods: {
    login () {
      store.commit('setUserName', this.name);
      this.$router.push('about');
    }
  }
});
</script>

<style scoped>

</style>
