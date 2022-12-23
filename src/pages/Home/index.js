import { Button } from "@mui/material";
import React from "react";
import logo from "./icon.png";
import Separator from "../../components/Separator";
import useApi from "../../helpers/useApi";
import "./index.css";
import { PATH } from "../../utils/constants";
import { Navigate } from "react-router";

export default function Home() {
  const { authorize, loggedIn } = useApi();

  return (
    <div>
      <h1>Convert your mp3 files to a Spotify playlist with ease!</h1>
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
  );
}
