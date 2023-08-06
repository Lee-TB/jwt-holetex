<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/auth/login">login</RouterLink>
        <RouterLink to="/auth/register">register</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>
