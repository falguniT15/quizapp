<template>
  <div class="user-login d-flex justify-content-center align-items-center vh-100">
    <div class="card p-5 shadow-lg text-center" style="max-width: 400px; width: 100%;">
      <h2 class="mb-4">Login with Google to Start the Quiz</h2>

      <button @click="login" class="btn btn-google btn-lg w-100">
        <i class="fab fa-google me-2"></i>Login with Google
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  methods: {
    login() {
      axios.get('http://localhost/quizappbackend/login.php')
        .then(response => {
          const authUrl = response.data.authUrl;
          window.location.href = authUrl;
        })
        .catch(error => {
          console.error("Error during login: ", error);
        });
    }
  }
}
</script>

<style scoped>
.btn-google {
  background-color: #4285F4;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.btn-google:hover {
  background-color: #357ae8;
}

.fab {
  font-size: 18px;
}
</style>
