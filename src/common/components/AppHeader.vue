<template>
  <v-app-bar app color="orange-main" dark flat>
    <!-- 왼쪽: 앱 로고 -->
    <router-link to="/" class="text-decoration-none text-white">
        <v-img
            :src="logo3"
            width="110"
            class="header-logo"
            alt="logo"
        />
        <!-- <v-app-bar-title   v-app-bar-title class="pl-4">💬</v-app-bar-title> -->
    </router-link>

    <!-- 가운데: 네비게이션 메뉴 -->
    <v-container class="d-flex justify-center" fluid>
      <v-btn text to="/" color="white">Home</v-btn>
      <v-btn text :to="{ path: '/member/list' }" color="white">회원 목록</v-btn>
      <v-btn text :to="{ path: '/chatting/list' }" color="white">채팅방 목록</v-btn>
    </v-container>

    <!-- 오른쪽: 유저 프로필 + 드롭다운 메뉴 -->
    <template v-if="isLogin">
    <!-- 로그인된 경우: 프로필 + 메뉴 -->
    <v-menu>
        <template #activator="{ props }">
        <v-btn icon v-bind="props">
            <v-avatar size="32">
            <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="User"
                style="object-fit: cover; width: 100%; height: 100%;" />
            </v-avatar>
        </v-btn>
        </template>

        <v-list>
        <v-list-item title="Profile" to="/profile" />
        <v-list-item title="Logout" @click="logout" />
        </v-list>
    </v-menu>
    </template>

    <template v-else>
    <!-- 로그인 전: 회원가입 / 로그인 버튼 -->
    <v-btn text :to="{path: '/signup'}" color="white">회원가입</v-btn>
    <v-btn text :to="{path: '/login'}" color="white">로그인</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import logo from '@/assets/images/TokTang.png'
import logo2 from '@/assets/images/TokTang2.png'
import logo3 from '@/assets/images/TokTang3.png'
import { ref, onMounted } from 'vue'

const isLogin = ref(false);

onMounted(() => {
    const token = localStorage.getItem("accessToken");
    if(token){
        isLogin.value = true;
    }
})

function logout() {
    console.log('로그아웃 중')
    // 로그아웃 처리
    localStorage.removeItem("accessToken")
    isLogin.value = false
    window.location.reload();
}
</script>

<style scoped>
.v-app-bar {
  padding-left: 16px;
  padding-right: 16px;
}
.header-logo {
    align-items: center;
    align-content: center;
    
}
</style>
