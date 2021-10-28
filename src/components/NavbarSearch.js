import React, { Component } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setSearch, setPlatform, setOldUsername } from "../store/landingPage";
import { connect } from "react-redux";

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

let changedUsername = "";
const classes = useStyles;
class NavbarSearch extends Component {
  constructor() {
    super();
    this.state = {
      right: false,
      username: "",
      platform: "battle",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePlatform = this.handlePlatform.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.list = this.list.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value.replace("#", "%23"),
    });
  };

  handlePlatform = (e) => {
    this.setState({ ...this.state, platform: e.target.value });
  };

  handleClick = (e) => {
    this.props.setPlatform(this.state.platform);
    this.props.setOldUsername(this.props.username);
    this.props.setSearch(this.state.username);
  };

  toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ ...this.state, [anchor]: open });
  };

  list = (anchor) => (
    <div
      id="drawerList"
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {["Player Stats", "Leaderboard", "Loadout", "News"].map((text, i) => (
          // <Link to={text} key={i}>
          //   <ListItem button key={text}>
          //     <ListItemText primary={text} />
          //   </ListItem>
          // </Link>
          <Link to="/underconstruction" key={i}>
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <List>
        <Link to="/aboutus">
          <ListItem button key={"About Us"}>
            <ListItemText primary={"About Us"} />
          </ListItem>
        </Link>
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
  render() {
    return (
      <div id="navbarSearchContainer">
        <div id="header">
          <div className="headerLogo">
            <Link to={"/"}>
              <h1>WZReaders</h1>
            </Link>
          </div>
          <form id="navbarSearchForm">
            <div id="searchPlatform">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.platform}
                  label="Platform"
                  onChange={this.handlePlatform}
                >
                  <MenuItem value={"battle"}>
                    <img
                      alt=""
                      className="platformBtnLogo"
                      src="/images/battleLogoD.png"
                    />
                  </MenuItem>
                  <MenuItem value={"psn"}>
                    <img
                      alt=""
                      className="platformBtnLogo"
                      src="/images/psnLogoD.png"
                    />
                  </MenuItem>
                  <MenuItem value={"xbl"}>
                    <img
                      alt=""
                      className="platformBtnLogo"
                      src="/images/xblLogoD.png"
                    />
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <input
              id="navbarSearch"
              type="text"
              placeholder="Search Username"
              onChange={this.handleChange}
            />
            <Link
              to={`/playerstats?user=${this.state.username}&platform=${this.state.platform}`}
            >
              <button
                id="navbarSearchButton"
                type="submit"
                onClick={this.handleClick}
              >
                <img
                  id="navbarSearchIcon"
                  src="/images/icons8-search-60.png"
                  alt="search icon"
                />
              </button>
            </Link>
          </form>
          <div>
            {["right"].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={this.toggleDrawer(anchor, true)}>
                  <DehazeIcon id="dehazeIcon" />
                </Button>
                <Drawer
                  anchor={anchor}
                  open={this.state[anchor]}
                  onClose={this.toggleDrawer(anchor, false)}
                >
                  {this.list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userInfo: state.landingPage.userInfo,
    username: state.landingPage.username,
    platform: state.landingPage.platform,
  };
};
const mapDispatch = (dispatch) => {
  return {
    setSearch: (sVal) => {
      dispatch(setSearch(sVal));
    },
    setPlatform: (pVal) => {
      dispatch(setPlatform(pVal));
    },
    setOldUsername: (oUVal) => {
      dispatch(setOldUsername(oUVal));
    },
  };
};

export default connect(mapState, mapDispatch)(NavbarSearch);
