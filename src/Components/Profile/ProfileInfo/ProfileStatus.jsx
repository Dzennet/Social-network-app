import React, { useEffect, useState } from 'react';
import c from './ProfileInfo.module.css';

const ProfileStatus = (props) => {

  const [editMode, setEditMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusChange = (e) => setStatus(e.currentTarget.value)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  return (
    <>
      {editMode
        ? <input autoFocus={true}
          onBlur={deactivateEditMode}
          onChange={onStatusChange}
          value={status} type="text" />
        : <div>
          {props.isOwner
            ? <span className={c.my_status} onDoubleClick={activateEditMode}>
              {props.status || <em>Изменить статус</em>}
            </span>
            : <span className={c.my_status}>{props.status || <em>Статуса нет</em>} </span>}
        </div>
      }
    </>
  )
}

export default ProfileStatus