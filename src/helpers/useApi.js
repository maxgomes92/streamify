import axios from 'axios'
import useAuthorize from './useAuthorize';

var client_id = 'edfb7947629d4fbeb012af3ffa1915ae';
var redirect_uri = 'https://7ce8-78-67-173-210.ngrok.io';

const scope = 'playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private';

const LOGIN_URL = [
  'https://accounts.spotify.com/authorize',
  '?response_type=token',
  '&client_id=' + encodeURIComponent(client_id),
  '&scope=' + encodeURIComponent(scope),
  '&redirect_uri=' + encodeURIComponent(redirect_uri),
  // url += '&state=' + encodeURIComponent(state);
].join('')

export default function useApi () {
  const { accessToken } = useAuthorize()

  const authorize = () => {
    window.location.href = LOGIN_URL
  }

  return {
    authorize,
    loggedIn: !!accessToken,
  }
}