import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NewCourse from "./NewCourse";
import { useFormik } from 'formik';
import * as yup from 'yup';

function NewUniversity({page, setPage, formData, setFormData, listOfUniversities}) {

//const [showCourse, setShowCourse] = useState(false);

// const handleClick = event => {
//     console.log(event);
//     if (event.target === event.currentTarget) {
//         props.setShow(prev => !prev)
// }


// document.body.addEventListener('onClick', handleClick);
// }

const validationSchema = yup.object({
  universityName: yup
    .string('Enter your username')
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
});

const formik = useFormik({
  initialValues: {
    universityName: '',
  },
  validationSchema: validationSchema,
  onSubmit: (values) => {

          console.log("HI");

          const check = listOfUniversities.some(i => {
            if (i.universityName === values.universityName) {
              
              return true;
            } else {
              
              return false;
            }
          })
          console.log(check);
          if (check === true) {
            alert("EXISTS");
          } else {
            setFormData({ ...formData, universityName: values.universityName })
            setPage(page + 1);
          }
          
      
      
  },
});


  return (
    
    
        <div className="">
            <h1>Add a school</h1>
            <p>Enter the name of your school you like to write a review for.</p>
            <form onSubmit={formik.handleSubmit}>
            <TextField
                      className="bar"
                      id="universityName"
                      name="universityName"
                      label="universityName"
                      variant="outlined"


                      value={formik.values.universityName}
                      onChange={formik.handleChange}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                      onSubmit={e => {e.preventDefault();}}
                  
                   //   onInput={e => setBody(e.target.value)}
                      sx={{ minWidth: 100 }}
                      fullWidth
                      required
                    />
                 
                    <Button variant="contained" 
                            type="submit"
                            sx={{m: 1}} 


                            
                            >Next</Button>
                            </form>
                    
        </div>
 
  );
}

export default NewUniversity;