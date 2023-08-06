<script setup>
import { RouterView, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { logoutAPI } from "@/api/logout";

const router = useRouter();
const userStore = useUserStore();
const { displayName } = userStore;

const handleLogout = async () => {
  const res = await logoutAPI();
  console.log({ logoutResponse: res });
  userStore.$reset();
  router.push({ name: "login" });
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
