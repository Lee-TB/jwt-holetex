<script setup>
import { RouterView, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { authInstance } from "@/api/authInstance";
import { REFRESH_TOKEN_STORAGE_KEY } from "@/constants";

const router = useRouter();
const userStore = useUserStore();
const { displayName } = userStore;

const handleLogout = async () => {
  try {
    await authInstance.post("/logout", {
      refreshToken: localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY),
    });
    userStore.$reset();
    router.push({ name: "login" });
  } catch (error) {
    console.log(error);
    alert('logout err')
  }
};
</script>

<template>
  <div class="container">
    <header class="header">
      <nav class="header-nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/books">Books</RouterLink>
      </nav>
      <div class="header-user-info">
        <span>{{ displayName }}</span>
        <button @click="handleLogout">logout</button>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>
.container {
  max-width: 1400px;
  margin: auto;
}

.header {
  display: flex;
  justify-content: space-between;
}

.header-user-info,
.header-nav {
  display: flex;
  gap: 8px;
}
</style>
