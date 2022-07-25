import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import useStyles from "./Styles.js";
import { useNavigate } from "react-router-dom";
import { getContactMe } from "../../../store/actions/idea";
import { useDispatch } from "react-redux";

export const ContactMe = ({ idea_id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitEmail = (e) => {
    if (e) {
      e.preventDefault();
    }

    dispatch(getContactMe(name, email, message, idea_id)).then(() => {
      alert("Email sent successfully");
      //navigate.jumpTo("/ideas");
      //navigate("/ideas")
    });
  };

  const cancelForm = () => {
    navigate("/ideas");
  };

  return (
    <div>
      {/* <div style={{ backgroundColor: "primary" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={cancelForm}
        >
          <CloseIcon />
        </IconButton>
      </div> */}
      <form
        autoComplete="off"
        onSubmit={submitEmail}
        className={classes.formSpacing}
      >
        <TextField
          name="name"
          variant="outlined"
          label="name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={classes.textField}
        />
        <TextField
          name="email"
          variant="outlined"
          label="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.textField}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={classes.textField}
        />

        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} md={6}>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onSubmit={submitEmail}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="contained" onClick={cancelForm} fullWidth>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
