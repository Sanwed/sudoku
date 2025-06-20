<script setup>
import LogoSrc from '@/assets/images/logo.png'
</script>

<template>
  <div class="logo">
      <img :src="LogoSrc" alt="Судоку">
    </div>
</template>

<style scoped>
.logo {
  max-width: 500px;
  display: block;
  margin: 0 auto;
  width: 100%;
}

.logo img {
  width: 100%;
  height: auto;
}
</style>
