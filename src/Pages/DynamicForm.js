import React from "react";
import { email, required } from "redux-form-validators";
import { Field, Form, reduxForm, FieldArray } from "redux-form";
import "./DynamicForm.css";

const TextField = (props) => {
  const { meta = {} } = props;
  const inputProps = {
    type: props.type || "text",
    className: props.className,
    name: props.input.name,
    id: props.input.name,
    readOnly: props.readOnly,
    autoFocus: props.autoFocus,
    autoComplete: props.autoComplete,
    placeholder: props.placeholder,
    maxLength: props.maxLength,
    value: meta.uncontrolled ? undefined : props.input.value,
    defaultValue: meta.uncontrolled ? props.defaultValue : undefined,
    onChange: props.input.onChange,
    onKeyUp: props.onKeyUp,
    onBlur: props.onBlur,
    step: props.step || "",
    min: props.min || "",
  };

  return (
    <React.Fragment>
      <div
        name={`position-${props.input.name}`}
        className={`position-${props.input.name}`}
      >
        <input {...inputProps} {...props} onBlur={props.onBlurHandler} />
        {meta.touched && meta.error ? (
          <div style={{ color: "red" }}>{`This field  ${meta.error}`}</div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

const renderUsers = ({ fields }) => {
  return (
    <>
      <button
        className="btn btn-primary btn-sm float-end mt-2"
        type="button"
        onClick={() => fields.push({})}
      >
        + Add
      </button>
      {fields.map((user, index) => {
        return (
          <>
            {index > 0 && (
              <button
                type="button"
                className="btn btn-danger btn-sm float-end mt-2"
                onClick={() => fields.remove(index)}
              >
                Remove
              </button>
            )}
            <div className="form_field">
              <label class="form-label"> First Name</label>
              <Field
                className="form-control"
                name={`${user}.firstName`}
                component={TextField}
                type="text"
                validate={[required()]}
              />
            </div>
            <div className="form_field">
              <label class="form-label"> Last Name</label>
              <Field
                className="form-control"
                name={`${user}.lastName`}
                component={TextField}
                type="text"
                validate={[required()]}
              />
            </div>

            <div className="form_field">
              <label class="form-label"> Email</label>
              <Field
                className="form-control"
                name={`${user}.email`}
                component={TextField}
                type="email"
                validate={[required(), email()]}
              />
            </div>
          </>
        );
      })}
    </>
  );
};

const ScrollForm = ({ handleSubmit, form }) => {
  return (
    <div class="card" style={{ width: "1100px", margin: "40px auto" }}>
      <div class="card-body">
        <Form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "center" }}>Dynamic Form</h3>
          <br />
          <FieldArray name="users" component={renderUsers} />

          <div>
            <button className="btn btn-primary mt-2">Submit</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "ScrollForm",
  enableReinitialize: true,
})(ScrollForm);
