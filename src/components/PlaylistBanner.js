import { Box, Link, Typography } from "@mui/material"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Separator from "./Separator"
import { assets } from "../utils/constants"

const imageStyle = {
  width: '100px',
  height: 'auto',
}

const wrapper = {
  padding: 20,
  background: "#2f2e2e",
  display: "flex",
  gap: 20,
}

export default function PlaylistBanner({
  playlist,
}) {
  if (!playlist) {
    return
  }

  return (
    <Box style={wrapper}>
      <img src={playlist.images?.[0]?.url || assets.spotifyIconRgbWhite} alt={`Cover to playlist ${playlist.name}`} style={imageStyle} />
      <Box>
        <Box>
          <img src="/spotify/Spotify_Logo_RGB_White.png" alt="spotify-logo" />
        </Box>

        <Separator height={20} />

        <Typography fontWeight={700}>{[playlist.name]}</Typography>

        <Separator height={10} />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>
            <Link href={playlist?.external_urls?.spotify} target="_blank">Listen on Spotify</Link>
          </Typography>
          <OpenInNewIcon htmlColor="#90caf9" />
        </Box>
      </Box>
    </Box>
  )
}
