import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component:  () => import('@/views/home/HomeView.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component:  () => import('@/views/auth/SignupView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component:  () => import('@/views/auth/LoginView.vue')
    },
    {
        path: '/member/list',
        name: 'member-list',
        component:  () => import('@/views/member/MemberListView.vue')
    },

    // 채팅
    {
        path: '/chatting/list',
        name: 'chatting-list',
        component:  () => import('@/views/chatting/ChattingListView.vue')
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router