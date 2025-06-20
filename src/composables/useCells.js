import { generateCells } from "@/utils/generateCells";
import { ref } from "vue";

const cells = ref(generateCells());
const activeCell = ref(null);

export const useCells = () => {
  return {
    cells,
    activeCell,
  }
}
