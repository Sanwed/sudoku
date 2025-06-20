<script setup>
import CrossIcon from '@/assets/images/cross.svg';
import BaseButton from './BaseButton.vue';
import { ref } from 'vue';

const isOpen = ref(false);

const close = () => {
  isOpen.value = false;
}

const open = () => {
  isOpen.value = true;
}

defineExpose({ open, close })
</script>

<template>
  <Teleport to='body'>
    <Transition name="popup">
      <div v-if="isOpen" class="popup">
        <div class="popup__content">
          <BaseButton class="popup__close" aria-label="Закрыть модальное окно" :icon="CrossIcon" @click="close" />
          <div class="popup__inner">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-modal-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  transition: opacity 0.2s ease;
}

.popup__content {
  background: var(--color-background);
  border-radius: 20px;
  padding: 40px;
  position: relative;
}

.popup .popup__close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 20px;
}

@media (max-width: 768px) {
  .popup {
    padding: 15px;
  }
}
</style>
