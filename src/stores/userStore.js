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
        initializeUserFromStorage() {
            const accessToken = localStorage.getItem('accessToken')
            const user = JSON.parse(localStorage.getItem('user'))

            if (accessToken && user) {
                this.accessToken = accessToken
                this.user = user
            } else {
                this.clearUser()
            }
        },
        login({ accessToken, memberId, email, role }) {
            this.accessToken = accessToken
            this.user = { memberId, email, role }

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('user', JSON.stringify(this.user))
        },
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

            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        },

        logout() {
            this.clearUser()
            localStorage.removeItem('user')
        }
    }
})