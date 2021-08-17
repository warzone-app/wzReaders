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
    try {
      var config = {
        method: "get",
        withCredentials: true,
        url: "https://my.callofduty.com/api/papi-client/crm/cod/v2/platform/battle/username/GetLucky%2311560/search",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "X-CSRF-TOKEN":
            "yCA6i3hZ4wZmHMmmnL1lMI9AeKXYBC4V4u63hwLPJKr0_jL27bwaUyMsihfu03he",
          Cookie:
            'API_CSRF_TOKEN=yCA6i3hZ4wZmHMmmnL1lMI9AeKXYBC4V4u63hwLPJKr0_jL27bwaUyMsihfu03he; ACT_SSO_COOKIE=MTkxNjc3MDQ4NDMwMDE4OTU2ODoxNjMwNDM0MjEzNTQyOjY4MTExZWI2ODg5NjljNTBmYWFkODAxOGI1YTYzZjhj; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.F1wXh75FBoSOGby6Y2CaO2XmRzWanTILwOI-RRYlXNYsDfSJDGCgIQ.qS_b0w4V7qlAlRFz.7KTtcJQawblrELnSIpGB2lTYirWMyENiCiusvduTvFgK0M0bDuvGhl4rm0wKeTUN6aa-OChlEJgoXwHROkf8b7VXxF1O0S9zYdwdDVm5BmAa3T6c-A9fXtHMNAjeqH-vwVPecT7O189pMpZRMQwAS95G9d41fKUhWQZaFIMCCusl_qEU4l8Gu13WG3iVLzcNQY4xDHUB8z2V3dfp5m-ys36jmgBnPNn30Ss_4s5LYMEBRzfFqW7dvWLBoeM4cPYJF3yzDjuyKaV7ZND9przhyx6tnS_S0vUe5pO-tuJ7YVto6AZngJijoV61rBKIPRICq_Q0_83MU0-TVBBVayo8mSri9mtPEBE8wqA1WeWddK7vM8MQsLeMz8nUxQHj5G10DERuQHkh9J4Lc92Vu2gjQSKAXkXqNfXfRIjSfVGjFhorIVVdEbHmYy5O3URbvE51xHKVM6ccsh91x9NJWWlhL2lH.3m4FKo-ZhMXMzQ1ytHWs1Q;; XSRF-TOKEN=wdON1XrcZwbd6AB8HVpXd7WfEjTm1rROHn3RQ456kurCJObIWWVK_Ns3I3_8mXTD; _abck=8B529B53D9AAF02A5390C170A251C4F0~-1~YAAQoik0F3sUxgl7AQAADN9ZVQZ+HMAoEaaTH4Y0FbnZJIloAt47YXYn2/Mi17ITti54e8aoneytgfkNHkFj4yj6HLoEgieYXg87gmOjkjy13I/eK3becyPFctBGICtTVufOU4RpUCfiRTG+ql1VEugNPUyGxBaPJUlzYeXq2106Ba/gG2Cnue/98Dv2/BIgva1yamUlfw+/R7bZmkIQdvvjvhkiHsHdipsvl7OZW6MdZqWPuHZfZFmMoHxN+RrrKtCfzlHnpOUxiDjtmYiwXpePIusgvR1y1/tSvXr2GhxgYwzMWJyguaiTT9EAgBF7OnID/mHTNFAmQLC55N7Mfn+eZ1t04khW4rdGE94sDj2WmSP1OipA+6JG/skXt4OUOtfhJQzsCfDw++Y=~-1~-1~-1; ak_bmsc=9B59FF9F13042A79A33E9FD60FAA191C~000000000000000000000000000000~YAAQoik0F1cTxgl7AQAARRZWVQxH6wjpsHvGHT8vOAZfWlssPWZXzWDATuQ4XQRDYiH7wfnp2aZSbnhr0gG9uCLE4ZOrf8dgH8Yskfev2sqf+zvXavWj3FGVeHGNoc7+5EiHJ1XoqlCQpGzTgIOyThjLd/cPwNB1C92Zk7usENrlvIe7UGlV6hQw92OD9LgQX8C29pu0KSayNzB9MdIFeWmm5XFuEkwLV4zA78O6qtGIt1nJST6q9yQNUYoRLl5K9wjoizS6OK5T1leF4pOtjYsrD7NkqY0wh8SnZrw2hgsQphUqLxxNVs7QhR/tT6TI03XRD8xHUOH1Y1DAU2EdYL7YZDHfbpaphqMBlnYqla0+mc9XMYoa/+L1Aa30CgOqqQ==; at_flavor=""; atvi_dob=""; bm_sv=C77C702F4F371458F16D86BF3ABC28A8~Qgte2DLYbJzeZk6rslAflWpBGld9TWyZp9EQBCtbxwjUPXdWlEzXvb5/lY9Kv/dcZzfXVRw4nTHgA1W6Mtb7M4Jb0ysWM7Nm2WMTFyb6ergFzfm2/dPC7/s7oYPkoXx+w8p1CD2WE3cxCJFOnTxrHOel8GL0yANR7OUSojyZBQk=; bm_sz=22FE8ADA7A31024FE6B092CED4DC869C~YAAQoik0F3wUxgl7AQAADN9ZVQzXYTCdML4EK32YMcZvDkb29a5ziZdVy1vKq2eyPaiQyZWSpGHThkXQsBfOcqYkvcCISf438vAM+5fWZmQflKo2kKt+L/GFBjPn26BI+puFZhi+QizGeCrGSx2oHuLlImivma33weS0dTvo7rjj3jSoGzH4U2e5J9oh+eHO89+5ZPOHPeiAKNt87HJm49rJfx8vAnsP86p623yX6hLt4NpBGmFbEkKAtli/XMCPmm9lbhJNVp39ISy/+MyLT372Io5ikZ4u/JANNASvCkLo6q9n+Dyn~4277553~4535094; comid=cod; country=US; new_SiteId=cod; ssoDevId=6f029f5e359746f98c0089dda2b2cc93; API_CSRF_TOKEN=a6f8f880-5ac7-420b-99c9-a4d116b4873b',
        },
      };

      axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
      });
      // const res = await axios.request(config);
      // dispatch(await setData(res.data));
      // .catch(function (error) {
      //   console.log(error);
      // });
    } catch (error) {
      console.log(error);
    }
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
