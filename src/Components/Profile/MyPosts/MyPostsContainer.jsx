import { connect } from 'react-redux';
import { addPost, deletePost } from '../../../Store/profileReducer'
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
  return <MyPosts isOwner={props.isOwner}
    postsData={props.postsData}
    profile={props.profile}
    addPost={props.addPost}
    deletePost={props.deletePost} />
}

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    profile: state.profilePage.profile,
  }
}

export default connect(mapStateToProps, { addPost, deletePost })(MyPostsContainer)