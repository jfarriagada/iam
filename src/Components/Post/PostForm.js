import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length > 150) {
        errors.title = 'Maximo 150 caracteres'
    }
    if (!values.body) {
        errors.body = 'Required'
    } else if (values.body.length > 7500) {
        errors.body = 'Maximo 7500 caracteres'
    }
    return errors
}

// El renderField itera sobre cada elemento del form
// por el component que se pasa en el Field 'component={renderField}'
const renderField = ({ input, label, type, meta: { touched, error, warning }}) =>
  <div>
    <div>
      <input className="input" {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            <br/>{error}
          </span>))}
    </div>
  </div>

// Body
const renderText = ({ input, label, type, meta: { touched, error, warning }}) =>
<div>
  <div>
    <textarea id="post-body" className="textarea" {...input} placeholder={label} type={type} > </textarea>
    {touched &&
      ((error &&
        <span>
          <br/>{error}
        </span>))}
  </div>
</div>

const PostForm = props => {
  const { handleSubmit, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="title" type="text" component={renderField} label="Title" />
      <Field name="body" type="text" component={renderText} label="Body" />
      <div>
        <button id="post-submit" className="button is-primary" type="submit" disabled={submitting}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'PostForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(PostForm)
