import React from 'react';
import { NavLink } from 'react-router-dom';
import c from './Navbar.module.css';
import myProfileIcon from '../../Assets/img/Profile/my_profile_icon.png';
import usersIcon from '../../Assets/img/Profile/users_icon.png';
import { connect } from 'react-redux';
import { logout, login } from '../../Store/authReducer';
import { toggleIsShowNav } from '../../Store/appReducer';
import cn from 'classnames';

const Navbar = ({ logout, isShowNav, toggleIsShowNav, isAuth }) => {
  return (
    <div className={cn({ [c.active]: isShowNav }, c.navbar)}>

      <div onClick={() => toggleIsShowNav()} className={c.nav_item}>
        <img className={c.left_icon} src={myProfileIcon} alt="my_profile" />
        <NavLink to='/profile' className={c.link}>Моя страница</NavLink>
      </div>

      <div onClick={() => toggleIsShowNav()} className={c.nav_item}>
        <img className={c.left_icon} src={usersIcon} alt="my_profile" />
        <NavLink to='/users' className={c.link}>Пользователи</NavLink>
      </div>

      <div onClick={() => toggleIsShowNav()} className={c.nav_item}>
        {isAuth
          ? <span className={c.logout_burger} onClick={logout}>Выйти</span>
          : <span className={c.login_burger}>Войти</span>}
      </div>
    </div>
  )
}

let mapStateToProps = (state) => ({
  isShowNav: state.app.isShowNav,
  isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { logout, login, toggleIsShowNav })(Navbar)