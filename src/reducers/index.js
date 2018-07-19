import { combineReducers }        from 'redux';
import PostsReducer               from './post-reducer';
import { reducer  as formReducer} from 'redux-form'


// We import a reducer from redux-form library and hook up to our  combine reducer.
//This just saves us from manually wiring up a bunch of action creators.
//The keyword is MANDATORY as ' form ' .
//
const rootReducer = combineReducers({
 posts: PostsReducer ,

 form : formReducer
});

export default rootReducer;
