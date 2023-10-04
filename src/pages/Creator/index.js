import { useEffect, useState } from 'react'
import { Alert, AppBar, Box, Button, CircularProgress, IconButton, List, ListItem, Snackbar, TextField, Toolbar, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import useApi from '../../helpers/useApi'
import FileList from '../../components/FileList'
import Separator from '../../components/Separator'
import { Container } from '@mui/system'
import * as Sentry from "@sentry/react"
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import './index.css'
import ModalPlaylistCreated from '../../components/ModalPlaylistCreated'
import { useNavigate } from 'react-router-dom'

export default function Creator() {
  const [titleValidationMsg, setTitleValidationMsg] = useState('')
  const [listValidationMsg, setListValidationMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [createdPlaylist, setCreatedPlaylist] = useState()

  const sendDataToGTM = useGTMDispatch()
  const navigate = useNavigate()

  const [files, setFiles] = useState(() => {
    const filesStr = localStorage.getItem('files')
    return filesStr ? JSON.parse(filesStr) : []
  })
  const { searchForItem, createPlaylist, addToPlaylist } = useApi()

  useEffect(() => {
    localStorage.setItem('files', JSON.stringify(files))
  }, [files])

  const selectItem = (fileIndex, itemIndex) => {
    files[fileIndex].result.forEach((item, index) => {
      files[fileIndex].result[index].checked = index === itemIndex
    })

    setFiles([...files])
  }

  const onSearch = async (newFiles) => {
    const list = [...newFiles]

    for (let file of list) {
      try {
        const { data: { tracks: { items } } } = await searchForItem(file.q)

        file.result = items.map((item, i) => {
          return {
            id: item.id,
            name: item.name,
            artist: item.artists[0].name,
            preview_url: item.preview_url,
            uri: item.uri,
            checked: i === 0,
          }
        })

        setFiles((previousValue) => [
          ...previousValue,
          file,
        ])
      } catch (err) {
        file.result = []

        setFiles((previousValue) => [
          ...previousValue,
          file,
        ])

        setErrorMsg(`Sorry! We failed to find a music with the name "${file.q}"`)

        Sentry.captureException(err)
      }
    }
  }

  const removeItem = (i) => {
    files.splice(i, 1)
    setFiles([...files])
  }

  const clearList = () => {
    setFiles([])
  }

  const onFilesAdded = (newFiles) => {
    setListValidationMsg('')

    const myFiles = newFiles.filter((file) => {
      return !files.find((f) => f.name === file.name)
    }).map((f) => {
      f.q = f.name
        .replace(/\.\w{3}$/g, '') // Removes extension
        .replace(/\s+/g, ' ') // Multiple spaces by 1 space
      return f
    })

    onSearch(myFiles)
  }

  const reset = () => {
    clearList()
    setPlaylistTitle("")
  }

  const createMyPlaylist = () => {
    const errorCallbacks = []

    if (isLoading) {
      return
    }

    if (!playlistTitle) {
      errorCallbacks.push(() => setTitleValidationMsg('Please fill up playlist name.'))
    }

    const uris = files.map((file) => {
      const item = file.result.find(item => item.checked)

      return item?.uri
    }).filter(o => o)

    if (uris.length === 0) {
      errorCallbacks.push(() => setListValidationMsg("Please add your mp3 files here."))
    }

    if (errorCallbacks.length) {
      errorCallbacks.forEach(callback => callback())
      return;
    }

    setIsLoading(true)
    createPlaylist(playlistTitle)
      .then(({ data }) => {
        addToPlaylist(data.id, { uris, position: 0 })
        sendDataToGTM({ event: "Playlist Created" })
        setCreatedPlaylist(data)
        reset()
      })
      .catch((err) => {
        setErrorMsg("Sorry! We failed to create our playlist. Try again.")
        Sentry.captureException(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onPlaylistTitleChange = (event) => {
    if (titleValidationMsg) {
      setTitleValidationMsg('')
    }

    setPlaylistTitle(event.target.value)
  }

  return (
    <Box className="App">
      <AppBar component="nav">
        <Toolbar>
          <IconButton aria-label="Go back" onClick={() => navigate("/home")}>
            <ArrowBack />
          </IconButton>

          <Separator width={10} />

          <Typography variant="h6" component="div">
            Create your playlist
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className="App-Container">
        <List>
          <ListItem>
            1. Add your songs to the list
          </ListItem>
          <ListItem>
            2. Pick the version you like better (Optional)
          </ListItem>
          <ListItem>
            3. Create your playlist!
          </ListItem>
        </List>

        <TextField label="Playlist name" variant="filled" fullWidth id="name" onChange={onPlaylistTitleChange} value={playlistTitle} />

        {!!titleValidationMsg && <Alert severity="error">{titleValidationMsg}</Alert>}

        <FileList files={files} removeItem={removeItem} selectItem={selectItem} onFilesAdded={onFilesAdded} setErrorMsg={setErrorMsg} />
        {!!listValidationMsg && <Alert severity="error">{listValidationMsg}</Alert>}
        <p style={{ margin: 0, textAlign: 'right' }}>{files.length}/100</p>

        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={clearList} disabled={files.length === 0}>Clear List</Button>
          <Separator width={10} />
          <Button variant="contained" color="info" onClick={createMyPlaylist}>
            <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>Create Playlist</div>
            {isLoading && (
              <CircularProgress size={20} style={{ position: 'absolute', color: 'white' }} />
            )}
          </Button>
        </div>
      </Container>

      <Snackbar open={!!errorMsg} autoHideDuration={6000} onClose={() => setErrorMsg('')} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setErrorMsg('')} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>

      {createdPlaylist && (
        <ModalPlaylistCreated playlist={createdPlaylist} onClose={() => setCreatedPlaylist(null)} />
      )}
    </Box>
  );
}
