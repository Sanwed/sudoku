<script setup>
import BaseButton from '@/components/BaseButton.vue';
import { useCells } from '@/composables/useCells';
import { onMounted, onUnmounted } from 'vue';

const { cells, activeCell } = useCells();

const handleButtonClick = (value) => {
  if (!activeCell.value) {
    return;
  }

  const cell = cells.value.flat().find(cell => cell.id === activeCell.value.id);

  if (cell) {
    if (cell.default) return;

    cell.value = +value;
  }
}

const handleCellClear = () => {
  if (!activeCell.value) {
    return;
  }

  const cell = cells.value.flat().find(cell => cell.id === activeCell.value.id);

  if (cell) {
    if (cell.default) return;

    cell.value = null;
  }
}

const handleKeydown = (event) => {
  if (/^[1-9]$/.test(event.key)) {
    handleButtonClick(event.key);
  }

  if (event.key === 'Backspace') {
    handleCellClear();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="keyboard">
    <BaseButton v-for="i in 9" :key="i" :text="String(i)" @click="handleButtonClick(i)" />
    <BaseButton class="clear" text="Очистить" @click="handleCellClear()" />
  </div>
</template>

<style scoped>
.keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 5px;
}

.keyboard .btn {
  width: 50px;
  height: 50px;
}

.keyboard .clear.btn {
  width: 100%;
}

@media (max-width: 768px) {
  .keyboard .btn {
    width: 30px;
    height: 30px;
  }
}
</style>
