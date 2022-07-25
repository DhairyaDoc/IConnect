import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import useStyles from "./Styles.js";
import { Grid } from "@mui/material";
import { invest } from "../../../store/actions/investment";

const Investment = (props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const [paybackPlan, setPaybackPlan] = useState("stake");
  const [stake, setStake] = useState();
  const [debtInterest, setDebt] = useState();
  const [message, setMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataToSend = {
      investorId: user._id,
      ideaId: props.ideaId,
      amount,
      paybackPlan,
      stake,
      debtInterest,
    };

    dispatch(invest(dataToSend)).then((data) => {
      setMessage(data.message);
      setShowAlert(true);
    });
  };
  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };
  const handlePaybackPlanChange = (e) => {
    setPaybackPlan(e.target.value);
  };
  const handleChangeStake = (e) => {
    setStake(e.target.value);
  };
  const handleChangeDebt = (e) => {
    setDebt(e.target.value);
  };
  const handleClose = () => {
    setShowAlert(false);
    props.handleCloseModal();
  };
  return (
    <form className={classes.formSpacing} onSubmit={handleSubmit}>
      <Dialog onClose={handleClose} open={showAlert}>
        <DialogContent>{message} </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.textField}
        label="Amount"
        required
        fullWidth
        type="number"
        value={amount}
        onChange={(e) => handleChangeAmount(e)}
        InputProps={{ disableunderline: "true" }}
        variant="standard"
      />

      <FormControl component="fieldset">
        <FormLabel component="legend">Preferred Payback option</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={paybackPlan}
          onChange={handlePaybackPlanChange}
        >
          <FormControlLabel
            value="stake"
            control={<Radio color="primary" />}
            label="Stake"
          />
          <FormControlLabel
            value="debt"
            control={<Radio color="primary" />}
            label="Debt"
          />
        </RadioGroup>
      </FormControl>

      {paybackPlan === "stake" ? (
        <TextField
          className={classes.textField}
          label="Stake percentage"
          required
          fullWidth
          type="number"
          value={stake}
          onChange={(e) => handleChangeStake(e)}
          InputProps={{ disableunderline: "true" }}
          variant="standard"
        />
      ) : null}

      {paybackPlan === "debt" ? (
        <TextField
          className={classes.textField}
          label="Debt percentage"
          required
          fullWidth
          type="number"
          value={debtInterest}
          onChange={(e) => handleChangeDebt(e)}
          InputProps={{ disableunderline: "true" }}
          variant="standard"
        />
      ) : null}
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={6}>
          <Button variant="contained" type="submit" fullWidth color="primary">
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            onClick={(e) => props.handleCloseModal()}
            fullWidth
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Investment;
