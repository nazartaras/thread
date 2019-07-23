import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Comment as CommentUI, Header } from 'semantic-ui-react';
import moment from 'moment';
import { likePost, toggleExpandedPost, addComment, deleteComment, restoreComment, dislikePost } from 'src/containers/Thread/actions';
import Post from 'src/components/Post';
import Comment from 'src/components/Comment';
import AddComment from 'src/components/AddComment';
import Spinner from 'src/components/Spinner';
import { showPage } from  '../../components/EditComment/actions'
import  EditComment  from '../../components/EditComment';

class ExpandedPost extends React.Component {
    state = {
        open: true
    };

    closeModal = () => {
        this.props.toggleExpandedPost();
    }

    render() {
        const { post, sharePost, userId, ...props } = this.props;
        console.log(post);
        return (
            <Modal dimmer="blurring" centered={false} open={this.state.open} onClose={this.closeModal}>
                <EditComment></EditComment>
                {post
                    ? (
                        <Modal.Content>
                            <Post
                                post={post}
                                likePost={props.likePost}
                                toggleExpandedPost={props.toggleExpandedPost}
                                sharePost={sharePost}
                                dislikePost={props.dislikePost}
                                deletePostById={props.deletePostById}
                            />
                            <CommentUI.Group style={{ maxWidth: '100%' }}>
                                <Header as="h3" dividing>
                                    Comments
                                </Header>
                                {post.comments && post.comments
                                    .sort((c1, c2) => moment(c1.createdAt).diff(c2.createdAt))
                                    .map(comment =><Comment onRestore={props.restoreComment} onEdit={props.showPage} onDelete={props.deleteComment}key={comment.id} comment={comment} currUser={userId}/>)
                                }
                                <AddComment postId={post.id} addComment={props.addComment}/>
                            </CommentUI.Group>
                        </Modal.Content>
                    )
                    : <Spinner />
                }
            </Modal>
        );
    }
}

ExpandedPost.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    sharePost: PropTypes.func.isRequired
};

const mapStateToProps = rootState => (
    {
    post: rootState.posts.expandedPost,
    userId: rootState.profile.user.id
});
const actions = { likePost, toggleExpandedPost, addComment, deleteComment, restoreComment, showPage, dislikePost };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpandedPost);
