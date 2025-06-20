<script setup>
const rules = [
  'Каждая строка содержала все цифры от 1 до 9.',
  'Каждый столбец содержал все цифры от 1 до 9.',
  'Каждый из девяти квадратов 3x3 содержал все цифры от 1 до 9.'
]
</script>

<template>
  <div class="rules">
    <h2>Правила игры</h2>
    <p>Цель игры - заполнить сетку 9x9 цифрами от 1 до 9 так, чтобы:</p>
    <ul>
      <li v-for="rule in rules" :key="rule">{{ rule }}</li>
    </ul>
  </div>
</template>

<style scoped>
.rules {
  text-align: center;
  padding: 20px;
  width: 100%;
  background-color: var(--color-tooltip-background);
  border-radius: 20px;
}

.rules h2 {
  margin: 0;
}

.rules ul {
  text-align: left;
  margin: 0;
  padding-left: 20px;
}

.rules li {
  margin-bottom: 10px;
}
</style>
