export const generateCells = () => {
  const cells = []
  for (let row = 0; row < 9; row++) {
    const currentRow = []
    for (let column = 0; column < 9; column++) {
      const square = Math.floor(row / 3) * 3 + Math.floor(column / 3)
      currentRow.push({
        id: `r${row}c${column}`,
        value: null,
        row,
        column,
        square,
        active: false,
        error: false,
        default: false,
      })
    }
    cells.push(currentRow)
  }
  return cells
}
