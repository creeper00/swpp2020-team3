import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as actionCreators from '../../store/actions/index';
import Reply from './Reply';

class Replies extends Component {

    state = {
        content: '',
        replies: null,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const replylist = this.props.replies.map( (item) => <Reply content={item.content} author={item.author_id} 
            onEditReply={(content) => this.props.onEditReply({id: item.id, content, edited: true})} onDeleteReply={() => this.props.onDeleteReply(item.id)}/>)
        return (
            <div className='replies'>
                {replylist}
                <input className='reply-content-input' value={this.state.content} onChange={(e) => this.setState({content: e.target.value})}/>
                <button className='create-reply-button' disabled={this.state.content==''} onClick={() => {this.setState({content: ''}); this.props.addReply({date:'2020-11-05', edited:false, content: this.state.content, commentId: this.props.commentId});}}>confirm</button>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onEditReply: (reply) => dispatch(actionCreators.editReply(reply)),
        onDeleteReply: (reply) => dispatch(actionCreators.deleteReply(reply)),
        addReply: (reply) => dispatch(actionCreators.addReply(reply)),
    }
}

Replies.propTypes = {
    onEditReply: PropTypes.func,
    onDeleteReply: PropTypes.func,
    addReply: PropTypes.func,
    replies: PropTypes.array,
    commentId: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Replies);
