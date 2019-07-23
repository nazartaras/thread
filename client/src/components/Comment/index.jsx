import React from 'react';
import PropTypes from 'prop-types';
import { Comment as CommentUI, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';
import { getUserImgLink } from 'src/helpers/imageHelper';

import styles from './styles.module.scss';

const Comment = (props) => {
    const date = moment(props.comment.createdAt).fromNow();
    if(props.comment.hasOwnProperty('deleted')&& props.comment.deleted===true){
        return <div><Button color='green' onClick={()=>props.onRestore(props.comment.id)}>Restore Comment</Button></div>
    }
    else {return (
        <CommentUI className={styles.comment}>
            <CommentUI.Avatar src={getUserImgLink(props.comment.user.image)} />
            <CommentUI.Content>
                <CommentUI.Author as="a">
                    {props.comment.user.username}
                </CommentUI.Author>
                <CommentUI.Metadata>
                    {props.comment.date}
                </CommentUI.Metadata>
                <CommentUI.Text>
                    {props.comment.body}
                </CommentUI.Text>
            </CommentUI.Content>
            <CommentUI.Content extra>
            <Label basic size="small" as="a" className={styles.toolbarBtn}>
                    <Icon name="thumbs up" />
                </Label>
                <Label basic size="small" as="a" className={styles.toolbarBtn}>
                    <Icon name="thumbs down" />
                </Label>
            {(() => {
                    if (props.currUser === props.comment.user.id) {
                        return <span ><Button primary onClick={()=>{props.onEdit({commentText:props.comment.body, commentId:props.comment.id})}}>Edit</Button>
                        <Button floated="right" color='red' onClick={()=>props.onDelete(props.comment.id)}><Icon name="trash alternate"/></Button></span> 
                    }
                })()}
            </CommentUI.Content>
        </CommentUI>
    );}
};

Comment.propTypes = {
    comment: PropTypes.objectOf(PropTypes.any).isRequired,
    edit: PropTypes.func.isRequired
};

export default Comment;
