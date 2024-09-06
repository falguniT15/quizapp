<template>
  <div class="login-success">
    <h2>Login Successful!</h2>
    <p>Welcome to the quiz app. You are now logged in with Google.</p>
    <p>Name: {{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
    <img :src="user.picture" alt="Profile Picture" />
  </div>
</template>

<script>
export default {
  name: "LoginSuccess",
  data() {
    return {
      user: {}  // User info can be fetched or managed based on your logic
    };
  },
  mounted() {
    // Optionally fetch user details from backend if needed
  }
}
</script>

<style scoped>
.login-success {
  text-align: center;
  margin-top: 50px;
}
</style>
