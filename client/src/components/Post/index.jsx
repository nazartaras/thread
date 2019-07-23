import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Label, Icon, Button } from 'semantic-ui-react';
import moment from 'moment';

import styles from './styles.module.scss';

const Post = ({ post, likePost, dislikePost, toggleExpandedPost, sharePost, currUser, deletePostById, restore, edit, status}) => {
    const {
        id,
        image,
        body,
        user,
        likeCount,
        dislikeCount,
        commentCount,
        createdAt
    } = post;
    const date = moment(createdAt).fromNow();
    if(post.hasOwnProperty('deleted')&&post.deleted===true){
    return <div><Button color='green' onClick={()=>restore(id)}>Restore Post</Button></div>
        }else{
    return (<Card style={{ width: '100%' }}>
    {image && <Image src={image.link} wrapped ui={false} />}
    <Card.Content>
        <Card.Meta>
            <span className="date">
                posted by
                {' '}
                {user.username}
                {' - '}
                {date}
            </span>
        </Card.Meta>
        <Card.Description>
            {body}
        </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => likePost(id)}>
            <Icon name="thumbs up" />
            {likeCount}
        </Label>
        <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => dislikePost(id)}>
            <Icon name="thumbs down" />
            {dislikeCount}
        </Label>
        <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => toggleExpandedPost(id)}>
            <Icon name="comment" />
            {commentCount}
        </Label>
        <Label basic size="small" as="a" className={styles.toolbarBtn} onClick={() => sharePost(id)}>
            <Icon name="share alternate" />
        </Label>
        {(() => {
            if (currUser === user.id) {
                return <span ><Button primary onClick={()=> edit({postText:body, postId: id})}>Edit</Button>
                <Button floated="right" color='red' onClick={()=>deletePostById(id)}><Icon name="trash alternate"/></Button></span> 
            }
        })()}
       

    </Card.Content>
</Card>)
    
    }
};


Post.propTypes = {
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    likePost: PropTypes.func.isRequired,
    toggleExpandedPost: PropTypes.func.isRequired,
    sharePost: PropTypes.func.isRequired,
    dislikePost: PropTypes.func.isRequired,
    deletePostById: PropTypes.func.isRequired
};

export default Post;
