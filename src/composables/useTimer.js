import { ref, computed } from 'vue'

const currentTime = ref(0)
let intervalId = null

export const useTimer = () => {
  const start = () => {
    if (intervalId !== null) return
    intervalId = setInterval(() => {
      currentTime.value++
    }, 1000)
  }

  const reset = () => {
    currentTime.value = 0
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const pause = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const time = computed(() => {
    const minutes = Math.floor(currentTime.value / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (currentTime.value % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${seconds}`
  })

  return {
    currentTime,
    time,
    start,
    reset,
    pause,
  }
}
