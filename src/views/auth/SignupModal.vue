<template>
  <div class="signup-container">
    <v-container class="py-12" max-width="550px">
      <h2 class="mb-10 title">Welcome to 🍊TokTang</h2>

      <v-form v-model="valid" ref="formRef" @submit.prevent="memberCreate">
        <v-text-field
          v-model="name"
          label="이름"
          :rules="[v => !!v || '이름을 입력하세요']"
          required
        />

        <v-text-field
          v-model="email"
          label="이메일"
          type="email"
          :rules="[
            v => !!v || '이메일을 입력하세요',
            v => /.+@.+\..+/.test(v) || '유효한 이메일 형식이 아닙니다'
          ]"
          required
        />

        <!-- 인증 요청 및 타이머 -->
        <div class="d-flex align-center justify-space-between mt-2">
          <v-btn
            color="orange-light"
            :loading="isSending"
            @click="sendVerificationEmail"
            :disabled="!email || emailVerified || timer > 0"
            variant="tonal"
          >
            {{ timer > 0 ? '요청 완료' : '인증 메일 보내기' }}
          </v-btn>
          <span v-if="timer > 0" class="text-orange font-weight-bold text-caption">
            남은 시간 ⏱ {{ timerDisplay }}
          </span>
        </div>

        <!-- 인증 코드 입력 및 확인 -->
        <v-text-field
          v-if="timer > 0 || !emailVerified"
          v-model="verificationCode"
          label="인증 코드"
          class="mt-3"
        />
        <v-btn
          v-if="timer > 0 && !emailVerified"
          color="orange-darken-2"
          class="mt-1"
          @click="verifyCode"
        >
          인증 확인
        </v-btn>

        <div v-if="emailVerified" class="text-success mt-2">
          ✅ 이메일 인증이 완료되었습니다.
        </div>

        <v-text-field
          v-model="password"
          label="비밀번호"
          type="password"
          class="mt-4"
          :rules="[v => !!v || '비밀번호를 입력하세요']"
          required
        />

        <v-btn
          type="submit"
          class="mt-6"
          color="orange-main"
          :disabled="!valid || !emailVerified"
          block
        >
          가입하기
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, sendEmailCode, varifyEmailCode } from '@/api/auth'
import { signup } from '@/api/members';

const router = useRouter(); 
const valid = ref(false)
const formRef = ref(null)

const name = ref('')
const email = ref('')
const password = ref('')
const verificationCode = ref('')
const emailVerified = ref(false)
const isSending = ref(false)

const timer = ref(0)
const timerDisplay = ref('')
let countdownInterval = null

const startTimer = (seconds = 180) => {
  timer.value = seconds
  updateTimerDisplay()

  clearInterval(countdownInterval)
  countdownInterval = setInterval(() => {
    timer.value--
    updateTimerDisplay()

    if (timer.value <= 0) {
      clearInterval(countdownInterval)
      countdownInterval = null
      emailVerified.value = false
      verificationCode.value = ''
      alert('⏰ 인증 시간이 만료되었습니다. 다시 시도해주세요.')
    }
  }, 1000)
}

const updateTimerDisplay = () => {
  const m = String(Math.floor(timer.value / 60)).padStart(2, '0')
  const s = String(timer.value % 60).padStart(2, '0')
  timerDisplay.value = `${m}:${s}`
}

// 이메일 인증 요청
const sendVerificationEmail = async () => {
  isSending.value = true
  try {
    const res = await sendEmailCode({ email: email.value });

    if (res.data.status === 'success') {
      console.log('인증 메일이 전송되었습니다.')
      startTimer()
      emailVerified.value = false
    }
  } catch (e) {
    alert('❌ 인증 메일 전송 실패')
    console.error(e)
  } finally {
    isSending.value = false
  }
}

// 이메일 인증 코드 확인
const verifyCode = async () => {
  try {
    const res = await varifyEmailCode ({
      email: email.value,
      code: verificationCode.value
    });
    if (res.data.status === 'success') {
      emailVerified.value = true
      clearInterval(countdownInterval)
      timer.value = 0
      console.log('✅ 이메일 인증이 완료되었습니다.')
    }
  } catch (e) {
    alert('❌ 인증 실패. 코드를 확인해주세요.')
    console.error(e)
  }
}

//  회원가입
const memberCreate = async () => {
  if (!formRef.value?.validate()) return

  const payload = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  console.log('회원가입 요청:', payload)
  // 실제 API 호출은 여기에 추가
  try {
    // 회원가입 요청
    const res = await signup(payload);

    if (res.data.status === 'success') {
      console.log('✅ 회원가입 성공! 자동 로그인 시도')

      // 🔐 로그인 요청
      const loginRes = await login({
        email: email.value,
        password: password.value
      })

      // 로그인 성공 시 토큰 저장 (예: 로컬스토리지 또는 쿠키)
      const token = loginRes.data.data.accessToken
      localStorage.setItem('accessToken', token)

      // 홈으로 이동
      router.push('/')
    }
  } catch (e) {
    alert('❌ 회원가입 또는 자동 로그인 실패. 다시 시도해주세요.')
    console.error(e)
    router.push('/welcome')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap');

.signup-container {
  margin: 0 auto;
  padding: 20px 50px;
  border-radius: 10px;
  max-width: 700px;
  justify-content: center;
  align-items: center;
  background-color: #FEFDFA;
}

.title {
  text-align: center;
  font-family: 'Bagel Fat One', cursive;
  font-size: 45px;
  font-weight: normal;
}
</style>
