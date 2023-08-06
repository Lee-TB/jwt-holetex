import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useBookStore = defineStore("book", () => {
  const books = ref([]);
  const totalBooks = computed(() => books.value.length);

  function setBooks(value) {
    books.value = value;
  }

  return { books, totalBooks, setBooks };
});
