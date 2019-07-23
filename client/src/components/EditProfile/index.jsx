import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from './actions';
import EmailInput from '../../shared/inputs/email/EmailInput'
import TextInput from '../../shared/inputs/text/TextInput'
import  {updateProfile} from '../../containers/Profile/actions'
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId:'',
            mail:'',
            login:'',
            status:''
        }
        this.onCancel = this.onCancel.bind(this);
        this.onChangeDataLogin = this.onChangeDataLogin.bind(this);
        this.onChangeDataMail = this.onChangeDataMail.bind(this);
        this.onChangeDataStatus = this.onChangeDataStatus.bind(this);
        this.onSave = this.onSave.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.id !== prevState.userId){
            return{
                userId:nextProps.id,
                mail: nextProps.mail,
                login: nextProps.login,
                status: nextProps.status
            };}
            else 
            return null;
    }
    onChangeDataMail(e) {
        const value = e.target.value;
        console.log(value)
        this.setState(
            {
                ...this.state,
                mail: value
            }
        );
    }
    onChangeDataLogin(e) {
        const value = e.target.value;
        this.setState(
            {
                ...this.state,
                login: value
            }
        );
    }
    onChangeDataStatus(e) {
        const value = e.target.value;
        this.setState(
            {
                ...this.state,
                status: value
            }
        );
    }
    onCancel(){
        this.props.hidePage();
    }
    onSave(){
        this.props.updateProfile({id:this.state.userId, username: this.state.login, email:this.state.mail, status:this.state.status});
        this.props.hidePage();
        this.setState({
            userId:'',
            mail: '',
            login: '',
            status:''
        })
        }

    render() {
        if(this.props.isShown===true){
        return <div className="modal" style={{ display: "block" }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ padding: "5px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title">Edit profile</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <EmailInput label="email" text={this.state.mail} onChange={this.onChangeDataMail}></EmailInput>
                    <TextInput  label="username" text={this.state.login} onChange={this.onChangeDataLogin}></TextInput>
                    <TextInput  label="status" text={this.state.status} onChange={this.onChangeDataStatus}></TextInput>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
                        <button className="btn btn-primary" onClick={this.onSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    }else return null;
}
}
const mapStateToProps = (state) => {
    return {
        isShown: state.editProfile.isShown,
        id:state.editProfile.userId,
        login:state.editProfile.login,
        mail:state.editProfile.mail,
        status:state.editProfile.status
    }
};

const mapDispatchToProps = {
    ...actions,
    updateProfile
};


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);