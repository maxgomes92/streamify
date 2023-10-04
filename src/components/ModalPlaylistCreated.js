/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Link, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import useApi from '../helpers/useApi'
import * as Sentry from '@sentry/react'
import PlaylistBanner from "./PlaylistBanner";
import Separator from "./Separator";

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  border: '2px solid #000',
  padding: 15,
  backgroundColor: '#191414',
}

const DONATE_URL = "https://www.buymeacoffee.com/maxgomes"

export default function ModalPlaylistCreated({ playlist, onClose }) {
  const api = useApi()
  const [playlistData, setPlaylistData] = useState()

  useEffect(() => {
    if (!playlist) {
      return
    }

    api.getPlaylist(playlist.href).then(({ data }) => {
      setPlaylistData(data)
    }).catch(err => {
      Sentry.captureException(err)
    })
  }, [])

  return (
    <Modal
      open={!!playlist}
      onClose={onClose}
    >
      <Box style={style}>
        <Box>
          <Typography variant="h6" component="h2" textAlign="center">
            Playlist created! 🎈🥁
          </Typography>

          <Typography>Thank you, {[playlistData?.owner.display_name]}.</Typography>
          <Typography>Your playlist has been created successfully.</Typography>

          <Box style={{ margin: "20px 0" }}>
            <PlaylistBanner playlist={playlistData} />
          </Box>

          <Typography>
            Do you enjoy this application? <br />
            Consider buying me a <Link href={DONATE_URL}>coffee </Link> ☕️.
          </Typography>
        </Box>

        <Separator height={10} />

        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={onClose}>
            Thank you
          </Button>
        </Box>
      </ Box>
    </Modal>
  )
}
