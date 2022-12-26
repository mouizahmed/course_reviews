import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function NewComments({ page, setPage, formData, setFormData }) {
  const [body, setBody] = useState("");

  const enabled = formData.body.length > 0;

  return (
    <div>
      Comments on the course*
      <TextField
        className="bar"
        id="outlined-basic"
        label="Comments"
        variant="outlined"
        value={formData.body}
        multiline
        rows={4}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onInput={(e) => setFormData({ ...formData, body: e.target.value })}
        sx={{ minWidth: 100 }}
        fullWidth
        required
      />
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

export default NewComments;
