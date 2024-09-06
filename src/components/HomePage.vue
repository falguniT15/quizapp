<template>
  <div class="home-page container mt-5 text-center">
    <!-- Welcome Header -->
    <h1 class="mb-4">Welcome to the Quiz App!</h1>
    <p class="lead">Select a subject and start the quiz.</p>

    <!-- Subject Selection Dropdown -->
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="input-group mb-4">
          <select class="form-select" v-model="selectedSubject">
            <option value="" disabled>Select a subject</option>
            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
              {{ subject.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Start Quiz Button -->
    <div class="row justify-content-center">
      <div class="col-md-4">
        <button
          class="btn btn-primary w-100"
          @click="startQuiz"
          :disabled="!selectedSubject"
        >
          Start Quiz
        </button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.home-page {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  font-weight: 600;
}

select {
  padding: 10px;
}

button[disabled] {
  cursor: not-allowed;
}
</style>


<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      subjects: [],
      selectedSubject: null,
    };
  },
  methods: {
    async loadSubjects() {
      try {
        const response = await axios.get('http://localhost/quizappbackend/api.php?action=get_subjects');
        this.subjects = response.data;
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    },
    async loadQuestions() {
      try {
        const response = await axios.get('http://localhost/quizappbackend/api.php', {
          params: {
            action: 'get_questions',
            subject_id: this.selectedSubject,
          }
        });
        this.$router.push({ name: 'QuizPage'});
        sessionStorage.setItem('questions', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },
    startQuiz() {
      this.loadQuestions();
    }
  },
  mounted() {
    this.loadSubjects();
  }
}
</script>
