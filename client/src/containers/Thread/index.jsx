import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as imageService from 'src/services/imageService';
import ExpandedPost from 'src/containers/ExpandedPost';
import Post from 'src/components/Post';
import AddPost from 'src/components/AddPost';
import SharedPostLink from 'src/components/SharedPostLink';
import { Checkbox, Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import  EditPost  from '../../components/EditPost';
import { loadPosts, loadMorePosts, likePost, dislikePost, toggleExpandedPost, addPost, deletePostById, restorePostById } from './actions';
import { showPage } from '../../components/EditPost/actions'
import styles from './styles.module.scss';

class Thread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sharedPostId: undefined,
            showOwnPosts: false,
            hideOwnPosts: false,
            showLiked: false
        };
        this.postsFilter = {
            userId: undefined,
            from: 0,
            count: 10,
            type: undefined
        };
    }

    tooglePosts = () => {
        this.setState(
            ({ showOwnPosts }) => ({ showOwnPosts: !showOwnPosts }),
            () => {
                Object.assign(this.postsFilter, {
                    userId: this.state.showOwnPosts ? this.props.userId : undefined,
                    from: 0,
                    type: this.state.showOwnPosts ? 0 : undefined
                });
                this.props.loadPosts(this.postsFilter);
                this.postsFilter.from = this.postsFilter.count; // for next scroll
            }
        );
    };
    hidePosts=()=>{
        this.setState(
            ({ hideOwnPosts }) => ({ hideOwnPosts: !hideOwnPosts }),
            () => {
                Object.assign(this.postsFilter, {
                    userId: this.state.hideOwnPosts ? this.props.userId : undefined,
                    from: 0,
                    type: this.state.hideOwnPosts ? 1 : undefined
                });
                this.props.loadPosts(this.postsFilter);
            }
        );
    }
    showLikedPosts=()=>{
        this.props.getLikedPosts();
    }
    loadMorePosts = () => {
        this.props.loadMorePosts(this.postsFilter);
        const { from, count } = this.postsFilter;
        this.postsFilter.from = from + count;
    }

    sharePost = (sharedPostId) => {
        this.setState({ sharedPostId });
    };

    closeSharePost = () => {
        this.setState({ sharedPostId: undefined });
    }

    uploadImage = file => imageService.uploadImage(file);

    render() {
        const { posts = [], expandedPost, hasMorePosts, userId, ...props } = this.props;
        const { showOwnPosts, sharedPostId, hideOwnPosts, showLiked } = this.state;
        return (
            <div className={styles.threadContent}>
                <div className={styles.addPostForm}>
                    <AddPost addPost={props.addPost} uploadImage={this.uploadImage} />
                </div>
                <div className={styles.toolbar}>
                    <Checkbox toggle label="Show only my posts" checked={showOwnPosts} onChange={this.tooglePosts} />
                </div>
                <div className={styles.toolbar}>
                <Checkbox toggle label="Don't show my posts" checked={hideOwnPosts} onChange={this.hidePosts} />
                </div>
                <div className={styles.toolbar}>
                <Checkbox toggle label="Show liked posts" checked={showLiked} onChange={this.showLikedPosts} />
                </div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMorePosts}
                    hasMore={hasMorePosts}
                    loader={<Loader active inline="centered" key={0} />}
                > 
                <EditPost></EditPost>
                    {posts.map(post => {
                           return <Post
                            currUser={userId}
                            post={post}
                            likePost={props.likePost}
                            toggleExpandedPost={props.toggleExpandedPost}
                            sharePost={this.sharePost}
                            key={post.id}
                            dislikePost={props.dislikePost}
                            deletePostById={props.deletePostById}
                            restore={props.restorePostById}
                            edit={props.showPage}
                            status={props.status}
                            /> 
                    })}
                </InfiniteScroll>
                {
                    expandedPost
                    && <ExpandedPost sharePost={this.sharePost} />
                }
                {
                    sharedPostId
                    && <SharedPostLink postId={sharedPostId} close={this.closeSharePost} />
                }
               
            </div>
        );
    }
}

Thread.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    hasMorePosts: PropTypes.bool,
    expandedPost: PropTypes.objectOf(PropTypes.any),
    sharedPostId: PropTypes.string,
    userId: PropTypes.string,
    loadPosts: PropTypes.func.isRequired,
    loadMorePosts: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    deletePostById: PropTypes.func.isRequired
};

Thread.defaultProps = {
    posts: [],
    hasMorePosts: true,
    expandedPost: undefined,
    sharedPostId: undefined,
    userId: undefined
};

const mapStateToProps = rootState => (
    {
    posts: rootState.posts.posts,
    hasMorePosts: rootState.posts.hasMorePosts,
    expandedPost: rootState.posts.expandedPost,
    userId: rootState.profile.user.id,
    status: rootState.profile.user.status
});

const actions = {
    dislikePost,
    loadPosts,
    loadMorePosts,
    likePost,
    toggleExpandedPost,
    addPost,
    deletePostById,
    restorePostById,
    showPage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Thread);
