import { defineStore } from "pinia";
import { computed } from "vue";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", () => {
  const accessToken = useStorage("accessToken", "");
  const refreshToken = useStorage("refreshToken", "");
  const displayName = useStorage("displayName", "");
  const isLoggedIn = computed(() => !!refreshToken.value);

  function setAccessToken(value) {
    accessToken.value = value;
  }

  function setRefreshToken(value) {
    refreshToken.value = value;
  }

  function setDisplayName(value) {
    displayName.value = value;
  }

  function $reset() {
    accessToken.value = "";
    refreshToken.value = "";
    displayName.value = "";
  }

  return {
    $reset,
    accessToken,
    refreshToken,
    displayName,
    isLoggedIn,
    setAccessToken,
    setRefreshToken,
    setDisplayName,
  };
});
