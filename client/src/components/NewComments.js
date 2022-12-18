import React, { useState } from 'react'
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";

function NewComments({page, setPage}) {

    const [body, setBody] = useState("");



    
  return (
    <div>
        <Stack 
                component="form"
                spacing={10}>
        Comments on the course*
        <TextField
                      className="bar"
                      id="outlined-basic"
                      label="Professor"
                      variant="outlined"
                      value={body}
                      multiline
                      rows={4}
                      onSubmit={e => {e.preventDefault();}}
                      onInput={e => setBody(e.target.value)}
                      sx={{ minWidth: 100 }}
                      fullWidth
                      required
                    />
                    <Button variant="contained" type="button"  sx={{m: 1}} onClick={() => {setPage(page + 1)}}>Next</Button>
                    </Stack>
                    

    </div>
  )
}

export default NewComments