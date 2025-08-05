<script setup>
import AppHeader from './common/components/AppHeader.vue';



</script>

<template>
  <v-app>
    <AppHeader />
    <v-main class="main-container">
      <router-view />
    </v-main>
  </v-app>
  
</template>

<style scoped>
.main-container{
  width: 100vw;
  padding-top: 65px;
  height: 100%;
}
</style>
