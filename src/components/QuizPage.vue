<template>
  <div class="quiz-page container mt-5">
    <h1 class="text-center mb-4">Quiz Time!</h1>
    <div class="card p-4 shadow-sm text-start">
      <div v-if="questions.length === 0" class="text-center">
        <h3>Quiz is yet to be added for this subject.</h3>
      </div>
      <div v-if="quizInProgress && questions.length > 0">
        <!-- Question Text -->
        <p class="h5 mb-4">{{ currentQuestion.question_text }}</p>

        <!-- Answer Options with proper alignment -->
        <div class="form-group">
          <div class="row" v-for="answer in currentQuestion.answers" :key="answer.id">
            <!-- Radio Button -->
            <div>
              <input
                class="form-check-input"
                type="radio"
                :value="answer.id"
                v-model="selectedAnswer"
                :id="'answer-' + answer.id"
                name="quiz-options"
              />
              <!-- Answer Text -->
              <label class="form-check-label px-md-1" :for="'answer-' + answer.id">
                {{ answer.answer_text }}
              </label>
            </div>
          </div>
        </div>

         <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
         
        <!-- Next Button -->
        <div class="d-flex">
          <button
            class="btn btn-primary mt-4 w-30"
            @click="nextQuestion"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Quiz Completion -->
      <div v-else class="text-center">
        <p v-if="questions.length > 0" class="h4">Quiz completed! Your score: {{ score }}/{{ questions.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizPage',
  data() {
    return {
      currentIndex: 0,
      selectedAnswer: null,
      score: 0,
      quizInProgress: true,
      questions: JSON.parse(sessionStorage.getItem('questions')) || [],
       errorMessage: ''
    };
  },
  computed: {
    currentQuestion() {

      return this.questions[this.currentIndex] || null;
    }
  },
  methods: {
    nextQuestion() {
      if (this.selectedAnswer === null) {
         this.errorMessage = 'Please select an answer!';
        return;
      }else {
        this.errorMessage = '';
      }

      // Check if the selected answer is correct
      const correctAnswer = this.currentQuestion.answers.find(answer => answer.is_correct);
      if (this.selectedAnswer === correctAnswer.id) {
        this.score++;
      }

      // Check if it's the last question
      if (this.currentIndex === this.questions.length - 1) {
        this.endQuiz();
      } else {
        this.currentIndex++;
        this.selectedAnswer = null;
      }
    },
     endQuiz() {
      // Mark quiz as complete
      if(this.questions.length > 0){
           this.quizInProgress = false;
      }
     
    }
  }
}
</script>
