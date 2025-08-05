// src/api/auth.js

import api from '@/api/api'

// 로그인
export const login = (payload) => {
  return api.post('/auth/login', payload)
}

// 이메일 인증 코드 요청
export const sendEmailCode = (payload) => {
  return api.post('/auth/email/send', payload)
}

// 이메일 인증 코드 확인
export const varifyEmailCode  = (payload) => {
  return api.post('/auth/email/verify', payload)
}
