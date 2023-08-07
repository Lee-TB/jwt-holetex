<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBookStore } from "@/stores/book";
import { serverInstance } from "@/api/serverInstance";

const bookStore = useBookStore();
const { books } = storeToRefs(bookStore);
const { setBooks } = bookStore;

onMounted(async () => {
  const res = await serverInstance.get('/books');  
  if (res?.data?.books) {
    setBooks(res.data.books);
  }
});
</script>

<template>
  <div class="books">
    <h1>List of books</h1>
    <ul>
      <li v-for="book in books">
        <pre>{{ book }}</pre>
      </li>
    </ul>
  </div>
</template>
