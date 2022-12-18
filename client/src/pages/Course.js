import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NewReview from '../components/NewReview.js';
import { format } from 'date-fns';
import Moment from 'react-moment';



function Course(props) {
    let { universityTag, facultyName, courseID } = useParams();
    
//    const [listOfFaculties, setListOfFaculties] = useState([]);
//    const [listOfCourses, setListOfCourses] = useState([]);

    const [course, setCourse] = useState([]);
    const [listOfReviews, setListOfReviews] = useState([]);
    const [show, setShow] = useState(false);
    const [listOfProfessors, setListOfProfessors] = useState([]);
    

    useEffect(() => {
        axios.get(`http://localhost:3001/course/${universityTag}/${facultyName}/${courseID}`).then((response) => {
          setCourse(response.data[0]);
          console.log(course);
    });
        axios.get(`http://localhost:3001/review/${universityTag}/${facultyName}/${courseID}`).then((response) => {
          setListOfReviews(response.data);
          console.log(response.data);
    });
        axios.get(`http://localhost:3001/course/${universityTag}/${facultyName}/${courseID}/professors`).then((response) => {
          setListOfProfessors(response.data);
          console.log("hello")
          console.log(response.data);
    });
    }, [universityTag, facultyName, courseID]);

    
    const formatDate = (date) => {
      const newDate1 = Moment(date).format('YYYY-MM-DD');
      return newDate1;
    };
    
  return (
    
    <div className="outer">
        
        <div className='search_div'>
          <div className='search'>
            {course.courseID}
            <br></br>
            {course.courseName}
            <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        >
          <br></br>
          <Button 
          variant="outlined"
          onClick={() => setShow(prev => !prev)}
          >Leave a Review</Button>
            
        </Box>
        </div>
        </div>

        {show && <NewReview listOfProfessors={listOfProfessors} username={props.username} />}

        
        {listOfReviews.map((rows) => (
            
        
            <div className="review">  
    <Box sx={{ flexGrow: 1, flexWrap: 'wrap' }} className="grid">
      <Grid container spacing={2} columns={{ xs: 8, md: 8, lg: 16 }}  >
        <Grid item xs={8} md={8} lg={2}>
          <Card>
            <CardContent  sx={{ flexGrow: 1, flexWrap: 'wrap' }}>
              <Grid container spacing={3} columns={{ xs: 8, md: 1}}>
                <Grid item xs={2} md={1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">Overall</Typography>
                <Typography variant="h5" component="div">{rows.overallScore}</Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">Easy</Typography>
                <Typography variant="h5" component="div" className="boxed">{rows.easyScore}</Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">Useful</Typography>
              <Typography variant="h5" component="div">{rows.UseScore}</Typography>
                </Grid>
                <Grid item xs={2} md={1}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">Interest</Typography>
              <Typography variant="h5" component="div">{rows.interestScore}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs md={14} className="inner">
          <Card>
            <CardContent className="inner">
              <div className="reviewTopL"><Typography variant="h7">Professor: {rows.professorName} / {rows.termTaken} {rows.yearTaken}</Typography></div>
              <div className="reviewTopR"><Typography variant="h7">{(rows.dateUploaded).slice(0, 10)}</Typography></div>
              <br></br>
              <hr className="line"></hr>
              <Typography variant="h7" className="reviewTopL">Commends on the course:</Typography>
              <br></br>
              <br></br>
              <Typography variant="body2" className="reviewTopL">{rows.body}</Typography>
              <br></br>
              <br></br>
              <div className="bottom"><Typography variant="body2" className="reviewTopL">Grade: {rows.grade}</Typography></div>
            </CardContent>
          </Card>
        </Grid> 
      </Grid>
    </Box>
    </div>
))}


    </div>
  )
}

export default Course