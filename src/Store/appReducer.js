import { getAuthUserData } from './authReducer'

const INITIALIZED_SUCCSESS = 'app/INITIALIZED_SUCCSESS';
const TOGGLE_IS_SHOW_NAV = 'app/TOGGLE_IS_SHOW_NAV';


let initialState = {
  isAppInitialized: false,
  isShowNav: false,
}

let appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCSESS:
      return {
        ...state,
        isAppInitialized: true
      }
    case TOGGLE_IS_SHOW_NAV:
      return {
        ...state,
        isShowNav: !state.isShowNav
      }
    default: return state
  }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCSESS });
export const toggleIsShowNav = () => ({ type: TOGGLE_IS_SHOW_NAV });

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise])
    .then(() => { dispatch(initializedSuccess()) })
}

export default appReducer