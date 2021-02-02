import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './Header.module.css';
import chatMainIcon from '../../Assets/img/Header/chat_main_icon.png';
import { connect } from 'react-redux';
import { logout } from '../../Store/authReducer';
import { toggleIsShowNav } from '../../Store/appReducer';
import cn from 'classnames';

let Header = ({ profile, login, logout, isAuth,
  toggleIsShowNav, isShowNav, headerPhoto }) => {

  if (!profile && !headerPhoto) {
    return <div>loading...</div>
  }

  return (
    <header className={c.header}>
      {
        isAuth

          ? <div className={c.header_login}>
            <span className={c.header_my_login}>{login}</span>
            <button className={c.logout_btn} onClick={logout}>Выйти</button>
          </div>

          : <NavLink className={c.header_login} to='/login'><button> Войти</button></NavLink>
      }

      <div onClick={() => toggleIsShowNav()}
        className={cn({ [c.active]: isShowNav }, c.header_burger)}>
        <span></span>
      </div>

      <div className={c.logo}>
        <img alt="logo" className={c.logo} src={chatMainIcon} />
      </div>

      <div className={c.soc_net_name}>Blog</div>
    </header >
  )
}

let mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
  profile: state.profilePage.profile,
  isShowNav: state.app.isShowNav,
})


export default connect(mapStateToProps, { logout, toggleIsShowNav })(Header)
