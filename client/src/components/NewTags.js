import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";

function NewTags({ formData, setFormData, page, setPage, professors }) {
  const professor = formData.professor;
  const list2 = [{ professorName: professor }];

  const [list, setList] = useState([]);
  const [addProfessor, setAddProfessor] = useState(false);

  useEffect(() => {
    if (list2[0].professorName === "") {
      setList([...professors]);
    } else {
      setList([...list2, ...professors]);
    }
  }, []);

  const enabled =
    formData.professor.length > 0 &&
    formData.term.length > 0 &&
    formData.year > 0 &&
    formData.delivery.length > 0 &&
    formData.grade.length > 0 &&
    formData.textbook.length > 0 &&
    formData.evaluation > 0 && //change later
    formData.workload.length > 0;

  return (
    <div className="">
      <Grid container spacing={2} columns={{ xs: 8, md: 8, lg: 15 }}>
        <Grid item xs={8} md={8} lg={7}>
          {!addProfessor ? (
            <Autocomplete
              disablePortal
              className="bar"
              id="combo-box-demo"
              getOptionLabel={(list) => `${list.professorName}`}
              options={list}
              onInput={(e) =>
                setFormData({ ...formData, professor: e.target.value })
              }
              noOptionsText={
                <>
                  <div>
                    0 Results.{" "}
                    <a
                      className="link"
                      onClick={() => {
                        setAddProfessor(true);
                      }}
                    >
                      Add a Professor
                    </a>{" "}
                    if it's not here.
                  </div>
                </>
              }
              //getOptionSelected={(option) => formData.professor || option}

              //isOptionEqualToValue={(option, value) => option.professor === value.professorName}
              onChange={(event: AnalyserNode, option: any, reason) => {
                setFormData(
                  reason === "clear"
                    ? { ...formData, professor: "" }
                    : { ...formData, professor: option.professorName }
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Professor" />
              )}
            />
          ) : (
            <TextField
              className="bar"
              id="foutlined-basic"
              label="Professor Name"
              color="secondary"
              focused
              variant="outlined"
              margin="normal"
              value={formData.professor}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onInput={(e) =>
                setFormData({ ...formData, professor: e.target.value })
              }
              sx={{ minWidth: 100 }}
              fullWidth
              required
            />
          )}
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Term</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.term}
              label="Term"
              onChange={(e) =>
                setFormData({ ...formData, term: e.target.value })
              }
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
            <InputLabel id="demo-simple-select-label">Year</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.year}
              label="Age"
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              defaultValue=""
            >
              {(() => {
                const list = [];
                const post = [];
                for (let i = 0; i < 13; i++) {
                  list[i] = new Date().getFullYear() - i;
                  post.push(
                    <MenuItem value={list[i]} key={list[i]}>
                      {list[i]}
                    </MenuItem>
                  );
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
              onChange={(e) =>
                setFormData({ ...formData, delivery: e.target.value })
              }
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
            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.grade}
              label="Age"
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
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
              <MenuItem value="Dropped/Withrawal">Dropped/Withdrawal</MenuItem>
              <MenuItem value="Incomplete">Incomplete</MenuItem>
              <MenuItem value="Not sure yet">Not sure yet</MenuItem>
              <MenuItem value="Rather not say">Rather not say</MenuItem>
              <MenuItem value="Audit/No grade">Audit/No grade</MenuItem>
              <MenuItem value="Pass">Pass</MenuItem>
              <MenuItem value="Fail">Fail</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} md={4} lg={5}>
          <FormControl sx={{ minWidth: 100 }} fullWidth>
            <InputLabel id="demo-simple-select-label">Textbook Use</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.textbook}
              label="Age"
              onChange={(e) =>
                setFormData({ ...formData, textbook: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, evaluation: e.target.value })
              }
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
            <InputLabel id="demo-simple-select-label">Workload</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.workload}
              label="Workload"
              onChange={(e) =>
                setFormData({ ...formData, workload: e.target.value })
              }
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
      <Grid container spacing={1} columns={{ xs: 10, lg: 10 }}>
        <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            margin="normal"
            type="submit"
            sx={{ width: 100 }}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous
          </Button>
        </Grid>
        <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            margin="normal"
            type="submit"
            sx={{ width: 100 }}
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={!enabled}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default NewTags;
