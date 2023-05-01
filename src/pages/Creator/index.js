import { useEffect, useState } from 'react'
import { Alert, Button, Snackbar, TextField } from '@mui/material'
import useApi from '../../helpers/useApi'
import FileList from '../../components/FileList'
import Separator from '../../components/Separator'
import './index.css'
import { Container } from '@mui/system'

export default function Creator() {
  const [alertMsg, setAlertMsg] = useState('')
  const [snackMsg, setSnackMsg] = useState('')
  const [playlistTitle, setPlaylistTitle] = useState('')

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
    }

    setFiles([...files, ...list])
  }

  const removeItem = (i) => {
    files.splice(i, 1)
    setFiles([...files])
  }

  const onFilesAdded = (newFiles) => {
    const myFiles = newFiles.filter((file) => {
      return !files.find((f) => f.name === file.name)
    }).map((f) => {
      f.q = f.name
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .split('.')[0]
      return f
    })

    onSearch(myFiles)
  }

  const createMyPlaylist = () => {
    const name = playlistTitle

    if (!name) {
      setAlertMsg('Please fill up playlist name.')
      return
    }

    const uris = files.map((file) => {
      const item = file.result.find(item => item.checked)

      return item?.uri
    }).filter(o => o)

    if (uris.length === 0) {
      return
    }

    createPlaylist(name)
      .then(({ data: { id } }) => {
        addToPlaylist(id, { uris, position: 0 })
      })
      .catch((err) => {
        setSnackMsg(err.message)
      })
  }

  const onPlaylistTitleChange = (event) => {
    setAlertMsg('')
    setPlaylistTitle(event.target.value)
  }

  return (
    <div className="App">
      <Container style={{ maxWidth: 720 }}>
        <h1 style={{ textAlign: 'center' }}>Create Spotify playlist from mp3 files!</h1>

        <p>
          1. Add your songs to the list <br />
          2. Pick the version you like better (Optional) <br />
          3. Create your playlist!
        </p>

        <Separator height={5} />

        <TextField label="Playlist name" variant="filled" fullWidth id="name" onChange={onPlaylistTitleChange} />

        {!!alertMsg && <Alert severity="error">{alertMsg}</Alert>}

        <Separator height={10} />

        <p style={{ margin: 0, textAlign: 'right' }}>{files.length}/100</p>
        <FileList files={files} removeItem={removeItem} selectItem={selectItem} onFilesAdded={onFilesAdded} />

        <Separator height={20} />

        <div style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={() => setFiles([])} disabled={files.length === 0}>Clear List</Button>
          <Separator width={10} />
          <Button variant="contained" color="info" onClick={createMyPlaylist}>Create Playlist</Button>
        </div>
      </Container>

      <Snackbar open={!!snackMsg} autoHideDuration={6000} onClose={() => setSnackMsg('')}>
        <Alert onClose={() => setSnackMsg('')} severity="error">
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}
