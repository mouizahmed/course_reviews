import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "../App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NewCourse from "./NewCourse";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "../App.css";
import Grid from "@mui/material/Grid";

function NewUniversity({
  page,
  setPage,
  formData,
  setFormData,
  listOfUniversities,
  selectedFile,
  setSelectedFile,
}) {
  const [img, setImg] = useState(undefined);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles);
    setImg(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
  });

  const enabled = formData.universityName.length > 0 && img !== undefined;

  return (
    <div className="">
      <h1>Add a school</h1>
      <p>Enter the name of your school you like to write a review for.</p>

      <Grid container spacing={2} columns={1}>
        <Grid item xs={1} md={1} lg={1}>
          <TextField
            className="bar"
            id="universityName"
            name="universityName"
            label="University Name"
            variant="outlined"
            value={formData.universityName}
            onChange={(e) =>
              setFormData({ ...formData, universityName: e.target.value })
            }
            // error={formik.touched.username && Boolean(formik.errors.username)}
            //helperText={formik.touched.username && formik.errors.username}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            //   onInput={e => setBody(e.target.value)}
            sx={{ minWidth: 100 }}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
          <TextField
            className="bar"
            id="universityTag"
            name="universityTag"
            label="University Tag (acronym)"
            variant="outlined"
            value={formData.universityTag}
            onChange={(e) =>
              setFormData({
                ...formData,
                universityTag: e.target.value.split(" ").join(""),
              })
            }
            // error={formik.touched.username && Boolean(formik.errors.username)}
            //helperText={formik.touched.username && formik.errors.username}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            //   onInput={e => setBody(e.target.value)}
            sx={{ minWidth: 100 }}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
          <div
            {...getRootProps()}
            className={`drop ${isDragActive ? "active" : "drop"}`}
          >
            <input {...getInputProps()} />
            {selectedFile && selectedFile[0].name ? (
              <div className="selected-file">
                <img
                  src={img}
                  onLoad={() => {
                    URL.revokeObjectURL(img);
                  }}
                  className="uploaded-image"
                  alt="uploaded-img"
                />
              </div>
            ) : (
              "Drag and drop file here, or click to select file"
            )}
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={1} columns={{ xs: 10, lg: 10 }}>
        <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}></Grid>
        <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            margin="normal"
            type="submit"
            sx={{ width: 100 }}
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={!enabled}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default NewUniversity;
