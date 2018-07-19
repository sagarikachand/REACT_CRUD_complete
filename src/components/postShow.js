import React , { Component } from 'react'
import { connect} from 'react-redux'
import {fetchPost ,deletePost} from '../actions/index'
import { Link} from 'react-router-dom'


class PostsShow extends Component {

    componentDidMount( ) {
        //React router provides a params property. Here id is the wild card as in the route path. 
     const {id}=  this.props.match.params;
     console.log(this.props.match.params)
     this.props.fetchPost(id);
    }
   
    deletePost() {
        this.props.deletePost(this.props.match.params.id , () => this.props.history.push("/") );
    }

    render() {
       const { post } = this.props
       if(!post){
           return (
               <div>Loading..</div>
           )
       }
        return(
            <div> 
                <Link to="/"> Back to index</Link>
                <button  className="btn btn-danger pull-xs-right" 
                   onClick={this.deletePost.bind(this)}
                > Delete Post </button>
              <h3>{post.title}</h3>
              <h6>Categories :{post.categories}</h6>
              <p>{post.content}</p>
            </div>
        )
    }
}
//The mapStatetoProps receives two parameters, first is state and other by convention can be called as ownProps
// Just for understanding -->   this.props  inside the PostsShow component is equal to ownProps
//  this.props === ownProps
function mapStateToProps( { posts }  , ownProps) {
    return { post : posts[ownProps.match.params.id]  }
}

export default connect(mapStateToProps ,{ fetchPost , deletePost }  ) (PostsShow);