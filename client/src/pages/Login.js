import React, {useState, useContext} from 'react'
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import {useNavigate} from 'react-router-dom';





function Login() {

   const {setAuthState} = useContext(AuthContext);
   const navigate = useNavigate();

    const validationSchema = yup.object({
        username: yup
          .string('Enter your username')
          .min(4, 'Username must be at least 4 characters')
          .required('Username is required'),
        password: yup
          .string('Enter your password')
          .min(8, 'Password should be of minimum 8 characters length')
          .required('Password is required'),
      });
    
    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
                axios.post("http://localhost:3001/user/login", values).then((response) => {
                    if (response.data.error) {
                        alert(response.data.error);
                    } else {
                        sessionStorage.setItem("accessToken", response.data);
                        setAuthState(true);
                        navigate(-1);
                       
                    }
            })

            
            
        },
      });
    
      return (
        <div>
            Login

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
  )
}

export default Login;