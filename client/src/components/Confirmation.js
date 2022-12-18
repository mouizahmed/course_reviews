import React from 'react'

function Confirmation({formData}) {

    console.log(formData.overall)

  return (
    <div>Confirmation
        Professor: {formData.professor}
        <br></br>
        School: {formData.universityName}
        <br></br>
        Overall: {formData.overall}

    </div>
  )
}

export default Confirmation