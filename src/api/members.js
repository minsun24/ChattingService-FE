//  (회원 Member 도메인 api 모음)
import api from '@/api/api'

// RequeatMappgin("/members")



// 회원가입
export const signup = (payload) => {
    return api.post('/members/signup', payload);
}

