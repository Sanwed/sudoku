export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
export const shuffleArray = (array) => {
  const arr = array.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
