import React, { useState } from "react";
import useStyles from "./Styles.js";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogActions,
} from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import Investment from "../Investment/Investment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Pageview from "@material-ui/icons/Pageview";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostIdea from "../../PostIdea/PostIdea.js";
import { investment } from "../../../store/actions/investment";

const Idea = (props) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const idea = props.idea;
  const [showAlert, setShowAlert] = useState(false);

  const user = useSelector((state) => state.authReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    dispatch(investment(idea._id)).then(() => {
      navigate("/investmentideadetails/" + idea._id);
    });
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  const deleteIdea = (e) => {
    e.preventDefault();
    console.log("called");
    props.deleteIdea(e, idea._id);
  };
  return (
    <Card className={classes.card}>
      <Dialog
        onClose={handleClose}
        open={openModal}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Invest</DialogTitle>
        <DialogContent>
          <Investment handleCloseModal={handleClose} ideaId={idea._id} />
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleEditModalClose}
        open={openEditModal}
        fullWidth={true}
        // maxWidth={"sm"}
      >
        <DialogTitle>Edit Idea</DialogTitle>
        <DialogContent>
          <PostIdea idea={idea} handleEditModalClose={handleEditModalClose} />
        </DialogContent>
      </Dialog>

      <Dialog onClose={handleCloseAlert} open={showAlert}>
        <DialogContent>
          Are you sure you want to delete this idea?{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => deleteIdea(e)} color="primary">
            Confirm
          </Button>
          <Button onClick={handleCloseAlert} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <CardMedia
        className={classes.media}
        image={
          idea.image ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={idea.title}
      />

      <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size="medium" onClick={() => {}}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>

      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography variant="h5">{idea.projectName}</Typography>
            <Typography variant="body1" color="textSecondary">
              {moment(idea.createdAt).fromNow()}
            </Typography>
          </div>
          <div>
            <Typography variant="body1">
              Required: $ {idea.investmentRequired}
            </Typography>
            <Typography variant="body1">
              Raised: $ {idea.investmentRaised || 0}
            </Typography>
          </div>
        </div>
        <Typography
          className={classes.title}
          variant="body1"
          color="textSecondary"
        >
          {idea.shortDescription}
        </Typography>
      </CardContent>

      <CardActions
        className={
          // user && user.role === "investor"
          // ?
          classes.cardActionsForInverstor
          // : classes.cardActions
        }
      >
        {user && user.role === "investor" ? (
          <Button
            color="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <AttachMoneyIcon fontSize="medium" />
            Invest
            {idea.likeCount}
          </Button>
        ) : null}

        <Button
          color="primary"
          onClick={() => {
            handleViewDetails();
          }}
        >
          <Pageview fontSize="medium" />
          View Details
        </Button>
        {user && user._id === idea.createdBy ? (
          <div>
            <Grid container spacing={1}>
              <Grid item md={6}>
                <Button
                  color="primary"
                  onClick={() => {
                    setOpenEditModal(true);
                  }}
                >
                  <EditIcon fontSize="medium" />
                  Edit{" "}
                </Button>
              </Grid>
              <Grid item md={6}>
                <Button
                  color="primary"
                  onClick={() => {
                    setShowAlert(true);
                  }}
                >
                  <DeleteIcon fontSize="medium" />
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Idea;
