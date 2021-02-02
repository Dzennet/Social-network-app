import React from 'react';
import c from './Post.module.css'

let Post = (props) => {
  return (
    <div className={c.post_wrapper}>

      <div className={c.profile_info}>
        <img className={c.avatar} src={props.profile.photos.small} />
        <div className={c.name}>{props.profile.fullName}</div>
        <span className={c.delete_post} onClick={() => props.deletePost(props.id)} >удалить</span>
      </div>
      <div className={c.post}>{props.post}</div>

      <div className={c.options}>
      </div>
    </div>
  )
}

export default Post 