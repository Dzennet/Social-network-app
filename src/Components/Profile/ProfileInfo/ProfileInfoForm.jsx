import React, { useState } from 'react';
import c from './ProfileInfo.module.css';
import formStyles from '../../../common/FormControls/FormControls.module.css';
import { Field, reduxForm } from 'redux-form'
import { Input, Textarea } from '../../../common/FormControls/FormControls';

const ProfileInfoForm = ({ profile, initialValues, error, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={c.editFullName}> Имя:
        <Field
          name="fullName"
          component={Input}
          type="text"
          placeholder="Your Full Name"
        />
      </div>
      <div className={c.editLookingForAJob}> Ищу работу:
        <Field
          name="lookingForAJob"
          component={Input}
          type="checkbox"
        />
      </div>
      <div className={c.editLookingForAJobDescription}> Мои навыки:
        <Field
          name="lookingForAJobDescription"
          component={Textarea}
          type="text"
          placeholder="My skills"
        />
      </div>
      <div className={c.editAboutMe}> Обо мне:
        <Field
          name="aboutMe"
          component={Textarea}
          type="text"
          placeholder="About Me"
        />
      </div>
      <div className={c.editContacts}> Контакты:
      {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={`c.edit${key}`}> {key}:
        <Field
            name={`contacts.${key}`}
            component={Input}
            type="text"
            placeholder={key}
          />
        </div>
      })}
      </div>
      <div>
        <button className="btn">Сохранить</button>
      </div>
      {error && <div className={formStyles.formSummaryError}>{error}</div>}
    </form>
  )
}

export default reduxForm({ form: "profile" })(ProfileInfoForm)