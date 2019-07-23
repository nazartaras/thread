import * as React from "react";
import { connect } from 'react-redux';
import * as actions from './actions';
import { updateComment } from '../../containers/Thread/actions'

class EditComment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            text:''
        };
       this.onCancel = this.onCancel.bind(this);
       this.handleInputChange = this.handleInputChange.bind(this);
       this.onSave = this.onSave.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.id !== prevState.id){
            return{
                id:nextProps.id,
                text: nextProps.text
            };}
            else 
            return null;
    }

    handleInputChange(e){
        this.setState({
            text: e.target.value
        })
    }
    
    onCancel(){
        this.props.hidePage();
    }

    onSave(){
        const {id, text} = this.state;
        console.log(id);
        this.props.updateComment({id,text});
        this.props.hidePage();
        this.setState({
            id:'',
            text:''
        })
    }
    getUserPageContent() {
        return (
            <div className="modal" style={{ display: "block"}} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{ padding: "5px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Comment</h5>
                        </div>
                        <div className="modal-body">
                            <div className="form-group row">
                                <label className="col-sm-3">Comment</label>
                                <input className="col-sm-9" onChange={this.handleInputChange} type='text' value={this.state.text}></input></div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={this.onCancel} >Cancel</button>
                            <button className="btn btn-success" onClick={this.onSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this.props.isShown?this.getUserPageContent():null;
    }
}
const mapStateToProps = (state) => {
    return {
        isShown: state.editComment.isShown,
        text: state.editComment.text,
        id: state.editComment.commentId
    }
};

const mapDispatchToProps = {
    ...actions,
    updateComment
};

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);
