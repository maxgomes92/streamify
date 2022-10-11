import { Button } from "@mui/material";
import React, { useEffect } from "react";
import logo from "./icon.png";
import Separator from "../../components/Separator";
import useApi from "../../helpers/useApi";
import "./index.css";
import { useApp } from "../../store";
import { PATH } from "../../utils/constants";

export default function Home() {
  const { authorize, loggedIn } = useApi();
  const { state: { user } } = useApp();

  const goToApp = () => {
    window.location.href = PATH.app;
  }

  return (
    <div>
      <h1>Convert your mp3 files to a Spotify playlist with ease!</h1>
      <div>
        {loggedIn ? (
          <Button variant="contained" color="success" onClick={goToApp}>
            <img src={logo} alt="spotify-logo" />
            <Separator width={10} />
            Continue as {user?.display_name}
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={authorize}>
            <img src={logo} alt="spotify-logo" />
            <Separator width={10} />
            Login with Spotify
          </Button>
        )}
      </div>
    </div>
  );
}
