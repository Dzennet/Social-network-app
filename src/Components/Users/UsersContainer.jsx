import React, { useEffect } from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import {
  follow,
  setUsers,
  unfollow,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsLoading
} from '../../Store/usersReducer';
import Preloader from '../../common/Preloader';
import { FindUsersAPI } from '../../Api/api';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';
import { compose } from 'redux';

const UsersContainer = (props) => {

  useEffect(() => {
    props.toggleIsLoading(true)
    props.setTotalUsersCount(0)
    FindUsersAPI.getUsers(props.currentPage, props.pageSize)
      .then(data => {
        props.toggleIsLoading(false)
        props.setUsers(data.items)
        props.setTotalUsersCount(data.totalCount)
      })
  }, [])


  const onPageClick = (currentPage) => {
    props.setTotalUsersCount(0)
    props.setCurrentPage(currentPage);
    props.toggleIsLoading(true)
    FindUsersAPI.getUsers(currentPage, props.pageSize)
      .then(data => {
        props.setTotalUsersCount(data.totalCount)
        props.toggleIsLoading(false)
        props.setUsers(data.items)
      })
  }


  return <>
    <div>{props.isLoading ? <Preloader /> : null}</div>

    <Users totalUsersCount={props.totalUsersCount}
      pageSize={props.pageSize}
      currentPage={props.currentPage}
      onPageClick={onPageClick}
      unfollow={props.unfollow}
      follow={props.follow}
      users={props.users}
      followingInProgress={props.followingInProgress}
    />
  </>

}

let mapStateToProps = (state) => {
  return {
    users: state.findUsersPage.users,
    totalUsersCount: state.findUsersPage.totalUsersCount,
    pageSize: state.findUsersPage.pageSize,
    currentPage: state.findUsersPage.currentPage,
    isLoading: state.findUsersPage.isLoading,
    followingInProgress: state.findUsersPage.followingInProgress
  }
}

export default compose(
  connect(mapStateToProps, { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsLoading, }),
  withAuthRedirect
)(UsersContainer)