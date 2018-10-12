import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function Nav(props) {
    console.log(props.location.pathname)

    if (props.location.pathname === '/') {
        return (
            <div>

            </div>
        )
    } else {
        console.log(props)
    return (
        <div>
            <h3>{props.username}</h3>
            <img src={props.profile_pic} alt=""/>
            <Link to='/dashboard' ><button>Home</button></Link>
            <Link to='/new' ><button>New Post</button></Link>
            <Link to='/' ><button>Logout</button></Link>
        </div>
    )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        username: state.username,
        profile_pic: state.profile_pic
    }
}

export default withRouter(connect(mapStateToProps)(Nav))