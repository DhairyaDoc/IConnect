import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { drawerWidth } from "../../config/app";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import "./SideBar.css";

const appPagesforIdeators = [
  {
    title: "Ideas",
    url: "/ideas",
    icon: <EmojiObjectsOutlinedIcon />,
  },
  {
    title: "Post Idea",
    url: "/postIdea",
    icon: <AddCircleOutlineIcon />,
  },
  {
    title: "Pending  Requests",
    url: "/investmentrequest",
    icon: <PendingActionsOutlinedIcon />,
  },
  {
    title: "Received Investments",
    url: "/receivedInvestments",
    icon: <MonetizationOnIcon />,
  },
  {
    title: "My Ideas",
    url: "/myideas",
    icon: <WbIncandescentOutlinedIcon />,
  },
  {
    title: "Profile",
    url: "/userprofile",
    icon: <PersonIcon />,
  },
  {
    title: "Edit Profile",
    url: "/editprofile",
    icon: <EditIcon />,
  },
];

const appPagesforInvestors = [
  {
    title: "Ideas",
    url: "/ideas",
    icon: <EmojiObjectsOutlinedIcon />,
  },
  {
    title: "My Investments",
    url: "/myinvestments",
    icon: <WbIncandescentOutlinedIcon />,
  },
  {
    title: "Pending Investments",
    url: "/mypendinginvestments",
    icon: <PendingActionsOutlinedIcon />,
  },
  {
    title: "Payments",
    url: "/investmentpayment",
    icon: <WbIncandescentOutlinedIcon />,
  },
  {
    title: "Profile",
    url: "/userprofile",
    icon: <PersonIcon />,
  },
  {
    title: "Edit Profile",
    url: "/editprofile",
    icon: <EditIcon />,
  },
];

const SideBar = () => {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);
  const user = useSelector(state => state.authReducer.user);
  const SideBarList = appPages => {
    return appPages.map(page => (
      <Link to={page.url} key={page.title} className="side-bar-link">
        <ListItem>
          <ListItemIcon>{page.icon}</ListItemIcon>
          <ListItemText className="listItemText">{page.title}</ListItemText>
        </ListItem>
      </Link>
    ));
  };
  return (
    <div>
      {isLoggedIn ? (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {user && user.role === "investor"
              ? SideBarList(appPagesforInvestors)
              : SideBarList(appPagesforIdeators)}
          </List>
        </Drawer>
      ) : null}
    </div>
  );
};

export default SideBar;
