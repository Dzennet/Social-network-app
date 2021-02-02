import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfileInfo } from '../../Store/profileReducer'
import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../../HOC/withAuthRedirect'
import { compose } from 'redux'

const ProfileContainer = (props) => {

  const refreshProfile = () => {
    let userId = props.match.params.userId
    if (!userId) {
      userId = 12525
    }
    props.getUserProfile(userId)
    props.getStatus(userId)
  }

  useEffect(() => {
    refreshProfile()
  }, [props.match.params.userId])

  return <Profile {...props}
    status={props.status}
    updateStatus={props.updateStatus}
    isOwner={!props.match.params.userId}
  />
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
})

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfileInfo }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)

