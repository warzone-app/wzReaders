import axios from "axios";

const SET_SEARCH = "SET_SEARCH";
const SET_DATA = "SET_DATA";
const GET_MATCH = "GET_MATCH";

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

export const getMatch = (match) => {
  return {
    type: GET_MATCH,
    match,
  };
};

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

export const fetchMatchData = (matchId) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `https://wzreader.us/match?matchId=${matchId}`,
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        dispatch(getMatch(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

const initialState = {
  userInfo: {},
  username: "",
  matchId: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        username: action.sVal,
      };
    case SET_DATA:
      return { ...state, userInfo: action.data };
    case GET_MATCH:
      return { ...state, matchId: action.match };
    default:
      return state;
  }
}
