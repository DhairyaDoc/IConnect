import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "@material-ui/core";
import { CardContent, Typography, Grid } from "@mui/material";
import Idea from "../Ideas/Idea/Idea";

import { userIdeas } from "../../store/actions/idea";
import useStyles from "./Styles.js";

const MyIdeas = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ideas = useSelector((state) => state.ideaReducer.userIdeas);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(userIdeas({ userID: user._id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        {ideas && ideas.length > 0 ? (
          ideas.map((userIdea) => {
            return (
              <Grid key={userIdea._id} item xs={12} sm={6} md={4}>
                <Idea idea={userIdea} />
              </Grid>
            );
          })
        ) : (
          <Card color="red">
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                align="center"
                className={classes.text}
              >
                No Ideas found
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </>
  );
};

export default MyIdeas;
