import React, { useState } from 'react';
import c from './ProfileInfo.module.css';

const Contact = ({ contactTitle, contactValues }) => {
  return (
    <div className={c.contact}>
      <b>{contactTitle}</b>: <a target="_blank" href={contactValues}>{contactValues}</a>
    </div>
  )
}

const ProfileInfoData = ({ profile, setEditMode, isOwner }) => {
  return (
    <div className={c.info_block}>
      <div className={c.lookingForAJob}>
        <b>Ищу работу</b>: {profile.lookingForAJob ? 'Да' : 'Нет'}
      </div>
      <hr />
      <div className={c.lookingForAJobDescription}>
        <b>Мои навыки</b>: {profile.lookingForAJobDescription}
      </div>
      <div className={c.aboutMe}>
        <b>Обо мне</b>: {profile.aboutMe}
      </div>
      <hr />
      <div className={c.contacts}>
        <b>Контакты</b>: {Object.keys(profile.contacts).map(key => {
          return <Contact key={key} contactTitle={key} contactValues={profile.contacts[key]} />
        })}
      </div>
      {isOwner &&
        <div className={c.edit_btn}>
          <button onClick={() => setEditMode(true)}>Редактировать</button>
        </div>}
    </div>
  )
}
export default ProfileInfoData