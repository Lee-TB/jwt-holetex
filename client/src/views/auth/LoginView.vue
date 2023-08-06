<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginAPI } from "@/api/login";
import { useUserStore } from "@/stores/user";

const { setAccessToken, setRefreshToken, setDisplayName } = useUserStore();
const router = useRouter();

const usernameInput = ref("");
const passwordInput = ref("");

async function handleLogin() {  
  if (usernameInput.value && passwordInput.value) {
    const loginInfo = {
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim(),
    };
    try {
      const { data } = await loginAPI(loginInfo);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setDisplayName(data.displayName);

      // reset form
      usernameInput.value = "";
      passwordInput.value = "";

      // redirect to home
      router.push({ name: "home" });
    } catch (error) {
      alert(error);
    }
  }
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="usernameInput" />
      <input type="password" v-model="passwordInput" />
      <input type="submit" value="Login" role="button" />
    </form>
  </div>
</template>
