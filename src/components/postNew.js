import React, { Component }        from 'react';
import { Field, reduxForm }        from 'redux-form';
import { Link }                    from 'react-router-dom';
import { connect }                 from 'react-redux'
import { createPost }              from '../actions/index';


//Here we have to import 'reduxForm' from redux-form.  This reduxForm is like the connect parameter.
// reduxForm connects the reducer that we defined in reducer/index.js . We write an object which is the fileds that u need to take care.


//Now by defining the fields, we got there new paramaters as props. These are fields.title, fields.categories and field.content.
//We also got handleSUbmit funciton as props
//The below ES6 syntax means   const title = this.props.fields.title and so on .
class PostsNew extends Component {



    renderField = (field) => {

        const { meta: { touched, error } } = field
        const className = `form-group ${touched && error ? 'has-danger' : ''} `;
        return (
            <div className={className}>
                {/* the syntax below is just a ES6 syntax for 
             
                <input onChange-{field.input.onchange}
                onBlur-{field.input.onBlur}
                onFocus-{field.input.onFocus}    
                 blah 
                blah
                />
             
               */}
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    //Route helps us to navigate to a component and passes whole bunch of helpers.
    //Here we have history on the props.
    //Pass the history.push('path) helper as a callback to actionCreator.
    onSubmit(values) {
        console.log(values);
        this.props.createPost(values, () => { this.props.history.push('/') });

    }
    
    render() {
        const { handleSubmit } = this.props
        return (

            //The component property takes a function. The function returns a jsx which helps the Field to display itself.
            //The Filed only knows how to interact with redux form but not how it appears.
            //Any  arbitary property can be passed to the component function ,The property is defined on Field  and is available to the field property 
            //passed  to renderField
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3> Create  a new post</h3>
                <Field name="title"
                    label="Title"
                    component={this.renderField} />

                <Field name="categories"
                    label="Categories"
                    component={this.renderField} />

                <Field name="content"
                    label="Post Content"
                    component={this.renderField} />


                <button type="submit" className="btn btn-primary">Submit</button>
                <Link type="submit" to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}



function validate(values) {
    //console.log(values) --> {title: 'abc' , categories : '3fdef' , content : 'w231'}
    //We create an error object and return that. The errors property name should match the name of the Field tag

    const errors = {};
    //Some Logic using values

    if (!values.title) {
        errors.title = "Enter a title"
    }

    if (!values.categories) {
        errors.categories = "Enter a category"
    }


    if (!values.content) {
        errors.content = "Enter some content"
    }



    //return The errors object.
    // If error is an empty object then form thinks there is no erros. 
    //If errors has *any* property, redux forms assumes form is invalid.
    return errors
}
//The  name of the form property should just be unique. 
export default reduxForm({
    //  validate : validate 
    validate,
    form: 'PostsNewForm',

})(
    connect(null, { createPost })(PostsNew)
    );



