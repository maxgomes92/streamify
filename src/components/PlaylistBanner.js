import { Box, Link, Typography } from "@mui/material"
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
        <Typography fontWeight={700}>{[playlist.name]}</Typography>

        <Separator height={20} />

        <Typography>
          Click <Link href={playlist?.external_urls?.spotify} target="_blank">here</Link> to listen on Spotify!
        </Typography>
      </Box>
    </Box>
  )
}
