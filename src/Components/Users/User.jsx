import React from 'react';
import c from './Users.module.css';
import UserPhoto from '../../Assets/img/User.png';
import { NavLink } from 'react-router-dom';

function User({ user, followingInProgress, unfollow, follow }) {
  return (
    <div className={c.search_people}>
      
      <div className={c.search_img}>
        <NavLink to={`/profile/${user.id}`}>
          <img alt="User" className={c.avatar} src={user.photos.small != null ? user.photos.small : UserPhoto} />
        </NavLink>
      </div>

      <div className={c.info}>
        <NavLink className={c.nav_name} to={`/profile/${user.id}`}>
          <div className={c.name}>{user.name}</div>
        </NavLink>
        <div className={c.status}>{user.status}</div>
      </div>

      <div className={c.controls}>
        {user.followed
          ? <button className='btn' disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
            unfollow(user.id)
          }}>Отписаться</button>

          : <button className='btn' disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
            follow(user.id)
          }}>Подписаться</button>}
      </div>
    </div>
  )
}

export default User
