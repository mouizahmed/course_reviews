import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import NewCourse from '../components/NewCourse';

function University() {
    let { universityTag } = useParams();
  
    const [listOfFaculties, setListOfFaculties] = useState([]);
    const [listOfCourses, setListOfCourses] = useState([]);
    const [filtered, setFiltered] = useState(listOfCourses);
    const [searched, setSearched] = useState("");
    const [universityName, setUniversityName] = useState("");
    const [overallScore, setOverallScore] = useState(0.0);
    const [facultyNames, setFacultyNames] = useState("");
    const [courseIDs, setCourseIDs] = useState("");
    const [easyColor, setEasyColor] = useState("");
    const [show, setShow] = useState(false);
    

    useEffect(() => {
        axios.get(`http://localhost:3001/university/byUniTag/${universityTag}`).then((response) => {
          console.log(response.data[0].universityName);
          setUniversityName(response.data[0].universityName);
    });
        axios.get(`http://localhost:3001/faculty/${universityTag}`).then((response) => {
          setListOfFaculties(response.data); 
          //console.log(response);
    });
      axios.get(`http://localhost:3001/course/${universityTag}`).then((response) => {
          setListOfCourses(response.data); 
          setFiltered(response.data);
          console.log(response.data);
    });


    }, []);

    const handleChange = (e) => {
      e.preventDefault();
      //console.log(e.target.value);
      setSearched(e.target.value);
      requestSearch(e.target.value);
      
    
    };
    
  const requestSearch = (searched) => {
     /* const filteredRows = listOfCourses.filter((row) => {
        return row.courseID.toLowerCase().includes(searched.toLowerCase());
      });
      
      setListOfCourses(filteredRows); */
      const filteredRows = listOfCourses.filter((row) => {
        return row.courseID.toLowerCase().includes(searched.toLowerCase());
      });
      setFiltered(filteredRows);      
  }

  const checkColor = (color, count) => {
   // console.log(count);
    if (count < 1) {
      return "grey"
    } else { 
        if (color <= 2) {
          return "red"
      } else if (color > 2 && color < 4) {
        return "yellow"
      } else {
        return "green"
      }
    }
}

  
  //console.log(filteredData);

  return (
    <div>
        
       {/*
        {listOfFaculties.map((value, key) => { // value = element, key = index
        return ( 
        <div className="university"> 
          <div className="name">{value.facultyName}</div>
          </div>
          );
      })}
      {listOfCourses.map((value, key) => { // value = element, key = index
        return ( 
        <div className="university"> 
          <div className="name">{value.courseID}</div>
          </div>
          );
      })} */}
        {/*<Autocomplete
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(listOfCourses) => `${listOfCourses.courseID}`}
        options={listOfCourses}
        sx={{ width: 300 }}
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        renderInput={(params) => <TextField {...params} label="Course" />}
      /> */}
      <div className="search_div">
      <div className="search">
      <p>{universityName} Reviews</p>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        >
          <TextField
            className="bar" 
            id="outlined-basic"
            label="Course" 
            variant="outlined"
            
            
            value={searched}

            onSubmit={e => {e.preventDefault();}}
            onInput={e => handleChange(e)}
            />
            
        </Box>
        </div>
        </div>


        <div className="review">
        <Stack spacing ={2} direction="column">
        <Button variant="contained" className="button_add" onClick={() => setShow(prev => !prev)}>Add Course</Button>
        {show && <NewCourse uniTag={universityTag} show={show} setShow={setShow}/>}
        <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{minWidth:650}} aria-label="courses">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Faculty Name</TableCell>
              <TableCell align="center">Overall</TableCell>
              <TableCell align="center">Easiness</TableCell>
              <TableCell align="center">Interest</TableCell>
              <TableCell align="center">Usefulness</TableCell>
              <TableCell align="center">Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {filtered.map((rows) => (
            
              <TableRow
                className="uni_table_row"
                key={rows.courseID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
                onClick={() => window.location.href = `/${rows.universityTag}/${rows.facultyName}/${rows.courseID}`}
                pointer
              >
              <TableCell component="th" scope="row" align="center">
                {rows.courseID}
              </TableCell>
              <TableCell align="center">{rows.courseName}</TableCell>
              <TableCell align="center">{rows.facultyName}</TableCell>
              <TableCell align="center"><div className={checkColor(rows.overall, rows.count)}>{rows.overall}</div></TableCell>
              <TableCell align="center"><div className={checkColor(rows.easy, rows.count)}>{rows.easy}</div></TableCell>
              <TableCell align="center"><div className={checkColor(rows.interest, rows.count)}>{rows.interest}</div></TableCell>
              <TableCell align="center"><div className={checkColor(rows.use, rows.count)}>{rows.use}</div></TableCell>
              <TableCell align="center">{rows.count}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      </Stack>
      </div>
    
    </div>
  )
}

export default University