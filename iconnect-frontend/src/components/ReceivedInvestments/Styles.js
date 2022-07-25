import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  chips: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  text: {
    marginTop: "15px",
  },
}));
