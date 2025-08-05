import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        accessToken: '',
        refreshToken: '',
        tokenExpiresAt: null,
        user: {
        memberId: null,
        email: '',
        role: ''
        }
    }),

    getters: {
        isLoggedIn: (state) => !!state.accessToken,
        isAdmin: (state) => state.user.role === 'ADMIN'
    },
    actions: {
        setUser({ accessToken, refreshToken, memberId, email, role, tokenExpiresAt }) {
            this.accessToken = accessToken
            this.refreshToken = refreshToken
            this.tokenExpiresAt = tokenExpiresAt
            this.user = { memberId, email, role }
        },
        clearUser() {
            this.accessToken = ''
            this.refreshToken = ''
            this.tokenExpiresAt = null
            this.user = { memberId: null, email: '', role: '' }
        },

        logout() {
            this.clearUser()
            localStorage.removeItem('user')
        }
    }
})