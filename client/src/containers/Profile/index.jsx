import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserImgLink } from 'src/helpers/imageHelper';
import {
    Grid,
    Image,
    Input,
    Button
} from 'semantic-ui-react';
import { showPage, hidePage } from '../../components/EditProfile/actions'
import EditProfile from '../../components/EditProfile'


const Profile = (props) => (
    
    <Grid container textAlign="center" style={{ paddingTop: 30 }}>
        {
            console.log(props.user)
        }
        <EditProfile></EditProfile>
        <Grid.Column>
            <Image centered src={getUserImgLink(props.user.image)} size="medium" circular />
            <br />
            <Input
                icon="envelope"
                iconPosition="left"
                placeholder="Status"
                type="text"
                disabled
                value={props.user.status}
            />
            <br />
            <br />
            <Input
                icon="user"
                iconPosition="left"
                placeholder="Username"
                type="text"
                disabled
                value={props.user.username}
            />
            <br />
            <br />
            <Input
                icon="at"
                iconPosition="left"
                placeholder="Email"
                type="email"
                disabled
                value={props.user.email}
            />
            <br />
            <br />
            <Button primary onClick={()=>props.showPage({userId:props.user.id, mail:props.user.email, login:props.user.username, status:props.user.status})}>
                Edit profile
            </Button>
        </Grid.Column>
    </Grid>
);

Profile.propTypes = {
    user: PropTypes.objectOf(PropTypes.any)
};

Profile.defaultProps = {
    user: {}
};

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});
const  actions = {showPage,hidePage}; 

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
