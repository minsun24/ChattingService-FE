<template>
    <div class="login-container">
        <v-container class="py-12" width="550px">
            <h2 class="mb-10 title">톡탱🍊으로 입장</h2>

            <v-form v-model="valid" ref="formRef" @submit.prevent="memberLogin">

                <v-text-field
                    v-model="email"
                    label="이메일"
                    type="email"
                    required
                    :rules="[
                        v => !!v || '이메일을 입력하세요',
                        v => /.+@.+\..+/.test(v) || '유효한 이메일 형식이 아닙니다'
                    ]"
                />
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
                :disabled="!valid"
                block
                >
                로그인
                </v-btn>
            </v-form>

        </v-container>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth'
import { nextTick } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter(); 

const valid = ref(false)
const formRef = ref(null)

const email = ref('')
const password = ref('')

const memberLogin = async () => {

    const payload = {
        email: email.value,
        password: password.value
    }
    try {
        console.log("로그인 요청")
        const res = await login(payload)

        if (res.data.status === 'success') {
            const { accessToken, memberId, email, role } = res.data.data

            // 유저 로그인 상태 동기화
            userStore.login({ accessToken, memberId, email, role })

            await nextTick()    // 업데이트 반영
            // 로그인 후 이동
            router.push('/')
        }

    } catch(e) {
        console.error('❌ 로그인 실패:', e)
        alert('로그인 실패! 이메일 또는 비밀번호를 확인해주세요.')
        router.push('/welcome')
        
        // window.location.reload()
    }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bagel+Fat+One&display=swap');

.login-container{
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