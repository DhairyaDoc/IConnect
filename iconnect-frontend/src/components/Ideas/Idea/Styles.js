import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    "&:hover": {
      transform: "scale(1.02)",
      border: "2px solid steelblue",
      transition: "all 500ms ease-out 0s",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    // height: "150px",
    position: "relative",
    boxShadow: "2px 2px 3px 3px rgba(20,20,20,0.4)",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
    marginTop: "10px",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    marginTop: "10px",
  },
  cardActions: {
    display: "flex",
    paddingTop: "0px",
    justifyContent: "end",
  },
  cardActionsForInverstor: {
    justifyContent: "space-between",
  },
  formSpacing: {
    padding: theme.spacing(1),
  },
  textField: {
    paddingBottom: "20px",
  },

  // root: {
  //   '& .MuiTextField-root': {
  //     margin: theme.spacing(1),
  //   },
  // },
  // paper: {
  //   padding: theme.spacing(2),
  // },
  // form: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  // },
  // fileInput: {
  //   width: '97%',
  //   margin: '10px 0',
  // },
  // buttonSubmit: {
  //   marginBottom: 10,
  // },
}));
