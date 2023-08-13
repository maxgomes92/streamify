import { useEffect, useState } from 'react'
import { Alert, Button, CircularProgress, List, ListItem, Snackbar, TextField, Typography } from '@mui/material'
import useApi from '../../helpers/useApi'
import FileList from '../../components/FileList'
import Separator from '../../components/Separator'
import { Container } from '@mui/system'
import * as Sentry from "@sentry/react"
import './index.css'

export default function Creator() {
  const [titleValidationMsg, setTitleValidationMsg] = useState('')
  const [listValidationMsg, setListValidationMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
        .replace(/\W/g, ' ') // Non-character by space
        .replace(/\s+/g, ' ') // Multiple spaces by 1 space
      return f
    })

    onSearch(myFiles)
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
      .then(({ data: { id } }) => {
        addToPlaylist(id, { uris, position: 0 })
        setSuccessMsg("Playlist created successfully!")
        clearList()
        setPlaylistTitle("")
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
    <div className="App">
      <Container className="App-Container">
        <Typography align='center' variant='h2'>Playlist creator</Typography>

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

      <Snackbar open={!!successMsg} autoHideDuration={6000} onClose={() => setSuccessMsg('')} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setSuccessMsg('')} severity="success">
          {successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
