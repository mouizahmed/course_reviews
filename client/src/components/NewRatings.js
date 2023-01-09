import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function NewRatings({ page, setPage, formData, setFormData }) {


  const enabled =
    formData.overall > 0 &&
    formData.interest > 0 &&
    formData.easy > 0 &&
    formData.useful > 0;

  return (
    <div>
      <Grid container spacing={1} columns={{ xs: 10, sm: 2, md: 2, lg: 10 }}>
        <Grid item xs={10} lg={7}>
          <Box
            sx={{
              width: 400,
              display: "flex",
              alignItems: "center",
            }}
          >
            Overall Rating
          </Box>
        </Grid>
        <Grid item xs={10} lg={3} sx={{ textAlign: "right" }}>
          <Box
            sx={{
              width: 400,
              display: "flex",
              alignItems: "right",
            }}
          >
            <Rating
              name="no-value"
              value={formData.overall}
              onChange={(event, newOverall) => {
                setFormData({ ...formData, overall: newOverall });
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={10} lg={7}>
          <Box
            sx={{
              width: 400,
              display: "flex",
              alignItems: "center",
            }}
          >
            How easy was/is the course?
          </Box>
        </Grid>
        <Grid item xs={10} lg={3}>
          <Box
            sx={{
              width: 400,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="no-value"
              value={formData.easy}
              onChange={(event, newEasy) => {
                setFormData({ ...formData, easy: newEasy });
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={10} lg={7}>
          How interesting did you find the course?
        </Grid>
        <Grid item xs={10} lg={3}>
          <Box
            sx={{
              width: 400,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="no-value"
              value={formData.interest}
              onChange={(event, newInterest) => {
                setFormData({ ...formData, interest: newInterest });
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={10} lg={7}>
          How useful did you find the course?
        </Grid>
        <Grid item xs={10} lg={3} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 400,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="no-value"
              value={formData.useful}
              onChange={(event, newUseful) => {
                setFormData({ ...formData, useful: newUseful });
              }}
            />
          </Box>
        </Grid>
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
            disabled={!enabled}
            sx={{ width: 100 }}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default NewRatings;
