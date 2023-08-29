import { Box, Link, Modal, Typography } from "@mui/material";

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  padding: 15,
  backgroundColor: '#191414',
}

const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=3EKFLMNVY5P92"

export default function ModalPlaylistCreated({ playlist, onClose }) {
  return (
    <Modal
      open={!!playlist}
      onClose={onClose}
    >
      <Box style={style}>
        <Typography variant="h6" component="h2" textAlign="center">
          Playlist created! 🎈🥁
        </Typography>

        <Typography>
          Click <Link href={playlist?.href} target="_blank">here</Link> to listen to your playlist on Spotify!
        </Typography>

        <Typography>
          Do you enjoy this application? <br />
          Consider buying me a <Link href={DONATE_URL}>coffee</Link>. ☕️
        </Typography>
      </Box>
    </Modal>
  )
}
