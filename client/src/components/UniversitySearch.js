import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import NewUniversity from "./NewUniversity";
import NewCourse from "./NewCourse";
import NewRatings from "./NewRatings";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import NewComments from "./NewComments";
import UserForm from "./UserForm";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { textAlign } from "@mui/system";
import Stack from "@mui/material/Stack";

function UniversitySearch(listOfUniversities) {
  const list = listOfUniversities.listOfUniversities;
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setPage(0);
    setNewUniversity("");
  };
  const [page, setPage] = useState(0);
  const [newUniversity, setNewUniversity] = useState("");

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={3}>
          <Box className="modal">
            <UserForm
              listOfUniversities={listOfUniversities}
              type="add-university"
              page={page}
              professors={[]}
            />
          </Box>
        </Paper>
      </Modal>
      <div className="home-top">
        <meta name="viewport" content="width=device-width" />
        <Card>
          <CardContent
            sx={{
              flexDirection: "column",
              alignContent: "center",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography
                sx={{ fontWeight: "bold", fontSize: 15, mb: 1.5, mt: 1.5 }}
                color="text.secondary"
              >
                Get meaningful reviews for all the university courses you need.
              </Typography>

              <Autocomplete
                disablePortal
                className="bar"
                id="combo-box-demo"
                noOptionsText={
                  <>
                    <div>
                      0 Results.{" "}
                      <a
                        className="link"
                        onClick={() => setShow((prev) => !prev)}
                      >
                        Add a school
                      </a>{" "}
                      if it's not here.
                    </div>
                  </>
                }
                getOptionLabel={(list) => `${list.universityName}`}
                options={list}
                onChange={(event: AnalyserNode, option: any) => {
                  window.location.href = `/${option.universityTag}`;
                }}
                sx={{ width: 350 }}
                renderInput={(params) => (
                  <TextField {...params} label="University" />
                )}
              />
            </Stack>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UniversitySearch;
