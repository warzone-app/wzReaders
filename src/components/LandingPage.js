import React, { Component } from "react";
import { Link } from "react-router-dom";
import { setSearch, setPlatform ,setOldUsername} from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/LandingPage.css";

const topPlayers = [
  {id: "AYDAN%2311691",
   img: "https://pbs.twimg.com/profile_images/1420103231225704452/m6dor115_400x400.jpg",
   name: "AYDAN",
   twitch: "https://www.twitch.tv/aydan",
   youtube: "https://www.youtube.com/user/Marathxnz",
   twitter: "https://twitter.com/aydan",
  },
  {id: "TEEPEE%231840",
   img: "https://pbs.twimg.com/profile_images/1379297677784006656/0vYmu245_400x400.jpg",
   name: "TEEPEE",
   twitch: "https://www.twitch.tv/teepee",
   youtube: "https://www.youtube.com/channel/UCq5jqX3nqMcFlUQzHjgyXdQ",
   twitter: "https://twitter.com/TylerTeeP",
  },
]

class LandingPage extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.platformPlaceholder = this.platformPlaceholder.bind(this);
    this.handlepClick = this.handlepClick.bind(this);
  }

  handleChange(e) {
    this.props.setSearch(e.target.value.replace("#", "%23"));
  }

  handleClick(e) {
    this.props.setPlatform(e.target.id)


  }

  platformPlaceholder(platform){
    if(platform === "battle"){
      return "Username#12345"
    } else {
      return "Username"
    }
  }

  handlepClick(e){
    this.props.setSearch(e.target.value)
  }
  render() {
    return (
      <div id="landingContainer">
        <div id="imageAndSearchContainer">
          <img
              id="WZLogo"
              src="/images/WZLogo3.png"
              alt="WZ Logo"
            />
          <div id="searchContainer">
            <div id="cover">
              <form id="landingForm">
                <div className="inputContainer">
                  <input
                    id="landingSearch"
                    type="text"
                    placeholder={this.platformPlaceholder(this.props.platform)}
                    onChange={this.handleChange}
                  />
                  <Link to={`/playerstats?user=${this.props.username}&platform=${this.props.platform}`}>
                    <div className="td" id="buttonCover">
                      <button className="linkButton" type="submit">
                        <div id="buttonCircle"></div>
                        <span></span>
                      </button>
                    </div>
                  </Link>
                </div>
              </form>
            </div>
            <div id="platformContainer">
              <button id="battle" onClick={this.handleClick}>Battle.net</button>
              <button id="psn" onClick={this.handleClick}>PlayStation</button>
              <button id="xbl" onClick={this.handleClick}>Xbox</button>
            </div>
          </div>
            <div id="popularPlayerContainer">
         { topPlayers.map((el, i) => {
           return(
            <Link to={`/playerstats?user=${el.id}&platform=battle`} className="singlePopPlayContainer" id={el.id} onClick={this.handlepClick}>
              <img
                className="topPlayerImg"
                src={el.img}/>
              <div className="topPlayerName">{el.name}</div>
              <div className="topPlayerSM">Twitch</div>
              <div className="topPlayerSM">Youtube</div>
              <div className="topPlayerSM">Twitter</div>
              </Link>
           )
         })}
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
    oldUsername: state.landingPage.oldUsername,
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

export default connect(mapState, mapDispatch)(LandingPage);
