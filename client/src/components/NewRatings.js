import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";

function NewRatings({page, setPage, formData, setFormData}) {

  const labels = {
    1: 'Extremely Bad Class',
    2: 'Bad Class',
    3: 'Okay Class',
    4: 'Good Class',
    5: 'Amazing Class',
  };

  function getLabelText(value) {
    return `${formData.overall} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }


  const [hoverOverall, setHoverOverall] = React.useState();
  const [hoverEasy, setHoverEasy] = React.useState();
  const [hoverInterest, setHoverInterest] = React.useState();
  const [hoverUseful, setHoverUseful] = React.useState();

  return (
    <div>

      

    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
      <Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Overall Rating
      </Box>
      </Grid>
      <Grid item xs={6}>
      <Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
      }}
      >
      <Rating
        name="hover-feedback"
        value={formData.overall}

        
        getLabelText={getLabelText}
        onChange={(event, newOverall) => {
          setFormData({ ...formData, overall: newOverall })
        }}
        onChangeActive={(event, newHoverOverall) => {
          setHoverOverall(newHoverOverall);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />{formData.overall !== null && (
        <Box sx={{ ml: 2 }}>{labels[hoverOverall !== -1 ? hoverOverall : formData.overall]}</Box>
      )}
      </Box>
      </Grid>
      <Grid item xs={6}>
      <Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      How easy was/is the course?
      </Box>
      </Grid>
      <Grid item xs={6}>
      <Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={formData.easy}

    

        getLabelText={getLabelText}
        onChange={(event, newEasy) => {
          setFormData({ ...formData, easy: newEasy })
        }}
        onChangeActive={(event, newHover) => {
          setHoverEasy(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />{formData.easy !== null && (
        <Box sx={{ ml: 2 }}>{labels[hoverEasy !== -1 ? hoverEasy : formData.easy]}</Box>
      )}
      </Box>
      </Grid>
      <Grid item xs={6}>
        How interesting did you find the course?
      </Grid>
      <Grid item xs={6}>
      <Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
      }}
      >
      <Rating
        name="hover-feedback"
        value={formData.interest}

      
        getLabelText={getLabelText}
        onChange={(event, newInterest) => {
          setFormData({ ...formData, easy: newInterest })
        }}
        onChangeActive={(event, newHoverInterest) => {
          setHoverInterest(newHoverInterest);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />{formData.interest !== null && (
        <Box sx={{ ml: 2 }}>{labels[hoverInterest !== -1 ? hoverInterest : formData.interest]}</Box>
      )}</Box>
      </Grid>
      <Grid item xs={6}>
        How useful did you find the course?
      </Grid>
      <Grid item xs={6}>
      <Box
      sx={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
      }}
      >
      <Rating
        name="hover-feedback"
        value={formData.useful}

     
        getLabelText={getLabelText}
        onChange={(event, newUseful) => {
          setFormData({ ...formData, easy: newUseful })
        }}
        onChangeActive={(event, newHoverUseful) => {
          setHoverUseful(newHoverUseful);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />{formData.useful !== null && (
        <Box sx={{ ml: 2 }}>{labels[hoverUseful !== -1 ? hoverUseful : formData.useful]}</Box>
      )} </Box>
      </Grid>
    </Grid>

    <Button variant="contained" 
                         
                         sx={{m: 1}} 
                         onClick={() => {setPage(page + 1)}}
                     
                         >Next</Button>


      
    </div>
  )
}

export default NewRatings