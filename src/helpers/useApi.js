import axios from "axios";
import { useEffect, useMemo } from "react";
import { useApp } from "../store";
import { PATH } from "../utils/constants";
import useAuthorize from "./useAuthorize";

const client_id = "edfb7947629d4fbeb012af3ffa1915ae";
const redirect_uri = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/login'
  : "https://maxgomes92.github.io/spotify-create-playlist"

const scope =
  "user-read-private user-read-email playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private";
const baseUrl = "https://api.spotify.com/v1";

const LOGIN_URL = [
  `https://accounts.spotify.com/authorize`,
  "?response_type=token",
  "&client_id=" + encodeURIComponent(client_id),
  "&scope=" + encodeURIComponent(scope),
  "&redirect_uri=" + encodeURIComponent(redirect_uri),
].join("");

export default function useApi() {
  const { accessToken, tokenType } = useAuthorize();
  const { actions: { setUser }, state: { user } } = useApp();

  const options = useMemo(() => ({
    headers: {
      Authorization: `${tokenType} ${accessToken}`,
      "Content-Type": "application/json",
    },
  }), [tokenType, accessToken])

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    axios
      .get(`${baseUrl}/me`, options)
      .then(({ data }) => {
        setUser(data);
      })
      .catch(handleLoginExpired);
  }, [accessToken]);

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
      window.location.href = PATH.home;
    }

    console.error('API ERROR', response)
  };

  const searchForItem = (query) => {
    return axios
      .get(`${baseUrl}/search?q=${query}&limit=5&type=track`, options)
      .catch(handleLoginExpired);
  };

  const createPlaylist = (name, description = "Playlist zika!") => {
    return axios
      .post(
        `${baseUrl}/users/${user.id}/playlists`,
        {
          name,
          description,
          public: false,
        },
        options
      )
      .catch(handleLoginExpired);
  };

  const addToPlaylist = (id, payload) => {
    return axios
      .post(`${baseUrl}/playlists/${id}/tracks`, payload, options)
      .catch(handleLoginExpired);
  };

  return {
    loggedIn: !!accessToken,
    authorize,
    searchForItem,
    getPlaylists,
    createPlaylist,
    addToPlaylist,
  };
}
