import React, { useEffect, useState } from "react";
import NewUniversity from "./NewUniversity";
import NewCourse from "./NewCourse";
import NewRatings from "./NewRatings";
import NewComments from "./NewComments";
import NewTags from "./NewTags";
import Confirmation from "./Confirmation";

function UserForm(props) {
  const [page, setPage] = useState(props.page);
  const [selectedFile, setSelectedFile] = useState(undefined);

  const [formData, setFormData] = useState({
    professor: "",
    faculty: "",
    universityName: "",
    universityTag: "",
    courseName: "",
    courseID: "",
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
    logo: "",
  });

  const componentList = [
    <NewUniversity
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      listOfUniversities={props.listOfUniversities.listOfUniversities}
      selectedFile={selectedFile}
      setSelectedFile={setSelectedFile}
    />,
    <NewCourse
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      type={props.type}
      listOfFaculties={props.listOfFaculties}
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
      formData={formData}
      setFormData={setFormData}
    />,
    <NewTags
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
      professors={props.professors}
    />,
    <Confirmation
      formData={formData}
      setFormData={setFormData}
      type={props.type}
      selectedFile={selectedFile}
      page={page}
      setPage={setPage}
    />,
  ];

  useEffect(() => {
    if (props.type === "add-course") {
      setFormData({
        ...formData,
        universityName: props.listOfUniversities[0].universityName,
        universityTag: props.uniTag,
      });
    } else if (props.type === "add-review") {
      setFormData({
        ...formData,
        universityName: props.listOfUniversities[0].universityName,
        universityTag: props.uniTag,
        faculty: props.faculty,
        courseID: props.courseID,
        courseName: props.courseName,
      });
    }
  }, []);

  return <div>{componentList[page]}</div>;
}

export default UserForm;
