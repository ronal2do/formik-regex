import React from "react";
import { Formik } from "formik";
import Yup from "yup";
import VirtualizedSelect from "react-virtualized-select";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

const imaginaryThings = [
  { label: "Thing 1", value: 1 },
  { label: "Thing 2", value: 2 },
  { label: "Thing 3", value: 3 },
  { label: "Thing 4", value: 4 },
  { label: "Thing 5", value: 5 }
];

const UserForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  const _handleSelect = selectChoice => {
    setFieldValue("imaginaryThingId", selectChoice.value);
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <h1>Hello this is form!</h1>
      <div className="form-group">
        <label>Imaginary Email</label>
        <input
          name="email"
          type="text"
          className={`form-control ${errors.email &&
            touched.email &&
            "is-invalid"}`}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>
      <div className="form-group">
        <label>Imaginary Username</label>
        <input
          name="name"
          type="text"
          className={`form-control ${errors.name &&
            touched.name &&
            "is-invalid"}`}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && (
          <div className="invalid-feedback">{errors.name}</div>
        )}
      </div>
      <div className="form-group">
        <label>Imaginary Thing</label>
        <VirtualizedSelect
          name="imaginaryThingId"
          value={values.imaginaryThingId}
          options={imaginaryThings}
          onChange={_handleSelect}
        />
        <small className="form-text text-muted">This is optional</small>
      </div>

      <button
        type="submit"
        className="btn btn-outline-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "WAIT PLIZ" : "CLICK ME"}
      </button>
    </form>
  );
};

const nameRegex = new RegExp(/[^!@#$%^&*()_+=\-\\/\\{\}0-9]+/g);

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("please! email?")
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, "pretty sure this will be hacked"),
  name: Yup.string()
    .min(2, "too small")
    .max(50, "pretty sure you have a big name?")
    .required("please! name?")
    .matches(nameRegex),
  title: Yup.string()
    .min(1, "too small")
    .max(300, "pretty sure you have a big name?"),
  body: Yup.string()
    .min(1, "too small")
    .max(63206, "pretty sure you have a big name?")
});

export default Formik({
  mapPropsToValues: props => ({
    email: props.user.email,
    name: props.user.name,
    imaginaryThingId: props.user.imaginaryThingId
  }),

  validationSchema,

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit them do the server. do whatever you like!
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(UserForm);
