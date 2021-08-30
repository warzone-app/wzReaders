import axios from "axios";

const SET_SEARCH = "SET_SEARCH";
const SET_DATA = "SET_DATA";
const SET_MATCH = "GET_MATCH";

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

export const setMatch = (match) => {
  return {
    type: SET_MATCH,
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

export const fetchMatchId = (username) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `https://wzreader.us/get_all?user=${username}&platform=battle`,
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        dispatch(setMatch(response.data));
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
    case SET_MATCH:
      return { ...state, matchId: action.match };
    default:
      return state;
  }
}
