import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            search: '',
            checked: true,
            posts: []
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    componentDidMount(){
        this.searchPosts();
    }

    handleInputChange(event){
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            checked: value
        })
    }

    handleSearchChange(event){
        this.setState({
            search: event.target.value
        })
    }

    resetSearch(){
        this.setState({
            search: '',
            checked: true
        })
        this.searchPosts();
    }

    searchPosts(){
        const { checked, search} = this.state;
        const { user_id } = this.props
        axios.get(`/api/posts/${user_id}?search=${search}&userposts=${checked}`)
        .then((response) => {
            this.setState({
                posts: response.data
            })
        })
    }

    render(){
        const renderPosts = this.state.posts.map(post => {
            return (
                <div>
                <h2>{post.title}</h2>
                <h4>{post.user_id}</h4>
                <img src={post.profile_pic} />
                <Link to={`/post/${post.post_id}`}><button>View Post</button></Link>
                </div>
            )
        })
        return (
            <div>
                Dashboard
                <input onChange={this.handleSearchChange} value={this.state.search} placeholder='Search' />
                <button onClick={() => {this.searchPosts()}}>Search</button>
                <button onClick={() => {this.resetSearch()}}>Reset</button>
                <input type="checkbox" checked={this.state.checked} onChange={this.handleInputChange} />
                {renderPosts}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        user_id: state.user_id
    }
}

export default connect(mapStateToProps)(Dashboard)