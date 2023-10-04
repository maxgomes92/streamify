const isProduction = process.env.NODE_ENV === 'production'

const DEFAULT_PATH = {
  home: '/home',
  app: '/app',
  login: '/',
}

const PRODUCTION_PATH = Object.entries(DEFAULT_PATH).reduce((acc, [key, value]) => {
  acc[key] = value
  return acc
}, {})

export const PATH = isProduction ? PRODUCTION_PATH : DEFAULT_PATH

const ASSET_PREFIX = isProduction ? "" : "/streamify"

export const assets = {
  folderMp3List: ASSET_PREFIX + "/folder-mp3-list.png",
  arrowRight: ASSET_PREFIX + "/arrow-right.png",
  createdSpotifyPlaylist: ASSET_PREFIX + "/created-spotify-playlist.png",
  spotifyIconRgbWhite: ASSET_PREFIX + "/spotify/Spotify_Icon_RGB_White.png",
}
