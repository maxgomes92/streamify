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

export default function ModalPlaylistCreated({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box style={style}>
        <Typography variant="h6" component="h2" textAlign="center">
          Playlist created! 🎈🥁
        </Typography>

        <Typography>
          Click here to listen on Spotify!
        </Typography>

        <Typography>
          Do you enjoy this application? <br />
          Consider buying me a <Link href="/">coffee</Link>. ☕️
        </Typography>
      </Box>
    </Modal>
  )
}
