<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { useCells } from '@/composables/useCells'
import { getRandomInt } from '@/utils/utils'
import { ref } from 'vue'
import PopupWarn from './PopupWarn.vue'
import { useTimer } from '@/composables/useTimer'

const props = defineProps({
  selectedDifficulty: {
    type: Number,
    required: true,
  },
})

const { cells, activeCell } = useCells()
const { start: startTimer, reset: resetTimer } = useTimer()
const gameInProgress = ref(false)
const fieldDisable = defineModel()
const popupRef = ref(null)

const isSafe = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false
  }
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === num) return false
    }
  }
  return true
}

const solveBoard = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num
            if (solveBoard(board)) return true
            board[row][col] = 0
          }
        }
        return false
      }
    }
  }
  return true
}

const removeCells = (board, filledCount = 40) => {
  let removed = 81 - filledCount
  while (removed > 0) {
    const row = getRandomInt(0, 8)
    const col = getRandomInt(0, 8)
    if (board[row][col] !== 0) {
      board[row][col] = 0

      removed--
    }
  }
}

const handleGameStart = () => {
  gameInProgress.value = true
  fieldDisable.value = false
  startTimer()

  const selectedCells = []

  const board = Array.from({ length: 9 }, () => Array(9).fill(0))

  solveBoard(board)
  removeCells(board, props.selectedDifficulty)

  const selectedCellsSet = new Set()

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = cells.value[row][col]
      if (board[row][col] !== 0) {
        cell.value = board[row][col]
        cell.default = true
        selectedCellsSet.add(cell)
      } else {
        cell.value = null
        cell.default = false
      }
    }
  }

  selectedCells.push(...selectedCellsSet)
}

const handleGameStop = () => {
  gameInProgress.value = false
  fieldDisable.value = true
  if (activeCell.value) {
    const cell = cells.value.flat().find((cell) => activeCell.value.id === cell.id)
    cell.active = false
    activeCell.value = null
  }
  resetTimer()

  cells.value.flat().forEach((cell) => {
    cell.value = null
    cell.default = false
    popupRef.value.close()
  })
}
</script>

<template>
  <div class="controls">
    <BaseButton text="Начать" :disabled="gameInProgress" @click="handleGameStart" />
    <BaseButton text="Сбросить" :disabled="!gameInProgress" @click="popupRef.open()" />

    <PopupWarn ref="popupRef">
      <h2 class="popup__title">Вы уверены, что хотите сбросить прогресс?</h2>
      <div class="popup__buttons">
        <BaseButton
          class="popup__button popup__button--light"
          text="Сбросить"
          @click="handleGameStop"
        />
        <BaseButton class="popup__button" text="Отмена" @click="popupRef.close()" />
      </div>
    </PopupWarn>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.popup__title {
  font-size: 32px;
  font-weight: 500;
  margin-top: 20px;
}

.popup__buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 150px;
}

.popup__button--light {
  background: var(--color-primary-light);
}
</style>
