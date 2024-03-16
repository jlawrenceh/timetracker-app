import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users/register", data).then(() => {
          console.log(data);
        });
      };

    return (
    <div>
        <h3>Registration</h3>
        

    </div>
    )
}

export default Registration