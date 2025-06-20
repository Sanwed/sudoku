<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Object,
  },
})
defineEmits(['click'])
</script>

<template>
  <button type="button" class="btn" :disabled="disabled" @click="$emit('click')">
    {{ text }}
    <icon v-if="icon" class="btn__icon" />
  </button>
</template>

<style scoped>
.btn {
  font-size: 36px;
  margin: 0;
  background-color: var(--color-primary);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: var(--color-text-button);
  transition: all 0.2s linear;
}

.btn:hover,
.btn:focus-visible {
  outline: none;
  background-color: var(--color-primary-light);
}

.btn:disabled {
  background-color: var(--color-text-disabled);
  pointer-events: none;
}

@media (max-width: 768px) {
  .btn {
    font-size: 24px;
  }
}
</style>
