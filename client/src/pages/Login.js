import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function Login() {
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("https://course-reviews.onrender.com/user/login", values)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            sessionStorage.setItem("accessToken", response.data);
            setAuthState(true);
            navigate(-1);
          }
        });
    },
  });

  return (
    <div className="login-outer">
      <Paper className="login" elevation={3}>
        <Grid container spacing={2} columns={{ xs: 1, md: 1, lg: 1 }}>
          <Grid item xs={1} md={1} lg={1}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                mt: 1.5,
                textAlign: "center",
              }}
              color="text.secondary"
            >
              Login
            </Typography>
          </Grid>

          <Grid item xs={1} md={1} lg={1}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} columns={{ xs: 1, md: 1, lg: 1 }}>
                <Grid item xs={1} md={1} lg={1}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>

                <Grid item xs={1} md={1} lg={1}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Login;
