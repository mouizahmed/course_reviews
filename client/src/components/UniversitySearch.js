import React, {useEffect, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import NewUniversity from './NewUniversity';
import NewCourse from './NewCourse';
import NewRatings from './NewRatings';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import NewComments from './NewComments';
import UserForm from './UserForm';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UniversitySearch(listOfUniversities) {
    const list = listOfUniversities.listOfUniversities;
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
  const handleClose = () => {setShow(false)
        setPage(0);
        setNewUniversity("");
  };
    const [page, setPage] = useState(0);
    const [newUniversity, setNewUniversity] = useState("");
    const [professor, setProfessor] = useState("");
    const [faculty, setFaculty] = useState("");



  const componentList = [

    <NewUniversity 
      page={page}
      setPage={setPage}
      newUniversity={newUniversity}
      setNewUniversity={setNewUniversity}
     
    />,
    <NewCourse
      page={page}
      setPage={setPage}
      newUniversity={newUniversity}
   
    />,
    <NewRatings
      page={page}
      setPage={setPage}
      newUniversity={newUniversity}
    />,
    <NewComments
      page={page}
      setPage={setPage}
    />

  ]



  return (
    <div className="search_div">
        
        <div className="search">
        <p>Get meaningful reviews for all the university courses you need.</p>    
            <Autocomplete
                disablePortal
                className="bar"
                id="combo-box-demo"
                noOptionsText={
                  <>
                  <div>
                  0 Results. <a className="link" onClick={() => setShow(prev => !prev)}>Add a school</a> if it's not here.
                  </div>
                  </>}
                getOptionLabel={(list) => `${list.universityName}`}
                options={list}
                onChange={(event: AnalyserNode, option: any) => {
                window.location.href = `/${option.universityTag}`
                }}
                sx={{ width: 350 }}
                renderInput={(params) => <TextField {...params} label="University" />}
        />
        {console.log(page + "before")}
        

        <Modal 
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <UserForm listOfUniversities={listOfUniversities} />
        </Box>

      </Modal>

        {console.log(page + " after")}
      </div>
    </div>
  )
}

export default UniversitySearch