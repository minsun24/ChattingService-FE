<template>
  <v-container class="py-12" max-width="500px">
    <h2 class="text-h5 mb-6">회원가입</h2>

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
        :rules="[v => !!v || '이메일을 입력하세요', v => /.+@.+\..+/.test(v) || '유효한 이메일 형식이 아닙니다']"
        required
      />
      <!-- 이메일 인증 요청 버튼 -->
      <v-btn class="mt-4" color="orange-light" @click="sendVerificationEmail" :disabled="emailVerified">
        이메일 인증 요청
      </v-btn>
      <!-- 인증 완료 상태 메시지 -->
      <div v-if="emailVerified" class="text-success mt-2">
        이메일 인증이 완료되었습니다.
      </div>

      <v-text-field
        v-model="password"
        label="비밀번호"
        type="password"
        :rules="[v => !!v || '비밀번호를 입력하세요']"
        required
      />

      

      

      <!-- 회원가입 제출 버튼 -->
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
</template>

<script setup>
import { ref } from 'vue'

const valid = ref(false)
const formRef = ref(null)

const name = ref('')
const email = ref('')
const password = ref('')
const emailVerified = ref(false)

function sendVerificationEmail() {
  if (!/.+@.+\..+/.test(email.value)) {
    alert('올바른 이메일을 입력해주세요')
    return
  }

  // 이메일 인증 요청 로직
  console.log(`[이메일 인증] ${email.value}로 인증 메일 전송 중...`)

  setTimeout(() => {
    emailVerified.value = true
    alert('이메일 인증 완료되었습니다 (테스트용)')
  }, 1000)
}

function memberCreate() {
  if (!formRef.value?.validate()) return

  // 회원가입 API 호출
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  console.log('가입 요청:', payload)

  // 회원가입 처리
}
</script>
