import React, { useEffect, useState } from "react";
import useStyles from "./Styles.js";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getInvestments } from "../../store/actions/investment.js";
import Investment from "./Investment.js";

const MyInvestments = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const investments = useSelector(
    (state) => state.investmentReducer.myInvestments
  );

  const [investedIdeas, setInvestedIdeas] = useState();

  useEffect(() => {
    dispatch(getInvestments(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInvestedIdeas(investments);
  }, [investments]);

  return investedIdeas && investedIdeas.length > 0 ? (
    <Grid className={classes.container} container spacing={2}>
      {investedIdeas.map((investment) => (
        <Grid key={Math.random()} item xs={12} sm={6} md={4}>
          <Investment investment={investment} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography
      gutterBottom
      variant="h4"
      align="center"
      className={classes.text}
    >
      No Investments Done
    </Typography>
  );
};

export default MyInvestments;
