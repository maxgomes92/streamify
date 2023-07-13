import { Button, Container } from "@mui/material";
import React from "react";
import logo from "./icon.png";
import Separator from "../../components/Separator";
import useApi from "../../helpers/useApi";
import "./index.css";
import { PATH } from "../../utils/constants";
import { Navigate } from "react-router";

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

  return (
    <Container style={wrapperStyle}>
      <div style={contentStyle}>
        <div style={sideStyle}>
          <h1 style={{ textAlign: 'center' }}>
            Convert your mp3 files to a Spotify playlist with ease!
          </h1>

          <div>
            {loggedIn ? (
              <Navigate to={PATH.app} replace={true} />
            ) : (
              <Button variant="contained" color="success" onClick={authorize}>
                <img src={logo} alt="spotify-logo" />
                <Separator width={10} />
                Login with Spotify
              </Button>
            )}
          </div>
        </div>


        <div style={{ ...sideStyle, background: 'lightgray', alignItems: 'center' }}>
          <div>
            <img src="/spotify-create-playlist/folder-mp3-list.png" style={imageStyle} />
          </div>

          <div>
            <img src="/spotify-create-playlist/arrow-right.png" style={{ height: 100, width: 'auto' }} />
          </div>

          <div>
            <img src="/spotify-create-playlist/app-screenshot.jpg" style={imageStyle} />
          </div>
        </div>
      </div>
    </Container >
  );
}
