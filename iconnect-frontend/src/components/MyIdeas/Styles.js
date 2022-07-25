import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  text: {
    marginTop: "15px",
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
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: "15px",
      // height: "150px",
      position: "relative",
    },
    cardName: {
      width: "10%",
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
    mainContainer: {
      display: "flex",
      alignItems: "center",
    },
    smMargin: {
      margin: theme.spacing(1),
    },
    actionDiv: {
      textAlign: "center",
    },
  },
}));
