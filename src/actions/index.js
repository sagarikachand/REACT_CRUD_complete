import axios from 'axios'


export const FETCH_POSTS='fetch_posts';
export const FETCH_POST='fetch_post';
export const DELETE_POST='delete_post'

const ROOT_URL='http://reduxblog.herokuapp.com/api/' ;
const KEY='?key=PAPER1234';


export function fetchPosts (){
    console.log('fetching Posts')
const request = axios.get(`${ROOT_URL}/posts${KEY}`);

    return {
        type:FETCH_POSTS ,
        payload : request,
    }
}


export function createPost ( values , callback){
    console.log('Creating posts')
const request = axios.post(`${ROOT_URL}/posts${KEY}` , values) 
                .then ( () => callback() ) ;

    return {
        type:FETCH_POSTS ,
        payload : request,
    }
}



export function fetchPost (id) {
    console.log(`fetching post with id : ${id}`);

    const request= axios.get(`${ROOT_URL}/posts/${id}${KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost (id,callback) {
    console.log(`deleting post with id : ${id}`);

    const request= axios.delete(`${ROOT_URL}/posts/${id}${KEY}`) .then(
      () => callback()    
    );

    return {
        type: DELETE_POST,
        payload: request
    }
}