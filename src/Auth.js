import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;
const apiKey = process.env.REACT_APP_APIKEY;
const authToken = process.env.REACT_APP_TOKEN;



export const loginWithTMDB = async () => {
  const requestTokenUrl = `${baseUrl}/authentication/token/new?api_key=${apiKey}`;
  const sessionUrl = `${baseUrl}/authentication/session/new?api_key=${apiKey}`;
  
  try {
    const { data: tokenData } = await axios.get(requestTokenUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (tokenData.success) {
      const authUrl = `https://www.themoviedb.org/authenticate/${tokenData.request_token}?redirect_to=http://localhost:3000/callback`;
      window.location.href = authUrl;
    }

    const { data: sessionData } = await axios.post(sessionUrl, {
      request_token: tokenData.request_token,
    });

    localStorage.setItem("session_id", sessionData.session_id);
    return sessionData.session_id;
  } catch (error) {
    console.error("Authentication error:", error);
  }
};


export const handleCallback = async () => {
  
    const urlParams = new URLSearchParams(window.location.search);
    const requestToken = urlParams.get("request_token");
    const approved = urlParams.get("approved");
  
    if (approved === "true" && requestToken) {

      localStorage.setItem("tmdb_request_token", requestToken);
    }
  };
  
  export const isLoggedIn = () => {
    return !!localStorage.getItem("tmdb_request_token");
  };
  

export const logout = () => {
  localStorage.removeItem("session_id");
  window.location.reload();
};

