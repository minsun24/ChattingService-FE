<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SignupModal from '../auth/SignupModal.vue';
import LoginModal from '../auth/LoginModal.vue';

const router = useRouter();

const signupDialog = ref(false)
const loginDialog = ref(false)


const goToLogin = () => {
  router.push('/login');
};

const goToSignup = () => {
  router.push('/signup');
};
</script>

<template>
  <v-container fluid class="welcome-container">
    <v-row no-gutters>
      <!-- 왼쪽: 텍스트 영역 -->
      <v-col cols="12" md="7" class="left-pane">
        <div class="welcome-text" >
          <h1 class="title">반가워요, <br />여기는 톡Tang BETA V.</h1>
          <p class="note">
            이곳은 대화의 반응을 실험하는 과즙 연구소입니다.
          </p>
          <p class="dev-note">
            > 개발자 노트<br />
            이 앱은 웹소켓 채팅 기능을 연습하고 실험하기 위해 만들어졌습니다.<br />
            완성도보다는 실시간 통신과 흐름을 잡는 데 목적이 있습니다.
          </p>
          <div class="btn-group">
            <v-btn color="white" class="login-btn" @click="loginDialog = true" variant="tonal">로그인</v-btn>
            <v-btn color="white" class="signup-btn" @click="signupDialog = true" variant="outlined">회원가입</v-btn>
          </div>
        </div>
      </v-col>

      <!-- 오른쪽: 로고 영역 -->
      <v-col cols="12"  md="5" class="right-pane">
        <img src="@/assets/images/welcome.png" alt="TokTang 로고" class="logo" max-width="700px" />
      </v-col>
    </v-row>

    <!-- 로그인 모달 -->
    <v-dialog v-model="loginDialog" overlay-opacity="0.9" @click:outside="loginDialog = false" max-width="720">
      <LoginModal />
    </v-dialog>

    <!-- 회원가입 모달 -->
    <v-dialog v-model="signupDialog" overlay-opacity="0.9" @click:outside="signupDialog = false" max-width="720">
      <SignupModal />
    </v-dialog>

  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap');

.welcome-container {
  height: 100vh;
  width: 100vw;
  /* background-color: #ffffff; */
  padding: 0;
  background-color: #FEFDFA;
}

.left-pane {
    height: 100vh;
    width: 100%;
    background-color: #ff832e;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.welcome-text {
    padding: 0 15%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.welcome-text .title {
    font-family: 'Bagel Fat One', cursive;
    font-size: 70px;
    line-height: 1.4;
    font-weight: normal;
}

.note {
  margin-top: 16px;
  font-size: 16px;
}

.dev-note {
  margin-top: 24px;
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.5;
}

.btn-group {
  margin-top: 32px;
  display: flex;
  gap: 12px;
}

.login-btn,
.signup-btn {
    border-radius: 0;
    width: 200px;
    height: 45px;
  font-weight: bold;
  text-transform: none;
}

.right-pane {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 250px;
  height: auto;
  margin-bottom: 12px;
}

.logo-title {
  font-size: 32px;
  font-weight: bold;
  color: #ff6f00;
  font-family: 'Arial Rounded MT Bold', sans-serif;
}
</style>
