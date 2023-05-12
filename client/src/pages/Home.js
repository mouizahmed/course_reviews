import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import UniversitySearch from "../components/UniversitySearch";

//import bufferImage from 'buffer-image';

function Home() {
  const [listOfUniversities, setListOfUniversities] = useState([]);

  // const [universityName, setUniversityName] = useState([]);
  //const [universityTag, setUniversityTag] = useState();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/university`).then((response) => {
      setListOfUniversities(response.data);
    });
  }, []);

  return (
    <div className="home">
      <UniversitySearch listOfUniversities={listOfUniversities} />
      <div className="overflow">
        <div className="review">
          <Box sx={{ flexGrow: 1, flexWrap: "wrap" }} className="user-posts">
            <Grid
              container
              spacing={2}
              columns={{ xs: 2, sm: 2, md: 6, lg: 21 }}
              component="span"
            >
              {listOfUniversities
                .sort((a, b) => (a.review_num < b.review_num ? 1 : -1))
                .slice(0, 6)
                .map((rows) => (
                  <Grid
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    lg={7}
                    key={rows.universityName}
                  >
                    <Link
                      to={`/${rows.universityTag}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <Card className="card">
                        <CardActionArea>
                          <CardContent sx={{ flexGrow: 1, flexWrap: "wrap" }}>
                            <img
                              src={rows.logo}
                              alt="logo"
                              width="200px"
                              height="200px"
                              crop="scale"
                            />
                          </CardContent>
                          <CardContent sx={{ flexGrow: 1, flexWrap: "wrap" }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="span"
                            >
                              {rows.universityName}
                            </Typography>
                          </CardContent>
                          <CardContent sx={{ flexGrow: 1, flexWrap: "wrap" }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              component="span"
                            >
                              <div className="borderexample">
                                {rows.review_num} Reviews
                              </div>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Home;
