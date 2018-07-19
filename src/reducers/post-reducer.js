import { FETCH_POSTS , FETCH_POST, DELETE_POST} from "../actions";
import _ from 'lodash'


//Here _.mapKeys creates an object from a array of objects. That is it creates an object of objects. With the key as the second parameter provided to it.
//Eg. responseArray= [
//   {id:1, content: "abc" , titlw-"xxd"},
//   {id:2, content: "abc1" , titlw-"xxd1"}
// ]
// _.mapKeys(responseArray , 'id')  ---->   {
//   { "1" : {id:1, content: "abc" , titlw-"xxd"} },
//   { "2" : {id:2, content: "abc1" , titlw-"xxd1" }
// }

//The reason why we are using a single state propety called 'posts' is that ..
// A user can directly navigate to a particular post withput landing on the root page. 
//So want to just maintain a single state with the updated post fetched.


//The FETCH_POSTS call will completely  replace the state.
//The FETCh_POST call just returns a single object, Which gets appended to the state

export default function(state = {}, action) {

    switch(action.type){
        case FETCH_POSTS :
          return _.mapKeys(action.payload.data , 'id');


        case FETCH_POST :
        //   const post= action.payload.data;
        //   const newState= {...state};
        //   newState[post.id] = post;
        //   return newState;
        //Use above lines or use below ES6 syntax
        //If this is the first call then state will be empty object, and we will add a new key, value pair
        // if this is called repeatedly without call to FETCH_POSTS, Then still new key value pair will be added.
        // If the all posts are previously fetched , than state will be already in its proper form i.e object of objects
        console.log({...state , [action.payload.data.id] : action.payload.data})
        return {...state , [action.payload.data.id] : action.payload.data}
       
          default:
        return state;



        case DELETE_POST :
 
        //This is lodash utility function omit
        return _.omit(state , action.payload)
    }
}