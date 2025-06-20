<script setup>
import GameTimer from '@/components/GameTimer.vue';
import GameControl from '@/components/GameControl.vue';
import GameGrid from '@/components/GameGrid.vue';
import GameKeyboard from '@/components/GameKeyboard.vue';
import { ref } from 'vue';
import LevelSelect from './LevelSelect.vue';

const fieldDisabled = ref(true);

const difficulties = [
  {
    name: 'Лёгко',
    cells: 60,
  },
  {
    name: 'Нормально',
    cells: 45,
    default: true,
  },
  {
    name: 'Сложно',
    cells: 30,
  },
]

const selectedDifficulty = ref(difficulties.find(dif => dif.default).cells);

</script>

<template>
  <div class="field">
    <LevelSelect v-model="selectedDifficulty" :difficulties="difficulties" />
    <GameTimer class="field__timer" />
    <GameControl v-model="fieldDisabled" :selected-difficulty="selectedDifficulty" class="field__controls" />
    <GameGrid :disabled="fieldDisabled" class="field__grid" />
    <GameKeyboard />
  </div>
</template>


<style scoped>
.field__timer {
  margin-bottom: 40px;
}

.field__controls {
  margin-bottom: 20px;
}

.field__grid {
  margin-bottom: 20px;
}

.select {
  padding: 6px 12px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
</style>
