import React, { useState } from 'react';
import c from './ProfileInfo.module.css';
import Preloader from '../../../common/Preloader';
import ProfileStatus from './ProfileStatus';
import UserPhoto from '../../../Assets/img/User.png';
import ProfileInfoData from './ProfileInfoData';
import ProfileInfoForm from './ProfileInfoForm';


let ProfileInfo = (props) => {

  const [editMode, setEditMode] = useState(false)

  if (!props.profile) {
    return <Preloader />
  }

  const onSelectedMainPhoto = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    props.saveProfileInfo(formData).then(() => {
      setEditMode(false)
    })
  }

  return (
    <div className={c.profile_body}>

      <div className={c.profile_photo}>
        <img src={props.profile.photos.large || UserPhoto} alt="profile_photo" />
        {props.isOwner && <>
          <input className={c.inputfile} id="file" name="file" type="file" onChange={onSelectedMainPhoto} />
          <label className={c.labelfile} htmlFor="file">
            Изменить фотографию</label>
        </>
        }
      </div>

      <div className={c.profile_info_wrap}>
        <div className={c.page_top}>
          <div className={c.page_name}>{props.profile.fullName}</div>
          <div className={c.page_status}>
            <ProfileStatus status={props.status}
              isOwner={props.isOwner}
              updateStatus={props.updateStatus} />
          </div>
          <hr />
          <div className={c.profile_info}>
            {editMode
              ? <ProfileInfoForm initialValues={props.profile} profile={props.profile}
                setEditMode={setEditMode} onSubmit={onSubmit} />
              : <ProfileInfoData profile={props.profile} setEditMode={setEditMode} isOwner={props.isOwner} />}
          </div>
        </div>
      </div>
    </div>
  )
}


export default ProfileInfo