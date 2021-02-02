import { AuthAPI, CaptchaAPI } from '../Api/api'
import { stopSubmit } from 'redux-form'

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';
const LOGIN = 'auth/LOGIN';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
}

let authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.data,
      }
    case LOGIN:
      return {
        ...state,
        email: action.email,
        password: action.password,
        rememberMe: action.rememberMe
      }
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl
      }
    default: return state
  }
}

export const setAuthUserData = (userId, email, login, isAuth) =>
  ({ type: SET_AUTH_USER_DATA, data: { userId, email, login, isAuth } })
export const updateCaptchaUrl = (captchaUrl) => ({ type: SET_CAPTCHA_URL, captchaUrl })

export const getAuthUserData = () => async (dispatch) => {
  let data = await AuthAPI.me()
  if (data.resultCode === 0) {
    let { id, email, login } = data.data
    dispatch(setAuthUserData(id, email, login, true))
  }
}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await AuthAPI.login(email, password, rememberMe, captcha)
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptcha())
    }
    dispatch(stopSubmit('login', { _error: response.data.messages[0] }))
  }
}

export const logout = () => async (dispatch) => {
  const response = await AuthAPI.logout()
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false))
  }
}

export const getCaptcha = () => async (dispatch) => {
  const response = await CaptchaAPI.getCaptcha()
  dispatch(updateCaptchaUrl(response.data.url))
}


export default authReducer