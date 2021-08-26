import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DehazeIcon from "@material-ui/icons/Dehaze";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import "./styles/NavbarSearch.css";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavbarSearch() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const handleChange = (e) => {
    // this.props.setSearch(e.target.value);
    console.log(111, e.target.value);
  };

  const handleClick = () => {
    // this.props.setSearch(e.target.value);
    console.log(1113415);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      id="drawerList"
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["playerstats", "leaderboard", "loadout", "news"].map((text, i) => (
          <Link to={text} key={i}>
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Login/Sign Up"].map((text, i) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div id="navbarSearchContainer">
      <div id="header">
        <div className="headerLogo">
          <Link to={"/"}>
            <h1>WZReaders</h1>
          </Link>
        </div>
          <form id="navbarSearchForm">
            <input
              id="navbarSearch"
              type="text"
              placeholder="Search City"
              autocomplete="off"
              onChange={handleChange}
            />
            <button id="navbarSearchButton" type="submit" onClick={handleClick}>
              <img
                id="navbarSearchIcon"
                src="/images/icons8-search-60.png"
                alt="search icon"
              />
            </button>
          </form>
        <div>
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <DehazeIcon id="dehazeIcon" />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
