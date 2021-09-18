import React, { Component } from "react";
import { Link } from "react-router-dom";
import { setSearch, setPlatform ,setOldUsername} from "../store/landingPage";
import { connect } from "react-redux";
import "./styles/LandingPage.css";

const topPlayers = [
  {id: "AYDAN%2311691",
   link: "/playerstats?user=AYDAN%2311691&platform=battle",
    img: "https://pbs.twimg.com/profile_images/1420103231225704452/m6dor115_400x400.jpg",
   name: "AYDAN",
   twitch: "https://www.twitch.tv/aydan",
   youtube: "https://www.youtube.com/user/Marathxnz",
   twitter: "https://twitter.com/aydan",
  },
  {id: "TEEPEE%231840",
   link: "/playerstats?user=TEEPEE%231840&platform=battle",
    img: "https://pbs.twimg.com/profile_images/1379297677784006656/0vYmu245_400x400.jpg",
   name: "TEEPEE",
   twitch: "https://www.twitch.tv/teepee",
   youtube: "https://www.youtube.com/channel/UCq5jqX3nqMcFlUQzHjgyXdQ",
   twitter: "https://twitter.com/TylerTeeP",
  },
  {id: "IRON%2311745",
  link: "/playerstats?user=IRON%2311745&platform=battle",
    img: "https://pbs.twimg.com/profile_images/1380965827051192320/HmGYf8hP_400x400.jpg",
  name: "IRON",
  twitch: "https://www.twitch.tv/its_iron",
  youtube: "https://www.youtube.com/channel/UCyWppJ6OEy5_mqOuSKSbcpA",
  twitter: "https://twitter.com/lts_Iron",
 },
 {id: "/playerstats?user=KINGJOEWO&platform=psn",
  link: "/playerstats?user=KINGJOEWO&platform=psn",
  img: "https://pbs.twimg.com/profile_images/1430166195878117378/SBN4vzqQ_400x400.jpg",
  name: "JOEWO",
  twitch: "https://www.twitch.tv/joewo",
  youtube: "https://www.youtube.com/channel/UCYIwBCUkTJq6gomf5blbQ2g",
  twitter: "https://twitter.com/AverageJoeWo",
 },
]

class LandingPage extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleClickUser = this.handleClickUser.bind(this);
    this.handlePlatformClick = this.handlePlatformClick.bind(this);
    this.platformPlaceholder = this.platformPlaceholder.bind(this);
  }

  handleChange(e) {
    this.props.setSearch(e.target.value.replace("#", "%23"));
  }
  
  handleClickButton(e) {
    this.props.setPlatform(e.target.id)
  }

  handleClickUser(e){
    this.props.setSearch(e.target.parentNode.id)
  }

  handlePlatformClick(e){
    window.open(e.target.id, '_blank');
  }

  platformPlaceholder(platform){
    if(platform === "battle"){
      return "Username#12345"
    } else {
      return "Username"
    }
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
              <button id="battle" className="platformBtn" onClick={this.handleClickButton}>
                <img className="platformBtnLogo" src="/images/battleLogo.png" /> Battle.net
              </button>
              <button id="psn" className="platformBtn" onClick={this.handleClickButton}>
                <img className="platformBtnLogo" src="/images/psnLogo.png" /> PlayStation
              </button>
              <button id="xbl" className="platformBtn" onClick={this.handleClickButton}>
                <img className="platformBtnLogo" src="/images/xblLogo.png" /> Xbox
              </button>
            </div>
          </div>
          <div id="popularDiv">
            <div id="popluarPlayerTitle">Popular Players</div>
            <div id="popularPlayerContainer">
              { topPlayers.map((el, i) => {
                return(
                  <div className="singlePopPlayContainer">
                    <Link to={el.link} className="ImgNameContainer" id={el.id} onClick={this.handleClickUser}>
                      <img
                        className="topPlayerImg"
                        src={el.img}/>
                      <div className="topPlayerName">{el.name}</div>
                    </Link>  
                    <div id="SMContainer">
                      <img className="topPlayerSMImg" id ={el.twitch} src="/images/twitch.png" onClick={this.handlePlatformClick}/>
                      <img className="topPlayerSMImg" id ={el.youtube} src="/images/youtube.png"onClick={this.handlePlatformClick}/>
                      <img className="topPlayerSMImg" id ={el.twitter} src="/images/twitter.png"onClick={this.handlePlatformClick}/>
                    </div>
                  </div>
                )
              })}
            </div>
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
