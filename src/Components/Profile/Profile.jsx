import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

let Profile = (props) => {
  return (
    <div>
      <ProfileInfo isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfileInfo={props.saveProfileInfo} />

      <MyPostsContainer isOwner={props.isOwner} />
    </div>
  )
}

export default Profile