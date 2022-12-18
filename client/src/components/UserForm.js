import React, {useEffect, useState} from 'react';
import NewUniversity from './NewUniversity';
import NewCourse from './NewCourse';
import NewRatings from './NewRatings';
import NewComments from './NewComments';
import NewTags from './NewTags';
import Confirmation from './Confirmation';

function UserForm(props) {




    const [page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        professor: "",
        faculty: "",
        universityName: "",
        universityTag: "",
        courseName: "",
        overall: 0,
        easy: 0,
        interest: 0,
        useful: 0,
        term: "",
        year: "",
        delivery: "",
        grade: "",
        textbook: "",
        workload: "",
        evaluation: "",
        body: "",
    })


    const componentList = [

        <NewUniversity 
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
          listOfUniversities={props.listOfUniversities.listOfUniversities}
         
        />,
        <NewCourse
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
       
        />,
        <NewRatings
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
        />,
        <NewComments
          page={page}
          setPage={setPage}
        />,
        <NewTags
          formData={formData}
          setFormData={setFormData}
          page={page}
          setPage={setPage}
        />,
        <Confirmation 
          formData={formData}
        />
    
      ]


  return (
    
    <div>
      {componentList[page]}
    </div>
  )
}

export default UserForm