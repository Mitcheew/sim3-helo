import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class Post extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            image: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }

    componentDidMount(){
        this.grabPost();
    }

    grabPost(){
        axios.get(`/api/${this.props.location.pathname}`)
        .then(response => {
            this.setState({
                title: response.data.title,
                image: response.data.image,
                content: response.data.content,
                username: response.data.username,
                profile_pic: response.data.profile_pic,

            })
        console.log(response)
        })
    }

    render(){
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>By: {this.state.username}</p>
                <img src={this.state.profile_pic} alt="" />
                <img src={this.state.image} alt="" />
                <p>{this.state.content}</p>
            </div>
        )
    }
}

export default withRouter(Post)