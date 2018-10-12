import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from '../../ducks/reducer'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleUpdateUsername(value){
        this.setState({
            username: value
        })
    }

    handleUpdatePassword(value){
        this.setState({
            password: value
        })
    }

    handleLogin(){
        let {username, password} = this.state
        axios.post(`/api/auth/login`, {username, password})
        .then(res => {
            this.props.updateUser({
                username: res.data.username,
                user_id: res.data.user_id,
                profile_pic: res.data.profile_pic
            })
            console.log(res.data)
            window.location=`http://localhost:3000/#/dashboard`
        })
    }
    
    handleRegister(){
        let {username, password} = this.state
        axios.post(`/api/auth/register`, {username, password})
        .then(res => {
            this.props.updateUser({
                username: res.data.username,
                user_id: res.data.user_id,
                profile_pic: res.data.profile_pic
            })
            window.location=`http://localhost:3000/#/dashboard`
        })
    }

    render(){
        return (
            <div>
                <input onChange={(e) => {this.handleUpdateUsername(e.target.value)}} value={this.state.username} placeholder='Username' />
                <input onChange={(e) => {this.handleUpdatePassword(e.target.value)}} type='password' value={this.state.password} placeholder='Password' />
                <button onClick={() => {this.handleLogin()}}>Login</button>
                <button onClick={() => {this.handleRegister()}}>Register</button>
            </div>
        )
    }
}

export default connect(null, { updateUser })(Auth)