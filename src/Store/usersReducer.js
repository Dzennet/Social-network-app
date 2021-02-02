import { FindUsersAPI } from '../Api/api'

const FOLLOW = 'usersPage/FOLLOW';
const UNFOLLOW = 'usersPage/UNFOLLOW';
const SET_USERS = 'usersPage/SET_USERS';
const SET_CURRENT_PAGE = 'usersPage/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersPage/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_LOADING = 'usersPage/TOGGLE_IS_LOADING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'usersPage/TOGGLE_FOLLOWING_IN_PROGRESS';

let initialState = {
  users: [],
  totalUsersCount: 0,
  pageSize: 10,
  currentPage: 1,
  isLoading: false,
  followingInProgress: []
}

let findUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: true }
          }
          return user
        })
      }
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }
          return user
        })
      }
    case SET_USERS:
      return {
        ...state,
        users: [...action.newUsers]
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    case TOGGLE_IS_LOADING:
      return {
        ...state,
        users: [],
        isLoading: action.isLoading
      }
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId)
      }
    default: return state
  }
}

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (newUsers) => ({ type: SET_USERS, newUsers });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsLoading = (isLoading) => ({ type: TOGGLE_IS_LOADING, isLoading });
export const toggleFollowingInProgress = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, userId });


const followUnolllowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingInProgress(true, userId))
  let data = await apiMethod(userId)
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(toggleFollowingInProgress(false, userId))
}


export const follow = (userId) => {
  return async (dispatch) => {
    followUnolllowFlow(dispatch, userId, FindUsersAPI.followUser, followSuccess)
  }
}

export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnolllowFlow(dispatch, userId, FindUsersAPI.unfollowUser, unfollowSuccess)
  }
}

export default findUsersReducer