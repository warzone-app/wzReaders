import axios from "axios";
const SET_DATA = "SET_DATA";

export const setData = (data) => {
  return {
    type: SET_DATA,
    data,
  };
};

export const fetchData = (username) => {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `http://mkang.us/wz?user=${username}`,
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        dispatch(setData(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    // try {
    //   var config = {
    //     method: "get",
    //     url: `http://mkang.us/wz?user=${username}`,
    //     headers: {},
    //   };

    //   const res = await axios.request(config);
    //   dispatch(await setData(res.data));
    // } catch (error) {
    //   console.log(error);
    // }
  };
};

const initialState = {
  userInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, userInfo: action.data };
    default:
      return state;
  }
}
