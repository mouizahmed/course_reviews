import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import {Link} from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import UniversitySearch from '../components/UniversitySearch';

//import bufferImage from 'buffer-image';

function Home() {
  
    const [listOfUniversities, setListOfUniversities] = useState([]);

   // const [universityName, setUniversityName] = useState([]);
    //const [universityTag, setUniversityTag] = useState();
    useEffect(() => {
        axios.get("http://localhost:3001/university").then((response) => {
        setListOfUniversities(response.data); 
        console.log(response.data);
    })
    }, []);

    const test = (blob) => {
      var urlCreator = window.URL || window.webkitURL;
      var img = urlCreator.createObjectURL(blob);
      console.log(img);
      return img;
    }
/*
    const submitReview = () => {
      axios.post('http://localhost:3001/api/insert', {
        universityName: universityName,
        universityTag: universityTag
      }).then(() => {
        alert("successful insert");
      });
    };
*/
  return (
    <div className='home'>
    {/*    {listOfUniversities.map((value, key) => { // value = element, key = index
        return ( 
        <div className="university"> 
          <div className="name">{value.universityName}</div>
          <div className="tag">{value.universityTag}</div>
          </div>
          );
      })}
      <div className="form">
      <label>University Name:</label>
      <input type="text" name="universityName" onChange={(e)=> {
        setUniversityName(e.target.value)
      }}/>
    {/*}
     <label>Review:</label>
      <input type="text" name="review" />
    
      <button onClick={submitReview}>Submit</button>

    */}
      
      <UniversitySearch listOfUniversities={listOfUniversities} />
      <div className="review"> 
      <Box sx={{ flexGrow: 1, flexWrap: 'wrap' }} className="grid">
      <Grid container spacing={2} columns={{ xs: 2, sm: 2, md: 6, lg: 21 }}  >
        {listOfUniversities.sort((a, b) => a.review_num < b.review_num ? 1 : -1).slice(0, 6).map((rows) => (
        
       <Grid item xs={2} sm={2} md={2} lg={7}>
          <Link to={`/${rows.universityTag}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          <Card className="card">
          <CardActionArea>
          <CardContent  sx={{ flexGrow: 1, flexWrap: 'wrap' }}>
          <img src={rows.logo} alt="logo" />

          </CardContent>
          <CardContent  sx={{ flexGrow: 1, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            {rows.universityName}
          </Typography>
          </CardContent>
          <CardContent  sx={{ flexGrow: 1, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            <div className="borderexample">
            {rows.review_num} Reviews
            </div>
          </Typography>
          </CardContent>
          </CardActionArea>
          </Card>
          </Link>
        </Grid>
        
      ))}
      </Grid>
      </Box>
      </div>
     </div>
  );
}
  
export default Home