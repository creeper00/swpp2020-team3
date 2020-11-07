import React, {Component} from 'react';
import { connect } from 'react-redux';

import Replies from '../reply/Replies';

import './Comment.css'

class Comment extends Component {
    state = {
        author_name:''
    }
    onEdit = () => {
        let newContent = prompt("new comment", this.props.content); // edit comment prompt
        // if valid editing, change comment
        if(newContent){
            this.props.onEditComment(newContent)
        }
    }
    
    render() {
        const replies = <Replies commentId={this.props.id}/>
        return(
            <div>
                <p>{this.props.content} - {this.props.author}</p>
                {<button id='edit-comment-button' onClick={this.onEdit}>edit</button>}
                {<button id='delete-comment-button' onClick={() => this.props.onDeleteComment()}>delete</button>}
                {replies}
            </div>
        ) 
    }
}

export default Comment;
