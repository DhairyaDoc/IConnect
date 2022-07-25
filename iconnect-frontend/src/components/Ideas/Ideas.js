import React, { useEffect, useState } from "react";
import Idea from "./Idea/Idea.js";
import useStyles from "./Styles.js";
import {
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { ideas, deleteIdeas } from "../../store/actions/idea";

const Ideas = () => {
  const dispatch = useDispatch();

  const ideasPost = useSelector((state) => state.ideaReducer.ideasPost);
  const [updatedIdeasPost, setUpdatedIdeasPost] = useState();
  const [message, setMessage] = useState();

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const deleteIdeaObj = useSelector((state) => state.ideaReducer.deleteIdea);

  const classes = useStyles();
  useEffect(() => {
    if (deleteIdeaObj.message != null) {
      console.log("called!!!!!");

      if (deleteIdeaObj.success) {
        setMessage("Idea deleted successfully");
      } else {
        setMessage(deleteIdeaObj.message);
      }
      setShowDeleteAlert(true);
    }
  }, [deleteIdeaObj]);
  useEffect(() => {
    dispatch(ideas());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUpdatedIdeasPost(ideasPost);
  }, [ideasPost]);
  const deleteIdea = (e, id) => {
    e.preventDefault();
    console.log("called");
    dispatch(deleteIdeas(id));
  };
  const handleCloseDeleteAlert = () => {
    setShowDeleteAlert(false);
    window.location.reload();
  };
  return updatedIdeasPost ? (
    <Grid className={classes.container} container spacing={2}>
      {updatedIdeasPost.map((idea) => (
        <Grid key={idea._id} item xs={12} sm={6} md={4}>
          <Idea idea={idea} deleteIdea={deleteIdea} />
        </Grid>
      ))}
      <Dialog onClose={handleCloseDeleteAlert} open={showDeleteAlert}>
        <DialogContent>{message} </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteAlert} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  ) : null;
};

export default Ideas;
