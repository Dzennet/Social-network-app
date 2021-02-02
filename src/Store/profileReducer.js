import { ProfileAPI } from '../Api/api';
import { stopSubmit } from 'redux-form'


const ADD_POST = 'profilePage/ADD-POST';
const DELETE_POST = 'profilePage/DELETE_POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'profilePage/SAVE_PHOTO_SUCCESS';

let initialState = {
  postsData: [],
  profile: null,
  status: '',
}

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [{
          id: action.id,
          post: action.newPostText,
        }, ...state.postsData],
      }
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(post => post.id !== action.postId),
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.userProfile
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos }
      }
    default: return state
  }
}


export const addPost = (id, newPostText) => ({ type: ADD_POST, id, newPostText });
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const setUserProfile = (userProfile) => ({ type: SET_USER_PROFILE, userProfile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await ProfileAPI.setUserProfile(userId)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  const response = await ProfileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}


export const updateStatus = (status) => async (dispatch) => {
  const response = await ProfileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status))
  }
}

export const savePhoto = (photo) => async (dispatch) => {
  const response = await ProfileAPI.savePhoto(photo)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}

export const saveProfileInfo = (profileInfo) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const response = await ProfileAPI.saveProfileInfo(profileInfo)
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    dispatch(stopSubmit('profile', { _error: response.data.messages }))
    return Promise.reject(response.data.messages[0])
  }
}

export default profileReducer

