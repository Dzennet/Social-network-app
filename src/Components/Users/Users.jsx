import React from 'react';
import Paginator from '../../common/Paginator/Paginator';
import User from './User';
import c from './Users.module.css';

const FindUsers = (props) => {
  return <div className={c.users_page}>

    <Paginator currentPage={props.currentPage} onPageClick={props.onPageClick}
      totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} />

    {
      props.users.map(user => {
        return <User user={user}
          key={user.id}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          follow={props.follow} />
      })
    }
  </div >
}



export default FindUsers