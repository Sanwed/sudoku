<script setup>
import { useTimer } from '@/composables/useTimer'

const { time } = useTimer()
</script>

<template>
  <div class="timer">
    <span class="time">{{ time }}</span>
  </div>
</template>

<style scoped>
.timer {
  text-align: center;
  font-size: 48px;
  line-height: 64px;
}

.time {
  color: var(--color-text-primary);
}
</style>
