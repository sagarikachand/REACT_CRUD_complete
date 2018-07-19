import React, { Component } from 'react';
import { connect    }       from 'react-redux';
import { fetchPosts }       from '../actions';
import { Link       }       from 'react-router-dom'
import   _                  from 'lodash'


class PostsIndex extends Component {


    // One time loading done inside this component hook
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
      
        return  _.map(this.props.posts, post => {
            
            return (
                <li className="list-group-item" key={post.id}> 
                <Link to={`/posts/${post.id}`}>{post.title}</Link> 
                </li>
            )
        })
    }

    render() {
        console.log("render")
        console.log(this.props.posts)
        return (
            <div>
                <div className="text-xs-right">
                   <Link className="btn btn-primary" to="/posts/new"> Add a new post + </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }

}


function mapStatetoProps({posts}) {
    return { posts }
}


// New short way to create action Creator and also using es6 syntax { word : word } === {word}
export default connect(mapStatetoProps, { fetchPosts })(PostsIndex)


