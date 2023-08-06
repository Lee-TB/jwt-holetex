<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBookStore } from "@/stores/book";
import { useUserStore } from "@/stores/user";
import { getBooksAPI } from "@/api/books";

const bookStore = useBookStore();
const { books } = storeToRefs(bookStore);
const { setBooks } = bookStore;

const userStore = useUserStore();
const { accessToken } = storeToRefs(userStore);

onMounted(async () => {
  const res = await getBooksAPI(accessToken.value);
  if(res?.data?.books) {
    setBooks(res.data.books)
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
