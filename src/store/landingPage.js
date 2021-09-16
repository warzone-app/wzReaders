import axios from "axios";

const SET_SEARCH = "SET_SEARCH";
const SET_OLD_USERNAME = "SET_OLD_USERNAME"
const SET_PLATFORM = "SET_PLATFORM";
const SET_DATA = "SET_DATA";
const SET_USER_MATCH = "SET_USER_MATCH";
const SET_ALL_MATCHES = "SET_ALL_MATCHES";
const SET_USER_MATCHES_ID = "SET_USER_MATCHES_ID";

export const setSearch = (sVal) => {
  return {
    type: SET_SEARCH,
    sVal,
  };
};

export const setOldUsername = (oUVal) => {
  return {
    type: SET_OLD_USERNAME,
    oUVal,
  };
};

export const setPlatform = (pVal) => {
  return {
    type: SET_PLATFORM,
    pVal,
  };
};

export const setData = (data) => {
  return {
    type: SET_DATA,
    data,
  };
};

export const setUserMatches = (userMatch) => {
  return {
    type: SET_USER_MATCH,
    userMatch,
  };
};

export const setAllMatches = (allMatches) => {
  return {
    type: SET_ALL_MATCHES,
    allMatches,
  };
};

export const setUserMatchesId = (matchId) => {
  return {
    type: SET_USER_MATCHES_ID,
    matchId,
  };
};

// Gives the user's data
export const fetchData = (username, platform) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `https://wzreader.us/api/wz?user=${username}&platform=${platform}`,
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        dispatch(setData(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// Gives the last 20 matches of the user
export const fetchUserMatches = (username, platform) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `https://wzreader.us/api/get_all?user=${username}&platform=${platform}`,
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        dispatch(setUserMatches(response.data));
        dispatch(
          setUserMatchesId(response.data.data.matches.map((el) => el.matchID))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// Gives the details of each match
export const fetchAllMatches = (matchId) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `https://wzreader.us/api/match?matchId=${matchId}`,
      headers: {},
    };
    await axios(config)
      .then(function (response) {
        dispatch(setAllMatches(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const initialState = {
  userInfo: {},
  username: "",
  oldUsername: "",
  platform: "battle",
  userMatch: [],
  allPlayers: [],
  matchId: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        username: action.sVal,
      };

    case SET_OLD_USERNAME:
      return {
        ...state,
        oldUsername: action.oUVal,
      };
      case SET_PLATFORM:
        return {
          ...state,
          platform: action.pVal,
        };

    case SET_DATA:
      return { ...state, userInfo: action.data };
    case SET_USER_MATCH:
      return { ...state, userMatch: action.userMatch };
    case SET_ALL_MATCHES:
      return {
        ...state,
        allPlayers: [...state.allPlayers, action.allMatches],
      };
    case SET_USER_MATCHES_ID:
      return { ...state, matchId: action.matchId };
    default:
      return state;
  }
}
