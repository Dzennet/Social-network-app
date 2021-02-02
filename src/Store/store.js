import profileReducer from './profileReducer';
import usersReducer from './usersReducer';
import authReducer from './authReducer';
import appReducer from './appReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

const reducers = combineReducers({
  profilePage: profileReducer,
  findUsersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
})

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, persistedState, composeEnhancers(
  applyMiddleware(thunkMiddleware),
));

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
window.store = store
export default store