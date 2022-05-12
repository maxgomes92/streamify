import axios from "axios";
import useAuthorize from "./useAuthorize";

var client_id = "edfb7947629d4fbeb012af3ffa1915ae";
var redirect_uri = "https://7ce8-78-67-173-210.ngrok.io";

const scope =
  "user-read-private user-read-email playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private";
const baseUrl = "https://api.spotify.com/v1";

const LOGIN_URL = [
  `https://accounts.spotify.com/authorize`,
  "?response_type=token",
  "&client_id=" + encodeURIComponent(client_id),
  "&scope=" + encodeURIComponent(scope),
  "&redirect_uri=" + encodeURIComponent(redirect_uri),
  // url += '&state=' + encodeURIComponent(state);
].join("");

export default function useApi() {
  const { accessToken, tokenType } = useAuthorize();

  const options = {
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const authorize = () => {
    window.location.href = LOGIN_URL;
  };

  const getPlaylists = () => {
    return axios
      .get(`${baseUrl}/me/playlists`, options)
      .catch(handleLoginExpired);
  };

  const handleLoginExpired = ({ response }) => {
    if (response.status === 401) {
      window.location.href = LOGIN_URL;
    }
  };

  const searchForItem = (query) => {
    return axios
      .get(`${baseUrl}/search?q=${query}&limit=5&type=track`, options)
      .catch(handleLoginExpired);
  };

  return {
    loggedIn: !!accessToken,
    authorize,
    searchForItem,
    getPlaylists,
  };
}
