import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from "@mui/material/FormControl";

function NewTags({newProfessor, formData, setFormData, page, setPage}) {


const list = [{newProfessor}];

console.log(newProfessor);

  return (
    <div className="">
      <Grid container spacing={2} columns={{xs: 8, md: 8, lg: 15}}>
                  <Grid item xs={8} md={8} lg={7}>
                  <Autocomplete
                disablePortal
                className="bar"
                id="combo-box-demo"
                getOptionLabel={(list) => `${list.newProfessor}`}
                options={list}
                
                renderInput={(params) => <TextField {...params} label="Professor" />}
        />
        <p className="caption"><small>Can't find your professor? Add it</small></p>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Term
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.term}
                        label="Term"
                        onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                        
                      >
                        <MenuItem value="Fall">Fall</MenuItem>
                        <MenuItem value="Winter">Winter</MenuItem>
                        <MenuItem value="Spring">Spring</MenuItem>
                        <MenuItem value="Summer">Summer</MenuItem>
                        <MenuItem value="Year">Year</MenuItem>
                      </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={4} md={4} lg={4}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Year
                      </InputLabel>
                      
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.year}
                        label="Age"
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        defaultValue = ""
              
                      >
                        
                        
                        {(() => {
                          const list = [];
                          const post = [];
                          for (let i = 0; i < 13; i++) {
                            list[i] = new Date().getFullYear() - i;
                            post.push(<MenuItem value={list[i]}>{list[i]}</MenuItem>);
                          }
                    
                          return post;
                        })()}


                      </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={8} md={8} lg={5}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Delivery Method
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.delivery}
                          label="Age"
                          onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                          defaultValue=""
                        >
                          <MenuItem value="In-Person">In-Person</MenuItem>
                          <MenuItem value="Online">Online</MenuItem>
                          <MenuItem value="Hybrid">Hybrid</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4} lg={5}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Grade
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.grade}
                          label="Age"
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          defaultValue=""
                        >
                          <MenuItem value="A+">A+</MenuItem>
                          <MenuItem value="A">A</MenuItem>
                          <MenuItem value="A">A-</MenuItem>
                          <MenuItem value="B+">B+</MenuItem>
                          <MenuItem value="B">B</MenuItem>
                          <MenuItem value="B-">B-</MenuItem>
                          <MenuItem value="C+">C+</MenuItem>
                          <MenuItem value="C">C</MenuItem>
                          <MenuItem value="C-">C-</MenuItem>
                          <MenuItem value="D+">D+</MenuItem>
                          <MenuItem value="D">D</MenuItem>
                          <MenuItem value="D-">D-</MenuItem>
                          <MenuItem value="F">F</MenuItem>
                          <MenuItem value="Dropped/Withrawal">
                            Dropped/Withdrawal
                          </MenuItem>
                          <MenuItem value="Incomplete">Incomplete</MenuItem>
                          <MenuItem value="Not sure yet">Not sure yet</MenuItem>
                          <MenuItem value="Rather not say">
                            Rather not say
                          </MenuItem>
                          <MenuItem value="Audit/No grade">
                            Audit/No grade
                          </MenuItem>
                          <MenuItem value="Pass">Pass</MenuItem>
                          <MenuItem value="Fail">Fail</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4} lg={5}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Textbook Use
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.textbook}
                          label="Age"
                          onChange={(e) => setFormData({ ...formData, textbook: e.target.value })}
                          defaultValue=""
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                          <MenuItem value="Optional">Optional</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8} md={8} lg={10}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Evaluation Methods
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.evaluation}
                          label="Age"
                          onChange={(e) => setFormData({ ...formData, evaluation: e.target.value })}
                          defaultValue=""
                        >
                          <MenuItem value={"1"}>1</MenuItem>
                          <MenuItem value={"2"}>2</MenuItem>
                          <MenuItem value={"3"}>3</MenuItem>
                          <MenuItem value={"4"}>4</MenuItem>
                          <MenuItem value={"5"}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8} md={8} lg={5}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Workload
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.workload}
                          label="Workload"
                          onChange={(e) => setFormData({ ...formData, workload: e.target.value })}

                          defaultValue=""
                        >
                          <MenuItem value="Very Light">Very Light</MenuItem>
                          <MenuItem value="Light">Light</MenuItem>
                          <MenuItem value="Moderate">Moderate</MenuItem>
                          <MenuItem value="Heavy">Heavy</MenuItem>
                          <MenuItem value="Very Heavy">Very Heavy</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button variant="contained" 
                            margin="normal"
                            type="submit" 
                            sx={{m: 1}} 
                            onClick={() => {setPage(page + 1)}}
                        
                            >Next</Button>
                {console.log(page)}


    </div>
  )
}

export default NewTags