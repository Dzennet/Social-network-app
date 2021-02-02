import React from 'react';
import Post from './Post/Post';
import c from './MyPosts.module.css';
import formControlsStyle from '../../../common/FormControls/FormControls.module.css';
import { Field, reduxForm, reset } from 'redux-form';
import { Textarea } from '../../../common/FormControls/FormControls';

let newId = 0;

const AddNewPostForm = (props) => {

  return (
    <form className={c.posts_form} onSubmit={props.handleSubmit}>
      <div>
        <Field className={c.posts_form_input} component={Textarea} name="newPostText" />
      </div>
      {props.error && <div className={formControlsStyle.formSummaryError}>{props.error}</div>}
      <button className='btn' disabled={props.submitting}>Добавить</button>
    </form >
  )
}

const AddNewPostReduxForm = reduxForm({ form: 'addNewPost' })(AddNewPostForm);

const MyPosts = (props) => {
  
  let PostItem = props.postsData.map(post => <Post deletePost={props.deletePost}
    profile={props.profile}
    key={post.id}
    id={post.id}
    post={post.post}
    name={post.name} />)

  const onSubmit = (formData, dispatch) => {
    if (formData.newPostText) {
      props.addPost(newId++, formData.newPostText)
      dispatch(reset('addNewPost'))
    }
  }

  return (
    <div className={c.posts_block}>
      {props.isOwner && <div className={c.profile_posts}>
        <div className={c.add_post_form}>
          <AddNewPostReduxForm onSubmit={onSubmit} />
        </div >
        {PostItem}
      </div>}
    </div>
  )
}

export default MyPosts