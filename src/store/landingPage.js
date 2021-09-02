import axios from "axios";

const SET_SEARCH = "SET_SEARCH";
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
export const fetchData = (username) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `https://wzreader.us/wz?user=${username}`,
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
export const fetchUserMatches = (username) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `https://wzreader.us/get_all?user=${username}&platform=battle`,
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
export const fetchSingleMatch = (matchId) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `https://wzreader.us/match?matchId=${matchId}`,
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
  userMatch: [],
  allMatchDetail: [],
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
    case SET_DATA:
      return { ...state, userInfo: action.data };
    case SET_USER_MATCH:
      return { ...state, userMatch: action.userMatch };
    case SET_ALL_MATCHES:
      return {
        ...state,
        allMatchDetail: [...state.allMatchDetail, action.allMatches],
      };
    case SET_USER_MATCHES_ID:
      return { ...state, matchId: action.matchId };
    default:
      return state;
  }
}
