<template>
  <div class="home">
    <AppLogin/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppLogin from '@/components/AppLogin.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AppLogin,
  },
});
</script>
