import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function NewCourse({page, setPage, formData, setFormData}) {


// const handleClick = event => {
//     console.log(event);
//     if (event.target === event.currentTarget) {
//         props.setShow(prev => !prev)
// }


// document.body.addEventListener('onClick', handleClick);
// }

  return (
    
    
        <div className="">
            <h1>Add a course to {formData.universityName}</h1>
            <Box sx={{ width: '100%' }}>
            <Stack 
                component="form"
                spacing={5}>
            <TextField
                      className="bar"
                      id="outlined-basic"
                      label="Course Name"
                      variant="outlined"
                      margin="normal"
                      value={formData.courseName}
                      onSubmit={e => {e.preventDefault();}}
                      onInput={(e) => setFormData({ ...formData, courseName: e.target.value })}
                      sx={{ minWidth: 100 }}
                      fullWidth
                      required
                    />
            <TextField
                      className="bar"
                      id="outlined-basic"
                      label="Faculty Name"
                      variant="outlined"
                      margin="normal"
                      value={formData.faculty}
            
                      onSubmit={e => {e.preventDefault();}}
                      onInput={(e) => setFormData({ ...formData, faculty: e.target.value })}

                      sx={{ minWidth: 100 }}
                      fullWidth
                      required
                    />
            <TextField
                      className="bar"
                      id="outlined-basic"
                      label="Professor Name"
                      variant="outlined"
                      margin="normal"
                      value={formData.professor}
               
                      onSubmit={e => {e.preventDefault();}}
                      onInput={(e) => setFormData({ ...formData, professor: e.target.value })}

                      sx={{ minWidth: 100 }}
                      fullWidth
                      required
                    />
          <Button variant="contained" 
                            margin="normal"
                            type="submit" 
                            sx={{m: 1}} 
                            onClick={() => {setPage(page + 1)}}
                        
                            >Next</Button>
                        {console.log()}
             </Stack>
             </Box>
        </div>
  
  )
}

export default NewCourse;