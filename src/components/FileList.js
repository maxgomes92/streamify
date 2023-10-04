import { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Separator from './Separator';
import "./FileList.css";
import { assets } from '../utils/constants';

const AddMusicBanner = styled.a`
  flex-grow: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const imageStyle = {
  width: '100%',
  height: 'auto',
}

export default function FileList({ files, removeItem, selectItem, onFilesAdded, setErrorMsg }) {
  const addMusicInputRef = useRef()
  const player = useRef(new Audio())
  const isEmpty = files.length === 0
  const [musicIdPlaying, setMusicIdPlaying] = useState()

  useEffect(() => {
    player.current.onpause = () => {
      setMusicIdPlaying()
    }
  }, [])

  const previewSong = (item) => {
    if (typeof item.preview_url !== "string") {
      setErrorMsg("This song does not support preview")
      return
    }

    if (
      player.current.src === item.preview_url &&
      !player.current.paused
    ) {
      player.current.pause()
      return
    }

    setMusicIdPlaying(item.id)
    player.current.src = item.preview_url
    player.current.play()
  }

  const onChange = (e) => {
    const files = Array.from(e.target.files).map(({ name, size }) => ({ name, size }))
    onFilesAdded(files)
  }

  const onAddMusicBannerClick = () => {
    addMusicInputRef.current.click()
  }

  const openSong = (item) => {
    if (!item.external_url) {
      setErrorMsg("This song does not contain external url")
      return
    }

    window.open(item.external_url, '_blank')
  }

  return (
    <Card className="FileList" style={isEmpty ? { display: 'flex', flexDirection: 'column' } : {}}>
      <input type="file" ref={addMusicInputRef} multiple onChange={onChange} value={[]} style={{ display: 'none' }} />

      {isEmpty && (
        <AddMusicBanner onClick={onAddMusicBannerClick}>
          <div style={{ textAlign: 'center', flexGrow: 1 }}>
            Click here to start adding your songs.
          </div>
        </AddMusicBanner>
      )}

      {files.map(({ name, size, q, result }, fileIndex) => (
        <div className="file-item" key={name + size}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Box sx={{ paddingTop: "5px", flexBasis: "30px", flexShrink: 0 }}>
              <img src={assets.spotifyIconRgbWhite} alt="Spotify Logo" style={imageStyle} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ margin: 0 }}>{q}</h3>
                  <small>{name}</small>
                </div>
                <div>
                  <IconButton onClick={() => removeItem(fileIndex)} size='small' aria-label='Remove music'>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
              <Separator height={20} />
              <FormLabel id={q}>Results:</FormLabel>
              {result && (
                <FormControl style={{ width: '100%' }}>
                  <RadioGroup
                    name={q}
                    style={{ padding: '0 0 0 5px' }}
                  >
                    {result.map((item, itemIndex) => (
                      <div key={item.id} style={{ display: 'flex' }}>
                        <div style={{ flexGrow: 1 }}>
                          <FormControlLabel
                            value={item.id}
                            control={<Radio />}
                            label={`${item.name} - ${item.artist}`}
                            onChange={() => selectItem(fileIndex, itemIndex)}
                            checked={item.checked}
                          />
                        </div>
                        <div style={{ flexGrow: 0, display: "flex", gap: "10px" }}>
                          <Box>
                            <IconButton onClick={() => previewSong(item)} color='primary' size='small'>
                              {musicIdPlaying === item.id ? (
                                <StopIcon />
                              ) : (
                                <PlayArrowIcon />
                              )}
                            </IconButton>
                          </Box>

                          <Box>
                            <IconButton onClick={() => openSong(item)} color='primary' size='small' aria-label="Open in Spotify">
                              <OpenInNewIcon />
                            </IconButton>
                          </Box>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  {result.length === 0 && (
                    <p style={{ color: 'red' }}>No results found!</p>
                  )}
                </FormControl>
              )}
            </Box>
          </Box>
        </div>
      ))}

      {!isEmpty && (
        <div style={{ textAlign: 'center' }}>
          <Separator height={10} />
          <Button color="info" onClick={onAddMusicBannerClick}>
            <AddIcon />
            Add more
          </Button>
          <Separator height={10} />
        </div>
      )}
    </Card>
  );
}
