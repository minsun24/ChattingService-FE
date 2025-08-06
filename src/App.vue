<script setup>
import AppHeader from './common/components/AppHeader.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 헤더를 숨길 경로 목록
const hideHeaderRoutes = ['/welcome', '/signup', '/login'];
const showHeader = !hideHeaderRoutes.includes(route.path);

</script>

<template>
  <v-app>
    <AppHeader v-if="!hideHeaderRoutes.includes(route.path)" />

    <v-main class="main-container">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
*{
  padding : 0;

}
.main-container {
  width: 100vw;
  height: 100%;
}
</style>
