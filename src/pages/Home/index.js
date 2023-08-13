import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import logo from "./icon.png";
import Separator from "../../components/Separator";
import useApi from "../../helpers/useApi";
import { PATH } from "../../utils/constants";
import { Navigate } from "react-router";
import "./index.css";

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
  const { authorize, loggedIn } = useApi();
  const [hasClickedLogin, setHasClickedLogin] = useState(false)

  const onLoginClick = () => {
    setHasClickedLogin(true)
    authorize()
  }

  return (
    <Container style={wrapperStyle} maxWidth="md">
      {hasClickedLogin && loggedIn && (
        <Navigate to={PATH.app} replace={true} />
      )}

      <div style={contentStyle}>
        <div style={sideStyle}>
          <Typography>MP3 to Spotify</Typography>

          <div style={{ flexGrow: 1 }}>
            <div>
              <Typography variant="h4" style={{ fontWeight: 'bolder' }}>
                Create Spotify playlists from your mp3 files with a click!
              </Typography>

              <Separator height={25} />

              <Typography variant="body1">
                Lazy to migrate your folders of music to a streaming service? Wait no more! Drag and drop your mp3 files to our app and start listening.
              </Typography>

              <Separator height={25} />

              <div style={{ textAlign: 'center' }}>
                <Button variant="contained" onClick={onLoginClick} style={{ color: 'white', backgroundColor: '#20c933', textTransform: 'none' }}>
                  <img src={logo} alt="spotify-logo" />
                  <Separator width={10} />
                  <b>Sign-in with Spotify</b>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Typography variant="body2" fontSize={10} textAlign="center">
              <b>Spotify to Playlist</b> use Spotify Web API to perform but application works as client side only and your
              Spotify data is not stored to any server.
            </Typography>
          </div>
        </div>


        <div style={{ ...sideStyle, alignItems: 'center' }} className="gradient-bg">
          <div>
            <img src="/streamify/folder-mp3-list.png" style={imageStyle} alt="Folder with mp3 files" />
          </div>

          <div>
            <img src="/streamify/arrow-right.png" className="arrow-down" alt="Arrow pointing down" />
          </div>

          <div>
            <img src="/streamify/created-spotify-playlist.png" style={imageStyle} alt="Playlist created on Spotify" />
          </div>
        </div>
      </div>
    </Container >
  );
}
