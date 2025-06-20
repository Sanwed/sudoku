<script setup>
defineProps({
  difficulties: {
    type: Array,
    required: true,
  },
})

const selected = defineModel()
</script>

<template>
  <select v-model="selected" name="difficulty" id="difficulty" class="select">
    <option v-for="dif in difficulties" :value="dif.cells" :key="dif.name">{{ dif.name }}</option>
  </select>
</template>

<style scoped></style>
