import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'


const routes = [
    {
        path: '/welcome',
        name: 'welcome',
        component:  () => import('@/views/home/WelcomeView.vue')
    },
    {
        path: '/',
        name: 'home',
        component:  () => import('@/views/home/HomeView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/member/list',
        name: 'member-list',
        component:  () => import('@/views/member/MemberListView.vue'),
        meta: { requiresAuth: true }
    },

    // 채팅
    {
        path: '/chatting/list',
        name: 'chatting-list',
        component:  () => import('@/views/chatting/ChattingListView.vue'),
        meta: { requiresAuth: true }
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // accessToken 없으면 복원 시도 (최초 진입 대비)
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return next('/welcome')
  }

  next()
})

export default router