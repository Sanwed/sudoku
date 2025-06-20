<script setup>
import { useCells } from '@/composables/useCells'
import { useTimer } from '@/composables/useTimer'
import BaseButton from '@/components/BaseButton.vue'
import { ref, watchEffect } from 'vue'
import PopupWarn from './PopupWarn.vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const { cells, activeCell } = useCells()
const { pause, time } = useTimer()
const popupRef = ref(null)

const handleCellClick = (id) => {
  const cell = cells.value.flat().find((cell) => cell.id === id)

  if (cell) {
    if (cell.default || props.disabled) return

    if (activeCell.value) {
      activeCell.value.active = false
    }
    cell.active = true
    activeCell.value = cell
  }
}

watchEffect(() => {
  const flatCells = cells.value.flat()

  flatCells.forEach((cell) => {
    cell.error = false
  })

  const markGroupIfHasDuplicates = (group) => {
    const values = group.map((cell) => cell.value).filter((value) => value !== null)

    const hasDuplicates = new Set(values).size !== values.length

    if (hasDuplicates) {
      group.forEach((cell) => {
        cell.error = true
      })
    }
  }

  const squares = {}
  const rows = {}
  const columns = {}

  flatCells.forEach((cell) => {
    if (!squares[cell.square]) squares[cell.square] = []
    if (!rows[cell.row]) rows[cell.row] = []
    if (!columns[cell.column]) columns[cell.column] = []

    squares[cell.square].push(cell)
    rows[cell.row].push(cell)
    columns[cell.column].push(cell)
  })

  Object.values(squares).forEach(markGroupIfHasDuplicates)
  Object.values(rows).forEach(markGroupIfHasDuplicates)
  Object.values(columns).forEach(markGroupIfHasDuplicates)

  const isWin = flatCells.every((cell) => !cell.error && cell.value)
  if (isWin) {
    pause()
    popupRef.value.open()
  }
})
</script>

<template>
  <table class="grid">
    <tbody>
      <tr v-for="row in cells" :key="row" class="row">
        <td
          v-for="cell in row"
          :key="cell"
          class="cell"
          :class="{ active: cell.active, error: cell.error, default: cell.default }"
          @click="handleCellClick(cell.id)"
        >
          {{ cell.value }}
        </td>
      </tr>
    </tbody>

    <PopupWarn ref="popupRef">
      <h2 class="popup__title">УРА! Вы прошли игру за {{ time }}</h2>
      <BaseButton class="popup__button" text="Продолжить" @click="popupRef.close()" />
    </PopupWarn>
  </table>
</template>

<style scoped>
.grid {
  border-collapse: collapse;
  margin: 0 auto;
  border-top: 2px solid var(--color-grid-bold-line);
  border-left: 2px solid var(--color-grid-bold-line);
}

.cell {
  width: 50px;
  height: 50px;
  border: 1px solid var(--color-grid-line);
  text-align: center;
  font-size: 36px;
  transition: all 0.2s linear;
  user-select: none;
  color: var(--color-text-secondary);
}

.cell.error {
  background-color: var(--color-cell-error);
}

.cell.active {
  background-color: var(--color-tooltip-background);
}

.cell.default {
  color: var(--color-text-main);
}

.cell:nth-child(3n) {
  border-right: 2px solid var(--color-grid-bold-line);
}

.row:nth-child(3n) .cell {
  border-bottom: 2px solid var(--color-grid-bold-line);
}

.popup__title {
  font-size: 32px;
  font-weight: 500;
  margin-top: 20px;
}

.popup__button {
  display: block;
  margin: 100px auto 0;
}

@media (max-width: 768px) {
  .cell {
    width: 30px;
    height: 30px;
    font-size: 24px;
  }
}
</style>
