import React from "react";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import Separator from "../../components/Separator";
import useApi from "../../helpers/useApi";
import "./index.css";
import { assets } from "../../utils/constants";

const imageStyle = { height: 200, width: 'auto' }

const wrapperStyle = {
  height: '100vh',
  display: 'grid',
  placeContent: 'center',
  color: 'black',
}
const contentStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  justifyContent: 'center',
  backgroundColor: 'white',
  borderRadius: 10,
  overflow: 'hidden',
}

const sideStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: 30,
  gap: 20,
}

export default function Home() {
  const { authorize } = useApi();

  const onLoginClick = () => {
    authorize()
  }

  return (
    <Container style={wrapperStyle} maxWidth="md">
      <div style={contentStyle}>
        <div style={sideStyle}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography>Streamify Music</Typography>
            <Chip label="BETA" color="error" size="small" />
          </Box>

          <div style={{ flexGrow: 1 }}>
            <div>
              <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
                Create Spotify playlists from your mp3 files with a click!
              </Typography>

              <Separator height={25} />

              <Typography variant="body1">
                Waiting to migrate your folders of music to a streaming service? Wait no more! Select your mp3 files to our app and start listening.
              </Typography>

              <Separator height={25} />

              <div style={{ textAlign: 'center' }}>
                <Button variant="contained" onClick={onLoginClick} style={{ color: 'white', backgroundColor: '#20c933', textTransform: 'none' }}>
                  <img src="/spotify/Spotify_Icon_RGB_White.png" alt="spotify-logo" />
                  <Separator width={10} />
                  <b>Sign-in with Spotify</b>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Typography variant="body2" fontSize={10} textAlign="center">
              <b>Streamify Music</b> use Spotify Web API to perform but application works as client side only and your
              Spotify data is not stored to any server.
            </Typography>
          </div>
        </div>


        <div style={{ ...sideStyle, alignItems: 'center' }} className="gradient-bg">
          <div>
            <img src={assets.folderMp3List} style={imageStyle} alt="Folder with mp3 files" />
          </div>

          <div>
            <img src={assets.arrowRight} className="arrow-down" alt="Arrow pointing down" />
          </div>

          <div>
            <img src={assets.createdSpotifyPlaylist} style={imageStyle} alt="Playlist created on Spotify" />
          </div>
        </div>
      </div>
    </Container >
  );
}
