<script setup>
import MainLogo from '@/components/MainLogo.vue'
import GameField from '@/components/GameField.vue'
import GameRules from '@/components/GameRules.vue'
</script>

<template>
  <div class="page">
    <MainLogo />
    <GameField class="page__field" />
    <GameRules class="page__rules" />
  </div>
</template>

<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 40px;
}

.page__field {
  margin-top: 40px;
}

.page__rules {
  margin-top: 40px;
}

@media screen and (max-width: 768px) {
  .page {
    padding: 20px;
  }
}
</style>
