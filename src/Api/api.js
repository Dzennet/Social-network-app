import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "7f745b9e-65c9-4a23-9c92-305cf0e2eca9"
  }
})

export const FindUsersAPI = {
  getUsers(currentPage, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
  },

  unfollowUser(userId) {
    return instance.delete(`follow/${userId}`)
      .then(response => response.data)
  },

  followUser(userId) {
    return instance.post(`follow/${userId}`, {})
      .then(response => response.data)
  }
}

export const ProfileAPI = {
  setUserProfile(userId) {
    return instance.get(`profile/${userId}`)
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status })
  },
  savePhoto(photo) {
    const formData = new FormData()
    formData.append("image", photo)
    return instance.put(`profile/photo`, formData, {
      headers: { 'content-type': 'multipart/form-data' }
    } )
  },
  saveProfileInfo(profileInfo) {
    return instance.put('profile', profileInfo)
  } 
}

export const AuthAPI = {
  me() {
    return instance.get('auth/me')
      .then(response => response.data)
  },
  login(email, password, rememberMe, captcha) {
    return instance.post('auth/login', { email, password, rememberMe, captcha })
  },
  logout() {
    return instance.delete('auth/login')
  }
}

export const CaptchaAPI = {
  getCaptcha() {
    return instance.get('security/get-captcha-url')
  }
}