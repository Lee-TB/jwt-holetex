<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { authInstance } from "@/api/authInstance";

const { setAccessToken, setRefreshToken, setDisplayName } = useUserStore();
const router = useRouter();

const usernameInput = ref("");
const passwordInput = ref("");

async function handleLogin() {
  if (usernameInput.value && passwordInput.value) {
    // validate
    const loginInfo = {
      username: usernameInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    // sent to server
    try {
      const res = await authInstance.post("/login", { ...loginInfo });
      const { data } = res;
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
      console.log(error)
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
