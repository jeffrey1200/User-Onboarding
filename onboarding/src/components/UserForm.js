import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({ touched, errors, values, status }) {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    console.log("status has changed", status);
    status && setInfo(info => [...info, status]);
  }, [status]);

  return (
    <div>
      <h1>Hello, I need your info RIGHT NOW!</h1>
      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" type="text" name="name" />
        {touched.name && errors.name && <p className="errors">{errors.name}</p>}

        <label htmlFor="email">Email</label>
        <Field id="email" type="text" name="email" />
        {touched.email && errors.email && (
          <p className="errors">{errors.email}</p>
        )}

        <label htmlFor="password">Password</label>
        <Field id="password" type="text" name="password" />
        {touched.password && errors.password && (
          <p className="errors">{errors.password}</p>
        )}

        <label htmlFor="tos">Terms of Service</label>
        <Field id="tos" type="checkbox" name="tos" checked={values.tos} />
        {touched.tos && errors.tos && <p className="errors">{errors.tos}</p>}

        <button type="submit">Submit!</button>
      </Form>

      {info.map(data => (
        <ul key={data.id}>
          <li>Name: {data.name}</li>
          <li>Email: {data.email}</li>
          <li>Password: {data.password}</li>
        </ul>
      ))}
    </div>
  );
}

const UserWithFormik = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("A name is required"),
    email: Yup.string().required("A email is required"),
    password: Yup.string().required("A password is required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default UserWithFormik;
