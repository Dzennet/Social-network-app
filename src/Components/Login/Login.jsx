import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { Input } from '../../common/FormControls/FormControls';
import { login, getCaptcha } from '../../Store/authReducer';
import { maxLength, required, minLength } from '../../Utils/validate';
import formControlsStyle from '../../common/FormControls/FormControls.module.css';
import c from './Login.module.css';

const maxLength30 = maxLength(30)
const minLength2 = minLength(2)
const minLength4 = minLength(4)

const LoginReduxForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form className={c.login_form} onSubmit={handleSubmit}>
      <div className={c.login_field} >
        <Field component={Input} validate={[required, minLength4]} placeholder="Email" name="email" />
      </div>
      <div className={c.login_field}>
        <Field component={Input} validate={[required, maxLength30, minLength2]} placeholder="Password" name="password" />
      </div>
      <div>
        <Field component="input" type="checkbox" name="rememberMe" /> запомнить меня
      </div>
      {error && <div className={formControlsStyle.formSummaryError}>{error}</div>}

      {captchaUrl &&
        <div className="captcha">
          <img src={captchaUrl} />
          <div>
            <Field component={Input} validate={[required]} placeholder="Symbols from image" type="text" name="captcha" />
          </div>
        </div>}
      <div>
        <button className="btn">Войти</button>
      </div>
    </form>
  )
}

const LoginForm = reduxForm({ form: 'login' })(LoginReduxForm);



const Login = ({ isAuth, login, captchaUrl }) => {

  const onSubmit = (formData) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (isAuth) {
    return <Redirect to={"/profile"} />
  }

  return (
    <div className={c.login}>
      <h2>Вход</h2>
      <LoginForm captchaUrl={captchaUrl} onSubmit={onSubmit} />
    </div>
  )
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login, getCaptcha })(Login) 