import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function Registration() {

    let navigate = useNavigate();
    
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    });

  
    const onSubmit = (data) => {
        axios.post("http://localhost:3005/users/register", data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            alert(response.data);
            navigate("/login");
          }
        });
      };

    return (
    <div>
        <h3>Registration</h3>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <Field type="text" name="username" placeholder="username" autoComplete="off"/>
            <ErrorMessage name="username" component="span" className="error" />

            <Field type="password" name="password" placeholder="password" />
            <ErrorMessage name="password" component="span" className="error" />

            <button type="submit">Register</button>

          </Form>
        </Formik>

    </div>
    )
}

export default Registration